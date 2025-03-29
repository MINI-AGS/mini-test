// Definición de interfaces
export interface Question {
  id: string;
  text: string;
  options?: string[]; // Opciones para las preguntas, si las tiene
}

export interface Module {
  id: string;
  title: string;
  questions: Question[]; // Lista de preguntas en el módulo
  defaultAnswer?: string; // Respuesta predeterminada (si la hay)
}

// Función para determinar si se deben mostrar las preguntas A4a
export const shouldShowA4aQuestions = (selectedAnswers: {
  [key: string]: string;
}) => {
  // Contar cuántas respuestas "sí" se dieron en las preguntas clave (A1, A2, A3a - A3g)
  const totalYes = [
    selectedAnswers["questionA1"],
    selectedAnswers["questionA2"],
    selectedAnswers["questionA3a"],
    selectedAnswers["questionA3b"],
    selectedAnswers["questionA3c"],
    selectedAnswers["questionA3d"],
    selectedAnswers["questionA3e"],
    selectedAnswers["questionA3f"],
    selectedAnswers["questionA3g"],
  ].filter((answer) => answer === "si").length;

  console.log("Total de respuestas 'sí':", totalYes); // Para depuración

  // Si hay 5 o más respuestas "sí", mostrar las preguntas A4a
  return totalYes >= 5;
};

// Función para determinar si redirigir al Módulo B
export const showModuleB = (selectedAnswers: { [key: string]: string }) => {
  // 1. Si la respuesta a A4a es "no", redirigir al módulo B directamente
  const a4aNo = selectedAnswers["questionA4a"] === "no";

  // 2. Si A1 y A2 son ambas "no", redirigir al módulo B si no hay suficientes respuestas "sí" para A4a
  const a1AndA2No =
    selectedAnswers["questionA1"] === "no" &&
    selectedAnswers["questionA2"] === "no";

  // 3. Verificar si no hay suficientes respuestas "sí" para mostrar A4a
  const noSufficientYesForA4a = !shouldShowA4aQuestions(selectedAnswers);

  console.log(
    "Redirigir a módulo B: ",
    a4aNo || (a1AndA2No && noSufficientYesForA4a),
  ); // Para depuración

  // Redirige al módulo B si alguna de las condiciones anteriores es verdadera
  return a4aNo || (a1AndA2No && noSufficientYesForA4a);
};

