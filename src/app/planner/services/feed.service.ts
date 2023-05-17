import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentData,
  collection,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Feed } from '../interfaces/feed';

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

  getFeeds() {
    return collectionData(this.feedsCollection, {
      idField: 'id',
    }) as Observable<Feed[]>;
  }
}
