// questionRenderer.ts
import { questions } from "./questions";
import { FlagFunctions } from "./flags";
import { Question } from "./types";

export function getQuestionsWithDynamicText(
  answers: Record<string, string>,
): Question[] {
  const flagActive = FlagFunctions.isFlagActive("PastAnswers", answers);

  return questions.map((q) => {
    if (q.id === "questionA1") {
      return {
        ...q,
        text: flagActive
          ? "¿Sentía que tenía habilidades especiales o una misión importante que cumplir?"
          : "¿Sentía que podía hacer cosas que otros no podían hacer, o que usted era una persona especialmente importante?",
      };
    }

    return q;
  });
}
