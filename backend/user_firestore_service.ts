import { Firestore, doc, setDoc, getDoc, deleteDoc, DocumentData } from "firebase/firestore";

import { Usuario } from '@shared/interfaces';

class UserFirestoreService {
  private db: Firestore;
  private collectionName: string = 'ejemplos'; //Basado en las reglas de Firestore

  constructor(db: Firestore) {
    this.db = db;
  }

  // Create a new user
  async createUser(
    userId: string, 
    user: Usuario
  ): Promise<void> {
    try {
      const docRef = doc(this.db, this.collectionName, userId);
      await setDoc(docRef, user);
      console.log(`Usuario ${userId} creado con exito`);
    } catch (error) {
      console.error(`Error al crear usuario ${userId}:`, error);
      throw error;
    }
  }

  // Obtain a user
  async getUser(
    userId: string
  ): Promise<Usuario | null> {
    try {
      const docRef = doc(this.db, this.collectionName, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as Usuario;
      }
      return null;
    } catch (error){
      console.error(`Error al obtener usuario ${userId}:`, error);
      throw error;
    }
  }

  // Delete a user
  async deleteUser(
    userId: string
  ): Promise<void> {
    try {
      const docRef = doc(this.db, this.collectionName, userId);
      await deleteDoc(docRef);
      console.log(`Usuario ${userId} eliminado con exito`);
    } catch (error) {
      console.error(`Error al eliminar usuario ${userId}:`, error);
      throw error;
    }
  }
}

export default UserFirestoreService;
