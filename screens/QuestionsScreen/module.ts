import { questions } from "./questions";
import { myDiagnoses } from "./diagnosis"; // Asegúrate de importar los diagnósticos
import { AnswerState, Question, Section, Diagnosis } from "./types";
import { isAnswerEqual, safeToLowerCase } from "./utils";
import { FlagFunctions } from "./flags";

// Objeto para almacenar valores locales sin enviarlos a la base de datos
export let resultadoDiagnostico: Record<string, boolean> = {};

export const sections: Section[] = [
  //Datos del paciente
  {
    id: "sectionData",
    title: "Datos del paciente",
    questions: questions.filter((q: Question) => q.section === "sectionData"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionA",
    title: "Módulo A - Episodio depresivo mayor",
    questions: questions.filter((q: Question) => q.section === "sectionA"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionA3",
    title:
      "A3 - En las últimas 2 semanas, cuando se sentia deprimido o sin interes en las cosas:",
    questions: questions.filter((q: Question) => q.section === "sectionA3"),
    dependsOn: (answers: AnswerState) => {
      return answers["questionA1"] === "si" || answers["questionA2"] === "si"; // Muestra A3 si A1 o A2 son "sí"
    },
  },
  {
    id: "sectionA4a",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionA4a"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestionsA3 = questions.filter(
        (q: Question) => q.section === "sectionA3",
      );
      const relatedQuestionsA = questions.filter(
        (q: Question) => q.section === "sectionA",
      );

      const totalYesAnswers = [
        ...relatedQuestionsA3,
        ...relatedQuestionsA,
      ].filter((q: Question) => answers[q.id] === "si").length;

      return totalYesAnswers >= 5; // Retorna true o false
    },
  },
  {
    id: "sectionA4b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionA4b"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionA4a",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionA5b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionA5b"),
    dependsOn: (answers: AnswerState) => {
      // Buscar el diagnóstico "Episodio Depresivo Mayor Actual"
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis: Diagnosis) => diagnosis.id === "diagnosticA1",
      );

      // Verificar si se cumple la condición de A5a (es decir, A2 = "sí")
      const a5aCondition = safeToLowerCase(answers["questionA2"]) === "si";

      // Verificar si se cumple la condición de A4b (es decir, A4b = "sí")
      const a4bCondition = safeToLowerCase(answers["questionA4b"]) === "si";

      // A5b se muestra si todas las condiciones son verdaderas
      return (
        (majorDepressiveEpisode?.dependsOn(answers) ?? false) &&
        a5aCondition &&
        a4bCondition
      );
    },
  },
  {
    id: "sectionA6",
    title:
      "A6 - Durante las ultimas 2 semanas, cuando se sintio deprimido o sin interes en la mayoria de las cosas: ",
    questions: questions.filter((q: Question) => q.section === "sectionA6"),
    dependsOn: (answers: AnswerState) => {
      // Se muestra si A5a (¬øCODIFIC√ì S√ç EN A2?) o A5b fueron respondidas con "s√≠"
      const a5aCondition = safeToLowerCase(answers["questionA2"]) === "si"; // Esto es la condici√≥n interna de A5a
      const a5bCondition = safeToLowerCase(answers["questionA5b"]) === "si"; // Esto es la respuesta a A5b

      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis: Diagnosis) => diagnosis.id === "diagnosticA1",
      );

      const sectionA5bVisible =
        (majorDepressiveEpisode?.dependsOn(answers) ?? false) &&
        a5aCondition &&
        safeToLowerCase(answers["questionA4b"]) === "si";

      // A6 se muestra si alguna de las condiciones (A5a o A5b) es "s√≠"
      return (a5aCondition || a5bCondition) && sectionA5bVisible;
    },
  },
  {
    id: "sectionB", // ID del módulo B
    title: "Módulo B - Trastorno distímico",
    questions: questions.filter((q: Question) => q.section === "sectionB1"),
    dependsOn: (answers: AnswerState) => {
      // Buscar diagnóstico de episodio depresivo mayor
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis: Diagnosis) => diagnosis.id === "diagnosticA1",
      );
      // Buscar diagnóstico de episodio depresivo mayor recidivante
      const majorDepressiveEpisodeRecidivist = myDiagnoses.find(
        (diagnosis: Diagnosis) => diagnosis.id === "diagnosticA2",
      );
      // Buscar diagnóstico de episodio depresivo mayor con síntomas melancólicos actuales
      const majorDepressiveEpisodeWithMelancholic = myDiagnoses.find(
        (diagnosis: Diagnosis) => diagnosis.id === "diagnosticA3",
      );
      // Si cualquiera de los tres diagnósticos es positivo, no mostrar el módulo B
      return !(
        majorDepressiveEpisode?.dependsOn(answers) ||
        majorDepressiveEpisodeRecidivist?.dependsOn(answers) ||
        majorDepressiveEpisodeWithMelancholic?.dependsOn(answers)
      );
    },
    isDisabled: (answers: AnswerState) => {
      // Deshabilitar si el diagnóstico de episodio depresivo mayor es positivo
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis: Diagnosis) => diagnosis.id === "diagnosticA1",
      );

      // Si el diagnóstico de episodio depresivo mayor es positivo, deshabilitar el módulo B
      return majorDepressiveEpisode?.dependsOn(answers) ?? false;
    },
  },

  {
    id: "sectionB2", // ID del módulo B
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionB2"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionB1",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionB3", // ID del módulo B
    title:
      "B3 - Durante este periodo en el que se sintió deprimido la mayor parte del tiempo:",
    questions: questions.filter((q: Question) => q.section === "sectionB3"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionB2",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "no"); // Retorna true o false
    },
  },
  {
    id: "sectionB4", // ID del módulo B
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionB4"),
    dependsOn: (answers: AnswerState) => {
      // Obtener las preguntas de la sección B3
      const relatedQuestionsB3 = questions.filter(
        (q: Question) => q.section === "sectionB3",
      );

      // Contar cuántas respuestas "sí" hay en la sección B3
      const totalYesAnswersB3 = relatedQuestionsB3.filter(
        (q: Question) => answers[q.id] === "si",
      ).length;

      // Retornar true si hay 2 o más respuestas "sí" en B3
      return totalYesAnswersB3 >= 2;
    },
  },
  {
    id: "sectionC",
    title: "Módulo C - Riesgo de Suicidio\nDurante este último mes:",
    questions: questions.filter((q: Question) => q.section === "sectionC"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },

  {
    id: "sectionD",
    title: "Módulo D - Episodio (hipo)maníaco",
    questions: questions.filter((q: Question) => q.section === "sectionD12"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionD3",
    title:
      "D3 - Durante el tiempo en el que se sentía exaltado, lleno de energía, o irritable notó que:",
    questions: questions.filter((q: Question) => q.section === "sectionD3"),
    dependsOn: (answers: Record<string, string>) => {
      const currentEpisode =
        answers["questionD1a"] === "si" || answers["questionD2a"] === "si";
      const pastEpisode =
        answers["questionD1b"] === "si" || answers["questionD2b"] === "no";
      const pastFlag = FlagFunctions.isFlagActive("PastAnswers", answers);

      // Mostrar si hay episodio actual, o si hay episodio pasado y se activó la bandera
      return currentEpisode || (pastEpisode && pastFlag);
    },
  },
  {
    id: "sectionD4",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionD4"),
    dependsOn: (answers: AnswerState) => {
      const d3Symptoms = [
        "questionD3a",
        "questionD3b",
        "questionD3c",
        "questionD3d",
        "questionD3e",
        "questionD3f",
        "questionD3g",
      ];

      const positiveSymptoms = d3Symptoms.filter(
        (q) => answers[q] === "si",
      ).length;
      //VOLVER A VERIFICAR
      const condition1 = positiveSymptoms >= 3;
      const condition2 =
        answers["questionD1a"] === "no" && positiveSymptoms >= 4;
      const condition3 = answers["questionD1b"] === "no";
      const d3Completed = d3Symptoms.every((q) => answers[q] !== undefined);

      return d3Completed && (condition1 || condition2 || condition3);
    },
  },
  {
    id: "sectionE1a",
    title: "Módulo E - Trastorno de Angustia",
    questions: questions.filter((q: Question) => q.section === "sectionE1a"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionE1b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionE1b"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionE1a",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionE23",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionE23"),
    dependsOn: (answers: AnswerState) => {
      return answers["questionE1a"] === "si" && answers["questionE1b"] === "si";
    },
  },
  {
    id: "sectionE4",
    title: "Durante la peor crísis que usted puede recordar:",
    questions: questions.filter((q: Question) => q.section === "sectionE4"),
    dependsOn: (answers: AnswerState) => {
      return answers["questionE1a"] === "si" && answers["questionE1b"] === "si";
    },
  },
  {
    id: "sectionE7",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionE7"),
    dependsOn: (answers: AnswerState) => {
      // Solo mostrar si el diagnosticE6 es falso y ya mostro las questionE4
      const preguntasE4 = questions
        .filter((q: Question) => q.section === "sectionE4")
        .filter((q: Question) => answers[q.id] === "no");
      const totalE4 = preguntasE4.length; // Total de preguntas E4 respondidas como "no"
      const resultadosE6 = myDiagnoses
        .filter((d: Diagnosis) => d.id === "diagnosticE2")
        .some((d: Diagnosis) => d.dependsOn(answers) === false);
      return resultadosE6 && totalE4 >= 1;
    },
  },
  {
    id: "sectionF",
    title: "Módulo F - Agorafobia",
    questions: questions.filter((q: Question) => q.section === "sectionF1"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionF2",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionF2"),
    dependsOn: (answers: Record<string, any>): boolean => {
      const respuestaF1 = answers["questionF1"];
      console.log("[F2 dependsOn] F1 actual:", respuestaF1); // Debug F1

      // Si F1 no ha sido respondido, no mostrar F2
      if (respuestaF1 === undefined) {
        console.log("[F2 dependsOn] F1 no respondido - ocultando F2");
        return false;
      }

      // Si F1 es "no", ocultar F2
      if (respuestaF1 === "no") {
        console.log('[F2 dependsOn] F1 es "no" - ocultando F2');
        return false;
      }

      // Si F1 es "sí", mostrar F2
      console.log('[F2 dependsOn] F1 es "sí" - mostrando F2');
      return true;
    },
    beforeShow: (answers: Record<string, any>) => {
      console.log("[F2 beforeShow] Valores actuales:", {
        F1: answers["questionF1"],
        F2: answers["questionF2"],
      }); // Debug completo

      if (answers["questionF1"] === "no" && answers["questionF2"] !== "no") {
        console.log(
          '[F2 beforeShow] Auto-respondiendo "no" en F2 porque F1 es "no"',
        );
        answers["questionF2"] = "no";

        // Si usas React, descomenta esto:
        // console.log('[F2 beforeShow] Actualizando estado...');
        // setAnswers({...answers});

        console.log("[F2 beforeShow] Valores después de actualizar:", {
          F1: answers["questionF1"],
          F2: answers["questionF2"],
        });
      } else {
        console.log("[F2 beforeShow] No se requiere auto-respuesta", {
          razón:
            answers["questionF1"] !== "no" ? 'F1 no es "no"' : 'F2 ya es "no"',
        });
      }
    },
  },
  {
    id: "sectionG ",
    title: "Módulo G - Fobia social (trastorno de ansiedad social)",
    questions: questions.filter((q: Question) => q.section === "sectionG1"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionG2",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionG2"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionG1",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionG3",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionG3"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionG2",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionG4",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionG4"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionG3",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionH ",
    title: "Módulo H - Trastorno obsesivo-compulsivo",
    questions: questions.filter((q: Question) => q.section === "sectionH1"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionH2",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionH2"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionH1",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionH3",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionH3"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionH2",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionH4",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionH4"),
    dependsOn: (answers: AnswerState) => {
      // Caso 1: Verificar si H1 = "no"
      const h1Questions = questions.filter(
        (q: Question) => q.section === "sectionH1",
      );
      const h1IsNo = h1Questions.some((q: Question) => answers[q.id] === "no");

      // Caso 2: Verificar si H1 = "si" y H2 = "no"
      const h2Questions = questions.filter(
        (q: Question) => q.section === "sectionH2",
      );
      const h1IsSiAndH2IsNo =
        h1Questions.some((q: Question) => answers[q.id] === "si") &&
        h2Questions.some((q: Question) => answers[q.id] === "no");

      // Mostrar H4 si H1 = "no" O (H1 = "si" y H2 = "no")
      return h1IsNo || h1IsSiAndH2IsNo;
    },
  },
  {
    id: "sectionH5",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionH5"),
    dependsOn: (answers: AnswerState) => {
      // Verificar si H3 = "SÍ" o H4 = "SÍ"
      const h3Questions = questions.filter(
        (q: Question) => q.section === "sectionH3",
      );
      const h4Questions = questions.filter(
        (q: Question) => q.section === "sectionH4",
      );
      return (
        h3Questions.some((q: Question) => answers[q.id] === "si") ||
        h4Questions.some((q: Question) => answers[q.id] === "si")
      );
    },
  },
  {
    id: "sectionH6",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionH6"),
    dependsOn: (answers: AnswerState) => {
      // Verificar si H5 = "SÍ" (asumiendo que H5 es una sola pregunta)
      const h5Questions = questions.filter(
        (q: Question) => q.section === "sectionH5",
      );
      return h5Questions.some((q: Question) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionI ",
    title: "Módulo I - Estado por estrés postraumático (opcional)",
    questions: questions.filter((q: Question) => q.section === "sectionI1"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionI2",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionI2"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionI1",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionI3",
    title: "En el último mes:",
    questions: questions.filter((q: Question) => q.section === "sectionI3"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionI2",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionI4",
    title: "Durante el último mes:",
    questions: questions.filter((q: Question) => q.section === "sectionI4"),
    dependsOn: (answers: AnswerState): boolean => {
      const respuestasI3 = questions
        .filter((q: Question) => q.section === "sectionI3")
        .filter((q: Question) => answers[q.id] === "si");
      return respuestasI3.length >= 3; // 3+ "SÍ" en I3
    },
  },
  {
    id: "sectionI5",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionI5"),
    dependsOn: (answers: AnswerState): boolean => {
      // Verificar 2+ "SÍ" en I3
      const respuestasI3 = questions
        .filter((q: Question) => q.section === "sectionI3")
        .filter((q: Question) => answers[q.id] === "si");
      const tiene2oMasEnI3 = respuestasI3.length >= 2;

      // Verificar si I4 está completado (todas sus preguntas respondidas)
      const preguntasI4 = questions.filter(
        (q: Question) => q.section === "sectionI4",
      );
      const I4Completado = preguntasI4.every(
        (q: Question) => answers[q.id] !== undefined,
      );

      return tiene2oMasEnI3 && I4Completado; // Mostrar I5 solo si se cumplen ambas
    },
  },
  {
    id: "sectionJ ",
    title: "Módulo J - Abuso y dependencia de alcohol",
    questions: questions.filter((q: Question) => q.section === "sectionJ1"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionJ2",
    title: "En los últimos 12 meses:",
    questions: questions.filter((q: Question) => q.section === "sectionJ2"),
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionJ1",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionJ3",
    title: "En los últimos 12 meses:",
    questions: questions.filter((q: Question) => q.section === "sectionJ3"),
    dependsOn: (answers: AnswerState): boolean => {
      const preguntasJ2 = questions.filter(
        (q: Question) => q.section === "sectionJ2",
      );
      const J2Completo = preguntasJ2.every(
        (q: Question) => answers[q.id] !== undefined && answers[q.id] !== null,
      );
      const respuestasSiJ2 = J2Completo
        ? preguntasJ2.filter((q: Question) => answers[q.id] === "si").length
        : 0;
      return J2Completo && respuestasSiJ2 < 3;
    },
  },
  {
    id: "sectionK1",
    title:
      "Módulo K - Trastornos asociados al uso de sustancias psicoactivas no alcohólicas",
    questions: questions.filter((q: Question) => q.section === "sectionK1"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionK1_list",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionK1_list",
    ),
    dependsOn: (answers: AnswerState) => answers["questionK1a"] === "si", // Siempre visible
  },
  {
    id: "sectionK2",
    title: "Considerando su uso del tipo de droga, en los últimos 12 meses:",
    questions: questions.filter((q: Question) => q.section === "sectionK2"),
    dependsOn: (answers: any) => answers["questionK1a_list"],
  },
  //Modulo L
  {
    id: "sectionL1a",
    title: "Módulo L - Trastornos psicóticos",
    //Mostar las preguntas que esten en la seccion L12 y L11 intercaladas
    questions: questions.filter((q: Question) => q.section === "sectionL1a"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionL1b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL1b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL1a = questions
        .filter((q: Question) => q.section === "sectionL1a")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraños",
        );

      return preguntasL1a.length >= 1; // Retorna true o false
    },
  },
  {
    id: "sectionL2a",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL2a"),
    dependsOn: (answers: AnswerState) => {
      // Mostrar solo si L1a es "no", L1b es "si" o "no" y L6 es false
      const preguntasL1a = questions
        .filter((q: Question) => q.section === "sectionL1a")
        .filter((q: Question) => answers[q.id] === "no");
      const preguntasL1b = questions
        .filter((q: Question) => q.section === "sectionL1b")
        .filter(
          (q: Question) => answers[q.id] === "si" || answers[q.id] === "no",
        );
      const preguntasL6 = questions
        .filter((q: Question) => q.section === "sectionL6")
        .filter(
          (q: Question) => answers[q.id] === "si" || answers[q.id] === "no",
        );

      return (
        (preguntasL1a.length >= 1 || preguntasL1b.length >= 1) &&
        preguntasL6.length === 0
      ); // Retorna true o false
    },
  },
  {
    id: "sectionL2b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL2b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL2a = questions
        .filter((q: Question) => q.section === "sectionL2a")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraños",
        );

      return preguntasL2a.length >= 1; // Retorna true o false
    },
  },
  {
    id: "sectionL3a",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL3a"),
    dependsOn: (answers: AnswerState) => {
      // Mostrar solo si L1a es "no", L1b es "si" o "no" y L6 es false
      const preguntasL2a = questions
        .filter((q: Question) => q.section === "sectionL2a")
        .filter((q: Question) => answers[q.id] === "no");
      const preguntasL2b = questions
        .filter((q: Question) => q.section === "sectionL2b")
        .filter(
          (q: Question) => answers[q.id] === "si" || answers[q.id] === "no",
        );
      const preguntasL6 = questions
        .filter((q: Question) => q.section === "sectionL6")
        .filter(
          (q: Question) => answers[q.id] === "si" || answers[q.id] === "no",
        );

      return (
        (preguntasL2a.length >= 1 || preguntasL2b.length >= 1) &&
        preguntasL6.length === 0
      ); // Retorna true o false
    },
  },
  {
    id: "sectionL3b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL3b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL3a = questions
        .filter((q: Question) => q.section === "sectionL3a")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraños",
        );

      return preguntasL3a.length >= 1; // Retorna true o false
    },
  },
  {
    id: "sectionL4a",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL4a"),
    dependsOn: (answers: AnswerState) => {
      // Mostrar solo si L1a es "no", L1b es "si" o "no" y L6 es false
      const preguntasL3a = questions
        .filter((q: Question) => q.section === "sectionL3a")
        .filter((q: Question) => answers[q.id] === "no");
      const preguntasL3b = questions
        .filter((q: Question) => q.section === "sectionL3b")
        .filter(
          (q: Question) => answers[q.id] === "si" || answers[q.id] === "no",
        );
      const preguntasL6 = questions
        .filter((q: Question) => q.section === "sectionL6")
        .filter(
          (q: Question) => answers[q.id] === "si" || answers[q.id] === "no",
        );

      return (
        (preguntasL3a.length >= 1 || preguntasL3b.length >= 1) &&
        preguntasL6.length === 0
      ); // Retorna true o false
    },
  },
  {
    id: "sectionL4b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL4b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL4a = questions
        .filter((q: Question) => q.section === "sectionL4a")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraños",
        );

      return preguntasL4a.length >= 1; // Retorna true o false
    },
  },
  {
    id: "sectionL5a",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL5a"),
    dependsOn: (answers: AnswerState) => {
      // Mostrar solo si L1a es "no", L1b es "si" o "no" y L6 es false
      const preguntasL4a = questions
        .filter((q: Question) => q.section === "sectionL4a")
        .filter((q: Question) => answers[q.id] === "no");
      const preguntasL4b = questions
        .filter((q: Question) => q.section === "sectionL4b")
        .filter(
          (q: Question) => answers[q.id] === "si" || answers[q.id] === "no",
        );
      const preguntasL6 = questions
        .filter((q: Question) => q.section === "sectionL6")
        .filter(
          (q: Question) => answers[q.id] === "si" || answers[q.id] === "no",
        );

      return (
        (preguntasL4a.length >= 1 || preguntasL4b.length >= 1) &&
        preguntasL6.length === 0
      ); // Retorna true o false
    },
  },
  {
    id: "sectionL5b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL5b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL5a = questions
        .filter((q: Question) => q.section === "sectionL5a")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraños",
        );

      return preguntasL5a.length >= 1; // Retorna true o false
    },
  },
  // QuestioL6
  {
    id: "sectionL6",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL6a1"),
    dependsOn: (answers: AnswerState) => {
      // Obtener las respuestas de las questions L1b, L2b, L3b, L4b
      const preguntasL1b = questions
        .filter((q: Question) => q.section === "sectionL1b")
        .filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL2b = questions
        .filter((q: Question) => q.section === "sectionL2b")
        .filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL3b = questions
        .filter((q: Question) => q.section === "sectionL3b")
        .filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL4b = questions
        .filter((q: Question) => q.section === "sectionL4b")
        .filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL5a = questions
        .filter((q: Question) => q.section === "sectionL5a")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" ||
            answers[q.id] === "si extraños" ||
            answers[q.id] === "no",
        );
      const preguntasL5b = questions
        .filter((q: Question) => q.section === "sectionL5b")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" ||
            answers[q.id] === "si extraños" ||
            answers[q.id] === "no",
        );

      return (
        preguntasL1b.length >= 1 ||
        preguntasL2b.length >= 1 ||
        preguntasL3b.length >= 1 ||
        preguntasL4b.length >= 1 ||
        preguntasL5a.length >= 1 ||
        preguntasL5b.length >= 1
      ); // Retorna true o false
    },
  },
  {
    id: "sectionL6a2",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL6a2"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL6 = questions
        .filter((q: Question) => q.section === "sectionL6a1")
        .filter((q: Question) => answers[q.id] === "si");
      return preguntasL6.length >= 1; // Retorna true o false
    },
  },
  {
    id: "sectionL6b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL6b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL6 = questions
        .filter((q: Question) => q.section === "sectionL6a2")
        .filter((q: Question) => answers[q.id] === "si extraños");
      return preguntasL6.length >= 1; // Retorna true o false
    },
  },
  {
    id: "sectionL7",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL7a"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL6a = questions
        .filter((q: Question) => q.section === "sectionL6a1")
        .filter((q: Question) => answers[q.id] === "no");
      const preguntasL6b = questions
        .filter((q: Question) => q.section === "sectionL6b")
        .filter(
          (q: Question) => answers[q.id] === "no" || answers[q.id] === "si",
        );

      return preguntasL6a.length >= 1 || preguntasL6b.length >= 1; // Retorna true o false
    },
  },
  {
    id: "sectionL7b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL7b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL7 = questions
        .filter((q: Question) => q.section === "sectionL7a")
        .filter((q: Question) => answers[q.id] === "si");
      return preguntasL7.length >= 1; // Retorna true o false
    },
  },
  {
    id: "sectionL810",
    title: "",
    questions: questions.filter(
      (q: Question) =>
        q.section === "sectionL8b" ||
        q.section === "sectionL9b" ||
        q.section === "sectionL10b",
    ),
    dependsOn: (answers: AnswerState) => {
      const preguntasL6b = questions
        .filter((q: Question) => q.section === "sectionL6b")
        .filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL7 = questions
        .filter((q: Question) => q.section === "sectionL7a")
        .filter((q: Question) => answers[q.id] === "no");
      const preguntasL7b = questions
        .filter((q: Question) => q.section === "sectionL7b")
        .filter(
          (q: Question) => answers[q.id] === "no" || answers[q.id] === "si",
        );

      return (
        preguntasL6b.length >= 1 ||
        preguntasL7.length >= 1 ||
        preguntasL7b.length >= 1
      ); // Retorna true o false
    },
  },
  //Modulo M
  {
    id: "sectionM1",
    title: "Módulo M - Anorexia nerviosa",
    questions: questions.filter((q: Question) => q.section === "sectionM1"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionM2",
    title: "En los últimos 3 meses:",
    questions: questions.filter((q: Question) => q.section === "sectionM2"),
    //Solo mostrar si questionM1c es "si"
    dependsOn: (answers: AnswerState) => answers["questionM1c"] === "si",
  },
  {
    id: "sectionM3",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionM3"),
    dependsOn: (answers: AnswerState) => answers["questionM2"] === "si",
  },
  {
    id: "sectionM4",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionM4"),
    dependsOn: (answers: AnswerState) => answers["questionM3"] === "si",
  },
  {
    id: "sectionM6",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionM6"),
    // solo mostrar si hay mas de 1 "si" en el sectionM4 y gender sea "mujer"
    dependsOn: (answers: AnswerState) => {
      const preguntasM4 = questions.filter(
        (q: Question) => q.section === "sectionM4",
      );
      const respuestasSiM4 = preguntasM4.filter(
        (q: Question) => answers[q.id] === "si",
      ).length;
      const isFemale = questions
        .filter((q: Question) => q.section === "sectionData")
        .filter((q: Question) => answers[q.id] === "Mujer").length;
      return respuestasSiM4 >= 2 && isFemale >= 1;
    },
  },
  {
    id: "sectionN1",
    title: "Módulo N - Bulimia nerviosa",
    questions: questions.filter((q: Question) => q.section === "sectionN1"),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionN2",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionN2"),
    dependsOn: (answers: AnswerState) => answers["questionN1"] === "si",
  },
  {
    id: "sectionN3",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionN3"),
    dependsOn: (answers: AnswerState) => answers["questionN2"] === "si",
  },
  {
    id: "sectionN4",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionN4"),
    dependsOn: (answers: AnswerState) => answers["questionN3"] === "si",
  },
  {
    id: "sectionN5",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionN5"),
    dependsOn: (answers: AnswerState) => answers["questionN4"] === "si",
  },
  {
    id: "sectionN7",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionN7"),
    //Mostar solo si cumple con Anorexia nerviosa
    dependsOn: (answers: AnswerState) => {
      const diagnosisAnorexia = myDiagnoses
        .filter((d: Diagnosis) => d.id === "diagnosticM1")
        .some((d: Diagnosis) => d.dependsOn(answers));

      //Mostrar si hay un si en sectionN5 y el diagnostico de anorexia es positivo
      const preguntasN5 = questions
        .filter((q: Question) => q.section === "sectionN5")
        .filter((q: Question) => answers[q.id] === "si").length;
      return diagnosisAnorexia && preguntasN5 >= 1;
    },
  },
  {
    id: "sectionO1a",
    title: "Módulo O - Trastorno de ansiedad generalizada ",
    questions: questions.filter((q: Question) => q.section === "sectionO1a"),
    dependsOn: () => true,
  },
  {
    id: "sectionO1b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionO1b"),
    dependsOn: (answers: AnswerState) => answers["questionO1a"] === "si",
  },
  {
    id: "sectionO2",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionO2"),
    dependsOn: (answers: AnswerState) =>
      answers["questionO1a"] === "si" && answers["questionO1b"] === "si",
  },
  {
    id: "sectionO3",
    title:
      "En los últimos 6 meses: cuando estaba ansioso, casi todo el tiempo:",
    questions: questions.filter((q: Question) => q.section === "sectionO3"),
    dependsOn: (answers: AnswerState) => answers["questionO2"] === "si",
  },
  {
    id: "sectionP1",
    title:
      "Módulo P - Trastorno antisocialde la personalidad (opcional)\nConductas antes de los 15 años",
    questions: questions.filter((q: Question) => q.section === "sectionP1"),
    dependsOn: () => true,
  },
  {
    id: "sectionP2",
    title: "P2 - Conductas después de los 15 años",
    questions: questions.filter((q: Question) => q.section === "sectionP2"),
    dependsOn: (answers: AnswerState) => {
      // 1. Filtrar preguntas de P1 (antes de los 15 años)
      const preguntasP1 = questions.filter(
        (q: Question) => q.section === "sectionP1",
      );

      // 2. Contar respuestas "SÍ" en P1
      const respuestasSiP1 = preguntasP1.filter(
        (q: Question) => answers[q.id] === "si",
      ).length;

      // 3. Mostrar P2 solo si hay 2+ "SÍ" en P1
      return respuestasSiP1 >= 2;
    },
  },
]; // <- Esto cierra correctamente el array
