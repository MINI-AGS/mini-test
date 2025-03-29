import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { Usuario } from "@shared/interfaces";
import UserFirestoreService from "@backend/user_firestore_service";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funcion de ejemplo para demostrar el uso del servicio
async function exampleClinicalDataManagementSurvey() {
  // Crear una instancia del servicio de Firestore
  const userFirestoreService = new UserFirestoreService(db);

  // Crear un identificador unico para el usuario
  const userId = `paciente_${Date.now()}`;

  // Preparar datos de ejemplo siguiendo la interfaz Usuario
  const userData: Usuario = {
    //Campos basicos
    name: "Beto Gay",
    gender: "Masculino",
    birthdate: Timestamp.fromDate(new Date(1990, 5, 15)),
    interviewDate: Timestamp.now(),
    startTimeInterview: '10:00',
    endTimeInterview: '11:30',
    durationInterview: '1.5 horas',
    // Seccion A - Episodio Depresivo Mayor
    questionA1: 'No',
    questionA2: 'No',
    questionA3a: 'No',
    questionA3b: 'No',
    questionA3c: 'No',
    questionA3d: 'No',
    questionA3e: 'No',
    questionA3f: 'No',
    questionA3g: 'No',
    questionA4a: 'No',
    questionA4b: 'No',
    questionA5a: 'No',
    questionA5b: 'No',
    questionA6a: 'No',
    questionA6b: 'No',
    questionA6c: 'No',
    questionA6d: 'No',
    questionA6e: 'No',
    questionA6f: 'No',
    // Seccion B - Trastorno Distimico
    questionB1: 'No',
	  questionB2: 'No',
    questionB3a: 'No',
    questionB3b: 'No',
    questionB3c: 'No',
    questionB3d: 'No',
    questionB3e: 'No',
    questionB3f: 'No',
    questionB4: 'No',
    //Riesgo de suicidio
    questionC1: 'No',
    questionC2: 'No',
    questionC3: 'No',
    questionC4: 'No',
    questionC5: 'No',
    questionC6: 'No',
    //Episodio (hipo)maníaco
    questionD1a: 'No',
    questionD1b: 'No',
    questionD2a: 'No',
    questionD2b: 'No',
    questionD3a: 'No',
    questionD3b: 'No',
    questionD3c: 'No',
    questionD3d: 'No',
    questionD3e: 'No',
    questionD3f: 'No',
    questionD3g: 'No',
    questionD4: 'No',
    //Trastorno de angustia
    questionE1a: 'No',
    questionE1b: 'No',
    questionE2: 'No',
    questionE3: 'No',
    questionE4a: 'No',
    questionE4b: 'No',
    questionE4c: 'No',
    questionE4d: 'No',
    questionE4e: 'No',
    questionE4f: 'No',
    questionE4g: 'No',
    questionE4h: 'No',
    questionE4i: 'No',
    questionE4j: 'No',
    questionE4k: 'No',
    questionE4l: 'No',
    questionE4m: 'No',
    questionE5: 'No',
    questionE6: 'No',
    questionE7: 'No',
    //Agorafobia
    questionF1: 'No',
    questionF2: 'No',
    //Fobia social
    questionG1: 'No',
    questionG2: 'No',
    questionG3: 'No',
    questionG4: 'No',
    //Trastorno obsesivo-compulsivo
    questionH1: 'No',
    questionH2: 'No',
    questionH3: 'No',
    questionH4: 'No',
    questionH5: 'No',
    questionH6: 'No',
    //Estado por estrés postraumático (opcional)
    questionI1: 'No',
    questionI2: 'No',
    questionI3a: 'No',
    questionI3b: 'No',
    questionI3c: 'No',
    questionI3d: 'No',
    questionI3e: 'No',
    questionI3f: 'No',
    questionI4a: 'No',
    questionI4b: 'No',
    questionI4c: 'No',
    questionI4d: 'No',
    questionI4e: 'No',
    questionI5: 'No',
    //Abuso y dependencia de alcohol
    questionJ1: 'No',
    questionJ2a: 'No',
    questionJ2b: 'No',
    questionJ2c: 'No',
    questionJ2d: 'No',
    questionJ2e: 'No',
    questionJ2f: 'No',
    questionJ2g: 'No',
    questionJ3a: 'No',
    questionJ3b: 'No',
    questionJ3c: 'No',
    questionJ3d: 'No',
    //Trastornos asociados al uso de sustancias psicoactivas no alcohólicas
    questionK1a: 'No',
    K1aEstimulantes: ['anfetaminas'],
    K1aCocaina: ['inhalada','intravenosa','crack','speedball'],
    K1aNarcoticos: ['heroína','morfina','Dilaudid','opio','Demerol','metadona','codeína','Percodan','Darvon'],
    K1aAlucinoginos: ['LSD (ácido)','mescalina','peyote','PCP (polvo de ángel, peace pill)','psilocybin','STP','hongos','éxtasis','MDA','MDMA'],
    K1aInhalantes: ['pegamento', 'éter', 'óxido nitroso (laughing gas)', 'amyl o butyl nitrate (poppers)'],
    K1aMarihuana: ['hachís','THC','pasto','hierba','mota','reefer'],
    K1aTranquilizantes: ['Qualude','Seconal (<<reds>>)','Valium','Xanax','Librium','Ativan','Dalmane','Halción','barbitúricos','<<Miltown>>','Tranquimazin','Lexatin','Orfidal'],
    K1aOtrasSustancias: [' '],
    questionK1b: 'No',
    questionK2a: 'No',
    questionK2b: 'No',
    questionK2c: 'No',
    questionK2d: 'No',
    questionK2e: 'No',
    questionK2f: 'No',
    questionK2g: 'No',
    questionK3a: 'No',
    questionK3b: 'No',
    questionK3c: 'No',
    questionK3d: 'No',
    //Trastornos psicoticos
    questionL1a: 'No',
    questionL1b: 'No',
    questionL2a: 'No',
    questionL2b: 'No',
    questionL3a: 'No',
    questionL3b: 'No',
    questionL4a: 'No',
    questionL4b: 'No',
    questionL5a: 'No',
    questionL5b: 'No',
    questionL6a: 'No',
    questionL6b: 'No',
    questionL7a: 'No',
    questionL7b: 'No',
    //Bajo el punto de vista del entrevistador
    //Solo preguntar si hay un etrevistador, sino, saltar a las evaluaciones
    questionL8b: 'No',
    questionL9b: 'No',
    questionL10b: 'No',
    questionL11b: 'No',
    questionL12b: 'No',
    //Anorexia nerviosa
    questionM1a: 'No', //e.g. 132cm.
    questionM1b: 'No', //e.g. 76kg.
    questionM1c: 'No',
    questionM2: 'No',
    questionM3: 'No',
    questionM4a: 'No',
    questionM4b: 'No',
    questionM4c: 'No',
    questionM5: 'No',
    questionM6: 'No', //solo para mujeres
    //Bulimia nerviosa
    questionN1: 'No',
    questionN2: 'No',
    questionN3: 'No',
    questionN4: 'No',
    questionN5: 'No',
    questionN6: 'No',
    questionN7: 'No',
    questionN8: 'No',
    //Trastorno de ansiedad generalizada
    questionO1a: 'No',
    questionO1b: 'No',
    questionO2: 'No',
    questionO3a: 'No',
    questionO3b: 'No',
    questionO3c: 'No',
    questionO3d: 'No',
    questionO3e: 'No',
    questionO3f: 'No',
    //Trastorno antisocial de la personalidad (opcional)
    questionP1a: 'No',
    questionP1b: 'No',
    questionP1c: 'No',
    questionP1d: 'No',
    questionP1e: 'No',
    questionP1f: 'No',
    questionP2a: 'No',
    questionP2b: 'No',
    questionP2c: 'No',
    questionP2d: 'No',
    questionP2e: 'No',
    questionP2f: 'No',
    diagnosticA1: 'No',
    diagnosticA2: 'No',
    diagnosticA3: 'No', //opcional
    diagnosticB1: 'No',
    diagnosticC1: 'No',
    riesgoC1: 'No',
    diagnosticD1: 'No',
    periodoD1: 'No',
    diagnosticD2: 'No', //solo si no dio positivo para D1
    periodoD2: 'No',
    diagnosticE1: 'No',
    periodoE1: 'No',
    diagnosticE2: 'No',
    periodoE2: 'No',
    diagnosticF1: 'No',
    diagnosticF2: 'No',
    diagnosticF3: 'No',
    diagnosticG1: 'No',
    diagnosticH1: 'No',
    diagnosticI1: 'No',
    diagnosticJ1: 'No',
    diagnosticJ2: 'No',
    diagnosticK1: 'No',
    diagnosticK2: 'No',
    diagnosticL1: 'No',
    diagnosticL2: 'No',
    diagnosticL3: 'No',
    diagnosticM1: 'No',
    diagnosticN1: 'No',
    diagnosticN2: 'No',
    diagnosticO1: 'No',
    diagnosticP1: 'No',
  };

  try {
    // Crear el usuario en Firestore
    console.log('Intentando crear usuario...');
    await userFirestoreService.createUser(userId, userData);
    console.log(`Usuario ${userId} creado con exito!`);

    // Obtener el usuario de Firestore
    console.log('Intentando obtener usuario...');
    const user = await userFirestoreService.getUser(userId);
    if (user) {
      console.log(`Usuario ${userId} obtenido con exito:`, user);
      console.log('Nombre:', user.name);
      console.log('Genero:', user.gender);
    } else {
      console.log(`Usuario ${userId} no encontrado.`);
    }

  } catch (error) {
    console.error('Error en la gestion de datos del usuario:', error);
  }
}

// Ejecutar la funcion de ejemplo
exampleClinicalDataManagementSurvey().catch(console.error);

export default exampleClinicalDataManagementSurvey;
