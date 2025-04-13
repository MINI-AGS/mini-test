import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
} from "firebase/firestore";

import { Record } from "@shared/interfaces";

class RecordFirestoreService {
  private db: Firestore;
  public collectionName: string = "data"; // Basado en las reglas de Firestore

  constructor(db: Firestore) {
    this.db = db;
  }

  // Test connection to Firestore
  async testConnection(): Promise<void> {
    try {
      const docRef = doc(this.db, this.collectionName, "ejemplos");
      await setDoc(docRef, { test: true });
      console.log("Firestore connection successful");
    } catch (error) {
      console.error("Error connecting to Firestore:", error);
      throw error;
    }
  }

  // Create a new record
  async createRecord(recordId: string, record: Record): Promise<void> {
    try {
      const docRef = doc(this.db, this.collectionName, recordId);
      // Usando setDoc con la opción merge: false para asegurar que solo se use para crear
      await setDoc(docRef, record, { merge: false });
      console.log(`Record ${recordId} successfully created`);
    } catch (error) {
      console.error(`Error creating record ${recordId}:`, error);
      throw error;
    }
  }

  // Obtain a record
  async getRecord(recordId: string): Promise<Record | null> {
    try {
      const docRef = doc(this.db, this.collectionName, recordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as Record;
      }
      return null;
    } catch (error) {
      console.error(`Error getting record ${recordId}:`, error);
      throw error;
    }
  }

  // List all records
  async listRecords(): Promise<Record[]> {
    try {
      const q = query(collection(this.db, this.collectionName));
      const querySnapshot = await getDocs(q);
      const records: Record[] = [];

      querySnapshot.forEach((doc) => {
        records.push(doc.data() as Record);
      });

      return records;
    } catch (error) {
      console.error("Error listing records:", error);
      throw error;
    }
  }

  // Delete a record
  async deleteRecord(recordId: string): Promise<void> {
    try {
      const docRef = doc(this.db, this.collectionName, recordId);
      await deleteDoc(docRef);
      console.log(`Record ${recordId} successfully deleted`);
    } catch (error) {
      console.error(`Error deleting record ${recordId}:`, error);
      throw error;
    }
  }

  // Método para actualización completa (crear un nuevo documento)
  async replaceRecord(recordId: string, newRecordData: Record): Promise<void> {
    try {
      // Primero eliminamos el usuario existente
      await this.deleteRecord(recordId);

      // Luego creamos uno nuevo con los datos actualizados
      await this.createRecord(recordId, newRecordData);

      console.log(`Record ${recordId} successfully replaced`);
    } catch (error) {
      console.error(`Error replacing record ${recordId}:`, error);
      throw error;
    }
  }

  /**
   * Validate record data
   * @param record Record data to validate
   * @returns Object with validation result
   */
  validateRecordData(record: Record): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validación de campos básicos
    if (!this.isValidBasicFields(record, errors)) {
      errors.push("Campos básicos inválidos");
    }

    // Validación de secciones
    if (!this.isValidSectionA(record, errors)) {
      errors.push("Sección A inválida");
    }

    if (!this.isValidSectionB(record, errors)) {
      errors.push("Sección B inválida");
    }

    if (!this.isValidSectionC(record, errors)) {
      errors.push("Sección C inválida");
    }

    if (!this.isValidSectionD(record, errors)) {
      errors.push("Sección D inválida");
    }

    if (!this.isValidSectionE(record, errors)) {
      errors.push("Sección E inválida");
    }

    if (!this.isValidSectionF_G(record, errors)) {
      errors.push("Sección F y G inválida");
    }

    if (!this.isValidSectionH_I(record, errors)) {
      errors.push("Sección H e I inválida");
    }

    if (!this.isValidSectionJ_K(record, errors)) {
      errors.push("Sección J y K inválida");
    }

    // Validación de sustancias
    if (!this.isValidSustancias(record, errors)) {
      errors.push("Datos de sustancias inválidos");
    }

    if (!this.isValidSectionL_M(record, errors)) {
      errors.push("Sección L y M inválida");
    }

    if (!this.isValidSectionN_O(record, errors)) {
      errors.push("Sección N y O inválida");
    }

    if (!this.isValidSectionP(record, errors)) {
      errors.push("Sección P inválida");
    }

