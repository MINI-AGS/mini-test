import { Timestamp } from "firebase/firestore";
import { Record } from "@shared/interfaces";
import RecordFirestoreService from "@backend/RecordFirestoreService";
import db from "../firebaseConfig";

// Función principal para ejecutar pruebas de validación y operaciones CRUD
async function testRecordFirestoreService() {
  // Crear una instancia del servicio de Firestore con la base de datos importada
  const recordFirestoreService = new RecordFirestoreService(db);

  // Asegurar que estamos usando la colección "data" según las reglas de Firestore
  recordFirestoreService.collectionName = "data";

  // 1. PRUEBA DE CREACIÓN CON DATOS VÁLIDOS
  console.log(
    "--------------- PRUEBA 1: Crear usuario con datos válidos ---------------",
  );
  const validRecordId = `paciente_valid_${Date.now()}`;
  const validRecordData = createValidRecordData();

  try {
    // Crear usuario usando la función con validación
    const createResult =
      await recordFirestoreService.createRecordWithValidation(
        validRecordId,
        validRecordData,
      );
    console.log("Resultado de creación con validación:", createResult);

    if (createResult.success) {
      // Obtener el usuario para verificar que se guardó correctamente
      const retrievedRecord =
        await recordFirestoreService.getRecord(validRecordId);
      console.log(
        "Record recuperado:",
        retrievedRecord ? "Éxito" : "No encontrado",
      );
    }
  } catch (error) {
    console.error("Error en prueba 1:", error);
  }

  // 3. PRUEBA DE LISTAR USUARIOS
  console.log("--------------- PRUEBA 3: Listar usuarios ---------------");
  try {
    const records: Record[] = await recordFirestoreService.listRecords();
    console.log(
      `Se encontraron ${records.length} usuarios en la base de datos`,
    );
    // Mostrar solo nombres para no saturar la consola
    console.log(
      "Nombres de usuarios:",
      records.map((record) => record.name || "Sin nombre"),
    );
  } catch (error) {
    console.error("Error en prueba 3:", error);
  }

  // 4. PRUEBA DE REEMPLAZO DE USUARIO
  console.log("--------------- PRUEBA 4: Reemplazar usuario ---------------");
  try {
    // Primero verificamos que el usuario existe
    const recordExists = await recordFirestoreService.getRecord(validRecordId);

    if (recordExists) {
      // Crear datos modificados
      const updatedRecordData = {
        ...validRecordData,
        name: "Record Actualizado",
        gender: "Otro",
      };

      // Reemplazar usuario
      await recordFirestoreService.replaceRecord(
        validRecordId,
        updatedRecordData,
      );
      console.log(`Record ${validRecordId} reemplazado`);

      // Verificar los cambios
      const updatedRecord =
        await recordFirestoreService.getRecord(validRecordId);
      console.log(
        "Datos actualizados:",
        updatedRecord
          ? {
              name: updatedRecord.name,
              gender: updatedRecord.gender,
            }
          : "No encontrado",
      );
    } else {
      console.log(`El usuario ${validRecordId} no existe para reemplazar`);
    }
  } catch (error) {
    console.error("Error en prueba 4:", error);
  }

  // 5. PRUEBA DE ELIMINACIÓN DE USUARIO
  // console.log('--------------- PRUEBA 5: Eliminar usuario ---------------');
  // try {
  //   await recordFirestoreService.deleteRecord(validRecordId);
  //   console.log(`Record ${validRecordId} eliminado`);

  //   // Verificar que se eliminó correctamente
  //   const deletedRecord = await recordFirestoreService.getRecord(validRecordId);
  //   console.log('¿Record eliminado existe?', deletedRecord ? 'Sí (error)' : 'No (correcto)');
  // } catch (error) {
  //   console.error('Error en prueba 5:', error);
  // }

  // 6. PRUEBA DE VALIDACIÓN DE SUSTANCIAS INCORRECTAS
  console.log(
    "--------------- PRUEBA 6: Validación de sustancias incorrectas ---------------",
  );
  try {
    const invalidSubstanceData = {
      ...validRecordData,
      questionK1a_Estimulantes: ["anfetaminas", "sustancia_no_permitida"],
    };

    const validationResult =
      recordFirestoreService.validateRecordData(invalidSubstanceData);
    console.log(
      "Resultado de validación de sustancias incorrectas:",
      validationResult,
    );
  } catch (error) {
    console.error("Error en prueba 6:", error);
  }
}

