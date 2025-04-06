import { Diagnosis } from "./types";
import { questions } from "./questions";

// Diagnósticos agrupados con dependencias
export const myDiagnoses: Diagnosis[] = [
  // Diagnóstico: Episodio Depresivo Mayor
  {
    id: "diagnosticA1",
    name: "Episodio Depresivo Mayor Actual",
    criteria: (answers: any) => {
      return answers["question1"] === "si" ? "sí" : "no"; // Ejemplo
    },
    dependsOn: (answers: any): boolean => {
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

      return totalYesAnswers >= 5; // Retorna un b
    },
  },

  // Diagnóstico: Episodio Depresivo Mayor Recidivante
  {
    id: "diagnosticA2",
    name: "Episodio Depresivo Mayor Recidivante",
    criteria: (answers) => {
      return answers["question1"] === "si" ? "sí" : "no"; // Ejemplo
    },
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionA4b",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Verifica si alguna respuesta es "si" en el sectionA4
    },
  },

  // Diagnóstico: Episodio Depresivo Mayor con Síntomas Melancólicos Actuales
  {
    id: "diagnosticA3",
    name: "EPISODIO DEPRESIVO MAYOR CON SÍNTOMAS MELANCÓLICOS ACTUAL",
    criteria: (answers) => {
      // Verifica si las respuestas a las preguntas B4 son "sí"
      return answers["questionB4"] === "si" ? "sí" : "no"; // Si B4 es "sí", el diagnóstico es positivo
    },
    dependsOn: (answers) => {
      // Filtra las preguntas relacionadas con la sección A6
      const relatedQuestionsA6 = questions.filter(
        (q) => q.section === "sectionA6",
      );

      // Cuenta las respuestas afirmativas en las preguntas de la sección A6
      const totalYesAnswersA6 = relatedQuestionsA6.filter(
        (q) => answers[q.id] === "si",
      ).length;

      // Si el total de respuestas afirmativas en A6 es 3 o más, activa el diagnóstico
      return totalYesAnswersA6 >= 3;
    },
  },

  // Diagnóstico: Trastorno Distímico Actual
  {
    id: "diagnosticB1",
    name: "Current Dysthymic Disorder",
    criteria: (answers) => {
      // Verifica si las respuestas a las preguntas B4 son "sí"
      return answers["questionB4"] === "si" ? "sí" : "no"; // Si B4 es "sí", el diagnóstico es positivo
    },
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionB4", // Filtra las preguntas relacionadas con B4
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true si alguna pregunta relacionada con B4 tiene "sí"
    },
  },

  // Diagnóstico: Riesgo de Suicidio
  {
    id: "diagnosticC1",
    name: "Riesgo de Suicidio",
    criteria: (answers) => {
      return answers["questionB4"] === "si" ? "sí" : "no";
    },
    dependsOn: (answers) => {
      const riskQuestions = [
        { id: "QuestionC1", points: 1 },
        { id: "QuestionC2", points: 2 },
        { id: "QuestionC3", points: 6 },
        { id: "QuestionC4", points: 10 },
        { id: "QuestionC5", points: 10 },
        { id: "QuestionC6", points: 4 },
      ];

      // Calculamos el puntaje total
      const totalScore = riskQuestions.reduce(
        (sum, q) => sum + (answers[q.id] === "si" ? q.points : 0),
        0,
      );

      // Mostrar el puntaje calculado en consola para depurar
      console.log("Total Score:", totalScore);

      // Determinar el nivel de riesgo
      let riskLevel: string | boolean = "no"; // Por defecto, sin riesgo
      if (totalScore >= 10) {
        riskLevel = "alto";
      } else if (totalScore >= 6) {
        riskLevel = "moderado";
      } else if (totalScore >= 1) {
        riskLevel = "leve";
      }

      // Si el puntaje total es 0 (todos "no"), no devolver diagnóstico
      if (totalScore === 0) {
        return false; // No devolver el diagnóstico si todo es "no"
      }

      // Mostrar el nivel de riesgo en consola para depurar
      console.log("Risk Level:", riskLevel);

      // Devolver el nivel de riesgo calculado
      return riskLevel;
    },
  },
  //MODULO G DIAGNOSTICO FALTAN LOS DEL EF
  {
    id: "diagnosticG1",
    name: "Fobia Social Actual",
    criteria: (answers) => {
      // Verifica si las respuestas a las preguntas B4 son "sí"
      return answers["questionB4"] === "si" ? "sí" : "no"; // Si B4 es "sí", el diagnóstico es positivo
    },
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionG4", // Filtra las preguntas relacionadas con B4
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true si alguna pregunta relacionada con B4 tiene "sí"
    },
  },
  //MODULO H DIAGNOSTICO
  {
    id: "diagnosticH1",
    name: "Trastorno Obsesivo Compulsivo Actual",
    criteria: (answers) => {
      // Verifica si las respuestas a las preguntas B4 son "sí"
      return answers["questionB4"] === "si" ? "sí" : "no"; // Si B4 es "sí", el diagnóstico es positivo
    },
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionH6", // Filtra las preguntas relacionadas con B4
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true si alguna pregunta relacionada con B4 tiene "sí"
    },
  },
  //MODULO I DIAGNOSTICO
  {
    id: "diagnosticI1",
    name: "Estado Por Estres Postraumatico Actual",
    criteria: (answers) => {
      // Verifica si las respuestas a las preguntas B4 son "sí"
      return answers["questionB4"] === "si" ? "sí" : "no"; // Si B4 es "sí", el diagnóstico es positivo
    },
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionI5", // Filtra las preguntas relacionadas con B4
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true si alguna pregunta relacionada con B4 tiene "sí"
    },
  },
  //MODULO J DIAGNOSTICO
  {
    id: "diagnosticJ1",
    name: "Dependencia De Alcohol Actual",
    dependsOn: (answers) => {
      // Verificar si hay 3+ "SÍ" en J2 (para mostrar el módulo)
      const respuestasJ2 = questions
        .filter((q) => q.section === "sectionJ2") // Filtra preguntas de J2
        .filter((q) => answers[q.id] === "si"); // Cuenta respuestas "SÍ"

      return respuestasJ2.length >= 3; // Mostrar módulo si hay 3+ "SÍ" en J2
    },
  },
  {
    id: "diagnosticK2",
    name: "Dependencia De Sustancias Actual",
    dependsOn: (answers) => {
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
    dependsOn: (answers) => {
      const k3Pattern = /^questionK_.+_(K3[a-g])$/;
      const positiveCount = Object.keys(answers)
        .filter((key) => k3Pattern.test(key))
        .filter((key) => answers[key] === "si").length;

      return positiveCount >= 1;
    },
  },
  //MODULO 0 DIAGNOSTICO FALTAN LOS DEL KLMN
  {
    id: "diagnosticO1",
    name: "Trastorno De Ansiedad Generalizada Actual",
    dependsOn: (answers) => {
      // Verificar si hay 3+ "SÍ" en 03 (para mostrar el módulo)
      const respuestasO3 = questions
        .filter((q) => q.section === "sectionO3")
        .filter((q) => answers[q.id] === "si");

      return respuestasO3.length >= 3; // Mostrar módulo si hay 3+ "SÍ" en J2
    },
  },
  //MODULO P
  {
    id: "diagnosticP1",
    name: "Transtorno Antisocial De La Personalidad De Por Vida",
    dependsOn: (answers) => {
      // Verificar si hay 3+ "SÍ" en p2 (para mostrar el módulo)
      const respuestasP2 = questions
        .filter((q) => q.section === "sectionP2")
        .filter((q) => answers[q.id] === "si");

      return respuestasP2.length >= 3; // Mostrar módulo si hay 3+ "SÍ" en J2
    },
  },
];
