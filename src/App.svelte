<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import Radar from "./components/Radar.svelte";
  import Daily from "./components/Daily.svelte";
  import Circuit from "./components/Circuit.svelte";
  import NetSentimentBars from "./components/NetSentimentBars.svelte";
  import FilterBars from "./components/FilterBars.svelte";
  import * as TM from "./textos.svelte";
  import Graf9110 from "./components/graf9110.svelte";
  import ShareAiSocialMediaBars from "./components/ShareAISocialMediaBars.svelte";

  let globalIndex = 0;

  let welcomeText =
    "¡Hola! Este chat va a ser tu guía en el sitio web. Los pasos a seguir son simples: elegí una temática y seleccioná una pregunta para conocer más sobre diversos temas relacionados con inteligencia artificial, la perspectiva de la gente y comparar con tus opiniones.";

  let text1Trabajo =
    "En esta sección podrás descubrir y reflexionar acerca de si la inteligencia artificial y sus avances más recientes son positivos o negativos para el empleo a nivel global. Por el momento, se tiene a la IA como una herramienta más que como un reemplazo. Si bien es cierto que algunas tareas básicas las puede realizar en su totalidad un modelo automatizado por su cuenta, existen actividades que requieren cierta capacidad de análisis, pensamiento y empatía que estos modelos todavía no tienen, y no se sabe con exactitud si llegarán a tenerlos. Los humanos siguen siendo piezas esenciales y recursos indiscutibles para llevar a cabo muchos trabajos, pero es verdad, por otro lado, que actividades menos complejas podrían ser automatizadas y eso dejaría vulnerable a un sector de la población. ¿Vos qué pensás? ¿La inteligencia artificial va a reemplazar tu trabajo actual?";

  let text1Habitualidad =
    "¿Se usa en exceso la IA? ¿Se explotan sus beneficios en pos de la productividad? ¿Se utilizan en exceso  los modelos como Chat-GPT para todo tipo de tareas? La realidad es que la introducción y distribución de modelos abiertos y libres para su uso cambió el paradigma de la inteligencia artificial, antes utilizada especialmente para actividades de investigación, desarrollo o procesos esenciales en ciertas industrias (en el caso de los modelos más avanzados). En la actualidad se le dan cada vez más uso, y nació una concepción que asocia estos modelos como asistentes personales. Y vos, ¿conocías a Chat-GPT? ¿Lo usás seguido?";

  let textListAnswerHabitualidad = [
    "Sí, lo uso cada día.",
    "Los servicios ofrecidos por Chat GPT no solamente mostraron ser útiles, sino que también consistente, ya que dentro de sus usuarios un P% lo usa al menos una vez a la semana.",
    "graf-daily",
  ];

  let text1Lenguaje =
    "Chat-GPT es un modelo de inteligencia artificial creado por la empresa OpenIA, y está abierta al público desde el año 2021. Es una de las primeras herramientas de inteligencia artificial avanzadas en ser libre de uso para todo público. Se la utiliza para diversas aplicaciones, desde escribir ensayos simples hasta desarrollar programas complejos o crear imágenes a partir de indicaciones en formato de texto. Su impacto a nivel mundial ha ido y sigue agigantándose cada vez más, mientras que salen versiones de la herramienta con más funcionalidades, más conocimiento y respuestas cada vez más precisas. Realmente se ha convertido en un hito de estos últimos años. ¿Lo conocías?";

  let text2Lenguaje =
    "Frente a la popularidad de estos modelos de inteligencia artificial, se ha armado un gran debate sobre si la influencia de estos es positiva o negativa, es decir, cómo son percibidos por los usuarios. En base a publicaciones en redes sociales sobre estos, se armó un índice de opinión para determinar, para varios modelos, si se tenía una opinión positiva o negativa de cada uno. ¿Para vos estos modelos tienen impacto negativo o positivo en general?";

  let text3Lenguaje =
    "En el siguiente gráfico podés comparar la opinión que se tiene sobre diferentes modelos en diferentes trimestres de 2023. Un índice positivo se considera una mejor opinión que uno negativo (el índice toma valores entre -100 y 100). En particular, puede verse que los modelos con menor índice coinciden en gran parte con los más populares, debido a que son los más usados y por eso generan más debate al involucrar a una mayor cantidad de usuarios.";

  let text4Lenguaje =
    "En esta era de la inteligencia artificial, diversos lenguajes y modelos de IA han experimentado un crecimiento exponencial en cuanto a popularidad y uso, reflejando la adopción de la tecnología en distintos campos. A continuación, se presenta un gráfico que ilustra los lenguajes de IA más populares en el cuarto trimestre de 2023, basándonos en el índice de atención de las redes sociales.";

  let textListAnswerLenguaje = [
    "Positivo",
    "En el siguiente gráfico podés comparar la opinión que se tiene sobre diferentes modelos en diferentes trimestres de 2023. Un índice positivo se considera una mejor opinión que uno negativo (el índice toma valores entre -100 y 100). En particular, puede verse que los modelos con menor índice coinciden en gran parte con los más populares, debido a que son los más usados y por eso generan más debate al involucrar a una mayor cantidad de usuarios.",
    "graf-bar-sentiment",
  ];

  let topicsTexts = {
    Trabajo: ["¿Me voy a quedar sin trabajo a causa de la IA?", text1Trabajo],
    Habitualidad: [
      "¿Qué nivel de acceso se tiene a herramientas de inteligencia artificial sofisticadas hoy en día? ¿Es algo más bien exclusivo?",
      text1Habitualidad,
    ],
    Lenguajes: [
      "¿Qué  tipos de modelos de  IA existen? ¿Cualés son los más usados?",
      "En tan solo un par de años, muchos modelos de IA han logrado viralizarse y generaron fuertes discusiones por todo el mundo. Conocer estos modelos da una noción de las diferencias entre ellos.",
    ],
  };

  let messageTexts = {
    Trabajo: {
      "Riesgo de empleo": [
        "¿Me voy a quedar sin trabajo a causa de la IA?",
        text1Trabajo,
        "graf-radar",
        {
          "Sí, definitivamente.": [
            "Sí, definitivamente.",
            "Sorprendentemente, no muchas personas opinan como vos. La realidad es que los modelos de inteligencia artifical están avanzando a pasos agigantados pero no necesariamente va a pasar lo peor. Trabajar con esta nueva herramienta como potenciador es una opción viable.",
            "graf-radar",
            "graf-bar-filters",
          ],
          "No, para nada.": [
            "No, para nada.",
            "Eso! Hay que ser optimistas! Sorpresivamente muchas personas concuerdan con vos.",
            "graf-radar",
            "graf-bar-filters",
          ],
        },
      ],
    },
    Habitualidad: {
      "¿Que tanto se usa Chat-GPT?": [
        "¿Que tanto se usa Chat-GPT?",
        text1Habitualidad,
        {
          "Sí, lo uso cada día.": textListAnswerHabitualidad,
          "Sí, lo uso cada semana": textListAnswerHabitualidad,
          "Sí, lo uso raramente": textListAnswerHabitualidad,
          "No, no tenía idea": textListAnswerHabitualidad,
        },
      ],
    },
    Lenguajes: {
      "Chat-GPT": [
        "¿Qué es Chat-GPT? ¿Por qué todos hablan de él?",
        text1Lenguaje,
        {
          "Lo conozco y lo uso a menudo": [
            "Lo conozco y lo uso a menudo",
            "No sos el único, desde que salió su popularidad fue en ascenso sin descanso.",
          ],
          "Lo conozco pero no lo uso": [
            "Lo conozco pero no lo uso",
            "Hay bastante gente como vos, que todavía no incorporó la herramienta pese a conocer de su existencia. Sin embargo, muchos otros ya están inmersos en el uso de la IA en su vida diaria.",
          ],
          "No lo conocía": [
            "No lo conocía",
            "Raro, te lo presento: https://chatgpt.com/.",
          ],
        },
      ],
      "Impacto positivo/negativo": [
        "¿Estos modelos son buenos o malos?",
        text2Lenguaje,
        {
          Positivo: textListAnswerLenguaje,
          Negativo: textListAnswerLenguaje,
        },
      ],
      "Modelos más populares": [
        "¿Cuáles son los modelos más populares?",
        text4Lenguaje,
        "graf-bar-share",
        {
          "Unica opción": ["", ""],
        },
      ],
    },
  };

  let messagesAvailables = {
    Trabajo: ["Riesgo de empleo"],
    Habitualidad: ["¿Que tanto se usa Chat-GPT?"],
    Lenguajes: [
      "Chat-GPT",
      "Impacto positivo/negativo",
      "Modelos más populares",
    ],
  };

  console.log(messagesAvailables);

  let chat = [
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
    { mensaje: "", tipo: 1 },
    { mensaje: "", tipo: 0 },
  ];

  var i = 0;
  var speed = 1;

  function typeWrite(texto_respuesta, index, resolve) {
    let typing_id = "typing-indicator-" + index;

    if (i < texto_respuesta.length) {
      let name_id = "texto-respuesta-" + index;
      document.getElementById(name_id).innerHTML += texto_respuesta.charAt(i);
      i++;
      let typingIndicator = document.getElementById(typing_id);
      let textoRespuesta = document.getElementById(name_id);
      textoRespuesta.appendChild(typingIndicator);

      setTimeout(function () {
        typeWrite(texto_respuesta, index, resolve);
      }, speed);
    } else {
      document.getElementById(typing_id).style.display = "none";
      if (resolve) {
        resolve();
      }
    }
  }

  function mostrarTexto(mensaje, index) {
    return new Promise((resolve) => {
      let mensaje_id = "mensaje-" + index;
      i = 0;
      document.getElementById(mensaje_id).style.display = "flex";
      document
        .getElementById(mensaje_id)
        .scrollIntoView({ behaviour: "smooth" });
      typeWrite(mensaje, index, resolve);
    });
  }

  function mostrarBotones(sectionName, topic, nro_pregunta) {
    console.log(sectionName);

    let classNameOfButtonTouched;

    if (sectionName == "tematicas") {
      classNameOfButtonTouched = ".btn-" + sectionName;
    } else if (sectionName == "btn-opciones") {
      classNameOfButtonTouched =
        "." + sectionName + "-" + nro_pregunta + "-" + topic;
    } else {
      classNameOfButtonTouched = "." + sectionName + "-" + topic;
    }

    let buttonTouchedDiv = document.querySelectorAll(classNameOfButtonTouched);
    buttonTouchedDiv.forEach(function (button) {
      button.style.display = "flex";
    });
  }

  function ocultarBotones(sectionName, topic, nro_pregunta) {
    let classNameOfButtonTouched;

    if (sectionName == "btn-tematicas") {
      classNameOfButtonTouched = "." + sectionName;
    } else if (sectionName == "btn-opciones") {
      classNameOfButtonTouched =
        "." + sectionName + "-" + nro_pregunta + "-" + topic;
    } else {
      classNameOfButtonTouched = "." + sectionName + "-" + topic;
    }

    let buttonTouchedDiv = document.querySelectorAll(classNameOfButtonTouched);
    buttonTouchedDiv.forEach(function (button) {
      button.style.display = "none";
    });
  }

  function mostrarGrafico(graphicName, answeredText) {
    let messageId = "mensaje-" + globalIndex;
    console.log("MENSAJE", messageId);
    let message = document.getElementById(messageId);
    var DivGrafico = document.createElement("div");
    DivGrafico.className = "grafico";
    DivGrafico.style.justifyContent = "start";

    if (graphicName == "radar") {
      new Radar({
        target: DivGrafico,
        props: { p: 36, yes: answeredText[0].includes("Sí") },
      });
    } else if (graphicName == "bar-filters") {
      new FilterBars({
        target: DivGrafico,
      });
    } else if (graphicName == "bar-sentiment") {
      new NetSentimentBars({
        target: DivGrafico,
      });
    } else if (graphicName == "daily") {
      new Daily({
        target: DivGrafico,
      });
    } else if (graphicName == "bar") {
      new Graf9110({
        target: DivGrafico,
      });
    } else if (graphicName == "bar-share") {
      new ShareAiSocialMediaBars({
        target: DivGrafico,
      });
    }
    message.appendChild(DivGrafico);
  }

  async function nextSection(
    actualSectionName,
    nextSectionName,
    topic,
    nro_pregunta,
    textToShowList
  ) {
    let i = 0;
    for (let message of textToShowList) {
      if (message.slice(0, 4) == "graf") {
        await mostrarGrafico(message.slice(5, message.length), textToShowList);
      } else {
        await mostrarTexto(message, globalIndex);
      }
      if (i == 0) {
        globalIndex = globalIndex + 1;
      }
      i = i + 1;
    }
    globalIndex = globalIndex + 1;

    if (nextSectionName == "btn-reinicio") {
      mostrarBotones(nextSectionName, "all", nro_pregunta);
    } else {
      mostrarBotones(nextSectionName, topic, nro_pregunta);
    }
    ocultarBotones(actualSectionName, topic, nro_pregunta);
  }

  onMount(() => {
    mostrarTexto(welcomeText, 0);
    mostrarBotones("tematicas", "", 0);
    globalIndex = globalIndex + 1;
  });
