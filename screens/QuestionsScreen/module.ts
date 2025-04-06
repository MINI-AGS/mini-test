import { questions } from "./questions";
import { myDiagnoses } from "./diagnosis"; // Asegúrate de importar los diagnósticos
import { AnswerState, Question, Section, Diagnosis } from "./types";
import { isAnswerEqual, safeToLowerCase } from "./utils";

// Objeto para almacenar valores locales sin enviarlos a la base de datos
const localValues: { [key: string]: string } = {};

export const sections: Section[] = [
  {
    id: "sectionA",
    title: "Modulo A - Episodio depresivo mayor",
    questions: questions.filter((q) => q.section === "sectionA"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionA3",
    title: "Módulo A3 - Síntomas adicionales",
    questions: questions.filter((q) => q.section === "sectionA3"),
    dependsOn: (answers) => {
      const preguntasSectionA = questions.filter(
        (q) => q.section === "sectionA",
      );
      const sectionACompleta = preguntasSectionA.every(
        (q) => answers[q.id] !== undefined,
      );
      const algunaRespuestaSi = preguntasSectionA.some(
        (q) => answers[q.id] === "si",
      );
      return sectionACompleta && algunaRespuestaSi;
    },
  },
  /*
  {
    id: "sectionA4a",
    title: "Modulo A4a",
    questions: questions.filter((q) => q.section === "sectionA4a"),
    dependsOn: (answers) => {
      const relatedQuestionsA3 = questions.filter(
        (q) => q.section === "sectionA3",
      );
      const relatedQuestionsA = questions.filter(
        (q) => q.section === "sectionA",
      );

      const totalYesAnswers = [
        ...relatedQuestionsA3,
        ...relatedQuestionsA,
      ].filter((q) => answers[q.id] === "si").length;

      return totalYesAnswers >= 5; // Retorna true o false
    },
  },
  {
    id: "sectionA4b",
    title: "Modulo A4b ",
    questions: questions.filter((q) => q.section === "sectionA4b"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionA4a",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionA5b",
    title: "Modulo A5b",
    questions: questions.filter((q) => q.section === "sectionA5b"),
    dependsOn: (answers) => {
      // Buscar el diagnóstico "Episodio Depresivo Mayor Actual"
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA1",
      );

      // Verificar si se cumple la condición de A5a (es decir, A2 = "sí")
      const a5aCondition = answers["questionA2"]?.toLowerCase() === "si";

      // Verificar si se cumple la condición de A4b (es decir, A4b = "sí")
      const a4bCondition = answers["questionA4b"]?.toLowerCase() === "si";

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
      "Modulo A6 - Durante las ultimas 2 semanas, cuando se sintio deprimido o sin interes en la mayoria de las cosas: ",
    questions: questions.filter((q) => q.section === "sectionA6"),
    dependsOn: (answers) => {
      // Se muestra si A5a (¬øCODIFIC√ì S√ç EN A2?) o A5b fueron respondidas con "s√≠"
      const a5aCondition = answers["questionA2"]?.toLowerCase() === "si"; // Esto es la condici√≥n interna de A5a
      const a5bCondition = answers["questionA5b"]?.toLowerCase() === "si"; // Esto es la respuesta a A5b

      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA1",
      );

      const sectionA5bVisible =
        (majorDepressiveEpisode?.dependsOn(answers) ?? false) &&
        a5aCondition &&
        answers["questionA4b"]?.toLowerCase() === "si";

      // A6 se muestra si alguna de las condiciones (A5a o A5b) es "s√≠"
      return (a5aCondition || a5bCondition) && sectionA5bVisible;
    },
  },
  {
    id: "sectionB", // ID del módulo B
    title: "Modulo B - Trastorno distímico",
    questions: questions.filter((q) => q.section === "sectionB1"),
    dependsOn: (answers) => {
      // Buscar diagnóstico de episodio depresivo mayor
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA1",
      );
      // Buscar diagnóstico de episodio depresivo mayor recidivante
      const majorDepressiveEpisodeRecidivist = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA2",
      );
      // Buscar diagnóstico de episodio depresivo mayor con síntomas melancólicos actuales
      const majorDepressiveEpisodeWithMelancholic = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA3",
      );
      // Si cualquiera de los tres diagnósticos es positivo, no mostrar el módulo B
      return !(
        majorDepressiveEpisode?.dependsOn(answers) ||
        majorDepressiveEpisodeRecidivist?.dependsOn(answers) ||
        majorDepressiveEpisodeWithMelancholic?.dependsOn(answers)
      );
    },
    isDisabled: (answers) => {
      // Deshabilitar si el diagnóstico de episodio depresivo mayor es positivo
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA1",
      );

      // Si el diagnóstico de episodio depresivo mayor es positivo, deshabilitar el módulo B
      return majorDepressiveEpisode?.dependsOn(answers) ?? false;
    },
  },

  {
    id: "sectionB2", // ID del módulo B
    title: "Modulo B2 ",
    questions: questions.filter((q) => q.section === "sectionB2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionB1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionB3", // ID del módulo B
    title: "Modulo B3 ",
    questions: questions.filter((q) => q.section === "sectionB3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionB2",
      );
      return relatedQuestions.some((q) => answers[q.id] === "no"); // Retorna true o false
    },
  },
  {
    id: "sectionB4", // ID del módulo B
    title: "Modulo B4",
    questions: questions.filter((q) => q.section === "sectionB4"),
    dependsOn: (answers) => {
      // Obtener las preguntas de la sección B3
      const relatedQuestionsB3 = questions.filter(
        (q) => q.section === "sectionB3",
      );

      // Contar cuántas respuestas "sí" hay en la sección B3
      const totalYesAnswersB3 = relatedQuestionsB3.filter(
        (q) => answers[q.id] === "si",
      ).length;

      // Retornar true si hay 2 o más respuestas "sí" en B3
      return totalYesAnswersB3 >= 2;
    },
  },
  {
    id: "sectionC",
    title: "Modulo C - Preguntas Iniciales",
    questions: questions.filter((q) => q.section === "sectionC"),
    dependsOn: (answers) => true, // Siempre visible
  },

  {
    id: "sectionD",
    title: "Modulo D - Episodio (hipo)maníaco",
    questions: questions.filter((q) => q.section === "sectionD12"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionD3",
    title: "Módulo D3 - Síntomas de (hipo)manía",
    questions: questions.filter((q) => q.section === "sectionD3"),
    dependsOn: (answers) => {
      const isCurrentEpisode =
        isAnswerEqual(answers, "QuestionD1b", "si") ||
        isAnswerEqual(answers, "QuestionD2b", "si");
      const isPastEpisode =
        isAnswerEqual(answers, "QuestionD1a", "si") ||
        isAnswerEqual(answers, "QuestionD2a", "si");
      return isCurrentEpisode || (isPastEpisode && !isCurrentEpisode);
    },
  },

  {
    id: "sectionE1a",
    title: "Modulo E1a",
    questions: questions.filter((q) => q.section === "sectionE1a"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionE1b",
    title: "Modulo E1b",
    questions: questions.filter((q) => q.section === "sectionE1b"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionE1a",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionE23",
    title: "Modulo sectionE23",
    questions: questions.filter((q) => q.section === "sectionE23"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionE1b",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionE4",
    title: "Modulo sectionE4",
    questions: questions.filter((q) => q.section === "sectionE4"),
    dependsOn: (answers) => {
      // Verifica si sectionE23 ya fue respondida (no importa el valor).
      const sectionE23Questions = questions.filter(
        (q) => q.section === "sectionE23",
      );
      return sectionE23Questions.every((q) => answers[q.id] !== undefined); // Muestra E4 si E23 está completo.
    },
  },
  {
    id: "sectionE5",
    title: "Trastorno de angustia",
    questions: questions.filter((q) => q.section === "sectionE"),
    dependsOn: (answers: any) => {
      // 1. Buscar pregunta E3 y síntomas E4
      const E3 = questions.find((q) => q.id === "QuestionE3");
      const preguntasE4 = questions.filter((q) => q.section === "sectionE4");

      // 2. Evaluar
      const tieneE3 = E3 ? answers[E3.id] === "si" : false;
      const totalE4 = preguntasE4.filter((q) => answers[q.id] === "si").length;
      const resultado = tieneE3 && totalE4 >= 4;

      // 3. Solo este console.log para verificar actualización
      console.log(
        "[Actualización E5] E3:",
        tieneE3,
        "| Síntomas E4:",
        totalE4,
        "| Resultado:",
        resultado,
      );

      return resultado;
    },
  },
  {
    id: "sectionE6",
    title: "Modulo E6",
    questions: questions.filter((q) => q.section === "sectionE6"),
    dependsOn: (answers) => {
      return localValues["E5"] === "si"; // Se usa el valor local de E5
    },
  },
  {
    id: "sectionE7",
    title: "Modulo E7",
    questions: questions.filter((q) => q.section === "sectionE7"),
    dependsOn: (answers) => {
      return localValues["E6"] === "si"; // Se usa el valor local de E6
    },
  },
  {
    id: "sectionF",
    title: "Modulo F - Agorafobia",
    questions: questions.filter((q) => q.section === "sectionF1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionG ",
    title: "Modulo G - Fobia social (trastorno de ansiedad social)",
    questions: questions.filter((q) => q.section === "sectionG1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionG2",
    title: "Modulo G2 ",
    questions: questions.filter((q) => q.section === "sectionG2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionG1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionG3",
    title: "Modulo G3 ",
    questions: questions.filter((q) => q.section === "sectionG3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionG2",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionG4",
    title: "Modulo G4 ",
    questions: questions.filter((q) => q.section === "sectionG4"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionG3",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionH ",
    title: "Modulo H - Trastorno obsesivo-compulsivo",
    questions: questions.filter((q) => q.section === "sectionH1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionH2",
    title: "Modulo H2 ",
    questions: questions.filter((q) => q.section === "sectionH2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionH1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionH3",
    title: "Modulo H3 ",
    questions: questions.filter((q) => q.section === "sectionH3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionH2",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionH4",
    title: "Módulo H4",
    questions: questions.filter((q) => q.section === "sectionH4"),
    dependsOn: (answers) => {
      // Caso 1: Verificar si H1 = "no"
      const h1Questions = questions.filter((q) => q.section === "sectionH1");
      const h1IsNo = h1Questions.some((q) => answers[q.id] === "no");

      // Caso 2: Verificar si H1 = "si" y H2 = "no"
      const h2Questions = questions.filter((q) => q.section === "sectionH2");
      const h1IsSiAndH2IsNo =
        h1Questions.some((q) => answers[q.id] === "si") &&
        h2Questions.some((q) => answers[q.id] === "no");

      // Mostrar H4 si H1 = "no" O (H1 = "si" y H2 = "no")
      return h1IsNo || h1IsSiAndH2IsNo;
    },
  },
  {
    id: "sectionH5",
    title: "Módulo H5",
    questions: questions.filter((q) => q.section === "sectionH5"),
    dependsOn: (answers) => {
      // Verificar si H3 = "SÍ" o H4 = "SÍ"
      const h3Questions = questions.filter((q) => q.section === "sectionH3");
      const h4Questions = questions.filter((q) => q.section === "sectionH4");
      return (
        h3Questions.some((q) => answers[q.id] === "si") ||
        h4Questions.some((q) => answers[q.id] === "si")
      );
    },
  },
  {
    id: "sectionH6",
    title: "Módulo H6",
    questions: questions.filter((q) => q.section === "sectionH6"),
    dependsOn: (answers) => {
      // Verificar si H5 = "SÍ" (asumiendo que H5 es una sola pregunta)
      const h5Questions = questions.filter((q) => q.section === "sectionH5");
      return h5Questions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionI ",
    title: "Modulo I - Estado por estrés postraumático (opcional)",
    questions: questions.filter((q) => q.section === "sectionI1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionI2",
    title: "Modulo I2 ",
    questions: questions.filter((q) => q.section === "sectionI2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionI1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionI3",
    title: "Modulo I3 - En el último mes:",
    questions: questions.filter((q) => q.section === "sectionI3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionI2",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionI4",
    title: "Módulo I4 - Durante el último mes:",
    questions: questions.filter((q) => q.section === "sectionI4"),
    dependsOn: (answers): boolean => {
      const respuestasI3 = questions
        .filter((q) => q.section === "sectionI3")
        .filter((q) => answers[q.id] === "si");
      return respuestasI3.length >= 3; // 3+ "SÍ" en I3
    },
  },
  {
    id: "sectionI5",
    title: "Módulo I5",
    questions: questions.filter((q) => q.section === "sectionI5"),
    dependsOn: (answers): boolean => {
      // Verificar 2+ "SÍ" en I3
      const respuestasI3 = questions
        .filter((q) => q.section === "sectionI3")
        .filter((q) => answers[q.id] === "si");
      const tiene2oMasEnI3 = respuestasI3.length >= 2;

      // Verificar si I4 está completado (todas sus preguntas respondidas)
      const preguntasI4 = questions.filter((q) => q.section === "sectionI4");
      const I4Completado = preguntasI4.every(
        (q) => answers[q.id] !== undefined,
      );

      return tiene2oMasEnI3 && I4Completado; // Mostrar I5 solo si se cumplen ambas
    },
  },
  {
    id: "sectionJ ",
    title: "Modulo J - Abuso y dependencia de alcohol",
    questions: questions.filter((q) => q.section === "sectionJ1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionJ2",
    title: "Modulo J2  En los últimos 12 meses ",
    questions: questions.filter((q) => q.section === "sectionJ2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionJ1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionJ3",
    title: "Módulo J3 - En los últimos 12 meses:",
    questions: questions.filter((q) => q.section === "sectionJ3"),
    dependsOn: (answers): boolean => {
      const preguntasJ2 = questions.filter((q) => q.section === "sectionJ2");
      const J2Completo = preguntasJ2.every(
        (q) => answers[q.id] !== undefined && answers[q.id] !== null,
      );
      const respuestasSiJ2 = J2Completo
        ? preguntasJ2.filter((q) => answers[q.id] === "si").length
        : 0;
      return J2Completo && respuestasSiJ2 < 3;
    },
  },
  */
  {
    id: "sectionK1",
    title:
      "Modulo K - Trastornos asociados al uso de sustancias psicoactivas no alcohólicas ",
    questions: questions.filter((q) => q.section === "sectionK1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionK1_list",
    title: "Modulo K1",
    questions: questions.filter((q) => q.section === "sectionK1_list"),
    dependsOn: (answers) => answers["questionK1a"] === "si", // Siempre visible
  },
  {
    id: "sectionK2",
    title: "Modulo K2",
    questions: questions.filter((q) => q.section === "sectionK2"),
    dependsOn: (answers) => answers["questionK1a_list"],
  },
  /*
  {
    id: "sectionO1a",
    title: "Modulo O - Trastorno de ansiedad generalizada ",
    questions: questions.filter((q) => q.section === "sectionO1a"),
    dependsOn: (answers) => (answers["questionK1a"]?.length || 0) > 0,
  },
  {
    id: "sectionO1b",
    title: "modulo O1b ",
    questions: questions.filter((q) => q.section === "sectionO1b"),
    dependsOn: (answers) => answers["questionO1a"] === "si",
  },
  {
    id: "sectionO2",
    title: "modulo O2 ",
    questions: questions.filter((q) => q.section === "sectionO2"),
    dependsOn: (answers) =>
      answers["QuestionO1a"] === "si" && answers["questionO1b"] === "si",
  },
  {
    id: "sectionO3",
    title: "modulo O3 ",
    questions: questions.filter((q) => q.section === "sectionO3"),
    dependsOn: (answers) => answers["questionO2"] === "si",
  },
  {
    id: "sectionP1",
    title: "P1 - Conductas antes de los 15 años",
    questions: questions.filter((q) => q.section === "sectionP1"),
    dependsOn: () => true,
  },
  {
    id: "sectionP2",
    title: "P2 - Conductas después de los 15 años",
    questions: questions.filter((q) => q.section === "sectionP2"),
    dependsOn: (answers) => {
      // 1. Filtrar preguntas de P1 (antes de los 15 años)
      const preguntasP1 = questions.filter((q) => q.section === "sectionP1");

      // 2. Contar respuestas "SÍ" en P1
      const respuestasSiP1 = preguntasP1.filter(
        (q) => answers[q.id] === "si",
      ).length;

      // 3. Mostrar P2 solo si hay 2+ "SÍ" en P1
      return respuestasSiP1 >= 2;
    },
  },
  */
]; // <- Esto cierra correctamente el array
