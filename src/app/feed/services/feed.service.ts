import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentData,
  collection,
  QueryConstraint,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Feed } from '../interfaces/feed';
import { FeedFilter } from '../interfaces/feed-filter';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private feedsCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.feedsCollection = collection(this.firestore, 'feeds');
  }

  getFeed(id: string) {
    const feedDocumentReference = doc(this.firestore, `feeds/${id}`);
    return docData(feedDocumentReference, { idField: 'id' });
  }

  create(feed: Feed) {
    feed.createdDate = serverTimestamp();
    return addDoc(this.feedsCollection, feed);
  }

  update(feed: Feed) {
    const feedDocumentReference = doc(this.firestore, `feeds/${feed.id}`);
    return updateDoc(feedDocumentReference, { ...feed });
  }

  delete(id: string) {
    const feedDocumentReference = doc(this.firestore, `feeds/${id}`);
    return deleteDoc(feedDocumentReference);
  }

  getFeedsWithFilters(feedFilter: FeedFilter): Observable<Feed[]> {
    const queryConstraint: QueryConstraint[] = [];
    if (feedFilter.keywords.length > 0 && feedFilter.keywords[0] != '') {
      queryConstraint.push(
        where('keywords', 'array-contains-any', feedFilter.keywords)
      );
    }
    if (feedFilter.alert) {
      queryConstraint.push(where('alert', '==', feedFilter.alert));
    }

    let feedsQuery = query(this.feedsCollection, ...queryConstraint);

    return collectionData(feedsQuery, {
      idField: 'id',
    }) as Observable<Feed[]>;
  }

  getFeeds() {
    return collectionData(this.feedsCollection, {
      idField: 'id',
    }) as Observable<Feed[]>;
  }
}