</script>

<main>
  <div class="border-image"></div>
  <div class="container">
    <h3 class="headline">
      <b>IA y Opinión Pública</b>
    </h3>

    <div class="container">
      {#each chat as { mensaje, tipo }, index}
        {#if tipo == 0}
          <div
            class="mensaje-usuario"
            id="mensaje-{index}"
            style="display: none;"
          >
            <p id="texto-respuesta-{index}">
              <span class="typing-indicator" id="typing-indicator-{index}"
              ></span>
            </p>
          </div>
        {:else}
          <div style="display: flex;" class="mensaje-usuario chat">
            <div
              class="mensaje-usuario chat"
              id="mensaje-{index}"
              style="display: none; flex-direction: column; "
            >
              <div
                class="mensaje-usuario chat"
                style="flex-direction: row; align-items: flex-start; "
              >
                <img
                  src="../src/assets/compass.svg"
                  alt="Logo"
                  width="20px"
                  style="margin-top: 25px"
                />
                <p id="texto-respuesta-{index}" style="margin-left: 10px;">
                  <span class="typing-indicator" id="typing-indicator-{index}"
                  ></span>
                </p>
              </div>
            </div>
          </div>
        {/if}
      {/each}

      <div style="display: flex;">
        <!--<div>
          <input class="button-bar" type="button" value="Botones"/>
        </div>-->
        {#each Object.entries(messageTexts) as [tematica, preguntas]}
          <div>
            {#each Object.entries(preguntas) as [pregunta, opciones], nro_pregunta}
              <div
                id="respuestas-{nro_pregunta}-{tematica}"
                class="opciones-respuestas"
                style="display: flex;"
              >
                {#each Object.entries(opciones[opciones.length - 1]) as [opcion, respuesta]}
                  <input
                    class="botones-opciones btn-opciones-{nro_pregunta}-{tematica}"
                    type="button"
                    style="display: none;"
                    value={opcion}
                    on:click={() => {
                      nextSection(
                        "btn-opciones",
                        "btn-reinicio",
                        tematica,
                        nro_pregunta,
                        respuesta
                      );
                    }}
                  />
                {/each}
              </div>
              <div>
                <input
                  class="botones-opciones btn-preguntas-{tematica}"
                  type="button"
                  style="display: none;"
                  value={pregunta}
                  on:click={() => {
                    if (Object.keys(opciones[opciones.length - 1]).length > 1) {
                      nextSection(
                        "btn-preguntas",
                        "btn-opciones",
                        tematica,
                        nro_pregunta,
                        opciones.slice(0, opciones.length - 1)
                      );
                    } else {
                      nextSection(
                        "btn-preguntas",
                        "btn-reinicio",
                        tematica,
                        nro_pregunta,
                        opciones.slice(0, opciones.length - 1)
                      );
                    }
                  }}
                />
              </div>
            {/each}
          </div>
          <div>
            <input
              class="botones-opciones btn-tematicas"
              type="button"
              style="display: none;"
              value={tematica}
              on:click={() => {
                if (Object.keys(preguntas).length > 1) {
                  nextSection(
                    "btn-tematicas",
                    "btn-preguntas",
                    tematica,
                    0,
                    topicsTexts[tematica]
                  );
                } else {
                  nextSection(
                    "btn-tematicas",
                    "btn-opciones",
                    tematica,
                    0,
                    topicsTexts[tematica]
                  );
                }
              }}
            />
          </div>
        {/each}
      </div>

      <div>
        <input
          class="botones-opciones btn-reinicio-all"
          type="button"
          style="display: none;"
          value="Otro tema"
          on:click={() => {
            mostrarBotones("tematicas", "", 0);
            ocultarBotones("btn-reinicio", "all", 0);
          }}
        />
        <input
          class="btn-reinicio-trabajo"
          type="button"
          style="display: none;"
          value="Más preguntas de Trabajo"
          on:click={() => {
            mostrarBotones("tematicas", "", 0);
            ocultarBotones("btn-reinicio", "trabajo", 0);
          }}
        />
        <input
          class="btn-reinicio-habitualidad"
          type="button"
          style="display: none;"
          value="Más preguntas de Habitualidad"
          on:click={() => {
            mostrarBotones("tematicas", "", 0);
            ocultarBotones("btn-reinicio", "habitualidad", 0);
          }}
        />
        <input
          class="btn-reinicio-lenguaje"
          type="button"
          style="display: none;"
          value="Más preguntas de Lenguaje"
          on:click={() => {
            mostrarBotones("tematicas", "", 0);
            ocultarBotones("btn-reinicio", "lenguaje", 0);
          }}
        />
      </div>

      <!--<div>
          {#each Object.entries(messagesAvailables) as [topic, choiceAvailable]}
            <input class="btn-reinicio" type="button" style="display: none;" value={topic}/>
            {#each choiceAvailable as messageChoice}
              <input class="btn-reinicio-{topic}" type="button" style="display: none;" value={messageChoice}/>
            {/each}
          {/each}
        </div>-->
    </div>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,700;1,700&display=swap");
  :global(body) {
    background-color: #202021;
    /*font-family: "Roboto Mono", monospace;*/
    font-optical-sizing: auto;
    font-style: normal;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }

  .border-image {
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .border-image::before,
  .border-image::after {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    width: 15%;
    background-size: cover;
    background-repeat: repeat;
    z-index: 1;
  }

  .border-image::before {
    left: 0;
    background-image: url("../src/assets/border_left.png");
  }

  .border-image::after {
    right: 0;
    background-image: url("../src/assets/border_right.png");
  }

  input {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
  }

  input:enabled {
    cursor: pointer;
  }

  #image-buttons {
    cursor: pointer;
  }

  .centered-chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 463px;
    width: 100%;
    color: #fff;
    margin: 0 auto;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 80px;
  }

  .headline {
    font-family: "Roboto Mono", monospace;
    font-size: 60px;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 700;
    line-height: 1.2;
    font-weight: 100;
    text-align: center;
    margin: 20px;
  }
  .headline b {
    display: block;
  }

  .typing-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-left: 5px;
    border-radius: 50%;
    background-color: #fff; /* Cambia el color según tus necesidades */
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .botones {
    display: flex;
    position: fixed;
    right: 20px;
    bottom: 20px;
  }

  .button-bar {
    position: fixed;
    bottom: 20px;
    width: 500px;
    height: 50px;
    left: 380px;
    border-radius: 20px;
    background-color: #202021;
    color: white;
    border-color: black;
  }

  .boton-inicio {
    width: fit-content;
    height: 50px;
    color: #202021;
    border-radius: 5px;
    font-size: large;
  }

  .botones-opciones {
    width: fit-content;
    min-width: 100px;
    height: 50px;
    color: #202021;
    border-radius: 5px;
    font-size: large;
  }

  .botones-respuesta {
    width: 100px;
    height: 50px;
    color: #202021;
    border-radius: 5px;
    font-size: large;
  }

  #active {
    background-image: linear-gradient(
      rgba(164, 0, 247, 0.5),
      rgb(255, 120, 209, 0),
      rgba(164, 0, 247, 0.5)
    );
  }

  .mensaje-usuario {
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 1px;
    margin-right: 50px;
    background-color: #2e2f2e;
    width: 500px;
    align-self: flex-end;
    height: fit-content;
    font-size: 20px;
  }

  .chat {
    border-radius: 20px;
    padding-right: 10px;
    background-color: #202021;
    width: 900px;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    height: fit-content;
  }

  /* Estilos para el scroller */
  .foreground_container {
    pointer-events: none;
    padding-left: 50%;
  }

  .step_foreground {
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100vh;
    border: 1px solid rgba(0, 0, 0, 0.4);
    color: white;
    padding: 1em;
    margin: 0 0 2em 0;
  }
  .epi_foreground {
    padding: 20px;
    max-width: 150px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .lorem_ipsum {
    font-family: "Gentium Plus", serif;
    margin: 100px auto;
    max-width: 740px;
  }
  .image_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
