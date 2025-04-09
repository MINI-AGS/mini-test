import { Question, Flags } from "./types";

export const flags: Flags[] = [
  {
    id: "PastAnswers",
    dependsOn: (answers) => {
      return answers["questionD1b"] === "no" && answers["questionD2b"] === "no";
    },
  },
  {
    id: "AutoSetF2ToNo",
    dependsOn: (answers) => {
      return answers["questionF1"] === "no"; // Activa el flag si F1 es "no"
    },
  },
];
//============ En teoria no se deveia de mover
export const FlagFunctions = {
  isFlagActive: (flagId: string, answers: Record<string, string>): boolean => {
    const flag = flags.find((f) => f.id === flagId);
    return flag ? flag.dependsOn(answers) : false;
    console.log(flag);
  },
};
//================================================
