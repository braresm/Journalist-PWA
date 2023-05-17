import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  doc,
  docData,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Archive } from '../interfaces/archive';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  private archiveCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.archiveCollection = collection(this.firestore, 'archives');
  }

  getArchive(id: string) {
    const documentReference = doc(this.firestore, `archives/${id}`);
    return docData(documentReference, { idField: 'id' });
  }

  delete(id: string) {
    const documentReference = doc(this.firestore, `archives/${id}`);
    return deleteDoc(documentReference);
  }

  getArchives() {
    return collectionData(this.archiveCollection, {
      idField: 'id',
    }) as Observable<Archive[]>;
  }
}
