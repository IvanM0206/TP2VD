<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import Medallero from "./components/Medallero.svelte";
  import DebugScroller from "./components/DebugScroller.svelte";
  import Loremipsum from "./components/Loremipsum.svelte";
  import Radar from "./components/Radar.svelte";
  import Mapa from "./components/Mapa.svelte"

  /* Variables para la data del medallero */
  let deportistas = [];
  let filteredDeportistas = [];

  /* Variables para el scroller1 */
  let count;
  let index;
  let offset;
  let progress;
  let top = 0.1;
  let threshold = 0.5;
  let bottom = 0.9;

  /* Variables para el scroller 2 */
  let count2;
  let index2;
  let offset2;
  let progress2;
  let top2 = 0.1;
  let threshold2 = 0.5;
  let bottom2 = 0.9;

  let texto_Trabajo =
    "Por el momento la IA es una herramienta, no un reemplazo. Es cierto que algunas tareas basicas las puede hacer una IA en lugar de un humano, pero tareas que requieran una capacidad de anlisis y pensamiento que la IA todavia no tiene, siguen siendo responsabilidad de los humanos. ¿Vos que pensas?";

  let texto_UsoCotidiano =
    "La IA inicialmente tenia fines exclusivamente cientificos y de investigación, sin embargo con la salida de CHat-GPT uno de los primeros modelos de IA disponibles para todo publico, comenzo una tendencia de democratizar el acceso a la IA. ¿Vos cuanto la usas durante la semana?";

  let texto_Lenguaje =
    "Chat-GPT es una inteligencia artificial creada por la empresa OpenIA, haciendola abierta al publico en el año 2021. Esta herramienta es una de las primeras IA's en estar abiertas para todo el publico. Sus aplicaciones diversas, desde escribir ensayos hasta desarrollo de aplicaciones y crear imagenes a partir de texto. Su imapcto es a nivel mundial, tanto que FALTA.";

  let ultimo_id = null;
  let respuestas_por_pregunta = [
    ["Sí", "No"],
    ["Mucho", "No se"],
    ["si3", "no3"],
  ];
  let tematicas = {
    Trabajo: [
      [
        "¿Me voy a quedar sin empleo a causa de la IA?",
        "Me gustaria saber como va a afectar el avance de la IA al empleo a nivel mundial.",
        texto_Trabajo,
      ],
    ],
    "Uso cotidiano": [
      [
        "¿Que tan seguido usas la IA?",
        "Qusiera saber si es sano usar la IA para todo o debemos abstenernos en algun sentido.",
        texto_UsoCotidiano,
      ],
      ["pregunta 2-uso cotidiano", "vvv", "fefef"],
    ],
    Lenguajes: [
      [
        "¿Conoces Chat-GPT? - ¿Lo usas?",
        "¿Que es Chat-GPT? ¿Por que todos hablan de él?",
        texto_Lenguaje,
      ],
      ["pregunta 2-lenguaje", "ggg"],
      ["pregunta 3-lenguaje", "nnn"],
    ],
  };

  let respuestas_por_pregunta2 = {
    Trabajo: {
      "¿Me voy a quedar sin empleo a causa de la IA?": {
        "Si, definitivamente": "todos concuerdan con vos",
        "No, para nada": "nadie concuerda con vos",
      },
    },
    "Uso cotidiano": {
      "¿Que tan seguido usas la IA?": {
        "Mucho, no habia vida antes de la IA": "muchos piensan como vos",
        "Poco, solo cuando lo considero absolutamente necesario":
          "pocos concuerdan",
        "Nada, no confio en la IA": "vos y alguien más coinciden",
      },
    },
    Lenguajes: {
      "¿Conoces Chat-GPT? - ¿Lo usas?": {
        "Lo conozco y lo uso a menudo":
          "No sos el unico, desde que salio su popularidad fue en aumento sin descanso.",
        "Lo conozco pero no lo uso":
          "No todos son como vos, muchos ya estan inmersos en el uso de la IA en su vida diaria.",
        No: "Raro, te lo presento: https://chatgpt.com/",
      },
    },
  };

  let tematicas_mensajes = {
    Trabajo: [
      "¿Como afecta el surgimiento de la IA al trabajo de las personas?",
      "En esta sección discutiremos si la IA es un enemigo para el empleo o más bien es un amigo.",
    ],
    "Uso cotidiano": [
      "¿La IA sigue siendo algo secreto y exclusivo, o ahora todos la tienen al alcance de sus manos?",
      "¿Se usa en exceso la IA? ¿Estamos abusando de sus beneficios? Estas son algunas preguntas que responderemos en esta sección.",
    ],
    Lenguajes: [
      "¿Que tipos de IA existe? y ¿Cualés son las más usadas?",
      "Hay una amplia variedad de IA's, las cuales se usan para diferentes propositos. A continuación analizaremos veremos algunas de ellas.",
    ],
  };

  let texto1 =
    "Hola! Este es un chat que va a ser tu guia para la pagina web. Los pasos son simples: elige una tematica, selecciona una pregunta de ese tema, contestala y descubre si la mayoria concuerda con vos o te diferencias de los demas.";
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

  var speed = 30;
  let delay_global = (speed + 5) * 100;
  let buttons_are_active = false;
  let image_buttons = "../src/assets/Arrow_open.svg";

  /* Charts */
  let charts = {
    0: "lines_01.png",
    1: "lines_02.png",
    2: "lines_03.png",
  };

  onMount(() => {
    d3.csv("./data/deportistas.csv", d3.autoType).then((data) => {
      deportistas = data;
      filteredDeportistas = deportistas;
    });
    mostrar_texto(texto1, 0);
    delayed_action(8000, enable_buttons, "btn-tematica");
  });

  $: {
    // Es un observer que se ejecuta cuando cambia el valor de index
    switch (index) {
      case 0:
        filteredDeportistas = deportistas;
        break;
      case 1:
        filteredDeportistas = deportistas.filter((d) => d.genero === "F");
        break;
      case 2:
        filteredDeportistas = deportistas.filter((d) => d.genero === "M");
        break;
      case 3:
        filteredDeportistas = deportistas.filter(
          (d) => d.continente === "América"
        );
        break;
      default:
        filteredDeportistas = deportistas;
    }
  }

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

  function mostrar_graficos(tematica, index) {
    let mensaje_id = "mensaje-" + index;
    let mensaje = document.getElementById(mensaje_id);

    var DivGrafico = document.createElement("div");
    DivGrafico.className = "grafico";
    DivGrafico.style.display = "flex";
    DivGrafico.style.justifyContent = "start";

    if(tematica == "Trabajo"){
      new Radar({
      target: DivGrafico,
    });
    }
    else if(tematica == "Uso cotidiano"){
      DivGrafico.style.height = "1000px";
      DivGrafico.style.width = "800px";
      new Mapa({
        target: DivGrafico
      })
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
    if(!buttons_are_active){
        button_container.style.display = "flex";
        image_buttons = "../src/assets/Arrow_close.svg";
    }
    else{
      button_container.style.display = "none";
      image_buttons = "../src/assets/Arrow_open.svg";
    }
    buttons_are_active = !buttons_are_active;
  })
  })

