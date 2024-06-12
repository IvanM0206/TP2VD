<script>
  import Scroller from "@sveltejs/svelte-scroller"
  import {onMount} from "svelte"
  import * as d3 from "d3"

  import Medallero from "./components/Medallero.svelte"
  import DebugScroller from "./components/DebugScroller.svelte"
  import Loremipsum from "./components/Loremipsum.svelte"

  /* Variables para la data del medallero */
  let deportistas = []
  let filteredDeportistas = []

  /* Variables para el scroller1 */
  let count
  let index
  let offset
  let progress
  let top = 0.1
  let threshold = 0.5
  let bottom = 0.9

  /* Variables para el scroller 2 */
  let count2
  let index2
  let offset2
  let progress2
  let top2 = 0.1
  let threshold2 = 0.5
  let bottom2 = 0.9

  let ultimo_id = null;
  let respuestas_por_pregunta = [["si1", "no1"], ["si2", "no2"], ["si3", "no3"]];
  let tematicas = {
    "Trabajo": ["pregunta 1-trabajo", "pregunta 2-trabajo", "pregunta 3-trabajo"],
    "Uso cotidiano": ["pregunta 1-uso cotidiano", "pregunta 2-uso cotidiano"],
    "Lenguajes": ["pregunta 1-lenguaje", "pregunta 2-lenguaje", "pregunta 3-lenguaje"]
  }

  let chat = []


  /* Charts */
  let charts = {
    0: "lines_01.png",
    1: "lines_02.png",
    2: "lines_03.png",
  }

  onMount(() => {
    d3.csv("./data/deportistas.csv", d3.autoType).then(data => {
      deportistas = data
      filteredDeportistas = deportistas
    })
  })

  $: {
    // Es un observer que se ejecuta cuando cambia el valor de index
    switch (index) {
      case 0:
        filteredDeportistas = deportistas
        break
      case 1:
        filteredDeportistas = deportistas.filter(d => d.genero === "F")
        break
      case 2:
        filteredDeportistas = deportistas.filter(d => d.genero === "M")
        break
      case 3:
        filteredDeportistas = deportistas.filter(
          d => d.continente === "América",
        )
        break
      default:
        filteredDeportistas = deportistas
    }
    console.log(filteredDeportistas)
  }

  function ChangeOption(id) {
    if(id == 0){
      id = "boton0";
    }
    else if (id == 1){
      id = "boton1";
    }
    else if(id == 2){
      id = "boton2";
    }
    else{
      id = "boton3";
    }
    if (ultimo_id != null) {
      let boton_ultimo = document.getElementById("active");
      boton_ultimo.id = ultimo_id;
    }
    if (id == ultimo_id) {
      ultimo_id = null;
    } else {
      const boton_id = document.getElementById(id);
      ultimo_id = boton_id.id;
      boton_id.id = "active";
    }
  }

  function add_span() {
      // Crear el span y agregarlo al div.chat
      var typingIndicator = document.createElement("span");
      typingIndicator.id = "typing-indicator";
      
      var chatDiv = document.querySelector(".mensaje-usuario.chat");
      chatDiv.appendChild(typingIndicator);
      console.log(chatDiv);
  }

  var i = 0;
  var speed = 50;
  function typeWrite(texto_respuesta){
    if(i < texto_respuesta.length){
      document.getElementById("texto-respuesta").innerHTML += texto_respuesta.charAt(i);
      i++;
      
      let typingIndicator = document.getElementById("typing-indicator");
      console.log("texto typing", i, typingIndicator);
      let textoRespuesta = document.getElementById("texto-respuesta");
      console.log("texto respuesta", i, textoRespuesta);
      textoRespuesta.appendChild(typingIndicator);
      typingIndicator.style.display = "inline-block";


      setTimeout(function(){
        typeWrite(texto_respuesta);
      }, speed);
    }
    else{
      document.getElementById("typing-indicator").style.display = "none";
    }
  }

  function mostrar_texto(texto, tipo){
    chat = [...chat, [texto, tipo]];
    console.log(chat);
  }


  function mostrar_texto2(opcion){

    i = 0;
    var chat_answer = document.querySelector(".chat");
    chat_answer.style.display = "flex";

    document.getElementById("texto-respuesta").innerHTML = "";

    add_span();
    document.getElementById("typing-indicator").style.display = "inline-block";
    console.log("segundo", document.getElementById("texto-respuesta"));

    if(opcion == 0){
      typeWrite("Hola! Este es un chat que va a ser tu guia para la pagina web. Elige una pregunta, contestala y descubre si el resto opina igual que vos.");
    }
    else if(opcion == 1){
      typeWrite("hola 1");
    }
    else if(opcion == 2){
      typeWrite("hola 2");
    }
    else{
      typeWrite("hola 3");
    }
    ChangeOption(opcion);
  }

  function mostrar_botones(boton_tocado, num_div_botones){
    let id_boton;
    if(boton_tocado == 0){
      id_boton = "boton"+boton_tocado
      let botones_opciones = document.getElementById("divbotones1");
      console.log(botones_opciones);
      botones_opciones.style.display = "flex";
    }
    else{
      id_boton = "divbotones"+num_div_botones;
      let id_name = "respuestas"+boton_tocado;
      let respuestas = document.getElementById(id_name);
      respuestas.style.display = "flex";
    }
    let boton_tocado_element = document.getElementById(id_boton);
    boton_tocado_element.style.display = "none";
  }

