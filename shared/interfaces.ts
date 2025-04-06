import { Timestamp } from "firebase/firestore";

export interface Record {
  [key: string]: any; // Permite cualquier propiedad adicional
  //Datos del usuario
  name?: string;
  gender: string; //No puede ser opcional por que influye en el diagnostico
  birthdate?: Timestamp; //Manejo en Firebase
  interviewDate: Timestamp; //Manejo en Firebase
  startTimeInterview: string; //"HH:mm"
  endTimeInterview: string; //"HH:mm"
  durationInterview: string; // "n horas"
  nameInterviewer?: string;
  sexualPreference?: string;
  stateOrigin?: string;
  stateResidence?: string;
  //Respuestas del cuestionario
  //Episodio depresivo mayor
  questionA1: string; //questionA1: Si o No
  questionA2: string;

  questionA3a: string;
  questionA3b: string;
  questionA3c: string;
  questionA3d: string;
  questionA3e: string;
  questionA3f: string;
  questionA3g: string;

  questionA4a: string;
  questionA4b: string;

  questionA5a: string;
  questionA5b: string;

  questionA6a: string;
  questionA6b: string;
  questionA6c: string;
  questionA6d: string;
  questionA6e: string;
  questionA6f: string;

  //Trastorno distímico
  questionB1: string;
  questionB2: string;

  questionB3a: string;
  questionB3b: string;
  questionB3c: string;
  questionB3d: string;
  questionB3e: string;
  questionB3f: string;

  questionB4: string;

  //Riesgo de suicidio
  questionC1: string;
  questionC2: string;
  questionC3: string;
  questionC4: string;
  questionC5: string;
  questionC6: string;

  //Episodio (hipo)maníaco
  questionD1a: string;
  questionD1b: string;

  questionD2a: string;
  questionD2b: string;

  questionD3a: string;
  questionD3b: string;
  questionD3c: string;
  questionD3d: string;
  questionD3e: string;
  questionD3f: string;
  questionD3g: string;

  questionD4: string;

  //Trastorno de angustia
  questionE1a: string;
  questionE1b: string;

  questionE2: string;
  questionE3: string;

  questionE4a: string;
  questionE4b: string;
  questionE4c: string;
  questionE4d: string;
  questionE4e: string;
  questionE4f: string;
  questionE4g: string;
  questionE4h: string;
  questionE4i: string;
  questionE4j: string;
  questionE4k: string;
  questionE4l: string;
  questionE4m: string;

  questionE5: string;
  questionE6: string;
  questionE7: string;

  //Agorafobia
  questionF1: string;
  questionF2: string;

  //Fobia social
  questionG1: string;
  questionG2: string;
  questionG3: string;
  questionG4: string;

  //Trastorno obsesivo-compulsivo
  questionH1: string;
  questionH2: string;
  questionH3: string;
  questionH4: string;
  questionH5: string;
  questionH6: string;

  //Estado por estrés postraumático (opcional)
  questionI1: string;
  questionI2: string;

  questionI3a: string;
  questionI3b: string;
  questionI3c: string;
  questionI3d: string;
  questionI3e: string;
  questionI3f: string;

  questionI4a: string;
  questionI4b: string;
  questionI4c: string;
  questionI4d: string;
  questionI4e: string;

  questionI5: string;

  //Abuso y dependencia de alcohol
  questionJ1: string;

  questionJ2a: string;
  questionJ2b: string;
  questionJ2c: string;
  questionJ2d: string;
  questionJ2e: string;
  questionJ2f: string;
  questionJ2g: string;

  questionJ3a: string;
  questionJ3b: string;
  questionJ3c: string;
  questionJ3d: string;