</script>

<main>
  <div class="header">
    <img src="/images/header_image.svg" width="100" alt="Exploring AI" />
    <h3 class="headline">
      <b>IA y Opinión Pública</b>
    </h3>

    {#each chat as { mensaje, tipo }, index}
      {#if tipo == 0}
        <div
          class="mensaje-usuario"
          id="mensaje-{index}"
          style="display: none;"
        >
          <p id="texto-respuesta-{index}">
            <span class="typing-indicator" id="typing-indicator-{index}"></span>
          </p>
        </div>
      {:else}
      <div style="display: flex;" class="mensaje-usuario chat">
        <div
          class="mensaje-usuario chat"
          id="mensaje-{index}"
          style="display: none; flex-direction: row; align-items: flex-start;"
        >
          <img src="../src/assets/compass.svg" alt="Logo" width="20px" style="margin-top: 25px">
          <p id="texto-respuesta-{index}" style="margin-left: 10px;">
            <span class="typing-indicator" id="typing-indicator-{index}"></span>
          </p>
        </div>
      </div>
        
      {/if}
    {/each}
  </div>

  <!-- Primer scroller -->
  <!--<div>
      <div class="centered-chart-container">
        <script type="text/javascript" defer src="https://datawrapper.dwcdn.net/FgbkA/embed.js?v=3" charset="utf-8"></script><noscript><img src="https://datawrapper.dwcdn.net/FgbkA/full.png" alt="" /></noscript>
      </div>
    </div>-->

  <div class="container">
    <div class="botones" id="list-buttons">
      <img id="image-buttons" src={image_buttons} alt="Arrow">
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
                      delay_global,
                      mostrar_texto,
                      texto2,
                      index_actual
                    );
                    delayed_action(
                      delay_global + 6000,
                      mostrar_graficos,
                      tematica,
                      index_actual
                    );
                    delayed_action(10000, enable_buttons, "btn-opciones");
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
                  mostrar_texto(tematicas_mensajes[tematica][0], index_actual);
                  delayed_action(
                    delay_global,
                    mostrar_texto,
                    tematicas_mensajes[tematica][1],
                    index_actual
                  );
                  delayed_action(6500, enable_buttons, "btn-preguntas");
                }}
                disabled
              />
            </div>
          {/each}
        </div>
  
        <div style="display: flex;">
          {#each respuestas_por_pregunta as respuestas, i}
            <div
              id="respuestas{i + 1}"
              style="display: none;"
              class="botones-respuestas"
            >
              {#each respuestas as respuesta_i}
                <input
                  class="botones-opciones"
                  type="button"
                  value={respuesta_i}
                  on:click={() => {
                    mostrar_texto("respuesta si o no", index_actual);
                    delayed_action(
                      delay_global,
                      mostrar_texto,
                      "asdsa",
                      index_actual
                    );
                    delayed_action(delay_global, reinicio_preguntas);
                  }}
                />
              {/each}
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
                          delay_global,
                          mostrar_texto,
                          respuesta,
                          index_actual
                        );
                        delayed_action(delay_global, reinicio_preguntas);
                      }}
                    disabled />
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

  <!-- Segundo scroller -->
  <!--<Scroller
    top={top2}
    threshold={threshold2}
    bottom={bottom2}
    bind:count={count2}
    bind:index={index2}
    bind:offset={offset2}
    bind:progress={progress2}
  >
    <div slot="background" class="image_container">
      <img src="/images/{charts[index2]}" alt="chart {index2}" class="charts"
      />
    </div>
    <div slot="foreground" class="foreground_container">
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Seccion {index2 + 1}</h3>
          <p>Gráfico 1</p>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Seccion {index2 + 1}</h3>
          <p>Gráfico 1</p>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <h3>Seccion {index2 + 1}</h3>
          <p>Gráfico 1</p>
        </div>
      </section>
    </div>
  </Scroller>-->
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

  input:enabled{
    cursor: pointer;
  }

  #image-buttons{
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

  .header {
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
    margin-bottom: 20px;
    margin-right: 50px;
    background-color: #2E2F2E;
    width: fit-content;
    align-self: flex-end;
    height: fit-content;
    font-size: 20px;
  }

  .chat {
    border-radius: 20px;
    padding-left: 50px;
    padding-right: 10px;
    margin-bottom: 20px;
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
