import { AnswerState, Flags } from "./types";

export const flags: Flags[] = [
  {
    id: "PastAnswers",
    dependsOn: (answers: AnswerState) => {
      return answers["questionD1b"] === "no" && answers["questionD2b"] === "no";
    },
  },
  {
    id: "AutoSetF2ToNo",
    dependsOn: (answers: AnswerState) => {
      return answers["questionF1"] === "no"; // Activa el flag si F1 es "no"
    },
  },
];

// En teoria no se deberia de mover
export const FlagFunctions = {
  isFlagActive: (flagId: string, answers: Record<string, string>): boolean => {
    const flag = flags.find((f) => f.id === flagId);
    //console.log(flag);
    return flag ? flag.dependsOn(answers) : false;
  },
};
