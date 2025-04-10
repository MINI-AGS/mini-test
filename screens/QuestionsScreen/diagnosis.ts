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
    name: "Current Dysthymic Disorder",
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
      if (score >= 10) return "alto";
      if (score >= 6) return "moderado";
      if (score >= 1) return "leve";
      return false; // Si el score es 0, no hay riesgo
    },
    result: (answers: AnswerState) => RiskLevelC1(answers), // Función externa (opcional)
  },
  {
    id: "diagnosticD4_HipoManiaco",
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
    id: "diagnosticD4_Maniaco",
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
  //MODULO F
  {
    id: "diagnosticF1",
    name: "TRASTORNO DE ANGUSTIA sin agorafobia ACTUAL",
    criteria: (answers: AnswerState) => {
      // Verifica si la respuesta a la pregunta F2 es "no" y la respuesta a E7 es "sí"
      const isF2AgoraphobiaNo = answers["questionF2"] === "no"; // Agorafobia es "no"
      const isE7AnxietyYes =
        resultadoDiagnostico["Trastorno de angustia de por vida"] === true;
      // Si ambas condiciones se cumplen, el diagnóstico es positivo
      if (isF2AgoraphobiaNo && isE7AnxietyYes) {
        return "sí"; // Diagnóstico positivo
      }
      return "no"; // Si no se cumple alguna condición, el diagnóstico es negativo
    },
    dependsOn: (answers: AnswerState) => {
      // La sección F2 depende de que la respuesta a la pregunta F2 sea "no"
      const isF2AgoraphobiaNo = answers["questionF2"] === "no"; // F2 es "no"

      // La sección E7 depende de que E7 sea "sí"
      const isE7AnxietyYes = answers["questionE7"] === "si"; // E7 es "sí"

      // Si se cumplen ambas condiciones, podemos mostrar el diagnóstico
      return isF2AgoraphobiaNo && isE7AnxietyYes;
    },
  },
  //revisar
  {
    id: "diagnosticF2",
    name: "TRASTORNO DE ANGUSTIA con agorafobia ACTUAL",
    dependsOn: (answers: AnswerState) => {
      // La sección F2 depende de que la respuesta a la pregunta F2 sea "no"
      const isF2AgoraphobiaNo = answers["questionF2"] === "si"; // F2 es "no"

      // La sección E7 depende de que E7 sea "sí"
      const isE7AnxietyYes = (resultadoDiagnostico[
        "Trastorno de angustia actual"
      ] = true);

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
      const isE5AnxietyNo =
        resultadoDiagnostico["Trastorno de angustia de por vida"] === false;

      // Verificar que "Trastorno de angustia de por vida" esté en el resultadoDiagnostico
      const isE5Answered =
        resultadoDiagnostico["Trastorno de angustia de por vida"] !== undefined;

      // Debug
      console.log("Evaluando diagnóstico F3:", {
        F2: answers["questionF2"],
        E5: resultadoDiagnostico["Trastorno de angustia de por vida"],
        isF2AgoraphobiaYes,
        isE5AnxietyNo,
        isE5Answered,
      });

      // Solo devolver true si:
      // 1. F2 es "si" (tiene agorafobia actual)
      // 2. E5 está respondido Y es "no" (no tiene trastorno de angustia)
      return isF2AgoraphobiaYes && isE5Answered && isE5AnxietyNo;
    },
  },

  {
    id: "diagnosticG1",
    name: "Fobia Social Actual",
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
        .filter((q: Question) => q.section === "sectionL11")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraño",
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
        .filter((q: Question) => q.section === "sectionL11")
        .filter(
          (q: Question) =>
            answers[q.id] === "si" || answers[q.id] === "si extraño",
        );
      const respuestasL2 = questions
        .filter((q: Question) => q.section === "sectionL12")
        .filter((q: Question) => answers[q.id] === "si");
      //Mostrar módulo si hay 1+ "SI EXTRAÑO" o 2+ "SI" en L11 o 1+ "SI" en L12
      return respuestasL1.length >= 2 || respuestasL2.length >= 1; // Mostrar módulo si hay 1+ "SI EXTRAÑO" o 2+ "SI" en L11 o 1+ "SI" en L12
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
          diagnosis.id === "diagnosticA2" && diagnosis.dependsOn(answers),
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

      return (
        respuestasN5.length >= 1 || respuestasN7.length >= 1 || respuestasN8
      ); // Mostrar módulo si hay 1 "si" en N5 o hay un "no" en N7 o salto a N8
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
