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
    questions: questions.filter((q) => q.section === "sectionData"),
    dependsOn: (answers) => true, // Siempre visible
  },
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
    title: "Módulo D4",
    questions: questions.filter((q) => q.section === "sectionD4"),
    dependsOn: (answers) => {
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
    questions: questions.filter((q) => q.section === "sectionE5"),

    dependsOn: (answers: any) => {
      const E3 = questions.find((q) => q.id === "questionE3");
      const preguntasE4 = questions.filter((q) => q.section === "sectionE4");

      const tieneE3 = E3 ? answers[E3.id] === "si" : false;
      const totalE4 = preguntasE4.filter((q) => answers[q.id] === "si").length;
      const resultado = tieneE3 && totalE4 >= 4;

      // Guardar el resultado en el diagnóstico
      resultadoDiagnostico["Trastorno de angustia de por vida"] = resultado;

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
    title: "Crisis actual",
    questions: questions.filter((q) => q.section === "sectionE6"),
    dependsOn: (answers: any) => {
      const preguntasE4 = questions.filter((q) => q.section === "sectionE4");
      const totalE4 = preguntasE4.filter((q) => answers[q.id] === "si").length;

      const resultadoE5 =
        resultadoDiagnostico["Trastorno de angustia de por vida"] === true;
      const hayAlgunaE4 = totalE4 >= 1;

      const resultadoE6 = !resultadoE5 && hayAlgunaE4;

      resultadoDiagnostico["Crisis actual"] = resultadoE6;

      console.log(
        "[Actualización E6] E5:",
        resultadoE5,
        "| Al menos un síntoma E4:",
        hayAlgunaE4,
        "| Resultado E6:",
        resultadoE6,
      );

      return resultadoE6;
    },
  },
  {
    id: "sectionE7",
    title: "Modulo E7 Trastorno de angustia actual",
    questions: questions.filter((q) => q.section === "sectionE7"),
    dependsOn: (answers) => {
      // Obtener el resultado de E6 (Crisis actual)
      const resultadoE6 = resultadoDiagnostico["Crisis actual"];

      // Mostrar E7 solo si E6 es falso
      if (resultadoE6 === false) {
        // Obtener la respuesta de la pregunta E7
        const resultadoE7 = answers["questionE7"] === "si"; // Suponiendo que "questionE7" es el ID de la pregunta en E7

        // Guardar el resultado de E7 en el diagnóstico
        resultadoDiagnostico["Trastorno de angustia actual"] = resultadoE7;

        console.log(
          "[Actualización E7] Respuesta E7:",
          answers["questionE7"],
          "| Resultado E7:",
          resultadoE7,
        );

        return true; // Mostrar E7 si E6 es falso
      }

      return false; // No mostrar E7 si E6 es verdadero
    },
  },
  {
    id: "sectionF",
    title: "Modulo F - Agorafobia",
    questions: questions.filter((q) => q.section === "sectionF1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionF2",
    title: "Módulo F2",
    questions: questions.filter((q) => q.section === "sectionF2"),
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
  //Modulo L
  {
    id: "sectionL12",
    title: "Modulo L - Trastornos psicóticos",
    //Mostar las preguntas que esten en la seccion L12 y L11 intercaladas
    questions: questions.filter((q) => q.section === "sectionL12" || q.section === "sectionL11"),
    dependsOn: (answers) => true, // Siempre visible

  },
  //Modulo M
  {
    id: "sectionM1",
    title: "Modulo M - Anorexia nerviosa",
    questions: questions.filter((q) => q.section === "sectionM1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionM2",
    title: "En los últimos 3 meses:",
    questions: questions.filter((q) => q.section === "sectionM2"),
    //Solo mostrar si questionM1c es "si"
    dependsOn: (answers) => answers["questionM1c"] === "si",
  },
  {
    id: "sectionM3",
    title: "",
    questions: questions.filter((q) => q.section === "sectionM3"),
    dependsOn: (answers) => answers["questionM2"] === "si",
  },
  {
    id: "sectionM4",
    title: "",
    questions: questions.filter((q) => q.section === "sectionM4"),
    dependsOn: (answers) => answers["questionM3"] === "si",
  },
  {
    id: "sectionM6",
    title: "",
    questions: questions.filter((q) => q.section === "sectionM6"),
    // solo mostrar si hay mas de 1 "si" en el sectionM4 y gender sea "mujer"
    dependsOn: (answers) => {
      const preguntasM4 = questions.filter((q) => q.section === "sectionM4");
      const respuestasSiM4 = preguntasM4.filter(
        (q) => answers[q.id] === "si",
      ).length;
      const isFemale = questions.filter((q) => q.section === "sectionData")
        .filter((q) => answers[q.id] === "Mujer").length;
      return (
        respuestasSiM4 >= 2 &&
        isFemale >= 1
      );
    }
  },
  {
    id: "sectionN1",
    title: "Modulo N - Bulimia nerviosa",
    questions: questions.filter((q) => q.section === "sectionN1"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionN2",
    title: "",
    questions: questions.filter((q) => q.section === "sectionN2"),
    dependsOn: (answers) => answers["questionN1"] === "si",
  },
  {
    id: "sectionN3",
    title: "",
    questions: questions.filter((q) => q.section === "sectionN3"),
    dependsOn: (answers) => answers["questionN2"] === "si",
  },
  {
    id: "sectionN4",
    title: "",
    questions: questions.filter((q) => q.section === "sectionN4"),
    dependsOn: (answers) => answers["questionN3"] === "si",
  },
  {
    id: "sectionN5",
    title: "",
    questions: questions.filter((q) => q.section === "sectionN5"),
    dependsOn: (answers) => answers["questionN4"] === "si",
  },
  {
    id: "sectionN7",
    title: "",
    questions: questions.filter((q) => q.section === "sectionN7"),
    //Mostar solo si cumple con Anorexia nerviosa
    dependsOn: (answers) => {
      const diagnosisAnorexia = myDiagnoses
        .filter((d) => d.id === "diagnosticM1")
        .some((d) => d.dependsOn(answers));
      
      //Mostrar si hay un si en sectionN5 y el diagnostico de anorexia es positivo
      const preguntasN5 = questions
        .filter((q) => q.section === "sectionN5")
        .filter((q) => answers[q.id] === "si").length;
      return diagnosisAnorexia && preguntasN5 >= 1;
    }
  },
  {
    id: "sectionO1a",
    title: "Modulo O - Trastorno de ansiedad generalizada ",
    questions: questions.filter((q) => q.section === "sectionO1a"),
    dependsOn: () => true,
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
]; // <- Esto cierra correctamente el array
