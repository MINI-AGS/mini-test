// questionRenderer.ts
import { questions } from "./questions";
import { FlagFunctions } from "./flags";
import { Question, AnswerState } from "./types";

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

export function getQuestionsWithDynamicText(answers: AnswerState): Question[] {
  // Preguntas base
  const baseQuestions = questions.map((q) => {
    if (q.id === "questionA1") {
      const flagActive = FlagFunctions.isFlagActive(
        "PastAnswers",
        answers as any,
      );
      return {
        ...q,
        text: flagActive
          ? "¿Sentía que tenía habilidades especiales o una misión importante que cumplir?"
          : "¿Sentía que podía hacer cosas que otros no podían hacer, o que usted era una persona especialmente importante?",
      };
    }
    return q;
  });

  // Generar preguntas dinámicas si hay drogas seleccionadas
  if (answers["questionK1a"] && Array.isArray(answers["questionK1a"])) {
    const selectedDrugs = answers["questionK1a"];
    const drugQuestions = generateDrugQuestions(selectedDrugs);
    return [...baseQuestions, ...drugQuestions];
  }

  return baseQuestions;
}