// Función para definir los módulos y preguntas dinámicamente
export const modules = (selectedAnswers: {
  [key: string]: string;
}): Module[] => {
  // Condición para mostrar las preguntas A3 (solo si A1 o A2 son "sí")
  const shouldShowA3Questions =
    selectedAnswers["questionA1"] === "si" ||
    selectedAnswers["questionA2"] === "si";

  // Determina si mostrar A4a y A4b según las respuestas
  const showA4aQuestions = shouldShowA4aQuestions(selectedAnswers);
  const showA4bQuestions = selectedAnswers["questionA4a"] === "si";

  // Determina si redirigir al módulo B
  const redirectToModuleB = showModuleB(selectedAnswers);

  // Definición de los módulos y sus preguntas
  return [
    {
      id: "datosPersonales",
      title: "Datos personales",
      questions: [
        { id: "1", text: "¿Cuál es tu nombre?" },
        { id: "2", text: "¿Cuál es tu edad?" },
        { id: "3", text: "¿Te gusta programar?", options: ["si", "no"] },
      ],
    },
    {
      id: "moduloA",
      title: "Módulo A: Episodio depresivo mayor",
      questions: [
        {
          id: "questionA1",
          text: "¿En las últimas 2 semanas, se ha sentido deprimido o decaído la mayor parte del día, casi todos los días?",
          options: ["si", "no"],
        },
        {
          id: "questionA2",
          text: "¿En las últimas 2 semanas, ha perdido el interés en la mayoría de las cosas o ha disfrutado menos de las cosas que usualmente le agradaban?",
          options: ["si", "no"],
        },
        // A3a - A3g se muestran solo si A1 o A2 son "sí"
        ...(shouldShowA3Questions
          ? [
              {
                id: "questionA3a",
                text: "¿Disminuyó o aumentó su apetito casi todos los días? ¿Perdió o ganó peso sin intentarlo (p. ej., variaciones en el último mes de ± 5 % de su peso corporal o ± 8 libras o ± 3,5 kg para una persona de 160 libras/70 kg)?",
                options: ["si", "no"],
              },
              {
                id: "questionA3b",
                text: "¿Tenía dificultad para dormir casi todas las noches (dificultad para quedarse dormido, se despertaba a media noche, se despertaba temprano en la mañana o dormía excesivamente)?",
                options: ["si", "no"],
              },
              {
                id: "questionA3c",
                text: "¿Casi todos los días, hablaba o se movía usted más lento de lo usual, o estaba inquieto o tenía dificultades para permanecer tranquilo?",
                options: ["si", "no"],
              },
              {
                id: "questionA3d",
                text: "¿Casi todos los días, se sentía la mayor parte del tiempo fatigado o sin energía?",
                options: ["si", "no"],
              },
              {
                id: "questionA3e",
                text: "¿Casi todos los días, se sentía culpable o inútil?",
                options: ["si", "no"],
              },
              {
                id: "questionA3f",
                text: "¿Casi todos los días, tenía dificultad para concentrarse o tomar decisiones?",
                options: ["si", "no"],
              },
              {
                id: "questionA3g",
                text: "¿En varias ocasiones, deseó hacerse daño, se sintió suicida, o deseó estar muerto?",
                options: ["si", "no"],
              },
            ]
          : []),
        //si el usuario codifica 5 o mas desde A1/ A3 entonces tiene episodio depresivo mayor y pasa a estar
        //lo manda a A4a
        ...(shouldShowA4aQuestions(selectedAnswers)
          ? [
              {
                id: "questionA4a",
                text: "¿En el transcurso de su vida, tuvo otros períodos de dos o más semanas, en los que se sintió deprimido o sin interés en la mayoría de las cosas y que tuvo la mayoría de los problemas de los que acabamos de hablar?",
                options: ["si", "no"],
              },
            ]
          : []),
        //si da que "si" a A4a entonces imprime A4b
        ...(showA4bQuestions
          ? [
              {
                id: "questionA4b",
                text: "¿Ha tenido alguna vez un período de por lo menos dos meses, sin depresión o sin la falta de interés en la mayoría de las cosas y ocurrió este período entre dos episodios depresivos?",
                options: ["si", "no"],
              },
            ]
          : []),
        // si dice que si a A4b tiene EPISODIO DEPRESIVO MAYOR RECIDIVANTE
        // si dice que no, nos vamos a A2a y A5b
      ],
    },
    ...(redirectToModuleB
      ? [
          {
            id: "moduloB",
            title: "Módulo B: Trastorno distímico",
            questions: [
              {
                id: "questionB1",
                text: "¿En los últimos 2 años, se ha sentido triste, desanimado o deprimido la mayor parte del tiempo? ",
                options: ["si", "no"],
              },
              {
                id: "questionB2",
                text: "¿Durante este tiempo, ha habido algún período de 2 meses o más, en el que se haya",
                options: ["si", "no"],
              },
              {
                id: "questionB3a",
                text: "¿Cambió su apetito notablemente?",
                options: ["si", "no"],
              },
              {
                id: "questionB3b",
                text: "¿Tuvo dificultad para dormir o durmió en exceso?",
                options: ["si", "no"],
              },
              {
                id: "questionB3c",
                text: "¿Se sintió cansado o sin energía?",
                options: ["si", "no"],
              },
              {
                id: "questionB3d",
                text: "¿Perdió la confianza en sí mismo?",
                options: ["si", "no"],
              },
              {
                id: "questionB3e",
                text: "¿Tuvo dificultades para concentrarse o para tomar decisiones?",
                options: ["si", "no"],
              },
              {
                id: "questionB3f",
                text: "¿Tuvo sentimientos de desesperanza?",
                options: ["si", "no"],
              },
              {
                id: "questionB4",
                text: "¿Estos síntomas de depresión, le causaron gran angustia o han interferido con su función en el trabajo, socialmente o de otra manera importante?",
                options: ["si", "no"],
              },
            ],
          },
        ]
      : []),
    {
      id: "moduloC",
      title: "Módulo C: Riesgo de suicidio",
      questions: [
        {
          id: "questionC1",
          text: "¿Ha pensado que estaría mejor muerto, o ha deseado estar muerto?",
          options: ["si", "no"],
        },
        {
          id: "questionC2",
          text: "¿Ha querido hacerse daño?",
          options: ["si", "no"],
        },
        {
          id: "questionC3",
          text: "¿Ha pensado en el suicidio?",
          options: ["si", "no"],
        },
        {
          id: "questionC4",
          text: "¿Ha planeado cómo suicidarse?",
          options: ["si", "no"],
        },
        {
          id: "questionC5",
          text: "¿Ha intentado suicidarse?",
          options: ["si", "no"],
        },
        {
          id: "questionC6",
          text: "¿Alguna vez ha intentado suicidarse?",
          options: ["si", "no"],
        },
      ],
    },
    {
      id: "moduloD",
      title: "Módulo D: Episodio (hipo)maníaco",
      questions: [
        {
          id: "questionD1a",
          text: "¿Alguna vez ha tenido un período de tiempo en el que se ha sentido exaltado,eufórico, o tan lleno de energía, o seguro de sí mismo, que esto le ha ocasionado problemas u otras personas han pensado que usted no estaba en su estado habitual? (No considere períodos en el que estaba intoxicado con drogas o alcohol.) ",
          options: ["si", "no"],
        },
        {
          id: "questionD1b",
          text: "¿En este momento se siente «exaltado», «eufórico», o lleno de energía??",
          options: ["si", "no"],
        },
        {
          id: "questionD2a",
          text: "¿Ha estado usted alguna vez persistentemente irritado durante varios días, de tal manera que tenía discusiones, peleaba o le gritaba a personas fuera de su familia? ¿Ha notado usted o los demás, que ha estado más irritable o que reacciona de una manera exagerada,comparado a otras personas, en situaciones que incluso usted creía justificadas? ",
          options: ["si", "no"],
        },
        {
          id: "questionD2b",
          text: "¿En este momento se siente excesivamente irritable?",
          options: ["si", "no"],
        },
        {
          id: "questionD3a",
          text: "¿Sentía que podía hacer cosas que otros no podían hacer, o que usted era una persona especialmente importante?",
          options: ["si", "no"],
        },
        {
          id: "questionD3b",
          text: "¿Necesitaba dormir menos (p. ej., se sentía descansado con pocas horas de sueño)?",
          options: ["si", "no"],
        },
        {
          id: "questionD3c",
          text: "¿Hablaba usted sin parar o tan deprisa que los demás tenían dificultad para entenderle?",
          options: ["si", "no"],
        },
        {
          id: "questionD3d",
          text: "¿Sus pensamientos pasaban tan deprisa por su cabeza que tenía dificultades para seguirlos?",
          options: ["si", "no"],
        },
        {
          id: "questionD3e",
          text: "¿Se distraía tan fácilmente, que la menor interrupción le hacía perder el hilo de lo que estaba haciendo o pensando? ",
          options: ["si", "no"],
        },
        {
          id: "questionD3f",
          text: "¿Estaba tan activo, tan inquieto físicamente que los demás se preocupaban por usted?",
          options: ["si", "no"],
        },
        {
          id: "questionD3g",
          text: "¿Quería involucrarse en actividades tan placenteras, que ignoró los riesgos o consecuencias (p. ej., se embarcó en gastos descontrolados, condujo imprudentemente o mantuvo actividades sexuales indiscretas)? ",
          options: ["si", "no"],
        },
        {
          id: "questionD4",
          text: "¿Duraron estos síntomas al menos 1 semana y le causaron problemas que estaban fuera de su control, en la casa, en el trabajo, en la escuela, o fue usted hospitalizado a causa de estos problemas? ",
          options: ["si", "no"],
        },
      ],
    },
    {
      id: "moduloE",
      title: "Módulo E: Trastorno de angustia",
      questions: [
        {
          id: "questionE1a",
          text: "¿En más de una ocasión, tuvo una crisis o ataques en los cuales se sintió súbitamente ansioso, asustado, incómodo o inquieto, incluso en situaciones en la cual la mayoría de las personas no se sentirían así?",
          options: ["si", "no"],
        },
        {
          id: "questionE1b",
          text: "¿Estas crisis o ataques alcanzan su máxima expresión en los primeros 10 minutos?",
          options: ["si", "no"],
        },
        {
          id: "QuestionE2",
          text: "¿Alguna vez estas crisis o ataques o ocurrieron de una manera inesperada o espontánea u ocurrieron de forma impredecible o sin provocación?",
          options: ["si", "no"],
        },
        {
          id: "questionE3",
          text: "¿Ha tenido una de estas crisis seguida por un período de un mes o más en el que temía que otro episodio recurriera o se preocupaba por las consecuencias de la crisis?",
          options: ["si", "no"],
        },
        {
          id: "questionE4a",
          text: "¿Sentía que su corazón le daba un vuelco, latía más fuerte o más rápido?",
          options: ["si", "no"],
        },
        {
          id: "questionE4b",
          text: "¿Sudaba o tenía las manos húmedas?",
          options: ["si", "no"],
        },
        {
          id: "questionE4c",
          text: "¿Tenía temblores o sacudidas musculares?",
          options: ["si", "no"],
        },
        {
          id: "questionE4d",
          text: "¿Sentía la falta de aliento o dificultad para respirar?",
          options: ["si", "no"],
        },
        {
          id: "questionE4e",
          text: "¿Tenía sensación de ahogo o un nudo en la garganta?",
          options: ["si", "no"],
        },
        {
          id: "questionE4f",
          text: "¿Notaba dolor o molestia en el pecho?",
          options: ["si", "no"],
        },
        {
          id: "questionE4g",
          text: "¿Tenía náuseas, molestias en el estómago o diarreas repentinas?",
          options: ["si", "no"],
        },
        {
          id: "questionE4h",
          text: "¿Se sentía mareado, inestable, aturdido o a punto de desvanecerse?",
          options: ["si", "no"],
        },
        {
          id: "questionE4i",
          text: "¿Le parecía que las cosas a su alrededor eran irreales, extrañas, indiferentes,o no le parecían familiares, o se sintió fuera o separado de su cuerpo o de partes de su cuerpo? ",
          options: ["si", "no"],
        },
        {
          id: "questionE4j",
          text: "¿Tenía miedo de perder el control o de volverse loco?",
          options: ["si", "no"],
        },
        {
          id: "questionE4k",
          text: "¿Tenía miedo de que se estuviera muriendo?",
          options: ["si", "no"],
        },
        {
          id: "questionE4l",
          text: "¿Tenía alguna parte de su cuerpo adormecida o con hormigueos?",
          options: ["si", "no"],
        },
        {
          id: "questionE4m",
          text: "¿Tenía sofocaciones o escalofríos?",
          options: ["si", "no"],
        },
        {
          id: "questionE5",
          text: "¿Tenía sofocaciones o escalofríos?",
          options: ["si", "no"],
        },
      ],
    },
    {
      id: "moduloC",
      title: "Módulo A: Episodio depresivo mayor",
      questions: [
        {
          id: "questionA1",
          text: "¿En las últimas 2 semanas, se ha sentido deprimido o decaído la mayor parte del día, casi todos los días?",
          options: ["si", "no"],
        },
        {
          id: "questionA2",
          text: "¿En las últimas 2 semanas, ha perdido el interés en la mayoría de las cosas o ha disfrutado menos de las cosas que usualmente le agradaban?",
          options: ["si", "no"],
        },
      ],
    },
  ];
};
