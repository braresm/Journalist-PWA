import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  doc,
  docData,
  serverTimestamp,
  documentId,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NewsroomCategory } from '../enums/newsroom-category';
import { Archive } from '../interfaces/archive';
import { Newsroom } from '../interfaces/newsroom';

@Injectable({
  providedIn: 'root',
})
export class NewsroomService {
  private newsroomCollection: CollectionReference<DocumentData>;
  private archiveCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.newsroomCollection = collection(this.firestore, 'newsrooms');
    this.archiveCollection = collection(this.firestore, 'archives');
  }

  getNewsroom(id: string) {
    const documentReference = doc(this.firestore, `newsrooms/${id}`);
    return docData(documentReference, { idField: 'id' });
  }

  create(newsroom: Newsroom) {
    newsroom.createdDate = serverTimestamp();
    return addDoc(this.newsroomCollection, newsroom);
  }

  update(newsroom: Newsroom) {
    const documentReference = doc(this.firestore, `newsrooms/${newsroom.id}`);
    return updateDoc(documentReference, { ...newsroom });
  }

  delete(id: string) {
    const documentReference = doc(this.firestore, `newsrooms/${id}`);
    return deleteDoc(documentReference);
  }

  getNewsrooms(category: NewsroomCategory) {
    const newsroomQuery = query(
      this.newsroomCollection,
      where('category', '==', category)
    );

    return collectionData(newsroomQuery, {
      idField: 'id',
    }) as Observable<Newsroom[]>;
  }

  getNewsroomFiles(newsroom: Newsroom) {
    const archiveQuery = query(
      this.archiveCollection,
      where(documentId(), 'in', newsroom.files)
    );

    return collectionData(archiveQuery, {
      idField: 'id',
    }) as Observable<Archive[]>;
  }

  deleteNewsroomFile(id: string) {
    const documentReference = doc(this.firestore, `archives/${id}`);
    return deleteDoc(documentReference);
  }
}
