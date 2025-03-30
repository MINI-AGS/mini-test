import { Firestore, doc, setDoc, getDoc, deleteDoc, collection, getDocs, query, DocumentData } from "firebase/firestore";

import { Usuario } from '@shared/interfaces';

class UserFirestoreService {
  private db: Firestore;
  public collectionName: string = 'data'; // Basado en las reglas de Firestore

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
      // Usando setDoc con la opción merge: false para asegurar que solo se use para crear
      await setDoc(docRef, user, { merge: false });
      console.log(`Usuario ${userId} creado con éxito`);
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

  // List all users
  async listUsers(): Promise<Usuario[]> {
    try {
      const q = query(collection(this.db, this.collectionName));
      const querySnapshot = await getDocs(q);
      const users: Usuario[] = [];
      
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as Usuario);
      });
      
      return users;
    } catch (error) {
      console.error("Error al listar usuarios:", error);
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
      console.log(`Usuario ${userId} eliminado con éxito`);
    } catch (error) {
      console.error(`Error al eliminar usuario ${userId}:`, error);
      throw error;
    }
  }
  
  // Método para actualización completa (crear un nuevo documento)
  async replaceUser(
    userId: string,
    newUserData: Usuario
  ): Promise<void> {
    try {
      // Primero eliminamos el usuario existente
      await this.deleteUser(userId);
      
      // Luego creamos uno nuevo con los datos actualizados
      await this.createUser(userId, newUserData);
      
      console.log(`Usuario ${userId} reemplazado con éxito`);
    } catch (error) {
      console.error(`Error al reemplazar usuario ${userId}:`, error);
      throw error;
    }
  }
}

export default UserFirestoreService;