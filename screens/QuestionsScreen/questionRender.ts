// questionRenderer.ts
import { questions } from "./questions";
import { myDiagnoses } from "./diagnosis";
import { FlagFunctions } from "./flags";
import { Question, AnswerState, Diagnosis } from "./types";

// Función para generar preguntas dinámicas por droga
const generateDrugQuestions = (selectedDrugs: string[]): Question[] => {
  const questionTemplates = [
    {
      baseId: "K2a",
      text: (drug: string) =>
        `¿Ha notado que necesitaba usar mayor cantidad de ${drug} para obtener los mismos efectos?`,
      options: ["no", "si"],
    },
    {
      baseId: "K2b",
      text: (drug: string) =>
        `¿Cuando redujo o dejó de usar ${drug} tuvo síntomas de abstinencia?`,
      options: ["no", "si"],
    },
    {
      baseId: "K2c",
      text: (drug: string) =>
        `¿Cuando usaba ${drug} terminaba utilizando más de lo que había planeado?`,
      options: ["no", "si"],
    },
    {
      baseId: "K2d",
      text: (drug: string) =>
        `¿Ha tratado de reducir o dejar de tomar ${drug} pero ha fracasado?`,
      options: ["no", "si"],
    },
    {
      baseId: "K2e",
      text: (drug: string) =>
        `¿Los días que utilizaba ${drug} empleaba mucho tiempo (> 2 horas) en obtener, consumir, recuperarse de sus efectos, o pensando en drogas?`,
      options: ["no", "si"],
    },
    {
      baseId: "K2f",
      text: (drug: string) =>
        `¿Pasó menos tiempo trabajando, disfrutando de pasatiempos, estando con la familia o amigos debido a su uso de ${drug}?`,
      options: ["no", "si"],
    },
    {
      baseId: "K2g",
      text: (drug: string) =>
        `¿Ha continuado usando  ${drug} a pesar de saber que esto le causaba problemas mentales o de salud?`,
      options: ["no", "si"],
    },
    {
      baseId: "K3a",
      text: (drug: string) =>
        `¿Ha estado intoxicado o con resaca a causa de ${drug} en más de una ocasión, cuando tenía otras responsabilidades en la
        escuela,en el trabajo o en el hogar? ¿Esto le ocasionó algún problema?`,
      options: ["no", "si"],
    },
    {
      baseId: "K3b",
      text: (drug: string) =>
        `¿Ha estado intoxicado con ${drug} en alguna situación en la que corriese un riesgo físico (p. ej., conducir un automóvil,
        una motocicleta, una embarcación, o utilizar una máquina, etc.)?`,
      options: ["no", "si"],
    },
    {
      baseId: "K3c",
      text: (drug: string) =>
        `¿Ha tenido algún problema legal debido a su uso de  ${drug}por ejemplo, un arresto o perturbación del orden público?`,
      options: ["no", "si"],
    },
    {
      baseId: "K3d",
      text: (drug: string) =>
        `¿Ha continuado usando  ${drug} a pesar NO SÍ 11
        de saber que esto le causaba problemas con su familia u otras personas?`,
      options: ["no", "si"],
    },
  ];

  return selectedDrugs.flatMap((drug) =>
    questionTemplates.map((template) => ({
      id: `questionK_${drug.split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, "")}_${template.baseId}`,
      text: template.text(drug),
      options: template.options,
      section: "sectionK2",
    })),
  );
};
export function getDiagnosisResult(answers: AnswerState): Diagnosis[] {
  return myDiagnoses.map((d) => {
    // Solo modifica el diagnóstico específico
    if (d.id === "diagnosticD4_HipoManiaco") {
      const flagActive = FlagFunctions.isFlagActive(
        "PastAnswers",
        answers as any,
      );

      // Clona el objeto completamente y sobrescribe result
      return {
        ...d,
        result: () => (flagActive ? "pasado" : "actual"), // Función dinámica
      };
    }
    return d; // Retorna los demás sin cambios
  });
}
//Question modulo D pasado-presente
export function getQuestionsWithDynamicText(answers: AnswerState): Question[] {
  const baseQuestions = questions.map((q) => {
    const flagActive = FlagFunctions.isFlagActive(
      "PastAnswers",
      answers as any,
    );

    if (q.id === "questionD3a") {
      return {
        ...q,
        text: flagActive
          ? "¿Sentía que podía hacer cosas que otros no podían hacer, o que usted era una persona especialmente importante?"
          : "¿Siente que puede hacer cosas que otros no pueden hacer, o que usted es una persona especialmente importante?",
      };
    }

    if (q.id === "questionD3b") {
      return {
        ...q,
        text: flagActive
          ? "¿Necesitaba dormir menos (p. ej., se sentía descansado con pocas horas de sueño)?"
          : "¿Necesita dormir menos (p. ej., se siente descansado con pocas horas de sueño)?",
      };
    }

    if (q.id === "questionD3c") {
      return {
        ...q,
        text: flagActive
          ? "¿Hablaba usted sin parar o tan deprisa que los demás tenían dificultad para entenderle?"
          : "¿Habla usted sin parar o tan deprisa que los demás tienen dificultad para entenderle?",
      };
    }

    if (q.id === "questionD3d") {
      return {
        ...q,
        text: flagActive
          ? "¿Sus pensamientos pasaban tan deprisa por su cabeza que tenía dificultades para seguirlos?"
          : "¿Sus pensamientos pasan tan deprisa por su cabeza que tiene dificultades para seguirlos?",
      };
    }

    if (q.id === "questionD3e") {
      return {
        ...q,
        text: flagActive
          ? "¿Se distraía tan fácilmente, que la menor interrupción le hacía perder el hilo de lo que estaba haciendo o pensando?"
          : "¿Se distrae tan fácilmente, que la menor interrupción le hace perder el hilo de lo que está haciendo o pensando?",
      };
    }

    if (q.id === "questionD3f") {
      return {
        ...q,
        text: flagActive
          ? "¿Estaba tan activo, tan inquieto físicamente que los demás se preocupaban por usted?"
          : "¿Está tan activo, tan inquieto físicamente que los demás se preocupan por usted?",
      };
    }

    if (q.id === "questionD3g") {
      return {
        ...q,
        text: flagActive
          ? "¿Quería involucrarse en actividades tan placenteras, que ignoró los riesgos o consecuencias (p. ej., se embarcó en gastos descontrolados, condujo imprudentemente o mantuvo actividades sexuales indiscretas)?"
          : "¿Quiere involucrarse en actividades tan placenteras, que ignora los riesgos o consecuencias (p. ej., se embarca en gastos descontrolados, conduce imprudentemente o mantiene actividades sexuales indiscretas)?",
      };
    }

    return q;
  });
  // Generar preguntas dinámicas si hay drogas seleccionadas
  if (
    answers["questionK1a_list"] &&
    Array.isArray(answers["questionK1a_list"])
  ) {
    const selectedDrugs = answers["questionK1a_list"];
    const drugQuestions = generateDrugQuestions(selectedDrugs);
    return [...baseQuestions, ...drugQuestions];
  }

  return baseQuestions;
}
