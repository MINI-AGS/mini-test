import { AnswerState, Diagnosis, Question } from "./types";
import { questions } from "./questions";
import { resultadoDiagnostico } from "./module";
import { calculateSuicideRiskScore, RiskLevelC1 } from "./utils";

// Diagnósticos agrupados con dependencias
export const myDiagnoses: Diagnosis[] = [
  // Diagnóstico: Episodio Depresivo Mayor
  {
    id: "diagnosticA1",
    name: "Episodio Depresivo Mayor Actual",
    dependsOn: (answers: AnswerState): boolean => {
      const relatedQuestionsA3 = questions.filter(
        (q: Question) => q.section === "sectionA3",
      );
      const relatedQuestionsA = questions.filter(
        (q: Question) => q.section === "sectionA",
      );

      const totalYesAnswers = [
        ...relatedQuestionsA3,
        ...relatedQuestionsA,
      ].filter((q) => answers[q.id] === "si").length;

      return totalYesAnswers >= 5; // Retorna un valor booleano indicando si el total de respuestas "sí" es mayor o igual a 5
    },
  },

  // Diagnóstico: Episodio Depresivo Mayor Recidivante
  {
    id: "diagnosticA2",
    name: "Episodio Depresivo Mayor Recidivante",
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionA4b",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Verifica si alguna respuesta es "si" en el sectionA4
    },
  },

  // Diagnóstico: Episodio Depresivo Mayor con Síntomas Melancólicos Actuales
  {
    id: "diagnosticA3",
    name: "EPISODIO DEPRESIVO MAYOR CON SÍNTOMAS MELANCÓLICOS ACTUAL",
    dependsOn: (answers: AnswerState) => {
      // Filtra las preguntas relacionadas con la sección A6
      const relatedQuestionsA6 = questions.filter(
        (q: Question) => q.section === "sectionA6",
      );

      // Cuenta las respuestas afirmativas en las preguntas de la sección A6
      const totalYesAnswersA6 = relatedQuestionsA6.filter(
        (q: Question) => answers[q.id] === "si",
      ).length;

      // Si el total de respuestas afirmativas en A6 es 3 o más, activa el diagnóstico
      return totalYesAnswersA6 >= 3;
    },
  },

  // Diagnóstico: Trastorno Distímico Actual
  {
    id: "diagnosticB1",
    name: "Trastorno Distímico Actual",
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionB4", // Filtra las preguntas relacionadas con B4
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true si alguna pregunta relacionada con B4 tiene "sí"
    },
  },

  // Diagnóstico: Riesgo de Suicidio
  {
    id: "diagnosticC1",
    name: "Riesgo de Suicidio",
    dependsOn: (answers: AnswerState) => {
      // Filtra solo las preguntas C1 a C6 (o toda la sección C, según tu estructura)
      const preguntasSeccionC = questions.filter(
        (q: Question) =>
          q.id.startsWith("questionC") || q.section === "sectionC",
      );

      // Verifica si al menos una tiene "si" (sin considerar B4)
      return preguntasSeccionC.some((q: Question) => answers[q.id] === "si");
    },
  },
  {
    id: "riesgoC1",
    name: "Nivel de Riesgo de Suicidio",
    dependsOn: (answers: AnswerState) => {
      // Calcula el puntaje directamente (sin depender de B4)
      const score = calculateSuicideRiskScore(answers);
      if (score >= 10) return "Alto";
      if (score >= 6) return "Moderado";
      if (score >= 1) return "Leve";
      return false; // Si el score es 0, no hay riesgo
    },
    result: (answers: AnswerState) => RiskLevelC1(answers), // Función externa (opcional)
  },
  {
    id: "diagnosticD1", //Hipomaníaco
    name: "EPISODIO HIPOMANÍACO",
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionD4",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "no");
    },
    result: (answers: AnswerState) => {
      console.log("--- Evaluando si episodio hipomaníaco es actual/pasado ---");
      const D1b = answers["questionD1b"];
      const D2b = answers["questionD2b"];

      console.log("Valor de D1b:", D1b);
      console.log("Valor de D2b:", D2b);

      if (D1b === "si" || D2b === "si") {
        console.log("Resultado: actual (porque D1b o D2b es SÍ)");
        return "actual";
      } else if (D1b === "no" && D2b === "no") {
        console.log("Resultado: pasado (porque D1b y D2b son NO)");
        return "pasado";
      }

      console.log("Resultado: indeterminado (no cumple condiciones claras)");
      return "indeterminado";
    },
  },
  {
    id: "diagnosticD2", //Maníaco
    name: "EPISODIO MANÍACO",
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionD4",
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si");
    },
    result: (answers: AnswerState) => {
      console.log("--- Evaluando si episodio hipomaníaco es actual/pasado ---");
      const D1b = answers["questionD1b"];
      const D2b = answers["questionD2b"];

      console.log("Valor de D1b:", D1b);
      console.log("Valor de D2b:", D2b);

      if (D1b === "si" || D2b === "si") {
        console.log("Resultado: actual (porque D1b o D2b es SÍ)");
        return "actual";
      } else if (D1b === "no" && D2b === "no") {
        console.log("Resultado: pasado (porque D1b y D2b son NO)");
        return "pasado";
      }

      console.log("Resultado: indeterminado (no cumple condiciones claras)");
      return "indeterminado";
    },
  },
  //MODULO E
  {
    id: "diagnosticE1",
    name: "Trastorno de Angustia de Por Vida",
    dependsOn: (answers: AnswerState) => {
      // Hay un "si" en E3 y por lo menos 4 "si" en E4
      const respuestasE3 = questions
        .filter((q: Question) => q.section === "sectionE23")
        .filter((q: Question) => answers["questionE3"] === "si");

      const respuestasE4 = questions
        .filter((q: Question) => q.section === "sectionE4")
        .filter((q: Question) => answers[q.id] === "si");

      // Verifica si hay al menos 4 "si" en E4
      const tieneCuatroSi = respuestasE4.length >= 4;

      return respuestasE3.length >= 1 && tieneCuatroSi // Retorna true si hay al menos 1 "si" en E3 y 4 "si" en E4)
    }
  },
  {
    id: "diagnosticE2",
    name: "Crisis Actual con Síntomas Limitados",
    dependsOn: (answers: AnswerState) => {
      // Verificar si dio positivo a diagnosticE1 y hay algun "si" en E4
      const respuestasE5 = myDiagnoses
        .filter((d) => d.id === "diagnosticE1")
        .some((d) => d.dependsOn(answers) === true); // Verifica si diagnosticE1 es positivo
      const respuestasE4 = questions
        .filter((q: Question) => q.section === "sectionE4")
        .filter((q: Question) => answers[q.id] === "si");

    return respuestasE5 && respuestasE4.length >= 1; // Retorna true si hay al menos 1 "si" en E4 y diagnosticE1 es positivo
    }
  },
  {
    id: "diagnosticE3",
    name: "Trastorno de Angustia Actual",
    dependsOn: (answers: AnswerState) => {
      // Verificar si puso "si" en E7
      const respuestasE7 = questions
        .filter((q: Question) => q.section === "sectionE7")
        .filter((q: Question) => answers[q.id] === "si");
      return respuestasE7.length >= 1; // Retorna true si hay al menos 1 "si" en E7
    }
   },
  //MODULO F
  {
    id: "diagnosticF1",
    name: "TRASTORNO DE ANGUSTIA sin agorafobia ACTUAL",
    dependsOn: (answers: AnswerState) => {
      // La sección F1 depende de que la respuesta a la pregunta F2 sea "no"
      const isF2AgoraphobiaNo = answers["questionF1"] === "no"; // F2 es "no"

      // La sección E7 depende de que E7 sea "sí"
      const isE7AnxietyYes = answers["questionE7"] === "si"; // E7 es "sí"

      // Si se cumplen ambas condiciones, podemos mostrar el diagnóstico
      return isF2AgoraphobiaNo && isE7AnxietyYes;
    }
  },
  {
    id: "diagnosticF2",
    name: "TRASTORNO DE ANGUSTIA con agorafobia ACTUAL",
    dependsOn: (answers: AnswerState) => {
      // La sección F2 depende de que la respuesta a la pregunta F2 sea "no"
      const isF2AgoraphobiaNo = answers["questionF2"] === "si"; 

      // La sección E7 depende de que E7 sea "sí"
      const isE7AnxietyYes = answers["questionE7"] === "si"; // E7 es "sí"

      // Si se cumplen ambas condiciones, podemos mostrar el diagnóstico
      return isF2AgoraphobiaNo && isE7AnxietyYes;
    },
  },
  {
    id: "diagnosticF3",
    name: "AGORAFOBIA ACTUAL sin historial de trastorno de angustia",
    dependsOn: (answers: AnswerState) => {
      // Verificar si F2 es "si" (Agorafobia actual)
      const isF2AgoraphobiaYes = answers["questionF2"] === "si";

      // Obtener el valor de "Trastorno de angustia de por vida" desde el resultadoDiagnostico
      const isE5AnxietyNo = myDiagnoses
        .filter((d) => d.id === "diagnosticE1")
        .filter((d) => d.dependsOn(answers) === false); // Verifica si diagnosticE1 es negativo

      const isE7AnxietyNo = myDiagnoses
        .filter((d) => d.id === "diagnosticE3")
        .filter((d) => d.dependsOn(answers) === false); // Verifica si diagnosticE3 es negativo

      return isF2AgoraphobiaYes && isE5AnxietyNo && isE7AnxietyNo.length >= 1; // Retorna true si hay al menos 1 "si" en F2 y diagnosticE1 es negativo
    },
  },

  {
    id: "diagnosticG1",
    name: "Fobia Social (trastorno de ansiedad social) Actual",
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionG4", // Filtra las preguntas relacionadas con B4
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true si alguna pregunta relacionada con B4 tiene "sí"
    },
  },
  //MODULO H DIAGNOSTICO
  {
    id: "diagnosticH1",
    name: "Trastorno Obsesivo Compulsivo Actual",
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionH6", // Filtra las preguntas relacionadas con B4
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true si alguna pregunta relacionada con B4 tiene "sí"
    },
  },
  //MODULO I DIAGNOSTICO
  {
    id: "diagnosticI1",
    name: "Estado Por Estres Postraumatico Actual",
    criteria: (answers: AnswerState) => {
      // Verifica si las respuestas a las preguntas B4 son "sí"
      return answers["questionB4"] === "si" ? "sí" : "no"; // Si B4 es "sí", el diagnóstico es positivo
    },
    dependsOn: (answers: AnswerState) => {
      const relatedQuestions = questions.filter(
        (q: Question) => q.section === "sectionI5", // Filtra las preguntas relacionadas con B4
      );
      return relatedQuestions.some((q: Question) => answers[q.id] === "si"); // Retorna true si alguna pregunta relacionada con B4 tiene "sí"
    },
  },
  //MODULO J DIAGNOSTICO
  {
    id: "diagnosticJ1",
    name: "Dependencia De Alcohol Actual",
    dependsOn: (answers: AnswerState) => {
      // Verificar si hay 3+ "SÍ" en J2 (para mostrar el módulo)
      const respuestasJ2 = questions
        .filter((q: Question) => q.section === "sectionJ2") // Filtra preguntas de J2
        .filter((q: Question) => answers[q.id] === "si"); // Cuenta respuestas "SÍ"

      return respuestasJ2.length >= 3; // Mostrar módulo si hay 3+ "SÍ" en J2
    },
  },
  {
    id: "diagnosticJ2",
    name: "ABUSO DE ALCOHOL ACTUAL",
    dependsOn: (answers: AnswerState) => {
      // Verificar si hay 31+ "SÍ" en J3 (para mostrar el módulo)
      const respuestasJ3 = questions
        .filter((q: Question) => q.section === "sectionJ3") // Filtra preguntas de J2
        .filter((q: Question) => answers[q.id] === "si"); // Cuenta respuestas "SÍ"

      return respuestasJ3.length >= 1; // Mostrar módulo si hay 3+ "SÍ" en J2
    },
  },
  //FALTA DIAGNOSTICO DEL J3
  {
    id: "diagnosticK2",
    name: "Dependencia De Sustancias Actual",
    dependsOn: (answers: AnswerState) => {
      const k2Pattern = /^questionK_.+_(K2[a-g])$/;
      const positiveCount = Object.keys(answers)
        .filter((key) => k2Pattern.test(key))
        .filter((key) => answers[key] === "si").length;

      return positiveCount >= 3;
    },
  },
  {
    id: "diagnosticK3",
    name: "ABUSO DE SUSTANCIAS ACTUAL",
    dependsOn: (answers: AnswerState) => {
      const k3Pattern = /^questionK_.+_(K3[a-g])$/;
      const positiveCount = Object.keys(answers)
        .filter((key) => k3Pattern.test(key))
        .filter((key) => answers[key] === "si").length;

      return positiveCount >= 1;
    },
  },
  //MODULO L
  {
    //Trastorno Psicotico Actual
    id: "diagnosticL1",
    name: "TRASTORNO PSICÓTICO ACTUAL",
    dependsOn: (answers: AnswerState) => {
      // Verificar si hay 1+ "SI EXTRAÑO" en <<b>> o 2+ "SI" en <<b>>
      const respuestasL1 = questions
        .filter((q: Question) => q.section === "sectionL1b" || q.section === "sectionL2b"
        || q.section === "sectionL3b" || q.section === "sectionL4b" || q.section === "sectionL5b"
        || q.section === "sectionL6b" || q.section === "sectionL7b" || q.section === "sectionL8b"
        || q.section === "sectionL9b" || q.section === "sectionL10b")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraños",
        );
      //Mostrar módulo si hay 1+ "SI EXTRAÑO" o 2+ "SI" en L11
      return respuestasL1.length >= 2; // Mostrar módulo si hay 1+ "SI EXTRAÑO" o 2+ "SI" en L11
    },
  },
  {
    //Trastorno Psicótico de Por Vida
    id: "diagnosticL2",
    name: "TRASTORNO PSICÓTICO DE POR VIDA",
    dependsOn: (answers: AnswerState) => {
      // Verificar si hay 1+ "SI EXTRAÑO" en <<a>> o 2+ "SI" en <<a>> o si dio positivo a diagnósticoL1
      const respuestasL1 = questions
        .filter((q: Question) => q.section === "sectionL1a" || q.section === "sectionL2a"
        || q.section === "sectionL3a" || q.section === "sectionL4a" || q.section === "sectionL5a"
        || q.section === "sectionL6a1" || q.section === "sectionL6a2" || q.section === "sectionL7a" 
        || q.section === "sectionL8a" || q.section === "sectionL9a" || q.section === "sectionL10a")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraños",
        );
      const respuestasL2 = myDiagnoses.some(
        (diagnosis) =>
          diagnosis.id === "diagnosticL1" && diagnosis.dependsOn(answers));
      //Mostrar módulo si hay 1+ "SI EXTRAÑO" o 2+ "SI" en L11 o 1+ "SI" en L12
      return respuestasL1.length >= 2 || respuestasL2; // Mostrar módulo si hay 1+ "SI EXTRAÑO" o 2+ "SI" en L11 o 1+ "SI" en L12
    },
  },
  {
    //Trastorno del Estado de Ánimo con Síntomas Psicóticos Actual
    id: "diagnosticL3",
    name: "TRASTORNO DEL ESTADO DE ÁNIMO CON SÍNTOMAS PSICÓTICOS ACTUAL",
    dependsOn: (answers: AnswerState) => {
      // Verificar si hay 1+ "si" en preguntas L1b a L7b
      const respuestasL13b = questions
        .filter((q: Question) => q.section === "sectionL13b")
        .filter((q: Question) => answers[q.id] === "si");

      const episodioDepresivoMayor = myDiagnoses.some(
        (diagnosis) =>
          diagnosis.id === "diagnosticA1" && diagnosis.dependsOn(answers),
      );
      const episodioManiaco = myDiagnoses.some(
        (diagnosis) =>
          diagnosis.id === "diagnosticD2" && diagnosis.dependsOn(answers),
      );

      return (
        respuestasL13b.length >= 1 || episodioDepresivoMayor || episodioManiaco
      ); // Mostrar módulo si hay 1+ "si" en L13b o si hay diagnóstico de episodio depresivo mayor o maniaco
    },
  },
  //MODULO M DIAGNOSTICO
  {
    id: "diagnosticM1",
    name: "Anorexia Nerviosa Actual",
    dependsOn: (answers: AnswerState) => {
      // Verificar si hay 1+ "si" en sectionM4 si entonces M5 va a ser "si"
      const respuestasM4 = questions
        .filter((q: Question) => q.section === "sectionM4")
        .filter((q: Question) => answers[q.id] === "si");
      //Para mujeres, verificar si pone "si" en M5 y M6
      const isFemale = questions
        .filter((q: Question) => q.section === "sectionData")
        .filter((q: Question) => answers[q.id] === "Mujer");

      //respyestasM5 es si solo si hay 1+ "si" en M4
      const respuestasM5 = respuestasM4.length >= 1;
      const respuestasM6 = answers["questionM6"] === "si";

      //Para hombres, verificar si pone "si" en M5 y M6
      const isMale = questions
        .filter((q: Question) => q.section === "sectionData")
        .filter((q: Question) => answers[q.id] === "Hombre");
      const respuestasM5H = isMale && respuestasM5;

      return (
        (isFemale && respuestasM5 && respuestasM6) || (isMale && respuestasM5H)
      );
    },
  },
  //MODULO N DIAGNOSTICO
  {
    id: "diagnosticN1",
    name: "Bulimia Nerviosa Actual",
    dependsOn: (answers: AnswerState) => {
      //Verificar si hay 1 "si" en N5 o hay un "no" en N7 o salto a N8
      const respuestasN5 = questions
        .filter((q: Question) => q.section === "sectionN5")
        .filter((q: Question) => answers[q.id] === "si");
      const respuestasN7 = questions
        .filter((q: Question) => q.section === "sectionN7")
        .filter((q: Question) => answers[q.id] === "no");
      const respuestasN8 = myDiagnoses
        .filter((d) => d.id === "diagnosticM1")
        // Verifica si el diagnóstico de anorexia nerviosa actual es falso
        .some((d) => d.dependsOn(answers) === false); // Verifica si el diagnóstico de anorexia nerviosa actual es falso

      //Mostrar las preguntas solo cuando termino todas las preguntas de N5 y N7
      const N5Completado = questions
        .filter((q: Question) => q.section === "sectionN1" || q.section === "sectionN2"
        || q.section === "sectionN3" || q.section === "sectionN4" || q.section === "sectionN5")
        .every((q: Question) => answers[q.id] !== undefined);

        return N5Completado &&(respuestasN5.length >= 1 || respuestasN7.length >= 1 || respuestasN8);
    },
  },
  {
    id: "diagnosticN2",
    name: "Anorexia Nerviosa Tipo Compulsivo/Purgativo Actual",
    dependsOn: (answers: AnswerState) => {
      const respuestasN7 = questions
        .filter((q: Question) => q.section === "sectionN7")
        .filter((q: Question) => answers[q.id] === "si");
      return respuestasN7.length >= 1; // Mostrar módulo si hay 1 "si" en N7
    },
  },
  //MODULO 0 DIAGNOSTICO FALTAN LOS DEL K
  {
    id: "diagnosticO1",
    name: "Trastorno De Ansiedad Generalizada Actual",
    dependsOn: (answers: AnswerState) => {
      // Verificar si hay 3+ "SÍ" en 03 (para mostrar el módulo)
      const respuestasO3 = questions
        .filter((q: Question) => q.section === "sectionO3")
        .filter((q: Question) => answers[q.id] === "si");

      return respuestasO3.length >= 3; // Mostrar módulo si hay 3+ "SÍ" en J2
    },
  },
  //MODULO P
  {
    id: "diagnosticP1",
    name: "Transtorno Antisocial De La Personalidad De Por Vida",
    dependsOn: (answers: AnswerState) => {
      // Verificar si hay 3+ "SÍ" en p2 (para mostrar el módulo)
      const respuestasP2 = questions
        .filter((q: Question) => q.section === "sectionP2")
        .filter((q: Question) => answers[q.id] === "si");

      return respuestasP2.length >= 3; // Mostrar módulo si hay 3+ "SÍ" en J2
    },
  },
];
