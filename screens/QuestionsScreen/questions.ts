//questions.ts
import { Question, Flags } from "./types";

export const questions: Question[] = [
  // Sección A
  {
    id: "questionA1",
    //En casod e que tel texto sea dinamico, usar __<id de la pregunta>_DYNAMIC__
    text: "__A1_DYNAMIC__",
    options: ["si", "no"], //
    section: "sectionA",
  },
  {
    id: "questionA2",
    text: "¿En las últimas 2 semanas, ha perdido el interés en la mayoría de las cosas o ha disfrutado menos de las cosas que usualmente le agradaban?",
    options: ["si", "no"],
    section: "sectionA",
  },
  // Preguntas de la sección A3
  {
    id: "questionA3a",
    text: "¿Disminuyó o aumentó su apetito casi todos los días? ¿Perdió o ganó peso sin intentarlo (p. ej., variaciones en el último mes de ± 5 % de su peso corporal o ± 8 libras o ± 3,5 kg para una persona de 160 libras/70 kg)?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "questionA3b",
    text: "¿Tenía dificultad para dormir casi todas las noches (dificultad para quedarse dormido, se despertaba a media noche, se despertaba temprano en la mañana o dormía excesivamente)?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "questionA3c",
    text: "¿Casi todos los días, hablaba o se movía usted más lento de lo usual, o estaba inquieto o tenía dificultades para permanecer tranquilo?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "questionA3d",
    text: "¿Casi todos los días, se sentía la mayor parte del tiempo fatigado o sin energía?",
    options: ["si", "no"],
    section: "sectionA3", //
  },
  {
    id: "questionA3e",
    text: "¿Casi todos los días, se sentía culpable o inútil?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "questionA3f",
    text: "¿Casi todos los días, tenía dificultad para concentrarse o tomar decisiones?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "questionA3g",
    text: "¿En varias ocasiones, deseó hacerse daño, se sintió suicida, o deseó estar muerto?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  // Sección A4a
  {
    id: "questionA4a",
    text: "¿En el transcurso de su vida, tuvo otros períodos de dos o más semanas, en los que se sintió deprimido o sin interés en la mayoría de las cosas y que tuvo la mayoría de los problemas de los que acabamos de hablar?",
    options: ["si", "no"],
    section: "sectionA4a",
  },
  // Sección A4b
  {
    id: "questionA4b",
    text: "¿Ha tenido alguna vez un período de por lo menos dos meses, sin depresión o sin la falta de interés en la mayoría de las cosas y ocurrió este período entre dos episodios depresivos?",
    options: ["si", "no"],
    section: "sectionA4b",
  },
  //pregunta de A5a es una condicion a evaluar despues a ¿CODIFICÓ SÍ EN A2?
  //modulo A5b
  {
    id: "questionA5b",
    text: "¿Durante el período más grave del episodio depresivo actual, perdió la capacidad de reaccionar a las cosas que previamente le daban placer o le animaban?",
    options: ["si", "no"],
    section: "sectionA5b",
  },
  // Sección A6
  {
    id: "questionA6a",
    text: "¿Se sentía deprimido de una manera diferente al tipo de sentimiento que ha experimentado cuando alguien cercano a usted se ha muerto?",
    options: ["si", "no"],
    section: "sectionA6",
  },
  {
    id: "questionA6b",
    text: "¿Casi todos los días, por lo regular se sentía peor en las mañanas?",
    options: ["si", "no"],
    section: "sectionA6",
  },
  {
    id: "questionA6c",
    text: "¿Casi todos los días, se despertaba por lo menos dos horas antes de su hora habitual,y tenía dificultades para volver a dormirse? ",
    options: ["si", "no"],
    section: "sectionA6",
  },
  // pregunta A6d es para codigo no para usuario ¿CODIFICÓ SÍ EN A3c (ENLENTECIMIENTO O AGITACIÓN PSICOMOTORA)?
  // pregunta A6d es para codigo no para usuari ¿CODIFICÓ SÍ EN A3a (ANOREXIA O PÉRDIDA DE PESO)?
  {
    id: "questionA6f",
    text: "¿Se sentía excesivamente culpable o era su sentimiento de culpa desproporcionado con la realidad de la situación? ",
    options: ["si", "no"],
    section: "sectionA6",
  },
  // Sección B1
  {
    id: "questionB1",
    text: "¿En los últimos 2 años, se ha sentido triste, desanimado o deprimido la mayor parte del tiempo?",
    options: ["si", "no"],
    section: "sectionB1",
  },
  {
    id: "questionB2",
    text: "¿Durante este tiempo, ha habido algún período de 2 meses o más, en el que se haya sentido bien?",
    options: ["si", "no"],
    section: "sectionB2",
  },
  {
    id: "questionB3a",
    text: "¿Cambió su apetito notablemente?",
    options: ["si", "no"],

    section: "sectionB3",
  },
  {
    id: "questionB3b",
    text: "¿Tuvo dificultad para dormir o durmió en exceso?",
    options: ["si", "no"],
    section: "sectionB3",
  },
  {
    id: "questionB3c",
    text: "¿Se sintió cansado o sin energía?",
    options: ["si", "no"],
    section: "sectionB3",
  },
  {
    id: "questionB3d",
    text: "¿Perdió la confianza en sí mismo?",
    options: ["si", "no"],
    section: "sectionB3",
  },
  {
    id: "questionB3e",
    text: "¿Tuvo dificultades para concentrarse o para tomar decisiones?",
    options: ["si", "no"],
    section: "sectionB3",
  },
  {
    id: "questionB3f",
    text: "¿Tuvo sentimientos de desesperanza?",
    options: ["si", "no"],
    section: "sectionB3",
  },
  {
    id: "questionB4",
    text: "¿Estos síntomas de depresión, le causaron gran angustia o han interferido con su función en el trabajo, socialmente o de otra manera importante?",
    options: ["si", "no"],
    section: "sectionB4",
  },
  //modulo c
  {
    id: "questionC1",
    text: "¿Ha pensado que estaría mejor muerto, o ha deseado estar muerto?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "questionC2",
    text: "¿Ha querido hacerse daño?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "questionC3",
    text: "¿Ha pensado en el suicidio?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "questionC4",
    text: "¿Ha planeado cómo suicidarse?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "questionC5",
    text: "¿Ha intentado suicidarse?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "questionC6",
    text: "¿Alguna vez ha intentado suicidarse?",
    options: ["si", "no"],
    section: "sectionC",
  },
  //section d
  {
    id: "questionD1a",
    text: "¿Alguna vez ha tenido un período de tiempo en el que se ha sentido exaltado,eufórico, o tan lleno de energía, o seguro de sí mismo, que esto le ha ocasionado problemas u otras personas han pensado que usted no estaba en su estado habitual? (No considere períodos en el que estaba intoxicado con drogas o alcohol.)",
    options: ["si", "no"],
    section: "sectionD12",
  },
  {
    id: "questionD1b",
    text: "¿En este momento se siente «exaltado», «eufórico», o lleno de energía?",
    options: ["si", "no"],
    section: "sectionD12",
  },
  {
    id: "questionD2a",
    text: "¿Ha estado usted alguna vez persistentemente irritado durante varios días, de tal manera que tenía discusiones, peleaba o le gritaba a personas fuera de su familia? ¿Ha notado usted o los demás, que ha estado más irritable o que reacciona de una manera exagerada,comparado a otras personas, en situaciones que incluso usted creía justificadas?  ",
    options: ["si", "no"],
    section: "sectionD12",
  },
  {
    id: "questionD2b",
    text: "¿En este momento se siente excesivamente irritable?",
    options: ["si", "no"],
    section: "sectionD12",
  },
  //aqui viene un condicional
  //SI D1b O D2b = SÍ: EXPLORAR SOLAMENTE EL EPISODIO ACTUAL
  //SI D1b Y D2b = NO: EXPLORAR EL EPISODIO PASADO MÁS SINTOMÁTICO
  {
    id: "questionD3a",
    text: "¿Sentía que podía hacer cosas que otros no podían hacer, o que usted era una persona especialmente importante?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "questionD3b",
    text: "¿Necesitaba dormir menos (p. ej., se sentía descansado con pocas horas de sueño)?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "questionD3c",
    text: "¿Hablaba usted sin parar o tan deprisa que los demás tenían dificultad para entenderle?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "questionD3d",
    text: "¿Sus pensamientos pasaban tan deprisa por su cabeza que tenía dificultades para seguirlos?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "questionD3e",
    text: "¿Se distraía tan fácilmente, que la menor interrupción le hacía perder el hilo de lo que estaba haciendo o pensando?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "questionD3f",
    text: "¿Estaba tan activo, tan inquieto físicamente que los demás se preocupaban por usted?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "questionD3g",
    text: "¿Quería involucrarse en actividades tan placenteras, que ignoró los riesgos o consecuencias (p. ej., se embarcó en gastos descontrolados, condujo imprudentemente o mantuvo actividades sexuales indiscretas)?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "questionD4",
    text: "¿Duraron estos síntomas al menos 1 semana y le causaron problemas que estaban fuera de su control, en la casa, en el trabajo, en la escuela, o fue usted hospitalizado a causa de estos problemas?",
    options: ["si", "no"],
    section: "sectionD4",
  },
  //section E
  {
    id: "questionE1a",
    text: "En más de una ocasión, tuvo una crisis o ataques en los cuales se sintió súbitamente ansioso, asustado, incómodo o inquieto, incluso en situaciones en la cual la mayoría de las personas no se sentirían así?",
    options: ["si", "no"],
    section: "sectionE1a",
  },
  {
    id: "questionE1b",
    text: "¿Estas crisis o ataques alcanzan su máxima expresión en los primeros 10 minutos?",
    options: ["si", "no"],
    section: "sectionE1b",
  },
  {
    id: "questionE2",
    text: "¿Alguna vez estas crisis o ataques o ocurrieron de una manera inesperada o espontánea u ocurrieron de forma impredecible o sin provocación?",
    options: ["si", "no"],
    section: "sectionE23",
  },
  {
    id: "questionE3",
    text: "¿Ha tenido una de estas crisis seguida por un período de un mes o más en el que temía que otro episodio recurriera o se preocupaba por las consecuencias de la crisis?",
    options: ["si", "no"],
    section: "sectionE23",
  },
  {
    id: "questionE4a",
    text: "¿Sentía que su corazón le daba un vuelco, latía más fuerte o más rápido?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4b",
    text: "¿Sudaba o tenía las manos húmedas?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4c",
    text: "¿Tenía temblores o sacudidas musculares?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4d",
    text: "¿Sentía la falta de aliento o dificultad para respirar?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4e",
    text: "¿Tenía sensación de ahogo o un nudo en la garganta?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4f",
    text: "¿Notaba dolor o molestia en el pecho?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4g",
    text: "¿Tenía náuseas, molestias en el estómago o diarreas repentinas?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4h",
    text: "¿Se sentía mareado, inestable, aturdido o a punto de desvanecerse?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4i",
    text: "¿Le parecía que las cosas a su alrededor eran irreales, extrañas, indiferentes,o no le parecían familiares, o se sintió fuera o separado de su cuerpo o de partes de su cuerpo?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4j",
    text: "¿Tenía miedo de perder el control o de volverse loco?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4k",
    text: "¿Tenía miedo de que se estuviera muriendo?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4l",
    text: "¿Tenía alguna parte de su cuerpo adormecida o con hormigueos?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "questionE4m",
    text: "¿Tenía sofocaciones o escalofríos?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  //e5 y e6 tienen condiciones especiales revisar
  {
    id: "questionE7",
    text: "¿En el pasado mes, tuvo estas crisis en varias ocasiones (2 o más), seguidas de miedo persistente a tener otra?",
    options: ["si", "no"],
    section: "sectionE7",
  },
  //section F
  {
    id: "QuestionF1",
    text: "¿Se ha sentido particularmente incómodo o ansioso en lugares o situaciones donde podría tener una crisis o ataque, o síntomas de una crisis como los que acabamos de discutir, o situaciones donde no dispondría de ayuda o escapar pudiera resultar un tanto difícil: como estar en una multitud, permanecer en fila, estar solo fuera de casa, permanecer solo en casa, viajar en autobús, tren o automóvil?",
    options: ["si", "no"],
    section: "sectionF1",
  },
  {
    id: "QuestionF2",
    text: "¿Teme tanto estas situaciones que las evita, sufre en ellas o necesita estar acompañado para enfrentarlas?",
    options: ["si", "no"],
    section: "sectionF2",
  },
  //section G
  {
    id: "questionG1",
    text: "¿En el pasado mes, tuvo miedo o sintió vergüenza de que lo estén observando, de ser el centro de atención o temió una humillación? Incluyendo cosas como el hablar en público, comer en público o con otros, el escribir mientras alguien le mira o el estar en situaciones sociales.",
    options: ["si", "no"],
    section: "sectionG1",
  },
  {
    id: "questionG2",
    text: "¿Piensa usted que este miedo es excesivo o irracional?",
    options: ["si", "no"],
    section: "sectionG2",
  },
  {
    id: "questionG3",
    text: "¿Teme tanto estas situaciones sociales que las evita, o sufre en ellas?",
    options: ["si", "no"],
    section: "sectionG3",
  },
  {
    id: "questionG4",
    text: "¿Este miedo interfiere en su trabajo normal o en el desempeño de sus actividades sociales o es la causa de intensa molestia?",
    options: ["si", "no"],
    section: "sectionG4",
  },
  //section H
  {
    id: "questionH1",
    text: "¿Este último mes, ha estado usted molesto con pensamientos recurrentes, impulsos o imágenes no deseadas, desagradables, inapropiadas, intrusas o angustiosas? (...)",
    options: ["si", "no"],
    section: "sectionH1",
  },
  {
    id: "questionH2",
    text: "¿Estos pensamientos volvían a su mente aun cuando trataba de ignorarlos o de librarse de ellos?",
    options: ["si", "no"],
    section: "sectionH2",
  },
  {
    id: "questionH3",
    text: "¿Cree usted que estos pensamientos son producto de su propia mente y que no le son impuestos desde el exterior?",
    options: ["si", "no"],
    section: "sectionH3",
  },
  {
    id: "questionH4",
    text: "¿En el pasado mes, ha hecho usted algo repetidamente, sin ser capaz de evitarlo, como lavar o limpiar en exceso (...)?",
    options: ["si", "no"],
    section: "sectionH4",
  },
  {
    id: "questionH5",
    text: "¿Reconoce usted que estas ideas obsesivas o actos compulsivos son irracionales, absurdos o excesivos?",
    options: ["si", "no"],
    section: "sectionH5",
  },
  {
    id: "questionH6",
    text: "¿Estas obsesiones o actos compulsivos interfieren de manera significativa con sus actividades cotidianas, con su trabajo, con sus relaciones sociales, o le ocupan más de una hora diaria?",
    options: ["si", "no"],
    section: "sectionH6",
  },
  //section I
  {
    id: "questionI1",
    text: "¿Ha vivido o ha sido testigo de un acontecimiento extremadamente traumático (...)?",
    options: ["si", "no"],
    section: "sectionI1",
  },
  {
    id: "questionI2",
    text: "¿Durante el pasado mes, ha revivido el evento de una manera angustiosa (...)?",
    options: ["si", "no"],
    section: "sectionI2",
  },
  {
    id: "questionI3a",
    text: "¿Ha evitado usted pensar en este acontecimiento, o en todo aquello que se lo pudiese recordar?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "questionI3b",
    text: "¿Ha tenido dificultad recordando alguna parte del evento?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "questionI3c",
    text: "¿Ha disminuido su interés en las cosas que le agradaban o en las actividades sociales?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "questionI3d",
    text: "¿Se ha sentido usted alejado o distante de otros?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "questionI3e",
    text: "¿Ha notado que sus sentimientos están adormecidos?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "questionI3f",
    text: "¿Ha tenido la impresión de que su vida se va a acortar debido a este trauma o que va a morir antes que otras personas?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "questionI4a",
    text: "¿Ha tenido usted dificultades para dormir?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "questionI4b",
    text: "¿Ha estado particularmente irritable o le daban arranques de coraje?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "questionI4c",
    text: "¿Ha tenido dificultad para concentrarse?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "questionI4d",
    text: "¿Ha estado nervioso o constantemente en alerta?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "questionI4e",
    text: "¿Se ha sobresaltado fácilmente por cualquier cosa?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "questionI5",
    text: "¿En el transcurso de este mes, han interferido estos problemas en su trabajo, en sus actividades sociales o han sido causa de gran ansiedad?",
    options: ["si", "no"],
    section: "sectionI5",
  },
  //section J
  // section J
  {
    id: "questionJ1",
    text: "¿Ha experimentado usted, durante el último mes, una tristeza o estado de ánimo deprimido la mayor parte del día, casi todos los días?",
    options: ["si", "no"],
    section: "sectionJ1",
  },
  {
    id: "questionJ2",
    text: "¿Ha perdido interés o placer en casi todas las actividades la mayor parte del día, casi todos los días?",
    options: ["si", "no"],
    section: "sectionJ2",
  },
  {
    id: "questionJ3",
    text: "¿Ha tenido cambios significativos en el apetito o el peso (aumento o pérdida) sin estar a dieta?",
    options: ["si", "no"],
    section: "sectionJ3",
  },
  {
    id: "questionJ4",
    text: "¿Ha tenido dificultades para dormir (insomnio o dormir demasiado)?",
    options: ["si", "no"],
    section: "sectionJ4",
  },
  {
    id: "questionJ5",
    text: "¿Ha sentido que se mueve o habla más lentamente de lo normal, o por el contrario, ha estado más inquieto de lo habitual?",
    options: ["si", "no"],
    section: "sectionJ5",
  },
  {
    id: "questionJ6",
    text: "¿Ha sentido fatiga o pérdida de energía casi todos los días?",
    options: ["si", "no"],
    section: "sectionJ6",
  },
  {
    id: "questionJ7",
    text: "¿Ha sentido sentimientos de inutilidad o culpa excesiva o inapropiada?",
    options: ["si", "no"],
    section: "sectionJ7",
  },
  {
    id: "questionJ8",
    text: "¿Ha tenido dificultad para concentrarse o tomar decisiones?",
    options: ["si", "no"],
    section: "sectionJ8",
  },
  {
    id: "questionJ9",
    text: "¿Ha tenido pensamientos recurrentes de muerte o suicidio, o ha pensado en hacerse daño?",
    options: ["si", "no"],
    section: "sectionJ9",
  },
  {
    id: "questionJ10",
    text: "¿Estos síntomas han interferido de manera significativa con su trabajo, su vida social o personal?",
    options: ["si", "no"],
    section: "sectionJ10",
  },
  //IMPORTANTEEEEEEEEEEEEEEEEEE  FALTA SECCION K,L,M
  /*
  {
    id: "QuestionK1a",
    text: "¿En los últimos 12 meses, tomó alguna de estas sustancias, en más de una ocasión,para sentirse mejor o para cambiar su estado de ánimo?",
    options: ["si", "no"],
    section: "sectionK1a",
  },
  */
  {
    id: "questionN1",
    text: "¿En los últimos 3 meses, se ha dado usted atracones, en los cuales comía grandes cantidades de alimentos en un período de 2 horas?",
    options: ["si", "no"],
    section: "sectionN1",
  },
  {
    id: "questionN2",
    text: "¿En los últimos 3 meses, se ha dado usted al menos 2 atracones por semana?",
    options: ["si", "no"],
    section: "sectionN2",
  },
  {
    id: "questionN3",
    text: "¿Durante estos atracones, se siente descontrolado comiendo?",
    options: ["si", "no"],
    section: "sectionN3",
  },
  {
    id: "questionN4",
    text: "¿Hace usted algo para compensar o evitar ganar peso como consecuencia de estos atracones, como vomitar, ayunar, practicar ejercicio, tomar laxantes, enemas, diuréticos (pastillas de agua) u otros medicamentos?",
    options: ["si", "no"],
    section: "sectionN4",
  },
  {
    id: "questionN5",
    text: "¿Influye grandemente en la opinión que usted tiene de sí mismo su peso o la figura de su cuerpo?",
    options: ["si", "no"],
    section: "sectionN5",
  },
  {
    id: "questionO1a",
    text: "¿Se ha sentido excesivamente preocupado o ansioso debido a varias cosas durante los últimos 6 meses?",
    options: ["si", "no"],
    section: "sectionO1a",
  },
  {
    id: "questionO1b",
    text: "¿Se presentan estas preocupaciones casi todos los días?",
    options: ["si", "no"],
    section: "sectionO1b",
  },
  {
    id: "questionO2",
    text: "¿Le resulta difícil controlar estas preocupaciones o interfieren para concentrarse en lo que hace?",
    options: ["si", "no"],
    section: "sectionO2",
  },
  {
    id: "questionO3a",
    text: "¿Se sentía inquieto, intranquilo o agitado?",
    options: ["si", "no"],
    section: "sectionO3",
  },
  {
    id: "questionO3b",
    text: "¿Se sentía tenso?",
    options: ["si", "no"],
    section: "sectionO3",
  },
  {
    id: "questionO3c",
    text: "¿Se sentía cansado, flojo o se agotaba fácilmente?",
    options: ["si", "no"],
    section: "sectionO3",
  },
  {
    id: "questionO3d",
    text: "¿Tenía dificultad para concentrarse, o notaba que la mente se le quedaba en blanco?",
    options: ["si", "no"],
    section: "sectionO3",
  },
  {
    id: "questionO3e",
    text: "¿Se sentía irritable?",
    options: ["si", "no"],
    section: "sectionO3",
  },
  {
    id: "questionO3f",
    text: "¿Tenía dificultad durmiendo (dificultad para quedarse dormido, se despertaba a media noche o demasiado temprano, o dormía en exceso)?",
    options: ["si", "no"],
    section: "sectionO3",
  },
  {
    id: "questionP1a",
    text: "¿Faltaba a la escuela o se escapaba y dormía fuera de casa con frecuencia?",
    options: ["si", "no"],
    section: "sectionP1",
  },
  {
    id: "questionP1b",
    text: "¿Mentía, hacía trampa, estafaba o robaba con frecuencia?",
    options: ["si", "no"],
    section: "sectionP1",
  },
  {
    id: "questionP1c",
    text: "¿Iniciaba peleas o incitaba a otros, los amenazaba o los intimidaba?",
    options: ["si", "no"],
    section: "sectionP1",
  },
  {
    id: "questionP1d",
    text: "¿Destruía cosas deliberadamente o empezaba fuegos?",
    options: ["si", "no"],
    section: "sectionP1",
  },
  {
    id: "questionP1e",
    text: "¿Maltrataba a los animales o a las personas deliberadamente?",
    options: ["si", "no"],
    section: "sectionP1",
  },
  {
    id: "questionP1f",
    text: "¿Forzó a alguien a tener relaciones sexuales con usted?",
    options: ["si", "no"],
    section: "sectionP1",
  },
  {
    id: "questionP2a",
    text: "¿Se ha comportado repetidamente de forma irresponsable (no pagar deudas, no trabajar para mantenerse)?",
    options: ["si", "no"],
    section: "sectionP2",
  },
  {
    id: "questionP2b",
    text: "¿Ha hecho cosas ilegales incluso sin ser descubierto (robar, vender drogas, etc.)?",
    options: ["si", "no"],
    section: "sectionP2",
  },
  {
    id: "questionP2c",
    text: "¿Ha participado repetidamente en peleas físicas (incluyendo con familia)?",
    options: ["si", "no"],
    section: "sectionP2",
  },
  {
    id: "questionP2d",
    text: "¿Ha mentido o estafado a otros para conseguir dinero o por placer?",
    options: ["si", "no"],
    section: "sectionP2",
  },
  {
    id: "questionP2e",
    text: "¿Ha expuesto a otros a peligros sin que le importara?",
    options: ["si", "no"],
    section: "sectionP2",
  },
  {
    id: "questionP2f",
    text: "¿No ha sentido culpabilidad después de hacerle daño a otros o robar?",
    options: ["si", "no"],
    section: "sectionP2",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
];