  //Trastornos asociados al uso de sustancias psicoactivas no alcohólicas
  questionK1a: string;
  /*
  K1aEstimulantes: string[];
  K1aCocaina: string[];
  K1aNarcoticos: string[];
  K1aAlucinoginos: string[];
  K1aInhalantes: string[];
  K1aMarihuana: string[];
  K1aTranquilizantes: string[];
  K1aOtrasSustancias: string[];

  questionK1b: string;

  questionK2a: string;
  questionK2b: string;
  questionK2c: string;
  questionK2d: string;
  questionK2e: string;
  questionK2f: string;
  questionK2g: string;

  questionK3a: string;
  questionK3b: string;
  questionK3c: string;
  questionK3d: string;
  */
  // En caso que de escoger Estimulantes
  questionK1a_Estimulantes: string[];
  questionK2a_Estimulantes?: string; // son opcionales, solo si se escoge Estimulantes
  questionK2b_Estimulantes?: string;
  questionK2c_Estimulantes?: string;
  questionK2d_Estimulantes?: string;
  questionK2e_Estimulantes?: string;
  questionK2f_Estimulantes?: string;
  questionK3a_Estimulantes?: string;
  questionK3b_Estimulantes?: string;
  questionK3c_Estimulantes?: string;
  questionK3d_Estimulantes?: string; 

  // En caso que de escoger Cocaina
  questionK1a_Cocaina: string[];
  questionK2a_Cocaina?: string; // son opcionales, solo si se escoge Cocaina
  questionK2b_Cocaina?: string;
  questionK2c_Cocaina?: string;
  questionK2d_Cocaina?: string;
  questionK2e_Cocaina?: string;
  questionK2f_Cocaina?: string;
  questionK3a_Cocaina?: string;
  questionK3b_Cocaina?: string;
  questionK3c_Cocaina?: string;
  questionK3d_Cocaina?: string;

  // En caso que de escoger Narcoticos
  questionK1a_Narcoticos: string[];
  questionK2a_Narcoticos?: string; // son opcionales, solo si se escoge Narcoticos
  questionK2b_Narcoticos?: string;
  questionK2c_Narcoticos?: string;
  questionK2d_Narcoticos?: string;
  questionK2e_Narcoticos?: string;
  questionK2f_Narcoticos?: string;
  questionK3a_Narcoticos?: string;
  questionK3b_Narcoticos?: string;
  questionK3c_Narcoticos?: string;
  questionK3d_Narcoticos?: string;

  // En caso que de escoger Alucinoginos
  questionK1a_Alucinoginos: string[];
  questionK2a_Alucinoginos?: string; // son opcionales, solo si se escoge Alucinoginos
  questionK2b_Alucinoginos?: string;
  questionK2c_Alucinoginos?: string;
  questionK2d_Alucinoginos?: string;
  questionK2e_Alucinoginos?: string;
  questionK2f_Alucinoginos?: string;
  questionK3a_Alucinoginos?: string;
  questionK3b_Alucinoginos?: string;
  questionK3c_Alucinoginos?: string;
  questionK3d_Alucinoginos?: string;

  // En caso que de escoger Inhalantes
  questionK1a_Inhalantes: string[];
  questionK2a_Inhalantes?: string; // son opcionales, solo si se escoge Inhalantes
  questionK2b_Inhalantes?: string;
  questionK2c_Inhalantes?: string;
  questionK2d_Inhalantes?: string;
  questionK2e_Inhalantes?: string;
  questionK2f_Inhalantes?: string;
  questionK3a_Inhalantes?: string;
  questionK3b_Inhalantes?: string;
  questionK3c_Inhalantes?: string;
  questionK3d_Inhalantes?: string;
  
  // En caso que de escoger Marihuana
  questionK1a_Marihuana: string[];
  questionK2a_Marihuana?: string; // son opcionales, solo si se escoge Marihuana
  questionK2b_Marihuana?: string;
  questionK2c_Marihuana?: string;
  questionK2d_Marihuana?: string;
  questionK2e_Marihuana?: string;
  questionK2f_Marihuana?: string;
  questionK3a_Marihuana?: string;
  questionK3b_Marihuana?: string;
  questionK3c_Marihuana?: string;
  questionK3d_Marihuana?: string;