// Función para crear datos de usuario válidos
function createValidRecordData(): Record {
  return {
    //Campos básicos
    name: "Beto Gay",
    gender: "Masculino",
    birthdate: Timestamp.fromDate(new Date(1990, 5, 15)),
    interviewDate: Timestamp.now(),
    startTimeInterview: "10:00",
    endTimeInterview: "11:30",
    durationInterview: "1.5 horas",
    nameInterviewer: "Dr. Evaluador",
    sexualPreference: "Heterosexual",
    stateOrigin: "Aguascalientes",
    stateResidence: "Aguascalientes",
    // Sección A - Episodio Depresivo Mayor
    questionA1: "No",
    questionA2: "No",
    questionA3a: "No",
    questionA3b: "No",
    questionA3c: "No",
    questionA3d: "No",
    questionA3e: "No",
    questionA3f: "No",
    questionA3g: "No",
    questionA4a: "No",
    questionA4b: "No",
    questionA5a: "No",
    questionA5b: "No",
    questionA6a: "No",
    questionA6b: "No",
    questionA6c: "No",
    questionA6d: "No",
    questionA6e: "No",
    questionA6f: "No",
    // Sección B - Trastorno Distímico
    questionB1: "No",
    questionB2: "No",
    questionB3a: "No",
    questionB3b: "No",
    questionB3c: "No",
    questionB3d: "No",
    questionB3e: "No",
    questionB3f: "No",
    questionB4: "No",
    //Riesgo de suicidio
    questionC1: "No",
    questionC2: "No",
    questionC3: "No",
    questionC4: "No",
    questionC5: "No",
    questionC6: "No",
    //Episodio (hipo)maníaco
    questionD1a: "No",
    questionD1b: "No",
    questionD2a: "No",
    questionD2b: "No",
    questionD3a: "No",
    questionD3b: "No",
    questionD3c: "No",
    questionD3d: "No",
    questionD3e: "No",
    questionD3f: "No",
    questionD3g: "No",
    questionD4: "No",
    //Trastorno de angustia
    questionE1a: "No",
    questionE1b: "No",
    questionE2: "No",
    questionE3: "No",
    questionE4a: "No",
    questionE4b: "No",
    questionE4c: "No",
    questionE4d: "No",
    questionE4e: "No",
    questionE4f: "No",
    questionE4g: "No",
    questionE4h: "No",
    questionE4i: "No",
    questionE4j: "No",
    questionE4k: "No",
    questionE4l: "No",
    questionE4m: "No",
    questionE5: "No",
    questionE6: "No",
    questionE7: "No",
    //Agorafobia
    questionF1: "No",
    questionF2: "No",
    //Fobia social
    questionG1: "No",
    questionG2: "No",
    questionG3: "No",
    questionG4: "No",
    //Trastorno obsesivo-compulsivo
    questionH1: "No",
    questionH2: "No",
    questionH3: "No",
    questionH4: "No",
    questionH5: "No",
    questionH6: "No",
    //Estado por estrés postraumático (opcional)
    questionI1: "No",
    questionI2: "No",
    questionI3a: "No",
    questionI3b: "No",
    questionI3c: "No",
    questionI3d: "No",
    questionI3e: "No",
    questionI3f: "No",
    questionI4a: "No",
    questionI4b: "No",
    questionI4c: "No",
    questionI4d: "No",
    questionI4e: "No",
    questionI5: "No",
    //Abuso y dependencia de alcohol
    questionJ1: "No",
    questionJ2a: "No",
    questionJ2b: "No",
    questionJ2c: "No",
    questionJ2d: "No",
    questionJ2e: "No",
    questionJ2f: "No",
    questionJ2g: "No",
    questionJ3a: "No",
    questionJ3b: "No",
    questionJ3c: "No",
    questionJ3d: "No",
    //Trastornos asociados al uso de sustancias psicoactivas no alcohólicas
    questionK1a: "No",
    // Nuevos campos para sustancias siguiendo la estructura de la interfaz
    questionK1a_Estimulantes: ["anfetaminas", "speed"],
    questionK2a_Estimulantes: "No",
    questionK2b_Estimulantes: "No",
    questionK2c_Estimulantes: "No",
    questionK2d_Estimulantes: "No",
    questionK2e_Estimulantes: "No",
    questionK2f_Estimulantes: "No",
    questionK3a_Estimulantes: "No",
    questionK3b_Estimulantes: "No",
    questionK3c_Estimulantes: "No",
    questionK3d_Estimulantes: "No",
    
    questionK1a_Cocaina: ["inhalada", "crack"],
    questionK2a_Cocaina: "No",
    questionK2b_Cocaina: "No",
    questionK2c_Cocaina: "No",
    questionK2d_Cocaina: "No",
    questionK2e_Cocaina: "No",
    questionK2f_Cocaina: "No",
    questionK3a_Cocaina: "No",
    questionK3b_Cocaina: "No",
    questionK3c_Cocaina: "No",
    questionK3d_Cocaina: "No",
    
    questionK1a_Narcoticos: ["heroína", "morfina"],
    questionK2a_Narcoticos: "No",
    questionK2b_Narcoticos: "No",
    questionK2c_Narcoticos: "No",
    questionK2d_Narcoticos: "No",
    questionK2e_Narcoticos: "No",
    questionK2f_Narcoticos: "No",
    questionK3a_Narcoticos: "No",
    questionK3b_Narcoticos: "No",
    questionK3c_Narcoticos: "No",
    questionK3d_Narcoticos: "No",
    
    questionK1a_Alucinoginos: ["LSD (ácido)", "peyote"],
    questionK2a_Alucinoginos: "No",
    questionK2b_Alucinoginos: "No",
    questionK2c_Alucinoginos: "No",
    questionK2d_Alucinoginos: "No",
    questionK2e_Alucinoginos: "No",
    questionK2f_Alucinoginos: "No",
    questionK3a_Alucinoginos: "No",
    questionK3b_Alucinoginos: "No",
    questionK3c_Alucinoginos: "No",
    questionK3d_Alucinoginos: "No",
    
    questionK1a_Inhalantes: ["pegamento", "éter"],
    questionK2a_Inhalantes: "No",
    questionK2b_Inhalantes: "No",
    questionK2c_Inhalantes: "No",
    questionK2d_Inhalantes: "No",
    questionK2e_Inhalantes: "No",
    questionK2f_Inhalantes: "No",
    questionK3a_Inhalantes: "No",
    questionK3b_Inhalantes: "No",
    questionK3c_Inhalantes: "No",
    questionK3d_Inhalantes: "No",
    
    questionK1a_Marihuana: ["hachís", "THC"],
    questionK2a_Marihuana: "No",
    questionK2b_Marihuana: "No",
    questionK2c_Marihuana: "No",
    questionK2d_Marihuana: "No",
    questionK2e_Marihuana: "No",
    questionK2f_Marihuana: "No",
    questionK3a_Marihuana: "No",
    questionK3b_Marihuana: "No",
    questionK3c_Marihuana: "No",
    questionK3d_Marihuana: "No",
    
    questionK1a_Tranquilizantes: ["Valium", "Xanax"],
    questionK2a_Tranquilizantes: "No",
    questionK2b_Tranquilizantes: "No",
    questionK2c_Tranquilizantes: "No",
    questionK2d_Tranquilizantes: "No",
    questionK2e_Tranquilizantes: "No",
    questionK2f_Tranquilizantes: "No",
    questionK3a_Tranquilizantes: "No",
    questionK3b_Tranquilizantes: "No",
    questionK3c_Tranquilizantes: "No",
    questionK3d_Tranquilizantes: "No",
    
    questionK1a_OtrasSustancias: [],
    questionK2a_OtrasSustancias: "No",
    questionK2b_OtrasSustancias: "No",
    questionK2c_OtrasSustancias: "No",
    questionK2d_OtrasSustancias: "No",
    questionK2e_OtrasSustancias: "No",
    questionK2f_OtrasSustancias: "No",
    questionK3a_OtrasSustancias: "No",
    questionK3b_OtrasSustancias: "No",
    questionK3c_OtrasSustancias: "No",
    questionK3d_OtrasSustancias: "No",
    
    //Trastornos psicóticos
    questionL1a: "No",
    questionL1b: "No",
    questionL2a: "No",
    questionL2b: "No",
    questionL3a: "No",
    questionL3b: "No",
    questionL4a: "No",
    questionL4b: "No",
    questionL5a: "No",
    questionL5b: "No",
    questionL6a: "No",
    questionL6b: "No",
    questionL7a: "No",
    questionL7b: "No",
    //Bajo el punto de vista del entrevistador
    //Solo preguntar si hay un etrevistador, sino, saltar a las evaluaciones
    questionL8b: "No",
    questionL9b: "No",
    questionL10b: "No",
    questionL11b: "No",
    questionL12b: "No",
    //Anorexia nerviosa
    questionM1a: "No",
    questionM1b: "No",
    questionM1c: "No",
    questionM2: "No",
    questionM3: "No",
    questionM4a: "No",
    questionM4b: "No",
    questionM4c: "No",
    questionM5: "No",
    questionM6: "No", //solo para mujeres
    //Bulimia nerviosa
    questionN1: "No",
    questionN2: "No",
    questionN3: "No",
    questionN4: "No",
    questionN5: "No",
    questionN6: "No",
    questionN7: "No",
    questionN8: "No",
    //Trastorno de ansiedad generalizada
    questionO1a: "No",
    questionO1b: "No",
    questionO2: "No",
    questionO3a: "No",
    questionO3b: "No",
    questionO3c: "No",
    questionO3d: "No",
    questionO3e: "No",
    questionO3f: "No",
    //Trastorno antisocial de la personalidad (opcional)
    questionP1a: "No",
    questionP1b: "No",
    questionP1c: "No",
    questionP1d: "No",
    questionP1e: "No",
    questionP1f: "No",
    questionP2a: "No",
    questionP2b: "No",
    questionP2c: "No",
    questionP2d: "No",
    questionP2e: "No",
    questionP2f: "No",
    diagnosticA1: "No",
    diagnosticA2: "No",
    diagnosticA3: "No", //opcional
    diagnosticB1: "No",
    diagnosticC1: "No",
    riesgoC1: "No",
    diagnosticD1: "No",
    periodoD1: "No",
    diagnosticD2: "No", //solo si no dio positivo para D1
    periodoD2: "No",
    diagnosticE1: "No",
    periodoE1: "No",
    diagnosticE2: "No",
    periodoE2: "No",
    diagnosticF1: "No",
    diagnosticF2: "No",
    diagnosticF3: "No",
    diagnosticG1: "No",
    diagnosticH1: "No",
    diagnosticI1: "No",
    diagnosticJ1: "No",
    diagnosticJ2: "No",
    diagnosticK1: "No",
    diagnosticK2: "No",
    diagnosticL1: "No",
    diagnosticL2: "No",
    diagnosticL3: "No",
    diagnosticM1: "No",
    diagnosticN1: "No",
    diagnosticN2: "No",
    diagnosticO1: "No",
    diagnosticP1: "No",
  };
}

// Exportar la función principal
export default testRecordFirestoreService;