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
      options: ["si", "no"],
    },
    {
      baseId: "K2b",
      text: (drug: string) =>
        `¿Cuando redujo o dejó de usar ${drug} tuvo síntomas de abstinencia?`,
      options: ["si", "no"],
    },
    {
      baseId: "K2c",
      text: (drug: string) =>
        `¿Cuando usaba ${drug} terminaba utilizando más de lo que había planeado?`,
      options: ["si", "no"],
    },
    {
      baseId: "K2d",
      text: (drug: string) =>
        `¿Ha tratado de reducir o dejar de tomar ${drug} pero ha fracasado?`,
      options: ["si", "no"],
    },
    {
      baseId: "K2e",
      text: (drug: string) =>
        `¿Los días que utilizaba ${drug} empleaba mucho tiempo (> 2 horas) en obtener, consumir, recuperarse de sus efectos, o pensando en drogas?`,
      options: ["si", "no"],
    },
    {
      baseId: "K2f",
      text: (drug: string) =>
        `¿Pasó menos tiempo trabajando, disfrutando de pasatiempos, estando con la familia o amigos debido a su uso de ${drug}?`,
      options: ["si", "no"],
    },
    {
      baseId: "K2g",
      text: (drug: string) =>
        `¿Ha continuado usando  ${drug} a pesar de saber que esto le causaba problemas mentales o de salud?`,
      options: ["si", "no"],
    },
    {
      baseId: "K3a",
      text: (drug: string) =>
        `¿Ha estado intoxicado o con resaca a causa de ${drug} en más de una ocasión, cuando tenía otras responsabilidades en la
        escuela,en el trabajo o en el hogar? ¿Esto le ocasionó algún problema?`,
      options: ["si", "no"],
    },
    {
      baseId: "K3b",
      text: (drug: string) =>
        `¿Ha estado intoxicado con ${drug} en alguna situación en la que corriese un riesgo físico (p. ej., conducir un automóvil,
        una motocicleta, una embarcación, o utilizar una máquina, etc.)?`,
      options: ["si", "no"],
    },
    {
      baseId: "K3c",
      text: (drug: string) =>
        `¿Ha tenido algún problema legal debido a su uso de  ${drug}por ejemplo, un arresto o perturbación del orden público?`,
      options: ["si", "no"],
    },
    {
      baseId: "K3d",
      text: (drug: string) =>
        `¿Ha continuado usando  ${drug} a pesar NO SÍ 11
        de saber que esto le causaba problemas con su familia u otras personas?`,
      options: ["si", "no"],
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

// Alturas y pesos mínimos para mujeres y hombres
const patientHeightWomen = [
  "144,8",
  "147,3",
  "149,9",
  "152,4",
  "154,9",
  "157,5",
  "160,0",
  "162,6",
  "165,1",
  "167,6",
  "170,2",
  "172,7",
  "175,3",
  "177,8",
];
const patientWeightWomen = [
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
];

const patientHeightMen = [
  "154,9",
  "157,5",
  "160,0",
  "162,6",
  "165,1",
  "167,6",
  "170,2",
  "172,7",
  "175,3",
  "177,8",
  "180,3",
  "182,9",
  "185,4",
  "188,0",
  "190,5",
];
const patientWeightMen = [
  "47",
  "48",
  "49",
  "50",
  "51",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "61",
];

// Función para encontrar el peso mínimo más cercano a una estatura
const findClosestWeight = (
  userHeight: number,
  heightList: string[],
  weightList: string[],
): string | null => {
  // Convertimos la lista de estaturas a números (reemplazando coma por punto)
  const parsedHeights = heightList.map((h) => parseFloat(h.replace(",", ".")));
  // Inicializamos el índice del más cercano al primero
  let closestIndex = 0;
  let minDiff = Math.abs(parsedHeights[0] - userHeight);

  // Recorremos las demás estaturas para encontrar la más cercana
  for (let i = 1; i < parsedHeights.length; i++) {
    const diff = Math.abs(parsedHeights[i] - userHeight);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  // Retornamos el peso correspondiente al índice más cercano
  return weightList[closestIndex] || null;
};

// Pregunta dinámica N7
// Generador de la pregunta dinámica N7, incluyendo el peso mínimo calculado
const generateN7Questions = (
  patientHeight?: string | null,
  isMale: boolean = true,
): Question => {
  // Seleccionamos la tabla de estaturas/pesos según el sexo
  const heightList = isMale ? patientHeightMen : patientHeightWomen;
  const weightList = isMale ? patientWeightMen : patientWeightWomen;

  // Convertimos la estatura ingresada a número (float)
  const height = patientHeight
    ? parseFloat(patientHeight.replace(",", "."))
    : null;

  // Obtenemos el peso mínimo más cercano
  const closestWeight =
    height !== null ? findClosestWeight(height, heightList, weightList) : null;

  // Retornamos el objeto tipo `Question` con el texto personalizado
  return {
    id: "questionN7",
    text: `¿Ocurren estos atracones solamente cuando está por debajo de (${closestWeight || "_____"} kg)?`,
    options: ["si", "no"],
    section: "sectionN7",
  };
};

export function getDiagnosisResult(answers: AnswerState): Diagnosis[] {
  return myDiagnoses.map((d: Diagnosis) => {
    // Solo modifica el diagnóstico específico
    if (d.id === "diagnosticD4_HipoManiaco") {
      const flagActive = FlagFunctions.isFlagActive(
        "PastAnswers",
        answers as Record<string, string>,
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
  const baseQuestions = questions.map((q: Question) => {
    const flagActive = FlagFunctions.isFlagActive(
      "PastAnswers",
      answers as Record<string, string>,
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

  // Obtenemos la estatura ingresada (puede venir como string o como arreglo)
  const rawHeight = answers["questionM1a"] || null;
  // Si viene como arreglo (ej. desde un form multiselect), tomamos el primer valor
  const estaturaIngresada = Array.isArray(rawHeight) ? rawHeight[0] : rawHeight;

  // Obtenemos el sexo del usuario (igual puede ser string o arreglo)
  const sexoRaw = answers["gender"];
  // Lo convertimos a texto plano y en minúsculas para comparar
  const sexo = Array.isArray(sexoRaw)
    ? sexoRaw[0]?.toLowerCase() || ""
    : sexoRaw?.toLowerCase() || "";

  // Determinamos si el usuario es hombre
  const esHombre = sexo.includes("hombre");

  // Generamos la pregunta N7 con el peso dinámico incluido
  const n7Question = generateN7Questions(estaturaIngresada, esHombre);

  // Si ya existe la pregunta N7, la reemplazamos; si no, la agregamos
  const n7Index = baseQuestions.findIndex(
    (q: Question) => q.id === "questionN7",
  );
  if (n7Index >= 0) {
    baseQuestions[n7Index] = n7Question;
  } else {
    baseQuestions.push(n7Question);
  }

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