    if (!this.isValidDiagnosticFields(record, errors)) {
      errors.push("Datos de diagnóstico inválidos");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Verifica si los campos básicos son válidos
   */
  private isValidBasicFields(record: Record, errors: string[]): boolean {
    let isValid = true;

    if (typeof record.gender !== "string") {
      errors.push("El género debe ser una cadena de texto");
      isValid = false;
    }

    if (
      !(record.interviewDate instanceof Object) ||
      !("seconds" in record.interviewDate)
    ) {
      errors.push("La fecha de entrevista debe ser un objeto Timestamp");
      isValid = false;
    }

    if (typeof record.startTimeInterview !== "string") {
      errors.push("La hora de inicio debe ser una cadena de texto");
      isValid = false;
    }

    if (typeof record.endTimeInterview !== "string") {
      errors.push("La hora de finalización debe ser una cadena de texto");
      isValid = false;
    }

    if (typeof record.durationInterview !== "string") {
      errors.push("La duración de la entrevista debe ser una cadena de texto");
      isValid = false;
    }

    if (record.name !== undefined && typeof record.name !== "string") {
      errors.push("El nombre debe ser una cadena de texto");
      isValid = false;
    }

    if (
      record.birthdate !== undefined &&
      !(record.birthdate instanceof Object) &&
      !("seconds" in (record.birthdate || {}))
    ) {
      errors.push("La fecha de nacimiento debe ser un objeto Timestamp");
      isValid = false;
    }

    if (
      record.nameInterviewer !== undefined &&
      typeof record.nameInterviewer !== "string"
    ) {
      errors.push("El nombre del entrevistador debe ser una cadena de texto");
      isValid = false;
    }

    if (
      record.sexualPreference !== undefined &&
      typeof record.sexualPreference !== "string"
    ) {
      errors.push("La preferencia sexual debe ser una cadena de texto");
      isValid = false;
    }

    if (
      record.stateResidence !== undefined &&
      typeof record.stateResidence !== "string"
    ) {
      errors.push("El estado de residencia debe ser una cadena de texto");
      isValid = false;
    }

    return isValid;
  }

  /**
   * Valida la sección A del cuestionario
   */
  private isValidSectionA(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionA1",
      "questionA2",
      "questionA3a",
      "questionA3b",
      "questionA3c",
      "questionA3d",
      "questionA3e",
      "questionA3f",
      "questionA3g",
      "questionA4a",
      "questionA4b",
      "questionA5a",
      "questionA5b",
      "questionA6a",
      "questionA6b",
      "questionA6c",
      "questionA6d",
      "questionA6e",
      "questionA6f",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección A",
      errors,
    );
  }

