<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import Radar from "./components/Radar.svelte";
  import MapaDaily from "./components/MapaDaily.svelte";
  import Circuit from "./components/Circuit.svelte";
  import NetSentimentBars from "./components/NetSentimentBars.svelte";

  let texto_Trabajo =
    "Por el momento, se tiene a la IA como una herramienta más que como un reemplazo. Si bien es cierto que algunas tareas básicas las puede realizar en su totalidad un modelo automatizado por su cuenta, existen actividades que requieren cierta capacidad de análisis, pensamiento y empatía que estos modelos todavía no tienen, y no se sabe con exactitud si llegarán a tenerlos. Los humanos siguen siendo piezas esenciales y recursos indiscutibles para llevar a cabo muchos trabajos, pero es verdad, por otro lado, que actividades menos complejas podrían ser automatizadas y eso dejaría vulnerable a un sector de la población. ¿Vos qué pensás? ¿La inteligencia artificial va a reemplazar tu trabajo actual?";

  let texto_UsoCotidiano =
    "¿Se usa en exceso la IA? ¿Se explotan sus beneficios en pos de la productividad? ¿Se utilizan en exceso  los modelos como Chat-GPT para todo tipo de tareas? La realidad es que la introducción y distribución de modelos abiertos y libres para su uso cambió el paradigma de la inteligencia artificial, antes utilizada especialmente para actividades de investigación, desarrollo o procesos esenciales en ciertas industrias (en el caso de los modelos más avanzados). En la actualidad se le dan cada vez más uso, y nació una concepción que asocia estos modelos como asistentes personales. Y vos, ¿conocías a Chat-GPT? ¿Lo usás seguido?";

  let texto_Lenguaje2 =
    "Frente a la popularidad de estos modelos de inteligencia artificial, se ha armado un gran debate sobre si la influencia de estos es positiva o negativa, es decir, cómo son percibidos por los usuarios. En base a publicaciones en redes sociales sobre estos, se armó un índice de opinión para determinar, para varios modelos, si se tenía una opinión positiva o negativa de cada uno. ¿Para vos estos modelos tienen impacto negativo o positivo en general?";

  let texto_Lenguaje =
    "Chat-GPT es un modelo de inteligencia artificial creado por la empresa OpenIA, y está abierta al público desde el año 2021. Es una de las primeras herramientas de inteligencia artificial avanzadas en ser libre de uso para todo público. Se la utiliza para diversas aplicaciones, desde escribir ensayos simples hasta desarrollar programas complejos o crear imágenes a partir de indicaciones en formato de texto. Su impacto a nivel mundial ha ido y sigue agigantándose cada vez más, mientras que salen versiones de la herramienta con más funcionalidades, más conocimiento y respuestas cada vez más precisas. Realmente se ha convertido en un hito de estos últimos años. ¿Lo conocías?";

  let texto_Lenguaje3 =
    "En esta era de la inteligencia artificial, diversos lenguajes y modelos de IA han experimentado un crecimiento exponencial en cuanto a popularidad y uso, reflejando la adopción de la tecnología en distintos campos. A continuación, se presenta un gráfico que ilustra los lenguajes de IA más populares en el cuarto trimestre de 2023, basándonos en el índice de atención de las redes sociales.";

  let respuestas_por_pregunta = [
    ["Sí", "No"],
    ["Mucho", "No se"],
    ["si3", "no3"],
  ];
  let tematicas = {
    Trabajo: [
      [
        "¿Cómo afecta el avance de la IA y los modelos de aprendizaje automáticos al mercado laboral?",
        "¿Cómo afecta el avance de la IA y los modelos de aprendizaje automáticos al mercado laboral?",
        texto_Trabajo,
      ],
    ],
    "Uso cotidiano": [
      [
        "¿Que tanto se usa Chat-GPT?",
        "¿Que tanto se usa Chat-GPT?",
        texto_UsoCotidiano,
      ],
    ],
    Lenguajes: [
      [
        "Chat-GPT",
        "¿Qué es Chat-GPT? ¿Por qué todos hablan de él?",
        texto_Lenguaje,
      ],
      [
        "Impacto positivo/negativo",
        "¿Estos modelos son buenos o malos?",
        texto_Lenguaje2,
      ],
      [
        "Modelos más populares",
        "¿Cuáles son los modelos más populares?",
        texto_Lenguaje3,
      ],
    ],
  };

  let respuestas_por_pregunta2 = {
    Trabajo: {
      "¿Cómo afecta el avance de la IA y los modelos de aprendizaje automáticos al mercado laboral?":
        {
          "Sí, definitivamente.": "todos concuerdan con vos",
          "No, para nada": "nadie concuerda con vos",
        },
    },
    "Uso cotidiano": {
      "¿Que tanto se usa Chat-GPT?": {
        "Sí, lo uso cada día.": "muchos piensan como vos",
        "Sí, lo uso cada semana": "pocos concuerdan",
        "Sí, lo uso raramente": "mira vos",
        "No, no tenía idea": "vos y alguien más coinciden",
      },
    },
    Lenguajes: {
      "Chat-GPT": {
        "Lo conozco y lo uso a menudo":
          "No sos el único, desde que salió su popularidad fue en ascenso sin descanso.",
        "Lo conozco pero no lo uso":
          "Hay bastante gente como vos, que todavía no incorporó la herramienta pese a conocer de su existencia. Sin embargo, muchos otros ya están inmersos en el uso de la IA en su vida diaria.",
        "No lo conocía": "Raro, te lo presento: https://chatgpt.com/",
      },
      "Impacto positivo/negativo": {
        Positivo: "Y",
        Negativo: "N",
      },
      "Modelos más populares": {
        A: "ad",
      },
    },
  };

  let tematicas_mensajes = {
    Trabajo: [
      "¿Cómo afecta el avance de la IA y los modelos de aprendizaje automáticos al mercado laboral?",
      "En esta sección podrás descubrir y reflexionar acerca de si la inteligencia artificial y sus avances más recientes son positivos o negativos para el empleo a nivel global.",
    ],
    "Uso cotidiano": [
      "¿Qué nivel de acceso se tiene a herramientas de inteligencia artificial sofisticadas hoy en día? ¿Es algo más bien exclusivo?",
      "¿Se usa en exceso la IA? ¿Se explotan sus beneficios en pos de la productividad? ¿Se utilizan en exceso los modelos como Chat-GPT para todo tipo de tareas? En esta sección abarcaremos estas preguntas y más.",
    ],
    Lenguajes: [
      "¿Qué  tipos de modelos de  IA existen? ¿Cualés son los más usados?",
      "En tan solo un par de años, muchos modelos de IA han logrado viralizarse y generaron fuertes discusiones por todo el mundo. Conocer estos modelos da una noción de las diferencias entre ellos.",
    ],
  };

  let textoBienvenida =
    "¡Hola! Este chat va a ser tu guía en el sitio web. Los pasos a seguir son simples: elegí una temática y seleccioná una pregunta para conocer más sobre diversos temas relacionados con inteligencia artificial, la perspectiva de la gente y comparar con tus opiniones.";
  let index_actual = 0;

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

  var speed = 10;
  let delay_global = (speed + 5) * 100;
  let delay_global2 = 1000;
  let buttons_are_active = false;
  let image_buttons = "../src/assets/Arrow_open.svg";

  onMount(() => {
    mostrar_texto(textoBienvenida, 0);
    delayed_action(
      (speed + 2) * textoBienvenida.length + delay_global2,
      enable_buttons,
      "btn-tematica"
    );
  });

  function enable_buttons(name) {
    let class_name = "." + name;
    let botones = document.querySelectorAll(class_name);
    botones.forEach(function (boton) {
      boton.disabled = false;
    });
  }

  function delayed_action(delay, funcion_a_ejecutar, ...args) {
    setTimeout(function () {
      funcion_a_ejecutar(...args);
    }, delay);
  }

  function mostrar_graficos(tematica, index, respuesta) {
    let mensaje_id = "mensaje-" + index;
    let mensaje = document.getElementById(mensaje_id);

    var DivGrafico = document.createElement("div");
    DivGrafico.className = "grafico";
    DivGrafico.style.justifyContent = "start";

    if (tematica == "Trabajo") {
      new Radar({
        target: DivGrafico,
        props: { p: 36, yes: respuesta == "Sí, definitivamente." },
      });
    } else if (tematica == "Uso cotidiano") {
      DivGrafico.style.height = "100%";
      DivGrafico.style.width = "100%";
      new MapaDaily({
        target: DivGrafico,
      });
    } else if (tematica == "Lenguajes") {
      new NetSentimentBars({
        target: DivGrafico,
      });
    }

    // Crear el elemento Radar y agregarlo al nuevo div

    // Agregar el nuevo div al elemento existente en el DOM
    mensaje.appendChild(DivGrafico);
    mensaje.scrollIntoView({ behaviour: "smooth" });
    let class_name = ".grafico-" + tematica;
    /*let graficos = document.querySelectorAll(class_name);
    console.log("graficos", class_name, graficos);
    graficos.forEach(function(grafico){
      grafico.style.display = "flex";
    })*/
  }

  var i = 0;

  function typeWrite(texto_respuesta, index) {
    let typing_id = "typing-indicator-" + index;

    if (i < texto_respuesta.length) {
      let name_id = "texto-respuesta-" + index;
      document.getElementById(name_id).innerHTML += texto_respuesta.charAt(i);
      i++;
      let typingIndicator = document.getElementById(typing_id);
      let textoRespuesta = document.getElementById(name_id);
      textoRespuesta.appendChild(typingIndicator);

      setTimeout(function () {
        typeWrite(texto_respuesta, index);
      }, speed);
    } else {
      document.getElementById(typing_id).style.display = "none";
    }
  }

  function mostrar_texto(mensaje, index) {
    //chat = [...chat, {mensaje, tipo}];
    let mensaje_id = "mensaje-" + index;
    i = 0;
    document.getElementById(mensaje_id).style.display = "flex";
    document.getElementById(mensaje_id).scrollIntoView({ behaviour: "smooth" });
    typeWrite(mensaje, index);
    index_actual = index_actual + 1;
  }

  function mostrar_botones(
    type_button_touched,
    tematica,
    index,
    id_button_touched
  ) {
    if (type_button_touched == "reinicio-tematicas") {
      let botones_tematica = document.querySelectorAll(".botones-tematicas");
      botones_tematica.forEach(function (button) {
        button.style.display = "flex";
      });
    } else if (type_button_touched == "Tematica") {
      let id_botones = "botones-preguntas-" + index;
      let botones_preguntas_tematica = document.getElementById(id_botones);
      botones_preguntas_tematica.style.display = "flex";
    } else if (type_button_touched == "Preguntas") {
      console.log(index, tematica, "botones preguntas");
      let id_botones = "respuestas-" + index + "-" + tematica;
      let botones_preguntas_tematica = document.getElementById(id_botones);
      botones_preguntas_tematica.style.display = "flex";
    }
    let class_boton_touched = "." + id_button_touched;
    let button_touched_div = document.querySelectorAll(class_boton_touched);
    button_touched_div.forEach(function (button) {
      button.style.display = "none";
    });
  }

  function reinicio_preguntas() {
    let reinicio_div = document.getElementById("reinicio-preguntas");
    reinicio_div.style.display = "flex";

    let botones_respuesta = document.querySelectorAll(".opciones-respuestas");
    botones_respuesta.forEach(function (button) {
      button.style.display = "none";
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("image-buttons").addEventListener("click", () => {
      let button_container = document.getElementById("botones-juntos");
      if (!buttons_are_active) {
        button_container.style.display = "flex";
        image_buttons = "../src/assets/Arrow_close.svg";
      } else {
        button_container.style.display = "none";
        image_buttons = "../src/assets/Arrow_open.svg";
      }
      buttons_are_active = !buttons_are_active;
    });
  });
</script>

<main>
  <div class="container">
    <Circuit></Circuit>
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

      <div class="botones" id="list-buttons">
        <img id="image-buttons" src={image_buttons} alt="Arrow" />
        <div id="botones-juntos" style="display: none;">
          <div style="display: flex;">
            {#each Object.entries(tematicas) as [tematica, preguntas], index}
              <div
                style="display: none;"
                class="botones-preguntas"
                id="botones-preguntas-{index}"
              >
                {#each preguntas as [pregunta, texto1, texto2], index_pregunta}
                  <input
                    class="botones-opciones btn-preguntas"
                    type="button"
                    value={pregunta}
                    on:click={() => {
                      mostrar_botones(
                        "Preguntas",
                        tematica,
                        index_pregunta,
                        "botones-preguntas"
                      );
                      mostrar_texto(texto1, index_actual);
                      delayed_action(
                        (speed + 2) * texto1.length + delay_global2,
                        mostrar_texto,
                        texto2,
                        index_actual
                      );
                      delayed_action(
                        (speed + 2) * (texto1.length + texto2.length) +
                          delay_global2 +
                          5000,
                        enable_buttons,
                        "btn-opciones"
                      );
                    }}
                    disabled
                  />
                {/each}
              </div>
              <div style="display: flex;" class="botones-tematicas">
                <input
                  class="botones-opciones btn-tematica"
                  type="button"
                  value={tematica}
                  on:click={() => {
                    mostrar_botones(
                      "Tematica",
                      tematica,
                      index,
                      "botones-tematicas"
                    );
                    mostrar_texto(
                      tematicas_mensajes[tematica][0],
                      index_actual
                    );
                    delayed_action(
                      (speed + 2) * tematicas_mensajes[tematica][0].length +
                        delay_global2,
                      mostrar_texto,
                      tematicas_mensajes[tematica][1],
                      index_actual
                    );
                    delayed_action(
                      (speed + 2) *
                        (tematicas_mensajes[tematica][0].length +
                          tematicas_mensajes[tematica][1].length) +
                        delay_global2,
                      enable_buttons,
                      "btn-preguntas"
                    );
                  }}
                  disabled
                />
              </div>
            {/each}
          </div>

          <div style="display: flex;">
            {#each Object.entries(respuestas_por_pregunta2) as [tematica, preguntas]}
              <div>
                {#each Object.entries(preguntas) as [pregunta, opciones], nro_pregunta}
                  <div
                    style="display: none;"
                    id="respuestas-{nro_pregunta}-{tematica}"
                    class="opciones-respuestas"
                  >
                    {#each Object.entries(opciones) as [opcion, respuesta]}
                      <input
                        class="botones-opciones btn-opciones"
                        type="button"
                        value={opcion}
                        on:click={() => {
                          mostrar_texto(opcion, index_actual);
                          delayed_action(
                            (speed + 2) * opcion.length,
                            reinicio_preguntas
                          );
                          delayed_action(
                            (speed + 2) * opcion.length + delay_global2,
                            mostrar_texto,
                            respuesta,
                            index_actual
                          );
                          delayed_action(
                            (speed + 2) * opcion.length + delay_global2,
                            mostrar_graficos,
                            tematica,
                            index_actual,
                            respuesta
                          );
                          delayed_action(
                            (speed + 2) * opcion.length + delay_global2 * 2,
                            mostrar_texto,
                            respuesta,
                            index_actual
                          );
                        }}
                        disabled
                      />
                    {/each}
                  </div>
                {/each}
              </div>
            {/each}
          </div>

          <div style="display: none;" id="reinicio-preguntas">
            <input
              type="button"
              class="botones-opciones"
              value="Otra categoria"
              on:click={() => {
                delayed_action(
                  0,
                  mostrar_botones,
                  "reinicio-tematicas",
                  0,
                  "botones-respuestas"
                );
                document.getElementById("reinicio-preguntas").style.display =
                  "none";
              }}
            />
            <input
              type="button"
              class="botones-opciones"
              value="Más preguntas trabajo"
              on:click={() => {
                delayed_action(
                  delay_global,
                  mostrar_botones,
                  "Tematica",
                  "Trabajo",
                  0,
                  "botones-respuestas"
                );
                document.getElementById("reinicio-preguntas").style.display =
                  "none";
              }}
            />
            <input
              type="button"
              class="botones-opciones"
              value="Más preguntas uso cotidiano"
              on:click={() => {
                delayed_action(
                  delay_global,
                  mostrar_botones,
                  "Tematica",
                  "Uso cotidiano",
                  1,
                  "botones-respuestas"
                );
                document.getElementById("reinicio-preguntas").style.display =
                  "none";
              }}
            />
            <input
              type="button"
              class="botones-opciones"
              value="Más preguntas lenguaje"
              on:click={() => {
                delayed_action(
                  delay_global,
                  mostrar_botones,
                  "Tematica",
                  "Lenguaje",
                  2,
                  "botones-respuestas"
                );
                document.getElementById("reinicio-preguntas").style.display =
                  "none";
              }}
            />
          </div>
        </div>
      </div>
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
