//questions.ts
import { Question } from "./types";

export const questions: Question[] = [
  // Sección A
  {
    id: "QuestionA1",
    text: "¿En las últimas 2 semanas, se ha sentido deprimido o decaído la mayor parte del día, casi todos los días?",
    options: ["si", "no"],
    section: "sectionA",
  },
  {
    id: "QuestionA2",
    text: "¿En las últimas 2 semanas, ha perdido el interés en la mayoría de las cosas o ha disfrutado menos de las cosas que usualmente le agradaban?",
    options: ["si", "no"],
    section: "sectionA",
  },
  // Preguntas de la sección A3
  {
    id: "QuestionA3a",
    text: "¿Disminuyó o aumentó su apetito casi todos los días? ¿Perdió o ganó peso sin intentarlo (p. ej., variaciones en el último mes de ± 5 % de su peso corporal o ± 8 libras o ± 3,5 kg para una persona de 160 libras/70 kg)?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "QuestionA3b",
    text: "¿Tenía dificultad para dormir casi todas las noches (dificultad para quedarse dormido, se despertaba a media noche, se despertaba temprano en la mañana o dormía excesivamente)?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "QuestionA3c",
    text: "¿Casi todos los días, hablaba o se movía usted más lento de lo usual, o estaba inquieto o tenía dificultades para permanecer tranquilo?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "QuestionA3d",
    text: "¿Casi todos los días, se sentía la mayor parte del tiempo fatigado o sin energía?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "QuestionA3e",
    text: "¿Casi todos los días, se sentía culpable o inútil?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "QuestionA3f",
    text: "¿Casi todos los días, tenía dificultad para concentrarse o tomar decisiones?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  {
    id: "QuestionA3g",
    text: "¿En varias ocasiones, deseó hacerse daño, se sintió suicida, o deseó estar muerto?",
    options: ["si", "no"],
    section: "sectionA3",
  },
  // Sección A4a
  {
    id: "QuestionA4a",
    text: "¿En el transcurso de su vida, tuvo otros períodos de dos o más semanas, en los que se sintió deprimido o sin interés en la mayoría de las cosas y que tuvo la mayoría de los problemas de los que acabamos de hablar?",
    options: ["si", "no"],
    section: "sectionA4a",
  },
  // Sección A4b
  {
    id: "QuestionA4b",
    text: "¿Ha tenido alguna vez un período de por lo menos dos meses, sin depresión o sin la falta de interés en la mayoría de las cosas y ocurrió este período entre dos episodios depresivos?",
    options: ["si", "no"],
    section: "sectionA4b",
  },
  //pregunta de A5a es una condicion a evaluar despues a ¿CODIFICÓ SÍ EN A2?
  //modulo A5b
  {
    id: "QuestionA5b",
    text: "¿Durante el período más grave del episodio depresivo actual, perdió la capacidad de reaccionar a las cosas que previamente le daban placer o le animaban?",
    options: ["si", "no"],
    section: "sectionA5b",
  },
  // Sección A6
  {
    id: "QuestionA6a",
    text: "¿Se sentía deprimido de una manera diferente al tipo de sentimiento que ha experimentado cuando alguien cercano a usted se ha muerto?",
    options: ["si", "no"],
    section: "sectionA6",
  },
  {
    id: "QuestionA6b",
    text: "¿Casi todos los días, por lo regular se sentía peor en las mañanas?",
    options: ["si", "no"],
    section: "sectionA6",
  },
  {
    id: "QuestionA6c",
    text: "¿Casi todos los días, se despertaba por lo menos dos horas antes de su hora habitual,y tenía dificultades para volver a dormirse? ",
    options: ["si", "no"],
    section: "sectionA6",
  },
  // pregunta A6d es para codigo no para usuario ¿CODIFICÓ SÍ EN A3c (ENLENTECIMIENTO O AGITACIÓN PSICOMOTORA)?
  // pregunta A6d es para codigo no para usuari ¿CODIFICÓ SÍ EN A3a (ANOREXIA O PÉRDIDA DE PESO)?
  {
    id: "QuestionA6f",
    text: "¿Se sentía excesivamente culpable o era su sentimiento de culpa desproporcionado con la realidad de la situación? ",
    options: ["si", "no"],
    section: "sectionA6",
  },
  // Sección B1
  {
    id: "QuestionB1",
    text: "¿En los últimos 2 años, se ha sentido triste, desanimado o deprimido la mayor parte del tiempo?",
    options: ["si", "no"],
    section: "sectionB1",
  },
  {
    id: "QuestionB2",
    text: "¿Durante este tiempo, ha habido algún período de 2 meses o más, en el que se haya sentido bien?",
    options: ["si", "no", "tal vez"],
    section: "sectionB2",
  },
  {
    id: "QuestionB3a",
    text: "¿Cambió su apetito notablemente?",
    section: "sectionB3",
  },
  {
    id: "QuestionB3b",
    text: "¿Tuvo dificultad para dormir o durmió en exceso?",
    section: "sectionB3",
  },
  {
    id: "QuestionB3c",
    text: "¿Se sintió cansado o sin energía?",
    section: "sectionB3",
  },
  {
    id: "QuestionB3d",
    text: "¿Perdió la confianza en sí mismo?",
    section: "sectionB3",
  },
  {
    id: "QuestionB3e",
    text: "¿Tuvo dificultades para concentrarse o para tomar decisiones?",
    section: "sectionB3",
  },
  {
    id: "QuestionB3f",
    text: "¿Tuvo sentimientos de desesperanza?",
    section: "sectionB3",
  },
  {
    id: "QuestionB4",
    text: "¿Estos síntomas de depresión, le causaron gran angustia o han interferido con su función en el trabajo, socialmente o de otra manera importante?",
    options: ["si", "no"],
    section: "sectionB4",
  },
  //modulo c
  {
    id: "QuestionC1",
    text: "¿Ha pensado que estaría mejor muerto, o ha deseado estar muerto?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "QuestionC2",
    text: "¿Ha querido hacerse daño?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "QuestionC3",
    text: "¿Ha pensado en el suicidio?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "QuestionC4",
    text: "¿Ha planeado cómo suicidarse?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "QuestionC5",
    text: "¿Ha intentado suicidarse?",
    options: ["si", "no"],
    section: "sectionC",
  },
  {
    id: "QuestionC6",
    text: "¿Alguna vez ha intentado suicidarse?",
    options: ["si", "no"],
    section: "sectionC",
  },
  //section d
  {
    id: "QuestionD1a",
    text: "¿Alguna vez ha tenido un período de tiempo en el que se ha sentido exaltado,eufórico, o tan lleno de energía, o seguro de sí mismo, que esto le ha ocasionado problemas u otras personas han pensado que usted no estaba en su estado habitual? (No considere períodos en el que estaba intoxicado con drogas o alcohol.)",
    options: ["si", "no"],
    section: "sectionD12",
  },
  {
    id: "QuestionD1b",
    text: "¿En este momento se siente «exaltado», «eufórico», o lleno de energía?",
    options: ["si", "no"],
    section: "sectionD12",
  },
  {
    id: "QuestionD2a",
    text: "¿Ha estado usted alguna vez persistentemente irritado durante varios días, de tal manera que tenía discusiones, peleaba o le gritaba a personas fuera de su familia? ¿Ha notado usted o los demás, que ha estado más irritable o que reacciona de una manera exagerada,comparado a otras personas, en situaciones que incluso usted creía justificadas?  ",
    options: ["si", "no"],
    section: "sectionD12",
  },
  {
    id: "QuestionD2b",
    text: "¿En este momento se siente excesivamente irritable?",
    options: ["si", "no"],
    section: "sectionD12",
  },
  //aqui viene un condicional
  //SI D1b O D2b = SÍ: EXPLORAR SOLAMENTE EL EPISODIO ACTUAL
  //SI D1b Y D2b = NO: EXPLORAR EL EPISODIO PASADO MÁS SINTOMÁTICO
  {
    id: "QuestionD3a",
    text: "¿Sentía que podía hacer cosas que otros no podían hacer, o que usted era una persona especialmente importante?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "QuestionD3b",
    text: "¿Necesitaba dormir menos (p. ej., se sentía descansado con pocas horas de sueño)?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "QuestionD3c",
    text: "¿Hablaba usted sin parar o tan deprisa que los demás tenían dificultad para entenderle?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "QuestionD3d",
    text: "¿Sus pensamientos pasaban tan deprisa por su cabeza que tenía dificultades para seguirlos?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "QuestionD3e",
    text: "¿Se distraía tan fácilmente, que la menor interrupción le hacía perder el hilo de lo que estaba haciendo o pensando?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "QuestionD3f",
    text: "¿Estaba tan activo, tan inquieto físicamente que los demás se preocupaban por usted?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "QuestionD3g",
    text: "¿Quería involucrarse en actividades tan placenteras, que ignoró los riesgos o consecuencias (p. ej., se embarcó en gastos descontrolados, condujo imprudentemente o mantuvo actividades sexuales indiscretas)?",
    options: ["si", "no"],
    section: "sectionD3",
  },
  {
    id: "QuestionD4",
    text: "¿Duraron estos síntomas al menos 1 semana y le causaron problemas que estaban fuera de su control, en la casa, en el trabajo, en la escuela, o fue usted hospitalizado a causa de estos problemas?",
    options: ["si", "no"],
    section: "sectionD4",
  },
  //section E
  {
    id: "QuestionE1a",
    text: "En más de una ocasión, tuvo una crisis o ataques en los cuales se sintió súbitamente ansioso, asustado, incómodo o inquieto, incluso en situaciones en la cual la mayoría de las personas no se sentirían así?",
    options: ["si", "no"],
    section: "sectionE1a",
  },
  {
    id: "QuestionE1b",
    text: "¿Estas crisis o ataques alcanzan su máxima expresión en los primeros 10 minutos?",
    options: ["si", "no"],
    section: "sectionE1b",
  },
  {
    id: "QuestionE2",
    text: "¿Alguna vez estas crisis o ataques o ocurrieron de una manera inesperada o espontánea u ocurrieron de forma impredecible o sin provocación?",
    options: ["si", "no"],
    section: "sectionE23",
  },
  {
    id: "QuestionE3",
    text: "¿Ha tenido una de estas crisis seguida por un período de un mes o más en el que temía que otro episodio recurriera o se preocupaba por las consecuencias de la crisis?",
    options: ["si", "no"],
    section: "sectionE23",
  },
  {
    id: "QuestionE4a",
    text: "¿Sentía que su corazón le daba un vuelco, latía más fuerte o más rápido?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4b",
    text: "¿Sudaba o tenía las manos húmedas?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4c",
    text: "¿Tenía temblores o sacudidas musculares?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4d",
    text: "¿Sentía la falta de aliento o dificultad para respirar?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4e",
    text: "¿Tenía sensación de ahogo o un nudo en la garganta?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4f",
    text: "¿Notaba dolor o molestia en el pecho?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4g",
    text: "¿Tenía náuseas, molestias en el estómago o diarreas repentinas?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4h",
    text: "¿Se sentía mareado, inestable, aturdido o a punto de desvanecerse?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4i",
    text: "¿Le parecía que las cosas a su alrededor eran irreales, extrañas, indiferentes,o no le parecían familiares, o se sintió fuera o separado de su cuerpo o de partes de su cuerpo?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4j",
    text: "¿Tenía miedo de perder el control o de volverse loco?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4k",
    text: "¿Tenía miedo de que se estuviera muriendo?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4l",
    text: "¿Tenía alguna parte de su cuerpo adormecida o con hormigueos?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  {
    id: "QuestionE4m",
    text: "¿Tenía sofocaciones o escalofríos?",
    options: ["si", "no"],
    section: "sectionE4",
  },
  //e5 y e6 tienen condiciones especiales revisar
  {
    id: "QuestionE7",
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
    id: "QuestionG1",
    text: "¿En el pasado mes, tuvo miedo o sintió vergüenza de que lo estén observando,de ser el centro de atención o temió una humillación? Incluyendo cosas como el hablar en público, comer en público o con otros, el escribir mientras alguien le mira o el estar en situaciones sociales.",
    options: ["si", "no"],
    section: "sectionG1",
  },
  {
    id: "QuestionG2",
    text: "¿Piensa usted que este miedo es excesivo o irracional?",
    options: ["si", "no"],
    section: "sectionG2",
  },
  {
    id: "QuestionG3",
    text: "¿Teme tanto estas situaciones sociales que las evita, o sufre en ellas?",
    options: ["si", "no"],
    section: "sectionG3",
  },
  {
    id: "QuestionG4",
    text: "¿Este miedo interfiere en su trabajo normal o en el desempeño de sus actividades sociales o es la causa de intensa molestia?",
    options: ["si", "no"],
    section: "sectionG4",
  },
  //section H
  {
    id: "QuestionH1",
    text: "¿Este último mes, ha estado usted molesto con pensamientos recurrentes, impulsos o imágenes no deseadas, desagradables, inapropiadas, intrusas o angustiosas? (p. ej., la idea de estar sucio, contaminado o tener gérmenes, o miedo de contaminar  otros, o temor de hacerle daño a alguien sin querer, o temor que actuaría en función e algún impulso, o tiene temores o supersticiones de ser el responsable de que las cosas vayan mal, o se obsesiona con pensamientos, imágenes o impulsos sexuales; o acumula o colecciona sin control, o tiene obsesiones religiosas)",
    options: ["si", "no"],
    section: "sectionH1",
  },
  {
    id: "QuestionH2",
    text: "¿Estos pensamientos volvían a su mente aun cuando trataba de ignorarlos o de librarse de ellos?",
    options: ["si", "no"],
    section: "sectionH2",
  },
  {
    id: "QuestionH3",
    text: "¿Cree usted que estos pensamientos son producto de su propia mente y que no le son impuestos desde el exterior?",
    options: ["si", "no"],
    section: "sectionH34",
  },
  {
    id: "QuestionH4",
    text: "¿En el pasado mes, ha hecho usted algo repetidamente, sin ser capaz de evitarlo, como lavar o limpiar en exceso, contar y verificar las cosas una y otra vez o repetir, coleccionar, ordenar las cosas o realizar otros rituales supersticiosos?",
    options: ["si", "no"],
    section: "sectionH34",
  },
  {
    id: "QuestionH5",
    text: "¿Reconoce usted que estas ideas obsesivas o actos compulsivos son irracionales,absurdos o excesivos?",
    options: ["si", "no"],
    section: "sectionH5",
  },
  {
    id: "QuestionH6",
    text: "¿Estas obsesiones o actos compulsivos interfieren de manera significativa con sus actividades cotidianas, con su trabajo, con sus relaciones sociales, o le ocupan más de una hora diaria?",
    options: ["si", "no"],
    section: "sectionH6",
  },
  //section I
  {
    id: "QuestionI1",
    text: "¿Ha vivido o ha sido testigo de un acontecimiento extremadamente traumático, en el cual otras personas han muerto y/u otras personas o usted mismo han estado amenazadas de muerte o en su integridad física? EJEMPLOS DE ACONTECIMIENTOS TRAUMÁTICOS: ACCIDENTES GRAVES, ATRACO, VIOLACIÓN, ATENTADO TERRORISTA, SER TOMADO DE REHÉN, SECUESTRO, INCENDIO, DESCUBRIR UN CADÁVER, MUERTE SÚBITA DE ALGUIEN CERCANO A USTED, GUERRA O CATÁSTROFE NATURAL",
    options: ["si", "no"],
    section: "sectionI1",
  },
  {
    id: "QuestionI2",
    text: "¿Durante el pasado mes, ha revivido el evento de una manera angustiosa (p. ej., lo ha soñado, ha tenido imágenes vívidas, ha reaccionado físicamente o ha tenido memorias intensas)?",
    options: ["si", "no"],
    section: "sectionI2",
  },
  {
    id: "QuestionI3a",
    text: "¿Ha evitado usted pensar en este acontecimiento, o en todo aquello que se lo pudiese recordar?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "QuestionI3b",
    text: "¿Ha tenido dificultad recordando alguna parte del evento?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "QuestionI3c",
    text: "¿Ha disminuido su interés en las cosas que le agradaban o en las actividades sociales?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "QuestionI3d",
    text: "¿Se ha sentido usted alejado o distante de otros?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "QuestionI3e",
    text: "¿Ha notado que sus sentimientos están adormecidos?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "QuestionI3f",
    text: "¿Ha tenido la impresión de que su vida se va a acortar debido a este trauma o que va a morir antes que otras personas?",
    options: ["si", "no"],
    section: "sectionI3",
  },
  {
    id: "QuestionI4a",
    text: "¿Ha tenido usted dificultades para dormir?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "QuestionI4b",
    text: "¿Ha estado particularmente irritable o le daban arranques de coraje?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "QuestionI4c",
    text: "¿Ha tenido dificultad para concentrarse?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "QuestionI4d",
    text: "¿Ha estado nervioso o constantemente en alerta?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "QuestionI4e",
    text: "¿Se ha sobresaltado fácilmente por cualquier cosa?",
    options: ["si", "no"],
    section: "sectionI4",
  },
  {
    id: "QuestionI5",
    text: "¿En el transcurso de este mes, han interferido estos problemas en su trabajo, en sus actividades sociales o han sido causa de gran ansiedad?",
    options: ["si", "no"],
    section: "sectionI5",
  },
  //section J
  {
    id: "QuestionJ1",
    text: "¿En los últimos 12 meses, ha tomado 3 o más bebidas alcohólicas en un período de 3 horas en tres o más ocasiones?",
    options: ["si", "no"],
    section: "sectionJ1",
  },
  {
    id: "QuestionJ2a",
    text: "¿Necesitaba beber más para conseguir los mismos efectos que cuando usted comenzó a beber?",
    options: ["si", "no"],
    section: "sectionJ2",
  },
  {
    id: "QuestionJ2b",
    text: "¿Cuando reducía la cantidad de alcohol, temblaban sus manos, sudaba, o se sentía agitado? ¿Bebía para evitar estos síntomas o para evitar la resaca (p. ej., temblores, sudoraciones o agitación)?",
    options: ["si", "no"],
    section: "sectionJ2",
  },
  {
    id: "QuestionJ2c",
    text: "¿Durante el tiempo en el que bebía alcohol, acababa bebiendo más de lo que en un principio había planeado?",
    options: ["si", "no"],
    section: "sectionJ2",
  },
  {
    id: "QuestionJ2d",
    text: "¿Ha tratado de reducir o dejar de beber alcohol pero ha fracasado?",
    options: ["si", "no"],
    section: "sectionJ2",
  },
  {
    id: "QuestionJ2e",
    text: "¿Los días en los que bebía, empleaba mucho tiempo en procurarse alcohol, en beber y en recuperarse de sus efectos?",
    options: ["si", "no"],
    section: "sectionJ2",
  },
  {
    id: "QuestionJ2f",
    text: "¿Pasó menos tiempo trabajando, disfrutando de sus pasatiempos, o estando con otros, debido a su consumo de alcohol?",
    options: ["si", "no"],
    section: "sectionJ2",
  },
  {
    id: "QuestionJ2g",
    text: "¿Continuó bebiendo a pesar de saber que esto le causaba problemas de salud, físicos o mentales?",
    options: ["si", "no"],
    section: "sectionJ2",
  },
  {
    id: "QuestionJ3a",
    text: "¿Ha estado usted varias veces intoxicado, embriagado, o con resaca en más de una ocasión, cuando tenía otras responsabilidades en la escuela, el trabajo o la casa? ¿Esto le ocasionó algún problema?",
    options: ["si", "no"],
    section: "sectionJ3",
  },
  {
    id: "QuestionJ3b",
    text: "¿Ha estado intoxicado en alguna situación en la que corría un riesgo físico, por ejemplo conducir un automóvil, una motocicleta, una embarcación, utilizar una máquina, etc.)?",
    options: ["si", "no"],
    section: "sectionJ3",
  },
  {
    id: "QuestionJ3c",
    text: "¿Ha tenido problemas legales debido a su uso de alcohol, por ejemplo un arresto, perturbación del orden público?",
    options: ["si", "no"],
    section: "sectionJ3",
  },
  {
    id: "QuestionJ3d",
    text: "¿Ha continuado usted bebiendo a pesar de saber que esto le ocasionaba problemas con su familia u otras personas?",
    options: ["si", "no"],
    section: "sectionJ3",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
  {
    id: "",
    text: "",
    options: ["si", "no"],
    section: "",
  },
];