  /**
   * Valida la sección B del cuestionario
   */
  private isValidSectionB(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionB1",
      "questionB2",
      "questionB3a",
      "questionB3b",
      "questionB3c",
      "questionB3d",
      "questionB3e",
      "questionB3f",
      "questionB4",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección B",
      errors,
    );
  }

  /**
   * Valida la sección C del cuestionario
   */
  private isValidSectionC(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionC1",
      "questionC2",
      "questionC3",
      "questionC4",
      "questionC5",
      "questionC6",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección C",
      errors,
    );
  }

  /**
   * Valida la sección D del cuestionario
   */
  private isValidSectionD(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionD1a",
      "questionD1b",
      "questionD2a",
      "questionD2b",
      "questionD3a",
      "questionD3b",
      "questionD3c",
      "questionD3d",
      "questionD3e",
      "questionD3f",
      "questionD3g",
      "questionD4",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección D",
      errors,
    );
  }

  /**
   * Valida la sección E del cuestionario
   */
  private isValidSectionE(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionE1a",
      "questionE1b",
      "questionE2",
      "questionE3",
      "questionE4a",
      "questionE4b",
      "questionE4c",
      "questionE4d",
      "questionE4e",
      "questionE4f",
      "questionE4g",
      "questionE4h",
      "questionE4i",
      "questionE4j",
      "questionE4k",
      "questionE4l",
      "questionE4m",
      "questionE5",
      "questionE6",
      "questionE7",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección E",
      errors,
    );
  }

  /**
   * Valida las secciones F y G del cuestionario
   */
  private isValidSectionF_G(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionF1",
      "questionF2",
      "questionG1",
      "questionG2",
      "questionG3",
      "questionG4",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección F y G",
      errors,
    );
  }

  /**
   * Valida las secciones H e I del cuestionario
   */
  private isValidSectionH_I(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionH1",
      "questionH2",
      "questionH3",
      "questionH4",
      "questionH5",
      "questionH6",
      "questionI1",
      "questionI2",
      "questionI3a",
      "questionI3b",
      "questionI3c",
      "questionI3d",
      "questionI3e",
      "questionI3f",
      "questionI4a",
      "questionI4b",
      "questionI4c",
      "questionI4d",
      "questionI4e",
      "questionI5",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección H e I",
      errors,
    );
  }

  /**
   * Valida las secciones J y parte de K del cuestionario
   */
  private isValidSectionJ_K(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionJ1",
      "questionJ2a",
      "questionJ2b",
      "questionJ2c",
      "questionJ2d",
      "questionJ2e",
      "questionJ2f",
      "questionJ2g",
      "questionJ3a",
      "questionJ3b",
      "questionJ3c",
      "questionJ3d",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección J y K",
      errors,
    );
  }

  /**
   * Valida los datos de sustancias con la nueva estructura
   */
  private isValidSustancias(record: Record, errors: string[]): boolean {
    let isValid = true;

    // Listas de valores permitidos
    const allowedEstimulantes = [
      "anfetaminas",
      "speed",
      "cristal",
      "dexedrina",
      "ritalina",
      "píldoras adelgazantes",
    ];
    const allowedCocaina = ["inhalada", "intravenosa", "crack", "speedball"];
    const allowedNarcoticos = [
      "heroína",
      "morfina",
      "Dilaudid",
      "opio",
      "Demerol",
      "metadona",
      "codeína",
      "Percodan",
      "Darvon",
    ];
    const allowedAlucinoginos = [
      "LSD (ácido)",
      "mescalina",
      "peyote",
      "PCP (polvo de ángel, peace pill)",
      "psilocybin",
      "STP",
      "hongos",
      "éxtasis",
      "MDA",
      "MDMA",
    ];
    const allowedInhalantes = [
      "pegamento",
      "éter",
      "óxido nitroso (laughing gas)",
      "amyl o butyl nitrate (poppers)",
    ];
    const allowedMarihuana = [
      "hachís",
      "THC",
      "pasto",
      "hierba",
      "mota",
      "reefer",
    ];
    const allowedTranquilizantes = [
      "Qualude",
      "Seconal (<<reds>>)",
      "Valium",
      "Xanax",
      "Librium",
      "Ativan",
      "Dalmane",
      "Halción",
      "barbitúricos",
      "<<Miltown>>",
      "Tranquimazin",
      "Lexatin",
      "Orfidal",
    ];

    // Validar los arrays de sustancias escogidas
    this.validateSubstanceArray(
      record,
      "questionK_Estimulantes_list",
      allowedEstimulantes,
      "Estimulantes",
      errors,
      isValid,
    );
    this.validateSubstanceArray(
      record,
      "questionK_Cocaina_list",
      allowedCocaina,
      "Cocaína",
      errors,
      isValid,
    );
    this.validateSubstanceArray(
      record,
      "questionK_Narcoticos_list",
      allowedNarcoticos,
      "Narcóticos",
      errors,
      isValid,
    );
    this.validateSubstanceArray(
      record,
      "questionK_Alucinoginos_list",
      allowedAlucinoginos,
      "Alucinógenos",
      errors,
      isValid,
    );
    this.validateSubstanceArray(
      record,
      "questionK_Inhalantes_list",
      allowedInhalantes,
      "Inhalantes",
      errors,
      isValid,
    );
    this.validateSubstanceArray(
      record,
      "questionK_Marihuana_list",
      allowedMarihuana,
      "Marihuana",
      errors,
      isValid,
    );
    this.validateSubstanceArray(
      record,
      "questionK_Tranquilizantes_list",
      allowedTranquilizantes,
      "Tranquilizantes",
      errors,
      isValid,
    );
    this.validateSubstanceArray(
      record,
      "questionK_OtrasSustancias_list",
      [],
      "Otras Sustancias",
      errors,
      isValid,
    );

    // Validar preguntas adicionales para cada sustancia
    this.validateSubstanceQuestions(record, "Estimulantes", errors, isValid);
    this.validateSubstanceQuestions(record, "Cocaina", errors, isValid);
    this.validateSubstanceQuestions(record, "Narcoticos", errors, isValid);
    this.validateSubstanceQuestions(record, "Alucinoginos", errors, isValid);
    this.validateSubstanceQuestions(record, "Inhalantes", errors, isValid);
    this.validateSubstanceQuestions(record, "Marihuana", errors, isValid);
    this.validateSubstanceQuestions(record, "Tranquilizantes", errors, isValid);
    this.validateSubstanceQuestions(record, "OtrasSustancias", errors, isValid);

    return isValid;
  }

  /**
   * Valida los arrays de sustancias
   */
  private validateSubstanceArray(
    record: Record,
    fieldName: string,
    allowedValues: string[],
    substanceName: string,
    errors: string[],
    isValid: boolean,
  ): boolean {
    if (fieldName in record) {
      // if the array just contains an empty string, we consider it valid
      if (record[fieldName].length === 1 && record[fieldName][0] === "") {
        isValid = true;
        return isValid;
      }
      if (!Array.isArray(record[fieldName])) {
        errors.push(`${fieldName} debe ser un array`);
        isValid = false;
      } else if (
        allowedValues.length > 0 &&
        !this.containsOnlyAllowedValues(record[fieldName], allowedValues)
      ) {
        errors.push(
          `${fieldName} contiene valores no permitidos para ${substanceName}`,
        );
        isValid = false;
      }

      // Si se seleccionó esta sustancia, validamos que existan las preguntas adicionales
      if (Array.isArray(record[fieldName]) && record[fieldName].length > 0) {
        const substanceType = fieldName.split("_")[1]; // Obtiene "Estimulantes", "Cocaina", etc.
        // Aquí podríamos añadir validaciones específicas para las preguntas relacionadas
      }
    } else {
      errors.push(`Falta el campo ${fieldName}`);
      isValid = false;
    }
    return isValid;
  }

  /**
   * Valida las preguntas adicionales para cada tipo de sustancia
   */
  private validateSubstanceQuestions(
    record: Record,
    substanceType: string,
    errors: string[],
    isValid: boolean,
  ): boolean {
    const arrayField = `questionK_${substanceType}_list`;

    // Solo validamos las preguntas si se seleccionó la sustancia
    if (
      arrayField in record &&
      Array.isArray(record[arrayField]) &&
      record[arrayField].length > 0
    ) {
      // Lista de preguntas que deben existir para cada sustancia seleccionada
      const requiredQuestions = [
        `questionK_${substanceType}_K2a`,
        `questionK_${substanceType}_K2b`,
        `questionK_${substanceType}_K2c`,
        `questionK_${substanceType}_K2d`,
        `questionK_${substanceType}_K2e`,
        `questionK_${substanceType}_K2f`,
        `questionK_${substanceType}_K3a`,
        `questionK_${substanceType}_K3b`,
        `questionK_${substanceType}_K3c`,
        `questionK_${substanceType}_K3d`,
      ];

      // Verificamos que existan todas las preguntas adicionales necesarias
      for (const question of requiredQuestions) {
        if (!(question in record)) {
          errors.push(
            `Falta la pregunta ${question} para la sustancia ${substanceType} seleccionada`,
          );
          isValid = false;
        } else if (typeof record[question] !== "string") {
          errors.push(`La pregunta ${question} debe ser una cadena de texto`);
          isValid = false;
        }
      }
    }

    return isValid;
  }

  /**
   * Valida las secciones L y M del cuestionario
   */
  private isValidSectionL_M(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionL1a",
      "questionL1b",
      "questionL2a",
      "questionL2b",
      "questionL3a",
      "questionL3b",
      "questionL4a",
      "questionL4b",
      "questionL5a",
      "questionL5b",
      "questionL6a1",
      "questionL6a2",
      "questionL7a",
      "questionL7b",
      "questionL8b",
      "questionL9b",
      "questionL10b",
      "questionL11b",
      "questionL12b",
      "questionM1a",
      "questionM1b",
      "questionM1c",
      "questionM2",
      "questionM3",
      "questionM4a",
      "questionM4b",
      "questionM4c",
      "questionM5",
      "questionM6",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección L y M",
      errors,
    );
  }

  /**
   * Valida las secciones N y O del cuestionario
   */
  private isValidSectionN_O(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionN1",
      "questionN2",
      "questionN3",
      "questionN4",
      "questionN5",
      "questionN6",
      "questionN7",
      "questionN8",
      "questionO1a",
      "questionO1b",
      "questionO2",
      "questionO3a",
      "questionO3b",
      "questionO3c",
      "questionO3d",
      "questionO3e",
      "questionO3f",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección N y O",
      errors,
    );
  }

  /**
   * Valida la sección P del cuestionario
   */
  private isValidSectionP(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "questionP1a",
      "questionP1b",
      "questionP1c",
      "questionP1d",
      "questionP1e",
      "questionP1f",
      "questionP2a",
      "questionP2b",
      "questionP2c",
      "questionP2d",
      "questionP2e",
      "questionP2f",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Sección P",
      errors,
    );
  }

  /**
   * Valida los campos de diagnóstico
   */
  private isValidDiagnosticFields(record: Record, errors: string[]): boolean {
    const requiredFields = [
      "diagnosticA1",
      "diagnosticA2",
      "diagnosticA3",
      "diagnosticB1",
      "diagnosticC1",
      "riesgoC1",
      "diagnosticD1",
      "periodoD1",
      "diagnosticD2",
      "periodoD2",
      "diagnosticE1",
      "periodoE1",
      "diagnosticE2",
      "periodoE2",
      "diagnosticE3",
      "periodoE3",
      "diagnosticF1",
      "diagnosticF2",
      "diagnosticF3",
      "diagnosticG1",
      "diagnosticH1",
      "diagnosticI1",
      "diagnosticJ1",
      "diagnosticJ2",
      "diagnosticK1",
      "diagnosticK2",
      "diagnosticL1",
      "diagnosticL2",
      "diagnosticL3",
      "diagnosticM1",
      "diagnosticN1",
      "diagnosticN2",
      "diagnosticO1",
      "diagnosticP1",
    ];

    return this.validateRequiredStringFields(
      record,
      requiredFields,
      "Diagnósticos",
      errors,
    );
  }

  /**
   * Utilidad para validar campos requeridos que deben ser cadenas de texto
   */
  private validateRequiredStringFields(
    obj: any,
    fields: string[],
    section: string,
    errors: string[],
  ): boolean {
    let isValid = true;

    for (const field of fields) {
      if (!(field in obj)) {
        errors.push(
          `Campo '${field}' requerido falta en la sección ${section}`,
        );
        isValid = false;
      } else if (typeof obj[field] !== "string") {
        errors.push(
          `Campo '${field}' en la sección ${section} debe ser una cadena de texto`,
        );
        isValid = false;
      }
    }

    return isValid;
  }

  /**
   * Verifica si un array solo contiene valores permitidos
   */
  private containsOnlyAllowedValues(
    array: string[],
    allowedValues: string[],
  ): boolean {
    if (!Array.isArray(array)) return false;

    // Si el array está vacío o si allowedValues está vacío (como en OtrasSustancias), es válido
    if (array.length === 0 || allowedValues.length === 0) return true;

    // Verificar que todos los elementos estén en la lista de valores permitidos
    return array.every((value) => allowedValues.includes(value));
  }

  /**
   * Método modificado para crear un usuario con validación previa
   */
  async createRecordWithValidation(
    recordId: string,
    record: Record,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validar datos primero
      const validation = this.validateRecordData(record);

      if (!validation.isValid) {
        return {
          success: false,
          message: `Datos inválidos: ${validation.errors.join(", ")}`,
        };
      }

      //console.log("Record validado:", record);

      // Si la validación es exitosa, crear el usuario
      const docRef = doc(this.db, this.collectionName, recordId);
      await setDoc(docRef, record, { merge: false });

      return {
        success: true,
        message: `Record ${recordId} creado con éxito`,
      };
    } catch (error) {
      console.error(`Error al crear usuario ${recordId}:`, error);
      return {
        success: false,
        message: `Error al crear usuario: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }
}

export default RecordFirestoreService;
