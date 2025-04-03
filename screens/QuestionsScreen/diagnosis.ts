import { Diagnosis } from "./types";
import { questions } from "./questions";

export const myDiagnoses: Diagnosis[] = [
  {
    id: "major_depressive_episode",
    name: "Episodio Depresivo Mayor",
    criteria: (answers: any) => {
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

      return totalYesAnswers >= 5 ? "sí" : "no"; // Siempre retorna "sí" o "no"
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

      return totalYesAnswers >= 5; // Retorna un booleano
    },
  },
  {
    id: "major_depressive_episode_recidivist",
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
  {
    id: "prueba_con_esta_puedo_comparar_dos_preguntas_y_ver_si_darle_el_diagnostico",
    name: "Episodio Depresivo Mayor Recidivante prueba",
    criteria: (answers) => {
      return answers["question2"] === "si" && answers["question3"] === "si"
        ? "sí"
        : "no";
    },
    dependsOn: (answers) => {
      // Puedes añadir una condición aquí si es necesario
      return answers["question2"] === "si";
    },
  },
  {
    id: "bipolar_disorder",
    name: "Trastorno Bipolar",
    criteria: (answers) => {
      // Diagnóstico basado en múltiples respuestas afirmativas
      const positiveAnswers = ["question4", "question5", "question6"].filter(
        (q) => answers[q] === "si",
      ).length;
      return positiveAnswers >= 2 ? "sí" : "no";
    },
    dependsOn: (answers) => {
      // Definir condiciones de dependencias
      return answers["question4"] === "si" || answers["question5"] === "si"; // Ejemplo: depende de A4 o A5
    },
  },
];
