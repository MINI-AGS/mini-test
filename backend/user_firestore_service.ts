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
  /**
   * Valida los datos de usuario según las reglas de Firestore antes de enviarlos
   * @param user Datos del usuario a validar
   * @returns Objeto con el resultado de la validación: {isValid: boolean, errors: string[]}
  */
  validateUserData(user: Usuario): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validación de campos básicos
    if (!this.isValidBasicFields(user, errors)) {
      errors.push('Campos básicos inválidos');
    }
    
    // Validación de secciones
    if (!this.isValidSectionA(user, errors)) {
      errors.push('Sección A inválida');
    }
    
    if (!this.isValidSectionB(user, errors)) {
      errors.push('Sección B inválida');
    }
    
    if (!this.isValidSectionC(user, errors)) {
      errors.push('Sección C inválida');
    }
    
    if (!this.isValidSectionD(user, errors)) {
      errors.push('Sección D inválida');
    }
    
    if (!this.isValidSectionE(user, errors)) {
      errors.push('Sección E inválida');
    }
    
    if (!this.isValidSectionF_G(user, errors)) {
      errors.push('Sección F y G inválida');
    }
    
    if (!this.isValidSectionH_I(user, errors)) {
      errors.push('Sección H e I inválida');
    }
    
    if (!this.isValidSectionJ_K(user, errors)) {
      errors.push('Sección J y K inválida');
    }
    
    // Validación de sustancias
    if (!this.isValidSustancias(user, errors)) {
      errors.push('Datos de sustancias inválidos');
    }
    
    if (!this.isValidSectionL_M(user, errors)) {
      errors.push('Sección L y M inválida');
    }
    
    if (!this.isValidSectionN_O(user, errors)) {
      errors.push('Sección N y O inválida');
    }
    
    if (!this.isValidSectionP(user, errors)) {
      errors.push('Sección P inválida');
    }
    
    if (!this.isValidDiagnosticFields(user, errors)) {
      errors.push('Datos de diagnóstico inválidos');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Verifica si los campos básicos son válidos
   */
  private isValidBasicFields(user: Usuario, errors: string[]): boolean {
    let isValid = true;
    
    if (typeof user.gender !== 'string') {
      errors.push('El género debe ser una cadena de texto');
      isValid = false;
    }
    
    if (!(user.interviewDate instanceof Object) || !('seconds' in user.interviewDate)) {
      errors.push('La fecha de entrevista debe ser un objeto Timestamp');
      isValid = false;
    }
    
    if (typeof user.startTimeInterview !== 'string') {
      errors.push('La hora de inicio debe ser una cadena de texto');
      isValid = false;
    }
    
    if (typeof user.endTimeInterview !== 'string') {
      errors.push('La hora de finalización debe ser una cadena de texto');
      isValid = false;
    }
    
    if (typeof user.durationInterview !== 'string') {
      errors.push('La duración de la entrevista debe ser una cadena de texto');
      isValid = false;
    }
    
    if (user.name !== undefined && typeof user.name !== 'string') {
      errors.push('El nombre debe ser una cadena de texto');
      isValid = false;
    }
    
    if (user.birthdate !== undefined && !(user.birthdate instanceof Object) && !('seconds' in (user.birthdate || {}))) {
      errors.push('La fecha de nacimiento debe ser un objeto Timestamp');
      isValid = false;
    }
    
    if (user.nameInterviewer !== undefined && typeof user.nameInterviewer !== 'string') {
      errors.push('El nombre del entrevistador debe ser una cadena de texto');
      isValid = false;
    }
    
    if (user.sexualPreference !== undefined && typeof user.sexualPreference !== 'string') {
      errors.push('La preferencia sexual debe ser una cadena de texto');
      isValid = false;
    }
    
    if (user.stateResidence !== undefined && typeof user.stateResidence !== 'string') {
      errors.push('El estado de residencia debe ser una cadena de texto');
      isValid = false;
    }
    
    return isValid;
  }
  
  /**
   * Valida la sección A del cuestionario
   */
  private isValidSectionA(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionA1', 'questionA2', 'questionA3a', 'questionA3b', 'questionA3c', 
      'questionA3d', 'questionA3e', 'questionA3f', 'questionA3g', 'questionA4a', 
      'questionA4b', 'questionA5a', 'questionA5b', 'questionA6a', 'questionA6b', 
      'questionA6c', 'questionA6d', 'questionA6e', 'questionA6f'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección A', errors);
  }
  
  /**
   * Valida la sección B del cuestionario
   */
  private isValidSectionB(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionB1', 'questionB2', 'questionB3a', 'questionB3b', 'questionB3c', 
      'questionB3d', 'questionB3e', 'questionB3f', 'questionB4'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección B', errors);
  }
  
  /**
   * Valida la sección C del cuestionario
   */
  private isValidSectionC(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionC1', 'questionC2', 'questionC3', 'questionC4', 'questionC5', 'questionC6'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección C', errors);
  }
  
  /**
   * Valida la sección D del cuestionario
   */
  private isValidSectionD(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionD1a', 'questionD1b', 'questionD2a', 'questionD2b', 'questionD3a', 
      'questionD3b', 'questionD3c', 'questionD3d', 'questionD3e', 'questionD3f', 
      'questionD3g', 'questionD4'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección D', errors);
  }
  
  /**
   * Valida la sección E del cuestionario
   */
  private isValidSectionE(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionE1a', 'questionE1b', 'questionE2', 'questionE3', 'questionE4a', 
      'questionE4b', 'questionE4c', 'questionE4d', 'questionE4e', 'questionE4f', 
      'questionE4g', 'questionE4h', 'questionE4i', 'questionE4j', 'questionE4k', 
      'questionE4l', 'questionE4m', 'questionE5', 'questionE6', 'questionE7'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección E', errors);
  }
  
  /**
   * Valida las secciones F y G del cuestionario
   */
  private isValidSectionF_G(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionF1', 'questionF2', 'questionG1', 'questionG2', 'questionG3', 'questionG4'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección F y G', errors);
  }
  
  /**
   * Valida las secciones H e I del cuestionario
   */
  private isValidSectionH_I(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionH1', 'questionH2', 'questionH3', 'questionH4', 'questionH5', 'questionH6',
      'questionI1', 'questionI2', 'questionI3a', 'questionI3b', 'questionI3c', 'questionI3d',
      'questionI3e', 'questionI3f', 'questionI4a', 'questionI4b', 'questionI4c', 'questionI4d',
      'questionI4e', 'questionI5'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección H e I', errors);
  }
  
  /**
   * Valida las secciones J y parte de K del cuestionario
   */
  private isValidSectionJ_K(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionJ1', 'questionJ2a', 'questionJ2b', 'questionJ2c', 'questionJ2d', 'questionJ2e',
      'questionJ2f', 'questionJ2g', 'questionJ3a', 'questionJ3b', 'questionJ3c', 'questionJ3d',
      'questionK1a', 'questionK1b', 'questionK2a', 'questionK2b', 'questionK2c', 'questionK2d',
      'questionK2e', 'questionK2f', 'questionK2g', 'questionK3a', 'questionK3b', 'questionK3c',
      'questionK3d'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección J y K', errors);
  }
  
  /**
   * Valida los datos de sustancias
   */
  private isValidSustancias(user: Usuario, errors: string[]): boolean {
    let isValid = true;
    
    // Listas de valores permitidos
    const allowedEstimulantes = ['anfetaminas', 'speed', 'cristal', 'dexedrina', 'ritalina', 'píldoras adelgazantes'];
    const allowedCocaina = ['inhalada', 'intravenosa', 'crack', 'speedball'];
    const allowedNarcoticos = ['heroína', 'morfina', 'Dilaudid', 'opio', 'Demerol', 'metadona', 'codeína', 'Percodan', 'Darvon'];
    const allowedAlucinogenos = ['LSD (ácido)', 'mescalina', 'peyote', 'PCP (polvo de ángel, peace pill)', 'psilocybin', 'STP', 'hongos', 'éxtasis', 'MDA', 'MDMA'];
    const allowedInhalantes = ['pegamento', 'éter', 'óxido nitroso (laughing gas)', 'amyl o butyl nitrate (poppers)'];
    const allowedMarihuana = ['hachís', 'THC', 'pasto', 'hierba', 'mota', 'reefer'];
    const allowedTranquilizantes = ['Qualude', 'Seconal (<<reds>>)', 'Valium', 'Xanax', 'Librium', 'Ativan', 'Dalmane', 'Halción', 'barbitúricos', '<<Miltown>>', 'Tranquimazin', 'Lexatin', 'Orfidal'];
    
    // Validar estimulantes
    if ('K1aEstimulantes' in user) {
      if (!Array.isArray(user.K1aEstimulantes)) {
        errors.push('K1aEstimulantes debe ser un array');
        isValid = false;
      } else if (!this.containsOnlyAllowedValues(user.K1aEstimulantes, allowedEstimulantes)) {
        errors.push('K1aEstimulantes contiene valores no permitidos');
        isValid = false;
      }
    }
    
    // Validar cocaína
    if ('K1aCocaina' in user) {
      if (!Array.isArray(user.K1aCocaina)) {
        errors.push('K1aCocaina debe ser un array');
        isValid = false;
      } else if (!this.containsOnlyAllowedValues(user.K1aCocaina, allowedCocaina)) {
        errors.push('K1aCocaina contiene valores no permitidos');
        isValid = false;
      }
    }
    
    // Validar narcóticos
    if ('K1aNarcoticos' in user) {
      if (!Array.isArray(user.K1aNarcoticos)) {
        errors.push('K1aNarcoticos debe ser un array');
        isValid = false;
      } else if (!this.containsOnlyAllowedValues(user.K1aNarcoticos, allowedNarcoticos)) {
        errors.push('K1aNarcoticos contiene valores no permitidos');
        isValid = false;
      }
    }
    
    // Validar alucinógenos
    if ('K1aAlucinoginos' in user) {
      if (!Array.isArray(user.K1aAlucinoginos)) {
        errors.push('K1aAlucinoginos debe ser un array');
        isValid = false;
      } else if (!this.containsOnlyAllowedValues(user.K1aAlucinoginos, allowedAlucinogenos)) {
        errors.push('K1aAlucinoginos contiene valores no permitidos');
        isValid = false;
      }
    }
    
    // Validar inhalantes
    if ('K1aInhalantes' in user) {
      if (!Array.isArray(user.K1aInhalantes)) {
        errors.push('K1aInhalantes debe ser un array');
        isValid = false;
      } else if (!this.containsOnlyAllowedValues(user.K1aInhalantes, allowedInhalantes)) {
        errors.push('K1aInhalantes contiene valores no permitidos');
        isValid = false;
      }
    }
    
    // Validar marihuana
    if ('K1aMarihuana' in user) {
      if (!Array.isArray(user.K1aMarihuana)) {
        errors.push('K1aMarihuana debe ser un array');
        isValid = false;
      } else if (!this.containsOnlyAllowedValues(user.K1aMarihuana, allowedMarihuana)) {
        errors.push('K1aMarihuana contiene valores no permitidos');
        isValid = false;
      }
    }
    
    // Validar tranquilizantes
    if ('K1aTranquilizantes' in user) {
      if (!Array.isArray(user.K1aTranquilizantes)) {
        errors.push('K1aTranquilizantes debe ser un array');
        isValid = false;
      } else if (!this.containsOnlyAllowedValues(user.K1aTranquilizantes, allowedTranquilizantes)) {
        errors.push('K1aTranquilizantes contiene valores no permitidos');
        isValid = false;
      }
    }
    
    // Validar otras sustancias
    if ('K1aOtrasSustancias' in user) {
      if (!Array.isArray(user.K1aOtrasSustancias)) {
        errors.push('K1aOtrasSustancias debe ser un array');
        isValid = false;
      }
    }
    
    return isValid;
  }
  
  /**
   * Valida las secciones L y M del cuestionario
   */
  private isValidSectionL_M(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionL1a', 'questionL1b', 'questionL2a', 'questionL2b', 'questionL3a', 'questionL3b',
      'questionL4a', 'questionL4b', 'questionL5a', 'questionL5b', 'questionL6a', 'questionL7a',
      'questionL7b', 'questionL8b', 'questionL9b', 'questionL10b', 'questionL11b', 'questionL12b',
      'questionM1a', 'questionM1b', 'questionM1c', 'questionM2', 'questionM3', 'questionM4a',
      'questionM4b', 'questionM4c', 'questionM5', 'questionM6'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección L y M', errors);
  }
  
  /**
   * Valida las secciones N y O del cuestionario
   */
  private isValidSectionN_O(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionN1', 'questionN2', 'questionN3', 'questionN4', 'questionN5', 'questionN6',
      'questionN7', 'questionN8', 'questionO1a', 'questionO1b', 'questionO2', 'questionO3a',
      'questionO3b', 'questionO3c', 'questionO3d', 'questionO3e', 'questionO3f'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección N y O', errors);
  }
  
  /**
   * Valida la sección P del cuestionario
   */
  private isValidSectionP(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'questionP1a', 'questionP1b', 'questionP1c', 'questionP1d', 'questionP1e', 'questionP1f',
      'questionP2a', 'questionP2b', 'questionP2c', 'questionP2d', 'questionP2e', 'questionP2f'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Sección P', errors);
  }
  
  /**
   * Valida los campos de diagnóstico
   */
  private isValidDiagnosticFields(user: Usuario, errors: string[]): boolean {
    const requiredFields = [
      'diagnosticA1', 'diagnosticA2', 'diagnosticA3', 'diagnosticB1', 'diagnosticC1',
      'riesgoC1', 'diagnosticD1', 'periodoD1', 'diagnosticD2', 'periodoD2',
      'diagnosticE1', 'periodoE1', 'diagnosticE2', 'periodoE2', 'diagnosticF1',
      'diagnosticF2', 'diagnosticF3', 'diagnosticG1', 'diagnosticH1', 'diagnosticI1',
      'diagnosticJ1', 'diagnosticJ2', 'diagnosticK1', 'diagnosticK2', 'diagnosticL1', 
      'diagnosticL2', 'diagnosticL3', 'diagnosticM1', 'diagnosticN1', 'diagnosticN2',
      'diagnosticO1', 'diagnosticP1'
    ];
    
    return this.validateRequiredStringFields(user, requiredFields, 'Diagnósticos', errors);
  }
  
  /**
   * Utilidad para validar campos requeridos que deben ser cadenas de texto
   */
  private validateRequiredStringFields(obj: any, fields: string[], section: string, errors: string[]): boolean {
    let isValid = true;
    
    for (const field of fields) {
      if (!(field in obj)) {
        errors.push(`Campo '${field}' requerido falta en la sección ${section}`);
        isValid = false;
      } else if (typeof obj[field] !== 'string') {
        errors.push(`Campo '${field}' en la sección ${section} debe ser una cadena de texto`);
        isValid = false;
      }
    }
    
    return isValid;
  }
  
  /**
   * Verifica si un array solo contiene valores permitidos
   */
  private containsOnlyAllowedValues(array: string[], allowedValues: string[]): boolean {
    if (!Array.isArray(array)) return false;
    
    // Si el array está vacío o contiene solo valores permitidos, es válido
    if (array.length === 0) return true;
    
    // Verificar que todos los elementos estén en la lista de valores permitidos
    return array.every(value => allowedValues.includes(value));
  }
  
  // ... resto del código de la clase ...
  
  /**
   * Método modificado para crear un usuario con validación previa
   */
  async createUserWithValidation(
    userId: string,
    user: Usuario
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validar datos primero
      const validation = this.validateUserData(user);
      
      if (!validation.isValid) {
        return {
          success: false,
          message: `Datos inválidos: ${validation.errors.join(', ')}`
        };
      }
      
      // Si la validación es exitosa, crear el usuario
      const docRef = doc(this.db, this.collectionName, userId);
      await setDoc(docRef, user, { merge: false });
      
      return {
        success: true,
        message: `Usuario ${userId} creado con éxito`
      };
    } catch (error) {
      console.error(`Error al crear usuario ${userId}:`, error);
      return {
        success: false,
        message: `Error al crear usuario: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}

export default UserFirestoreService;