  // En caso que de escoger Tranquilizantes
  questionK1a_Tranquilizantes: string[];
  questionK2a_Tranquilizantes?: string; // son opcionales, solo si se escoge Tranquilizantes
  questionK2b_Tranquilizantes?: string;
  questionK2c_Tranquilizantes?: string;
  questionK2d_Tranquilizantes?: string;
  questionK2e_Tranquilizantes?: string;
  questionK2f_Tranquilizantes?: string;
  questionK3a_Tranquilizantes?: string;
  questionK3b_Tranquilizantes?: string;
  questionK3c_Tranquilizantes?: string;
  questionK3d_Tranquilizantes?: string;
  
  // En caso que de escoger Otras Sustancias
  questionK1a_OtrasSustancias: string[];
  questionK2a_OtrasSustancias?: string; // son opcionales, solo si se escoge Otras Sustancias
  questionK2b_OtrasSustancias?: string;
  questionK2c_OtrasSustancias?: string;
  questionK2d_OtrasSustancias?: string;
  questionK2e_OtrasSustancias?: string;
  questionK2f_OtrasSustancias?: string;
  questionK3a_OtrasSustancias?: string;
  questionK3b_OtrasSustancias?: string;
  questionK3c_OtrasSustancias?: string;
  questionK3d_OtrasSustancias?: string;

  //Trastornos psicoticos
  questionL1a: string;
  questionL1b: string;

  questionL2a: string;
  questionL2b: string;

  questionL3a: string;
  questionL3b: string;

  questionL4a: string;
  questionL4b: string;

  questionL5a: string;
  questionL5b: string;

  questionL6a: string;
  questionL6b: string;

  questionL7a: string;
  questionL7b: string;

  //Bajo el punto de vista del entrevistador
  //Solo preguntar si hay un etrevistador, sino, saltar a las evaluaciones

  questionL8b?: string;
  questionL9b?: string;
  questionL10b?: string;
  questionL11b?: string;
  questionL12b?: string;

  //Anorexia nerviosa
  questionM1a: string; //e.g. 132cm.
  questionM1b: string; //e.g. 76kg.
  questionM1c: string;

  questionM2: string;
  questionM3: string;

  questionM4a: string;
  questionM4b: string;
  questionM4c: string;

  questionM5: string;
  questionM6: string; //solo para mujeres

  //Bulimia nerviosa
  questionN1: string;
  questionN2: string;
  questionN3: string;
  questionN4: string;
  questionN5: string;
  questionN6: string;
  questionN7: string;
  questionN8: string;

  //Trastorno de ansiedad generalizada
  questionO1a: string;
  questionO1b: string;
  questionO2: string;
  questionO3a: string;
  questionO3b: string;
  questionO3c: string;
  questionO3d: string;
  questionO3e: string;
  questionO3f: string;

  //Trastorno antisocial de la personalidad (opcional)
  questionP1a: string;
  questionP1b: string;
  questionP1c: string;
  questionP1d: string;
  questionP1e: string;
  questionP1f: string;

  questionP2a: string;
  questionP2b: string;
  questionP2c: string;
  questionP2d: string;
  questionP2e: string;
  questionP2f: string;

  diagnosticA1: string;
  diagnosticA2: string;
  diagnosticA3: string; //opcional

  diagnosticB1: string;

  diagnosticC1: string;
  riesgoC1: string;

  diagnosticD1: string;
  periodoD1: string;
  diagnosticD2: string; //solo si no dio positivo para D1
  periodoD2: string;

  diagnosticE1: string;
  periodoE1: string;
  diagnosticE2: string;
  periodoE2: string;

  diagnosticF1: string;
  diagnosticF2: string;
  diagnosticF3: string;

  diagnosticG1: string;

  diagnosticH1: string;

  diagnosticI1: string;

  diagnosticJ1: string;
  diagnosticJ2: string;

  diagnosticK1: string;
  diagnosticK2: string;

  diagnosticL1: string;
  diagnosticL2: string;
  diagnosticL3: string;

  diagnosticM1: string;

  diagnosticN1: string;
  diagnosticN2: string;

  diagnosticO1: string;

  diagnosticP1: string;
}