</script>

<main>
  <div class="header">
    <img src="/images/header_image.svg" width="100" alt="Exploring AI" />
    <h3 class="headline">
      <b>Public Opinion about IA</b>
    </h3>
    <p class="bajada">Explorando que opina la gente sobre la IA</p>
    
    {#each chat as {mensaje, tipo}}
    <p>{mensaje}</p>
      {#if tipo == 0}
        <div class="mensaje-usuario">
          <p>{mensaje}</p>
        </div>
      
      {:else}
      <div class="mensaje-usuario chat">
        <p>{mensaje}</p>
      </div>
      {/if}
    {/each}

    <div>
      <input class="boton-inicio" id="boton0" type="button" value="Empezar el chat" on:click={() => {
        mostrar_botones(0, 0);
        mostrar_texto("ssss", 1);
        }}>
      <div style="display: flex;">
        <div id="divbotones1" style="display: none;">
          {#each Object.entries(tematicas) as [tematica, preguntas], i}
            <input class="botones-opciones" id="boton{i}" type="button" value={tematica} on:click={() => {
              mostrar_botones(i, 1);
              mostrar_texto("aaa", 0);
            }}>
          {/each}
        </div>
      </div>
      <div id="divbotones1" style="display: none;">
        <input class="botones-opciones" id="boton1" type="button" value="¿Conoces Chat-Gpt? Si lo conoces, ¿que tan seguido lo usas?" on:click={() => {
          mostrar_botones(1, 1);
          mostrar_texto("bbb", 0);
          }}>
        <input class="botones-opciones" id="boton2" type="button" value="Opcion 2" on:click={() => {
          mostrar_botones(2, 1);
          mostrar_texto("ccc", 0);
          }}>
        <input class="botones-opciones" id="boton3" type="button" value="Opcion 3" on:click={() => {
          mostrar_botones(3, 1);
          mostrar_texto("ddd", 0);
          }}>
      </div>
      <div style="display: flex;">
        {#each respuestas_por_pregunta as respuestas, i}
          <div id="respuestas{i+1}" style="display: none;">
            {#each respuestas as respuesta_i, j}
              <p>{i}</p>
              <input class="botones-respuesta" id="boton{i}" type="button" value="{respuesta_i}" on:click={() => mostrar_texto(i)}>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Primer scroller -->
    <div>
      <div class="centered-chart-container">
        <script type="text/javascript" defer src="https://datawrapper.dwcdn.net/FgbkA/embed.js?v=3" charset="utf-8"></script><noscript><img src="https://datawrapper.dwcdn.net/FgbkA/full.png" alt="" /></noscript>
      </div>
    </div>
    <div>
        <div class="centered-chart-container">
          <script type="text/javascript" defer src="https://datawrapper.dwcdn.net/luAfk/embed.js?v=2" charset="utf-8"></script><noscript><img src="https://datawrapper.dwcdn.net/luAfk/full.png" alt="" /></noscript>
          </div>
    </div>  

  <div class="lorem_ipsum">
    <Loremipsum />
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

<div class="lorem_ipsum">
  <Loremipsum />
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Gentium+Plus:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  :global(body) {
    background-color: blue;
  }

  * {
    font-family: "VT323", monospace;
    color: white;
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
    font-size: 30px;
    line-height: 1.2;
    font-weight: normal;
    text-align: center;
    margin: 20px;
  }
  .bajada {
    font-family: "Gentium Plus", serif;
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    margin: 10px;
  }
  .headline b {
    display: block;
  }

  #typing-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 5px;
  border-radius: 50%;
  background-color: #fff; /* Cambia el color según tus necesidades */
  animation: blink 1s infinite;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}


  .boton-inicio{
    width: fit-content;
    height: 50px;
    color: black;
    border-radius: 5px;
    font-size: large;
  }

  .botones-opciones{
    width: fit-content;
    height: 50px;
    color: black;
    border-radius: 5px;
    font-size: large;
  }

  .botones-respuesta{
    width: 100px;
    height: 50px;
    color: black;
    background-color: red;
    border-radius: 5px;
    font-size: large;
  }

  #active{
    background-image: linear-gradient(
      rgba(164, 0, 247, 0.5),
      rgb(255, 120, 209, 0),
      rgba(164, 0, 247, 0.5)
    );
  }

  .mensaje-usuario{
    border-radius: 20px;
    padding-left: 10px;
    margin-bottom: 20px;
    background-color: grey;
    width: 200px;
    align-self: flex-end;
    height: 50px;
  }
  
  .chat{
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: grey;
    width: 200px;
    align-self: flex-start;
    display: none;
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
