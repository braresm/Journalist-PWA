import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  serverTimestamp,
  addDoc,
} from '@angular/fire/firestore';
import { Newsroom } from '../interfaces/newsroom';

@Injectable({
  providedIn: 'root',
})
export class NewsroomService {
  private newsroomCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.newsroomCollection = collection(this.firestore, 'newsrooms');
  }

  create(newsroom: Newsroom) {
    newsroom.createdDate = serverTimestamp();
    return addDoc(this.newsroomCollection, newsroom);
  }
}
