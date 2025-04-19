import { AnswerState, Diagnosis, ValidationResult } from "./types";
import { Timestamp } from "firebase/firestore";
import { Record } from "@shared/interfaces";

/**
 * Convierte de forma segura un valor que puede ser string o array de strings a minúsculas
 * @param value - El valor a convertir (string, string[] o undefined)
 * @returns La versión en minúsculas del valor
 */
export function safeToLowerCase(value: string | string[] | undefined): string {
  if (!value) return ""; // Manejar valores undefined

  if (Array.isArray(value)) {
    // Si es un array, consideramos el primer valor o devolvemos vacío
    return value.length > 0 ? value[0].toLowerCase() : "";
  }

  // Si es un string, lo devolvemos en minúsculas
  return value.toLowerCase();
}

/**
 * Verifica si una respuesta contiene un valor específico
 * @param answer - La respuesta a verificar (string o string[])
 * @param value - El valor a buscar
 * @returns true si la respuesta contiene el valor (insensible a mayúsculas/minúsculas)
 */
export function answerContains(
  answer: string | string[] | undefined,
  value: string,
): boolean {
  if (!answer) return false;

  // Convertir el valor buscado a minúsculas para comparación insensible a mayúsculas
  const lowerValue = value.toLowerCase();

  if (Array.isArray(answer)) {
    // Para arrays, verificamos si algún elemento coincide
    return answer.some((item) => item.toLowerCase() === lowerValue);
  }

  // Para strings, comparamos directamente
  return answer.toLowerCase() === lowerValue;
}

/**
 * Verifica si una respuesta en el objeto de respuestas es igual a un valor específico
 * @param answers - Objeto de respuestas
 * @param questionId - ID de la pregunta
 * @param value - Valor a comparar
 * @returns true si la respuesta coincide con el valor
 */
export function isAnswerEqual(
  answers: AnswerState,
  questionId: string,
  value: string,
): boolean {
  return answerContains(answers[questionId], value);
}

export function calculateSuicideRiskScore(answers: AnswerState): number {
  const riskQuestions = [
    { id: "questionC1", points: 1 },
    { id: "questionC2", points: 2 },
    { id: "questionC3", points: 6 },
    { id: "questionC4", points: 10 },
    { id: "questionC5", points: 10 },
    { id: "questionC6", points: 4 },
  ];

  return riskQuestions.reduce(
    (sum, q) => sum + (answers[q.id] === "si" ? q.points : 0),
    0,
  );
}

export function RiskLevelC1(answers: AnswerState): string {
  //if (answers["questionB4"] !== "si") return "No diagnosis";

  // Calcula el puntaje total
  const score = calculateSuicideRiskScore(answers);
  // Determina el nivel de riesgo basado en el puntaje
  let nivel = "";
  if (score >= 10) nivel = "Alto";
  else if (score >= 6) nivel = "Moderado";
  else if (score >= 1) nivel = "Leve";

  return nivel; // Devuelve false si el puntaje es 0
}

/**
 * Construye un objeto de tipo Record a partir de las respuestas y diagnósticos
 * @param answers - Objeto con las respuestas del cuestionario
 * @param myDiagnoses - Array de diagnósticos
 * @return Un objeto de tipo Record con los datos estructurados
 * */
