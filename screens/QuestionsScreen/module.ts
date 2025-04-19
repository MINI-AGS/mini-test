import { questions } from "./questions";
import { myDiagnoses } from "./diagnosis";
import { AnswerState, Question, Section, Diagnosis } from "./types";
import { isAnswerEqual, safeToLowerCase } from "./utils";
import { FlagFunctions } from "./flags";

// Objeto para almacenar valores locales sin enviarlos a la base de datos
export let resultadoDiagnostico: Record<string, boolean> = {};

export const sections: Section[] = [
  //Datos del paciente
  {
    id: "sectionData",
    title: "Datos del paciente      ",
    moduleGroup: "moduloData",
    questions: questions.filter((q) => q.section === "sectionData"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionA",
    title: "Episodio depresivo mayor   ",
    moduleGroup: "moduloA",
    questions: questions.filter((q) => q.section === "sectionA"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionA3",
    moduleGroup: "moduloA",
    questions: questions.filter((q) => q.section === "sectionA3"),
    dependsOn: (answers) => {
      return answers["questionA1"] === "si" || answers["questionA2"] === "si";
    },
  },
  {
    id: "sectionA4a",
    moduleGroup: "moduloA",
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

      return totalYesAnswers >= 5;
    },
  },
  {
    id: "sectionA4b",
    moduleGroup: "moduloA",
    questions: questions.filter((q) => q.section === "sectionA4b"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionA4a",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionA5b",
    moduleGroup: "moduloA",
    questions: questions.filter((q) => q.section === "sectionA5b"),
    dependsOn: (answers) => {
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA1",
      );
      const a5aCondition = safeToLowerCase(answers["questionA2"]) === "si";
      const a4bCondition = safeToLowerCase(answers["questionA4b"]) === "si";

      return (
        (majorDepressiveEpisode?.dependsOn(answers) ?? false) &&
        a5aCondition &&
        a4bCondition
      );
    },
  },
  {
    id: "sectionA6",
    moduleGroup: "moduloA",
    questions: questions.filter((q) => q.section === "sectionA6"),
    dependsOn: (answers) => {
      const a5aCondition = safeToLowerCase(answers["questionA2"]) === "si";
      const a5bCondition = safeToLowerCase(answers["questionA5b"]) === "si";
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA1",
      );
      const sectionA5bVisible =
        (majorDepressiveEpisode?.dependsOn(answers) ?? false) &&
        a5aCondition &&
        safeToLowerCase(answers["questionA4b"]) === "si";

      return (a5aCondition || a5bCondition) && sectionA5bVisible;
    },
  },
  {
    id: "sectionB",
    title: "Trastorno distímico",
    moduleGroup: "moduloB",
    questions: questions.filter((q) => q.section === "sectionB1"),
    dependsOn: (answers) => {
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA1",
      );
      const majorDepressiveEpisodeRecidivist = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA2",
      );
      const majorDepressiveEpisodeWithMelancholic = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA3",
      );
      return !(
        majorDepressiveEpisode?.dependsOn(answers) ||
        majorDepressiveEpisodeRecidivist?.dependsOn(answers) ||
        majorDepressiveEpisodeWithMelancholic?.dependsOn(answers)
      );
    },
    isDisabled: (answers) => {
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "diagnosticA1",
      );
      return majorDepressiveEpisode?.dependsOn(answers) ?? false;
    },
  },
  {
    id: "sectionB2",
    moduleGroup: "moduloB",
    questions: questions.filter((q) => q.section === "sectionB2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionB1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionB3",
    moduleGroup: "moduloB",
    questions: questions.filter((q) => q.section === "sectionB3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionB2",
      );
      return relatedQuestions.some((q) => answers[q.id] === "no");
    },
  },
  {
    id: "sectionB4",
    moduleGroup: "moduloB",
    questions: questions.filter((q) => q.section === "sectionB4"),
    dependsOn: (answers) => {
      const relatedQuestionsB3 = questions.filter(
        (q) => q.section === "sectionB3",
      );
      const totalYesAnswersB3 = relatedQuestionsB3.filter(
        (q) => answers[q.id] === "si",
      ).length;
      return totalYesAnswersB3 >= 2;
    },
  },
  {
    id: "sectionC",
    title: "Riesgo de Suicidio      ",
    moduleGroup: "moduloC",
    questions: questions.filter((q) => q.section === "sectionC"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionD",
    title: "Episodio maníaco",
    moduleGroup: "moduloD",
    questions: questions.filter((q) => q.section === "sectionD12"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionD3",
    title: "Episodio (hipo)manía",
    moduleGroup: "moduloD",
    questions: questions.filter((q) => q.section === "sectionD3"),
    dependsOn: (answers) => {
      const currentEpisode =
        answers["questionD1a"] === "si" || answers["questionD2a"] === "si";
      const pastEpisode =
        answers["questionD1b"] === "si" || answers["questionD2b"] === "no";
      const pastFlag = FlagFunctions.isFlagActive("PastAnswers", answers);
      return currentEpisode || (pastEpisode && pastFlag);
    },
  },
  {
    id: "sectionD4",
    moduleGroup: "moduloD",
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
    title: "Trastorno de Angustia",
    moduleGroup: "moduloE",
    questions: questions.filter((q) => q.section === "sectionE1a"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionE1b",
    moduleGroup: "moduloE",
    questions: questions.filter((q) => q.section === "sectionE1b"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionE1a",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionE23",
    moduleGroup: "moduloE",
    questions: questions.filter((q) => q.section === "sectionE23"),
    dependsOn: (answers) => {
      return answers["questionE1a"] === "si" && answers["questionE1b"] === "si";
    },
  },
  {
    id: "sectionE4",
    moduleGroup: "moduloE",
    questions: questions.filter((q) => q.section === "sectionE4"),
    dependsOn: (answers) => {
      return answers["questionE1a"] === "si" && answers["questionE1b"] === "si";
    },
  },
  {
    id: "sectionE5",
    moduleGroup: "moduloE",
    questions: questions.filter((q) => q.section === "sectionE5"),
    dependsOn: (answers) => {
      const E3 = questions.find((q) => q.id === "questionE3");
      const preguntasE4 = questions.filter((q) => q.section === "sectionE4");

      const tieneE3 = E3 ? answers[E3.id] === "si" : false;
      const totalE4 = preguntasE4.filter((q) => answers[q.id] === "si").length;
      const resultado = tieneE3 && totalE4 >= 4;

      resultadoDiagnostico["Trastorno de angustia de por vida"] = resultado;
      //console.log(
      //  "[Actualización E5] E3:",
      //  tieneE3,
      //  "| Síntomas E4:",
      //  totalE4,
      //  "| Resultado:",
      //  resultado
      //);

      return resultado;
    },
  },
  {
    id: "sectionE6",
    moduleGroup: "moduloE",
    questions: questions.filter((q) => q.section === "sectionE6"),
    dependsOn: (answers) => {
      const preguntasE4 = questions.filter((q) => q.section === "sectionE4");
      const totalE4 = preguntasE4.filter((q) => answers[q.id] === "si").length;

      const resultadoE5 =
        resultadoDiagnostico["Trastorno de angustia de por vida"] === true;
      const hayAlgunaE4 = totalE4 >= 1;

      const resultadoE6 = !resultadoE5 && hayAlgunaE4;

      resultadoDiagnostico["Crisis actual"] = resultadoE6;
      //console.log(
      //  "[Actualización E6] E5:",
      //  resultadoE5,
      //  "| Al menos un síntoma E4:",
      //  hayAlgunaE4,
      //  "| Resultado E6:",
      //  resultadoE6
      //);
      return resultadoE6;
    },
  },
  {
    id: "sectionE7",
    moduleGroup: "moduloE",
    questions: questions.filter((q) => q.section === "sectionE7"),
    dependsOn: (answers) => {
      const resultadoE6 = resultadoDiagnostico["Crisis actual"];
      if (resultadoE6 === false) {
        const resultadoE7 = answers["questionE7"] === "si";
        resultadoDiagnostico["Trastorno de angustia actual"] = resultadoE7;
        //console.log(
        //  "[Actualización E7] Respuesta E7:",
        //  answers["questionE7"],
        //  "| Resultado E7:",
        //  resultadoE7
        //);
        return true;
      }
      return false;
    },
  },
  {
    id: "sectionF",
    title: "Agorafobia",
    moduleGroup: "moduloF",
    questions: questions.filter((q) => q.section === "sectionF1"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionF2",
    title: "",
    moduleGroup: "moduloF",
    questions: questions.filter((q) => q.section === "sectionF2"),
    dependsOn: (answers): boolean => {
      const respuestaF1 = answers["questionF1"];
      //console.log("[F2 dependsOn] F1 actual:", respuestaF1);

      if (respuestaF1 === undefined) {
        //console.log("[F2 dependsOn] F1 no respondido - ocultando F2");
        return false;
      }

      if (respuestaF1 === "no") {
        //console.log('[F2 dependsOn] F1 es "no" - ocultando F2');
        return false;
      }

      //console.log('[F2 dependsOn] F1 es "sí" - mostrando F2');
      return true;
    },
    beforeShow: (answers) => {
      //console.log("[F2 beforeShow] Valores actuales:", {
      //  F1: answers["questionF1"],
      //  F2: answers["questionF2"],
      //});

      if (answers["questionF1"] === "no" && answers["questionF2"] !== "no") {
        //console.log(
        //  '[F2 beforeShow] Auto-respondiendo "no" en F2 porque F1 es "no"'
        //);
        answers["questionF2"] = "no";

        //console.log("[F2 beforeShow] Valores después de actualizar:", {
        //  F1: answers["questionF1"],
        //  F2: answers["questionF2"],
        //});
      } else {
        //console.log("[F2 beforeShow] No se requiere auto-respuesta", {
        //  razón:
        //    answers["questionF1"] !== "no" ? 'F1 no es "no"' : 'F2 ya es "no"',
        //});
      }
    },
  },
  {
    id: "sectionG",
    title: "Fobia social ",
    moduleGroup: "moduloG",
    questions: questions.filter((q) => q.section === "sectionG1"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionG2",
    title: "Modulo G2",
    moduleGroup: "moduloG",
    questions: questions.filter((q) => q.section === "sectionG2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionG1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionG3",
    moduleGroup: "moduloG",
    questions: questions.filter((q) => q.section === "sectionG3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionG2",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionG4",
    moduleGroup: "moduloG",
    questions: questions.filter((q) => q.section === "sectionG4"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionG3",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionH",
    title: "Trastorno obsesivo-compulsivo",
    moduleGroup: "moduloH",
    questions: questions.filter((q) => q.section === "sectionH1"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionH2",
    moduleGroup: "moduloH",
    questions: questions.filter((q) => q.section === "sectionH2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionH1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionH3",
    moduleGroup: "moduloH",
    questions: questions.filter((q) => q.section === "sectionH3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionH2",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionH4",
    moduleGroup: "moduloH",
    questions: questions.filter((q) => q.section === "sectionH4"),
    dependsOn: (answers) => {
      const h1Questions = questions.filter((q) => q.section === "sectionH1");
      const h1IsNo = h1Questions.some((q) => answers[q.id] === "no");

      const h2Questions = questions.filter((q) => q.section === "sectionH2");
      const h1IsSiAndH2IsNo =
        h1Questions.some((q) => answers[q.id] === "si") &&
        h2Questions.some((q) => answers[q.id] === "no");

      return h1IsNo || h1IsSiAndH2IsNo;
    },
  },
  {
    id: "sectionH5",
    moduleGroup: "moduloH",
    questions: questions.filter((q) => q.section === "sectionH5"),
    dependsOn: (answers) => {
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
    moduleGroup: "moduloH",
    questions: questions.filter((q) => q.section === "sectionH6"),
    dependsOn: (answers) => {
      const h5Questions = questions.filter((q) => q.section === "sectionH5");
      return h5Questions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionI",
    title: "Estado por estrés postraumático",
    moduleGroup: "moduloI",
    questions: questions.filter((q) => q.section === "sectionI1"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionI2",
    moduleGroup: "moduloI",
    questions: questions.filter((q) => q.section === "sectionI2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionI1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionI3",
    moduleGroup: "moduloI",
    questions: questions.filter((q) => q.section === "sectionI3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionI2",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionI4",
    moduleGroup: "moduloI",
    questions: questions.filter((q) => q.section === "sectionI4"),
    dependsOn: (answers): boolean => {
      const respuestasI3 = questions
        .filter((q) => q.section === "sectionI3")
        .filter((q) => answers[q.id] === "si");
      return respuestasI3.length >= 3;
    },
  },
  {
    id: "sectionI5",
    moduleGroup: "moduloI",
    questions: questions.filter((q) => q.section === "sectionI5"),
    dependsOn: (answers): boolean => {
      const respuestasI3 = questions
        .filter((q) => q.section === "sectionI3")
        .filter((q) => answers[q.id] === "si");
      const tiene2oMasEnI3 = respuestasI3.length >= 2;

      const preguntasI4 = questions.filter((q) => q.section === "sectionI4");
      const I4Completado = preguntasI4.every(
        (q) => answers[q.id] !== undefined,
      );

      return tiene2oMasEnI3 && I4Completado;
    },
  },
  {
    id: "sectionJ",
    title: "Abuso y dependencia de alcohol",
    moduleGroup: "moduloJ",
    questions: questions.filter((q) => q.section === "sectionJ1"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionJ2",
    moduleGroup: "moduloJ",
    questions: questions.filter((q) => q.section === "sectionJ2"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionJ1",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si");
    },
  },
  {
    id: "sectionJ3",
    moduleGroup: "moduloJ",
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
    title: "Dependencia De Sustancias",
    moduleGroup: "moduloK",
    questions: questions.filter((q) => q.section === "sectionK1"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionK1_list",
    moduleGroup: "moduloK",
    questions: questions.filter((q) => q.section === "sectionK1_list"),
    dependsOn: (answers) => answers["questionK1a"] === "si",
  },
  {
    id: "sectionK2",
    title:
      "Modulo K2 - Considerando su uso del tipo de droga, en los últimos 12 meses:",
    moduleGroup: "moduloK",
    questions: questions.filter((q) => q.section === "sectionK2"),
    dependsOn: (answers) => answers["questionK1a_list"],
  },
  //Modulo L
  {
    id: "sectionL1a",
    title: "Trastornos psicóticos",
    //Mostar las preguntas que esten en la seccion L12 y L11 intercaladas
    questions: questions.filter(
      (q: Question) => q.section === "sectionL1a",
    ),
    dependsOn: (answers: AnswerState) => true, // Siempre visible
  },
  {
    id: "sectionL1b",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionL1b",
    ),
    dependsOn: (answers: AnswerState) => {
      const preguntasL1a = questions.filter(
        (q: Question) => q.section === "sectionL1a",
      ).filter(
        (q: Question) => answers[q.id] === "si" || answers[q.id] === "si extraños",);
      
      return preguntasL1a.length >= 1; // Retorna true o false
      },
  },
  {
    id: "sectionL2a",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionL2a",
    ),
    dependsOn: (answers: AnswerState) => {
      // Mostrar solo si L1a es "no", L1b es "si" o "no" y L6 es false
      const preguntasL1a = questions.filter(
        (q: Question) => q.section === "sectionL1a",
      ).filter((q: Question) => answers[q.id] === "no");
      const preguntasL1b = questions.filter(
        (q: Question) => q.section === "sectionL1b",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "no");
      const preguntasL6 = questions.filter(
        (q: Question) => q.section === "sectionL6",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "no");
      
      return (preguntasL1a.length >= 1 || preguntasL1b.length >= 1) && preguntasL6.length === 0; // Retorna true o false
      },
  },
  {
    id: "sectionL2b",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionL2b",
    ),
    dependsOn: (answers: AnswerState) => {
      const preguntasL2a = questions.filter(
        (q: Question) => q.section === "sectionL2a",
      ).filter(
        (q: Question) => answers[q.id] === "si" || answers[q.id] === "si extraños",);
      
      return preguntasL2a.length >= 1; // Retorna true o false
      },
  },
  {
    id: "sectionL3a",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionL3a",
    ),
    dependsOn: (answers: AnswerState) => {
      // Mostrar solo si L1a es "no", L1b es "si" o "no" y L6 es false
      const preguntasL2a = questions.filter(
        (q: Question) => q.section === "sectionL2a",
      ).filter((q: Question) => answers[q.id] === "no");
      const preguntasL2b = questions.filter(
        (q: Question) => q.section === "sectionL2b",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "no");
      const preguntasL6 = questions.filter(
        (q: Question) => q.section === "sectionL6",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "no");
      
      return (preguntasL2a.length >= 1 || preguntasL2b.length >= 1) && preguntasL6.length === 0; // Retorna true o false
      },
  },
  {
    id: "sectionL3b",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionL3b",
    ),
    dependsOn: (answers: AnswerState) => {
      const preguntasL3a = questions.filter(
        (q: Question) => q.section === "sectionL3a",
      ).filter(
        (q: Question) => answers[q.id] === "si" || answers[q.id] === "si extraños",);
      
      return preguntasL3a.length >= 1; // Retorna true o false
      },
  },
  {
    id: "sectionL4a",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionL4a",
    ),
    dependsOn: (answers: AnswerState) => {
      // Mostrar solo si L1a es "no", L1b es "si" o "no" y L6 es false
      const preguntasL3a = questions.filter(
        (q: Question) => q.section === "sectionL3a",
      ).filter((q: Question) => answers[q.id] === "no");
      const preguntasL3b = questions.filter(
        (q: Question) => q.section === "sectionL3b",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "no");
      const preguntasL6 = questions.filter(
        (q: Question) => q.section === "sectionL6",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "no");
      
      return (preguntasL3a.length >= 1 || preguntasL3b.length >= 1) && preguntasL6.length === 0; // Retorna true o false
      },
  },
  {
    id: "sectionL4b",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionL4b",
    ),
    dependsOn: (answers: AnswerState) => {
      const preguntasL4a = questions.filter(
        (q: Question) => q.section === "sectionL4a",
      ).filter(
        (q: Question) => answers[q.id] === "si" || answers[q.id] === "si extraños",);
      
      return preguntasL4a.length >= 1; // Retorna true o false
      },
  },
  {
    id: "sectionL5a",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL5a"),
    dependsOn: (answers: AnswerState) => {
      // Mostrar solo si L1a es "no", L1b es "si" o "no" y L6 es false
      const preguntasL4a = questions.filter(
        (q: Question) => q.section === "sectionL4a",
      ).filter((q: Question) => answers[q.id] === "no");
      const preguntasL4b = questions.filter(
        (q: Question) => q.section === "sectionL4b",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "no");
      const preguntasL6 = questions.filter(
        (q: Question) => q.section === "sectionL6",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "no");
      
      return (preguntasL4a.length >= 1 || preguntasL4b.length >= 1) && preguntasL6.length === 0; // Retorna true o false
      },
  },
  {
    id: "sectionL5b",
    title: "",
    questions: questions.filter(
      (q: Question) => q.section === "sectionL5b",
    ),
    dependsOn: (answers: AnswerState) => {
      const preguntasL5a = questions.filter(
        (q: Question) => q.section === "sectionL5a",
      ).filter(
        (q: Question) => answers[q.id] === "si" || answers[q.id] === "si extraños",);
      
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
      const preguntasL1b = questions.filter(
        (q: Question) => q.section === "sectionL1b",
      ).filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL2b = questions.filter(
        (q: Question) => q.section === "sectionL2b",
      ).filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL3b = questions.filter(
        (q: Question) => q.section === "sectionL3b",
      ).filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL4b = questions.filter(
        (q: Question) => q.section === "sectionL4b",
      ).filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL5a = questions.filter(
        (q: Question) => q.section === "sectionL5a",)
        .filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "si extraños" || answers[q.id] === "no");
      const preguntasL5b = questions.filter(
        (q: Question) => q.section === "sectionL5b",
      ).filter((q: Question) => answers[q.id] === "si" || answers[q.id] === "si extraños" || answers[q.id] === "no");

      return (preguntasL1b.length >= 1 || preguntasL2b.length >= 1 
        || preguntasL3b.length >= 1 || preguntasL4b.length >= 1
        || preguntasL5a.length >= 1 || preguntasL5b.length >= 1); // Retorna true o false
    },
  },
  {
    id: "sectionL6a2",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL6a2"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL6 = questions.filter(
        (q: Question) => q.section === "sectionL6a1",
      ).filter((q: Question) => answers[q.id] === "si");
      return preguntasL6.length >= 1; // Retorna true o false
    }
  },
  {
    id: "sectionL6b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL6b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL6 = questions.filter(
        (q: Question) => q.section === "sectionL6a2",
      ).filter((q: Question) => answers[q.id] === "si extraños");
      return preguntasL6.length >= 1; // Retorna true o false
    }
  },
  {
    id: "sectionL7",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL7a"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL6a = questions.filter(
        (q: Question) => q.section === "sectionL6a1",
      ).filter((q: Question) => answers[q.id] === "no");
      const preguntasL6b = questions.filter(
        (q: Question) => q.section === "sectionL6b",
      ).filter((q: Question) => answers[q.id] === "no" || answers[q.id] === "si"); 

      return (preguntasL6a.length >= 1 || preguntasL6b.length >= 1); // Retorna true o false
    }
  },
  {
    id: "sectionL7b",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL7b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL7 = questions.filter(
        (q: Question) => q.section === "sectionL7a",
      ).filter((q: Question) => answers[q.id] === "si");
      return preguntasL7.length >= 1; // Retorna true o false
    }
  },
  {
    id: "sectionL810",
    title: "",
    questions: questions.filter((q: Question) => q.section === "sectionL8b" || q.section === "sectionL9b" || q.section === "sectionL10b"),
    dependsOn: (answers: AnswerState) => {
      const preguntasL6b = questions.filter(
        (q: Question) => q.section === "sectionL6b",
      ).filter((q: Question) => answers[q.id] === "si extraños");
      const preguntasL7 = questions.filter(
        (q: Question) => q.section === "sectionL7a",
      ).filter((q: Question) => answers[q.id] === "no");
      const preguntasL7b = questions.filter(
        (q: Question) => q.section === "sectionL7b",
      ).filter((q: Question) => answers[q.id] === "no" || answers[q.id] === "si");

      return (preguntasL6b.length >= 1 || preguntasL7.length >= 1 || preguntasL7b.length >= 1); // Retorna true o false
    }
  },
  {
    id: "sectionM1",
    title: "Anorexia nerviosa",
    moduleGroup: "moduloM",
    questions: questions.filter((q) => q.section === "sectionM1"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionM2",
    title: "En los últimos 3 meses:",
    moduleGroup: "moduloM",
    questions: questions.filter((q) => q.section === "sectionM2"),
    dependsOn: (answers) => answers["questionM1c"] === "si",
  },
  {
    id: "sectionM3",
    title: "",
    moduleGroup: "moduloM",
    questions: questions.filter((q) => q.section === "sectionM3"),
    dependsOn: (answers) => answers["questionM2"] === "si",
  },
  {
    id: "sectionM4",
    title: "",
    moduleGroup: "moduloM",
    questions: questions.filter((q) => q.section === "sectionM4"),
    dependsOn: (answers) => answers["questionM3"] === "si",
  },
  {
    id: "sectionM6",
    title: "",
    moduleGroup: "moduloM",
    questions: questions.filter((q) => q.section === "sectionM6"),
    dependsOn: (answers) => {
      const preguntasM4 = questions.filter((q) => q.section === "sectionM4");
      const respuestasSiM4 = preguntasM4.filter(
        (q) => answers[q.id] === "si",
      ).length;
      const isFemale = questions
        .filter((q) => q.section === "sectionData")
        .filter((q) => answers[q.id] === "Mujer").length;
      return respuestasSiM4 >= 2 && isFemale >= 1;
    },
  },
  {
    id: "sectionN1",
    title: " Bulimia nerviosa",
    moduleGroup: "moduloN",
    questions: questions.filter((q) => q.section === "sectionN1"),
    dependsOn: (answers) => true,
  },
  {
    id: "sectionN2",
    title: "",
    moduleGroup: "moduloN",
    questions: questions.filter((q) => q.section === "sectionN2"),
    dependsOn: (answers) => answers["questionN1"] === "si",
  },
  {
    id: "sectionN3",
    title: "",
    moduleGroup: "moduloN",
    questions: questions.filter((q) => q.section === "sectionN3"),
    dependsOn: (answers) => answers["questionN2"] === "si",
  },
  {
    id: "sectionN4",
    title: "",
    moduleGroup: "moduloN",
    questions: questions.filter((q) => q.section === "sectionN4"),
    dependsOn: (answers) => answers["questionN3"] === "si",
  },
  {
    id: "sectionN5",
    title: "",
    moduleGroup: "moduloN",
    questions: questions.filter((q) => q.section === "sectionN5"),
    dependsOn: (answers) => answers["questionN4"] === "si",
  },
  {
    id: "sectionN7",
    title: "",
    moduleGroup: "moduloN",
    questions: questions.filter((q) => q.section === "sectionN7"),
    dependsOn: (answers) => {
      const diagnosisAnorexia = myDiagnoses
        .filter((d) => d.id === "diagnosticM1")
        .some((d) => d.dependsOn(answers));
      const preguntasN5 = questions
        .filter((q) => q.section === "sectionN5")
        .filter((q) => answers[q.id] === "si").length;
      return diagnosisAnorexia && preguntasN5 >= 1;
    },
  },
  {
    id: "sectionO1a",
    title: "Trastorno de ansiedad generalizada",
    moduleGroup: "moduloO",
    questions: questions.filter((q) => q.section === "sectionO1a"),
    dependsOn: () => true,
  },
  {
    id: "sectionO1b",
    moduleGroup: "moduloO",
    questions: questions.filter((q) => q.section === "sectionO1b"),
    dependsOn: (answers) => answers["questionO1a"] === "si",
  },
  {
    id: "sectionO2",
    moduleGroup: "moduloO",
    questions: questions.filter((q) => q.section === "sectionO2"),
    dependsOn: (answers) =>
      answers["questionO1a"] === "si" && answers["questionO1b"] === "si",
  },
  {
    id: "sectionO3",
    title:
      "modulo O3 - En los últimos 6 meses: cuando estaba ansioso, casi todo el tiempo:",
    moduleGroup: "moduloO",
    questions: questions.filter((q) => q.section === "sectionO3"),
    dependsOn: (answers) => answers["questionO2"] === "si",
  },
  {
    id: "sectionP1",
    title: "Trastorno Antisocial De Personalidad",
    moduleGroup: "moduloP",
    questions: questions.filter((q) => q.section === "sectionP1"),
    dependsOn: () => true,
  },
  {
    id: "sectionP2",
    title: "P2 - Conductas después de los 15 años",
    moduleGroup: "moduloP",
    questions: questions.filter((q) => q.section === "sectionP2"),
    dependsOn: (answers) => {
      const preguntasP1 = questions.filter((q) => q.section === "sectionP1");
      const respuestasSiP1 = preguntasP1.filter(
        (q) => answers[q.id] === "si",
      ).length;
      return respuestasSiP1 >= 2;
    },
  },
];