export function construirRecord(
  answers: AnswerState,
  myDiagnoses: Diagnosis[],
  startTimeInterview: Date,
): Record {
  const birthdateAnswer = answers["birthdate"] as string;
  let birthdate: Date | null = null;

  if (birthdateAnswer && birthdateAnswer !== "") {
    const [day, month, year] = birthdateAnswer.split("/").map(Number);
    birthdate = new Date(year, month - 1, day);
  } else {
    // 01/01/1900
    birthdate = new Date(1900, 0, 1);
  }

  //console.log("birthdate", birthdate);

  const diagnosticosRelevantes = [
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
    "diagnosticK2",
    "diagnosticK3",
    "diagnosticL1",
    "diagnosticL2",
    "diagnosticL3",
    "diagnosticM1",
    "diagnosticN1",
    "diagnosticN2",
    "diagnosticO1",
    "diagnosticP1",
  ];

  const diagnosticosEvaluados: Record<string, any> = {};

  diagnosticosRelevantes.forEach((id) => {
    const diagnosis = myDiagnoses.find((d: Diagnosis) => d.id === id);
    if (diagnosis) {
      const depende = diagnosis.dependsOn(answers);
      const resultado = diagnosis.result
        ? diagnosis.result(answers)
        : depende
          ? "si"
          : "no";
      diagnosticosEvaluados[id] =
        typeof resultado === "string" ? resultado : depende ? "si" : "no";

      const periodoId = `periodo${id.slice(-2)}`;
      if (
        (id.startsWith("diagnosticD") || id.startsWith("diagnosticE")) &&
        diagnosis.result
      ) {
        diagnosticosEvaluados[periodoId] = diagnosis.result(answers);
      }
    } else {
      //console.warn("No se encontró el diagnóstico:", id);
      diagnosticosEvaluados[id] = "no"; // o cualquier otro valor que consideres apropiado
    }
  });

  /**
 * Genera un UUID v4 compatible con todos los entornos,
 * incluso si "crypto.getRandomValues" o "crypto.randomUUID" no están disponibles.
 */
  function generateUUID(): string {
    // Para crear una UUID v4, necesitamos 16 bytes, vamos a concatenar el valor de name_interviewDate_4_interviewer
    const name = answers["name"] || "unknown";
    const interviewDate = Timestamp.now().toDate().toISOString();
    const interviewer = answers["nameInterviewer"] || "unknown";
    return `${name}_${interviewDate}_4_${interviewer}`;
  }

  const recordId = generateUUID(); // Genera un nuevo UUID para el registro

  const hoursInterviewStart = String(startTimeInterview.getHours()).padStart(
    2,
    "0",
  );
  const minutesInterviewStart = String(
    startTimeInterview.getMinutes(),
  ).padStart(2, "0");
  const startTimeInterviewString = `${hoursInterviewStart}:${minutesInterviewStart}`;

  const endTimeInterview = new Date();
  const hoursInterviewEnd = String(endTimeInterview.getHours()).padStart(
    2,
    "0",
  );
  const minutesInterviewEnd = String(endTimeInterview.getMinutes()).padStart(
    2,
    "0",
  );
  const endTimeInterviewString = `${hoursInterviewEnd}:${minutesInterviewEnd}`;
  const durationInterview = `${Math.floor(
    (endTimeInterview.getTime() - startTimeInterview.getTime()) / 3600000,
  )} horas`;

  return {
    id: recordId,
    name: answers["name"] || "",
    gender: answers["gender"],
    birthdate: birthdate ? Timestamp.fromDate(birthdate) : Timestamp.now(),
    interviewDate: Timestamp.now(),
    startTimeInterview: startTimeInterviewString,
    endTimeInterview: endTimeInterviewString,
    durationInterview: durationInterview,
    nameInterviewer: answers["nameInterviewer"] || null,
    sexualPreference: answers["sexualPreference"] || null,
    stateOrigin: answers["stateOrigin"] || null,
    stateResidence: answers["stateResidence"] || null,
    questionA1: answers["questionA1"] || "", //questionA1: Si o No
    questionA2: answers["questionA2"] || "",

    questionA3a: answers["questionA3a"] || "",
    questionA3b: answers["questionA3b"] || "",
    questionA3c: answers["questionA3c"] || "",
    questionA3d: answers["questionA3d"] || "",
    questionA3e: answers["questionA3e"] || "",
    questionA3f: answers["questionA3f"] || "",
    questionA3g: answers["questionA3g"] || "",

    questionA4a: answers["questionA4a"] || "",
    questionA4b: answers["questionA4b"] || "",

    questionA5a: answers["questionA5a"] || "",
    questionA5b: answers["questionA5b"] || "",

    questionA6a: answers["questionA6a"] || "",
    questionA6b: answers["questionA6b"] || "",
    questionA6c: answers["questionA6c"] || "",
    questionA6d: answers["questionA6d"] || "",
    questionA6e: answers["questionA6e"] || "",
    questionA6f: answers["questionA6f"] || "",

    //Trastorno distímico
    questionB1: answers["questionB1"] || "",
    questionB2: answers["questionB3"] || "",

    questionB3a: answers["questionB3a"] || "",
    questionB3b: answers["questionB3b"] || "",
    questionB3c: answers["questionB3c"] || "",
    questionB3d: answers["questionB3d"] || "",
    questionB3e: answers["questionB3e"] || "",
    questionB3f: answers["questionB3f"] || "",

    questionB4: answers["questionB4"] || "",

    //Riesgo de suicidio
    questionC1: answers["questionC1"] || "",
    questionC2: answers["questionC2"] || "",
    questionC3: answers["questionC3"] || "",
    questionC4: answers["questionC4"] || "",
    questionC5: answers["questionC5"] || "",
    questionC6: answers["questionC6"] || "",

    //Episodio (hipo)maníaco
    questionD1a: answers["questionD1a"] || "",
    questionD1b: answers["questionD1b"] || "",

    questionD2a: answers["questionD2a"] || "",
    questionD2b: answers["questionD2b"] || "",

    questionD3a: answers["questionD3a"] || "",
    questionD3b: answers["questionD3b"] || "",
    questionD3c: answers["questionD3c"] || "",
    questionD3d: answers["questionD3e"] || "",
    questionD3e: answers["questionD3e"] || "",
    questionD3f: answers["questionD3f"] || "",
    questionD3g: answers["questionD3g"] || "",

    questionD4: answers["questionD4"] || "",

    //Trastorno de angustia
    questionE1a: answers["questionE1a"] || "",
    questionE1b: answers["questionE1b"] || "",

    questionE2: answers["questionE2"] || "",
    questionE3: answers["questionE3"] || "",

    questionE4a: answers["questionE4a"] || "",
    questionE4b: answers["questionE4b"] || "",
    questionE4c: answers["questionE4c"] || "",
    questionE4d: answers["questionE4d"] || "",
    questionE4e: answers["questionE4e"] || "",
    questionE4f: answers["questionE4f"] || "",
    questionE4g: answers["questionE4g"] || "",
    questionE4h: answers["questionE4h"] || "",
    questionE4i: answers["questionE4i"] || "",
    questionE4j: answers["questionE4j"] || "",
    questionE4k: answers["questionE4k"] || "",
    questionE4l: answers["questionE4l"] || "",
    questionE4m: answers["questionE4m"] || "",

    questionE5: answers["questionE5"] || "",
    questionE6: answers["questionE6"] || "",
    questionE7: answers["questionE7"] || "",

    //Agorafobia
    questionF1: answers["questionF1"] || "",
    questionF2: answers["questionF2"] || "",

    //Fobia social
    questionG1: answers["questionG1"] || "",
    questionG2: answers["questionG2"] || "",
    questionG3: answers["questionG3"] || "",
    questionG4: answers["questionG4"] || "",

    //Trastorno obsesivo-compulsivo
    questionH1: answers["questionH1"] || "",
    questionH2: answers["questionH2"] || "",
    questionH3: answers["questionH3"] || "",
    questionH4: answers["questionH4"] || "",
    questionH5: answers["questionH5"] || "",
    questionH6: answers["questionH6"] || "",

    //Estado por estrés postraumático (opcional)
    questionI1: answers["questionI1"] || "",
    questionI2: answers["questionI2"] || "",

    questionI3a: answers["questionI3a"] || "",
    questionI3b: answers["questionI3b"] || "",
    questionI3c: answers["questionI3c"] || "",
    questionI3d: answers["questionI3d"] || "",
    questionI3e: answers["questionI3e"] || "",
    questionI3f: answers["questionI3f"] || "",

    questionI4a: answers["questionI4a"] || "",
    questionI4b: answers["questionI4b"] || "",
    questionI4c: answers["questionI4c"] || "",
    questionI4d: answers["questionI4d"] || "",
    questionI4e: answers["questionI4e"] || "",

    questionI5: answers["questionI5"] || "",

    //Abuso y dependencia de alcohol
    questionJ1: answers["questionJ1"] || "",

    questionJ2a: answers["questionJ2a"] || "",
    questionJ2b: answers["questionJ2b"] || "",
    questionJ2c: answers["questionJ2c"] || "",
    questionJ2d: answers["questionJ2d"] || "",
    questionJ2e: answers["questionJ2e"] || "",
    questionJ2f: answers["questionJ2f"] || "",
    questionJ2g: answers["questionJ2g"] || "",

    questionJ3a: answers["questionJ3a"] || "",
    questionJ3b: answers["questionJ3b"] || "",
    questionJ3c: answers["questionJ3c"] || "",
    questionJ3d: answers["questionJ3d"] || "",

    //Trastornos asociados al uso de sustancias psicoactivas no alcohólicas
    questionK1a: answers["questionK1a"] || "",
    // En caso que de escoger Estimulantes
    questionK_Estimulantes_list: answers["questionK_Estimulantes_list"] || [""],
    questionK_Estimulantes_K2a: answers["questionK_Estimulantes_K2a"] || "", // son opcionales, solo si se escoge Estimulantes
    questionK_Estimulantes_K2b: answers["questionK_Estimulantes_K2b"] || "",
    questionK_Estimulantes_K2c: answers["questionK_Estimulantes_K2c"] || "",
    questionK_Estimulantes_K2d: answers["questionK_Estimulantes_K2d"] || "",
    questionK_Estimulantes_K2e: answers["questionK_Estimulantes_K2e"] || "",
    questionK_Estimulantes_K2f: answers["questionK_Estimulantes_K2f"] || "",
    questionK_Estimulantes_K3a: answers["questionK_Estimulantes_K3a"] || "",
    questionK_Estimulantes_K3b: answers["questionK_Estimulantes_K3b"] || "",
    questionK_Estimulantes_K3c: answers["questionK_Estimulantes_K3c"] || "",
    questionK_Estimulantes_K3d: answers["questionK_Estimulantes_K3d"] || "",

    // En caso que de escoger Cocaina
    questionK_Cocaina_list: answers["questionK_Cocaina_list"] || [""],
    questionK_Cocaina_K2a: answers["questionK_Cocaina_K2a"] || "", // son opcionales, solo si se escoge Cocaina
    questionK_Cocaina_K2b: answers["questionK_Cocaina_K2b"] || "",
    questionK_Cocaina_K2c: answers["questionK_Cocaina_K2c"] || "",
    questionK_Cocaina_K2d: answers["questionK_Cocaina_K2d"] || "",
    questionK_Cocaina_K2e: answers["questionK_Cocaina_K2e"] || "",
    questionK_Cocaina_K2f: answers["questionK_Cocaina_K2f"] || "",
    questionK_Cocaina_K3a: answers["questionK_Cocaina_K3a"] || "",
    questionK_Cocaina_K3b: answers["questionK_Cocaina_K3b"] || "",
    questionK_Cocaina_K3c: answers["questionK_Cocaina_K3c"] || "",
    questionK_Cocaina_K3d: answers["questionK_Cocaina_K3d"] || "",

    // En caso que de escoger Narcoticos
    questionK_Narcoticos_list: answers["questionK_Narcoticos_list"] || [""],
    questionK_Narcoticos_K2a: answers["questionK_Narcoticos_K2a"] || "", // son opcionales, solo si se escoge Narcoticos
    questionK_Narcoticos_K2b: answers["questionK_Narcoticos_K2b"] || "",
    questionK_Narcoticos_K2c: answers["questionK_Narcoticos_K2c"] || "",
    questionK_Narcoticos_K2d: answers["questionK_Narcoticos_K2d"] || "",
    questionK_Narcoticos_K2e: answers["questionK_Narcoticos_K2e"] || "",
    questionK_Narcoticos_K2f: answers["questionK_Narcoticos_K2f"] || "",
    questionK_Narcoticos_K3a: answers["questionK_Narcoticos_K3a"] || "",
    questionK_Narcoticos_K3b: answers["questionK_Narcoticos_K3b"] || "",
    questionK_Narcoticos_K3c: answers["questionK_Narcoticos_K3c"] || "",
    questionK_Narcoticos_K3d: answers["questionK_Narcoticos_K3d"] || "",

    // En caso que de escoger Alucinoginos
    questionK_Alucinoginos_list: answers["questionK_Alucinoginos_list"] || [""],
    questionK_Alucinoginos_K2a: answers["questionK_Alucinoginos_K2a"] || "", // son opcionales, solo si se escoge Alucinoginos
    questionK_Alucinoginos_K2b: answers["questionK_Alucinoginos_K2b"] || "",
    questionK_Alucinoginos_K2c: answers["questionK_Alucinoginos_K2c"] || "",
    questionK_Alucinoginos_K2d: answers["questionK_Alucinoginos_K2d"] || "",
    questionK_Alucinoginos_K2e: answers["questionK_Alucinoginos_K2e"] || "",
    questionK_Alucinoginos_K2f: answers["questionK_Alucinoginos_K2f"] || "",
    questionK_Alucinoginos_K3a: answers["questionK_Alucinoginos_K3a"] || "",
    questionK_Alucinoginos_K3b: answers["questionK_Alucinoginos_K3b"] || "",
    questionK_Alucinoginos_K3c: answers["questionK_Alucinoginos_K3c"] || "",
    questionK_Alucinoginos_K3d: answers["questionK_Alucinoginos_K3d"] || "",

    // En caso que de escoger Inhalantes
    questionK_Inhalantes_list: answers["questionK_Inhalantes_list"] || [""],
    questionK_Inhalantes_K2a: answers["questionK_Inhalantes_K2a"] || "", // son opcionales, solo si se escoge Inhalantes
    questionK_Inhalantes_K2b: answers["questionK_Inhalantes_K2b"] || "",
    questionK_Inhalantes_K2c: answers["questionK_Inhalantes_K2c"] || "",
    questionK_Inhalantes_K2d: answers["questionK_Inhalantes_K2d"] || "",
    questionK_Inhalantes_K2e: answers["questionK_Inhalantes_K2e"] || "",
    questionK_Inhalantes_K2f: answers["questionK_Inhalantes_K2f"] || "",
    questionK_Inhalantes_K3a: answers["questionK_Inhalantes_K3a"] || "",
    questionK_Inhalantes_K3b: answers["questionK_Inhalantes_K3b"] || "",
    questionK_Inhalantes_K3c: answers["questionK_Inhalantes_K3c"] || "",
    questionK_Inhalantes_K3d: answers["questionK_Inhalantes_K3d"] || "",

    // En caso que de escoger Marihuana
    questionK_Marihuana_list: answers["questionK_Marihuana_list"] || [""],
    questionK_Marihuana_K2a: answers["questionK_Marihuana_K2a"] || "", // son opcionales, solo si se escoge Marihuana
    questionK_Marihuana_K2b: answers["questionK_Marihuana_K2b"] || "",
    questionK_Marihuana_K2c: answers["questionK_Marihuana_K2c"] || "",
    questionK_Marihuana_K2d: answers["questionK_Marihuana_K2d"] || "",
    questionK_Marihuana_K2e: answers["questionK_Marihuana_K2e"] || "",
    questionK_Marihuana_K2f: answers["questionK_Marihuana_K2f"] || "",
    questionK_Marihuana_K3a: answers["questionK_Marihuana_K3a"] || "",
    questionK_Marihuana_K3b: answers["questionK_Marihuana_K3b"] || "",
    questionK_Marihuana_K3c: answers["questionK_Marihuana_K3c"] || "",
    questionK_Marihuana_K3d: answers["questionK_Marihuana_K3d"] || "",

    // En caso que de escoger Tranquilizantes
    questionK_Tranquilizantes_list: answers[
      "questionK_Tranquilizantes_list"
    ] || [""],
    questionK_Tranquilizantes_K2a:
      answers["questionK_Tranquilizantes_K2a"] || "", // son opcionales, solo si se escoge Tranquilizantes
    questionK_Tranquilizantes_K2b:
      answers["questionK_Tranquilizantes_K2b"] || "",
    questionK_Tranquilizantes_K2c:
      answers["questionK_Tranquilizantes_K2c"] || "",
    questionK_Tranquilizantes_K2d:
      answers["questionK_Tranquilizantes_K2d"] || "",
    questionK_Tranquilizantes_K2e:
      answers["questionK_Tranquilizantes_K2e"] || "",
    questionK_Tranquilizantes_K2f:
      answers["questionK_Tranquilizantes_K2f"] || "",
    questionK_Tranquilizantes_K3a:
      answers["questionK_Tranquilizantes_K3a"] || "",
    questionK_Tranquilizantes_K3b:
      answers["questionK_Tranquilizantes_K3b"] || "",
    questionK_Tranquilizantes_K3c:
      answers["questionK_Tranquilizantes_K3c"] || "",
    questionK_Tranquilizantes_K3d:
      answers["questionK_Tranquilizantes_K3d"] || "",

    // En caso que de escoger Otras Sustancias
    questionK_OtrasSustancias_list: answers[
      "questionK_OtrasSustancias_list"
    ] || [""],
    questionK_OtrasSustancias_K2a:
      answers["questionK_OtrasSustancias_K2a"] || "", // son opcionales, solo si se escoge Otras Sustancias
    questionK_OtrasSustancias_K2b:
      answers["questionK_OtrasSustancias_K2b"] || "",
    questionK_OtrasSustancias_K2c:
      answers["questionK_OtrasSustancias_K2c"] || "",
    questionK_OtrasSustancias_K2d:
      answers["questionK_OtrasSustancias_K2d"] || "",
    questionK_OtrasSustancias_K2e:
      answers["questionK_OtrasSustancias_K2e"] || "",
    questionK_OtrasSustancias_K2f:
      answers["questionK_OtrasSustancias_K2f"] || "",
    questionK_OtrasSustancias_K3a:
      answers["questionK_OtrasSustancias_K3a"] || "",
    questionK_OtrasSustancias_K3b:
      answers["questionK_OtrasSustancias_K3b"] || "",
    questionK_OtrasSustancias_K3c:
      answers["questionK_OtrasSustancias_K3c"] || "",
    questionK_OtrasSustancias_K3d:
      answers["questionK_OtrasSustancias_K3d"] || "",

    //Trastornos psicoticos
    questionL1a: answers["questionL1a"] || "",
    questionL1b: answers["questionL1b"] || "",

    questionL2a: answers["questionL2a"] || "",
    questionL2b: answers["questionL2b"] || "",

    questionL3a: answers["questionL3a"] || "",
    questionL3b: answers["questionL3b"] || "",

    questionL4a: answers["questionL4a"] || "",
    questionL4b: answers["questionL4b"] || "",

    questionL5a: answers["questionL5a"] || "",
    questionL5b: answers["questionL5b"] || "",

    questionL6a1: answers["questionL6a1"] || "",
    questionL6a2: answers["questionL6a2"] || "",
    questionL6b: answers["questionL6b"] || "",

    questionL7a: answers["questionL7a"] || "",
    questionL7b: answers["questionL7b"] || "",

    //Bajo el punto de vista del entrevistador
    //Solo preguntar si hay un etrevistador, sino, saltar a las evaluaciones

    questionL8b: answers["questionL8b"] || "",
    questionL9b: answers["questionL9b"] || "",
    questionL10b: answers["questionL10b"] || "",
    questionL11b: answers["questionL11b"] || "",
    questionL12b: answers["questionL12b"] || "",

    //Anorexia nerviosa
    questionM1a: answers["questionM1a"] || "", //e.g. 132cm.
    questionM1b: answers["questionM1b"] || "", //e.g. 76kg.
    questionM1c: answers["questionM1c"] || "",

    questionM2: answers["questionM2"] || "",
    questionM3: answers["questionM3"] || "",

    questionM4a: answers["questionM4a"] || "",
    questionM4b: answers["questionM4b"] || "",
    questionM4c: answers["questionM4c"] || "",

    questionM5: answers["questionM5"] || "",
    questionM6: answers["questionM6"] || "", //solo para mujeres

    //Bulimia nerviosa
    questionN1: answers["questionN1"] || "",
    questionN2: answers["questionN2"] || "",
    questionN3: answers["questionN3"] || "",
    questionN4: answers["questionN4"] || "",
    questionN5: answers["questionN5"] || "",
    questionN6: answers["questionN6"] || "",
    questionN7: answers["questionN7"] || "",
    questionN8: answers["questionN8"] || "",

    //Trastorno de ansiedad generalizada
    questionO1a: answers["questionO1a"] || "",
    questionO1b: answers["questionO1b"] || "",
    questionO2: answers["questionO2"] || "",
    questionO3a: answers["questionO3a"] || "",
    questionO3b: answers["questionO3b"] || "",
    questionO3c: answers["questionO3c"] || "",
    questionO3d: answers["questionO3d"] || "",
    questionO3e: answers["questionO3e"] || "",
    questionO3f: answers["questionO3f"] || "",

    //Trastorno antisocial de la personalidad (opcional)
    questionP1a: answers["questionP1a"] || "",
    questionP1b: answers["questionP1b"] || "",
    questionP1c: answers["questionP1c"] || "",
    questionP1d: answers["questionP1d"] || "",
    questionP1e: answers["questionP1e"] || "",
    questionP1f: answers["questionP1f"] || "",

    questionP2a: answers["questionP2a"] || "",
    questionP2b: answers["questionP2b"] || "",
    questionP2c: answers["questionP2c"] || "",
    questionP2d: answers["questionP2d"] || "",
    questionP2e: answers["questionP2e"] || "",
    questionP2f: answers["questionP2f"] || "",
    ...diagnosticosEvaluados,
  };
}
