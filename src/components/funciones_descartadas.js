
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

  function mostrar_botones(boton_tocado, num_div_botones){
    let id_boton;
    if(boton_tocado == 0){
      id_boton = "boton"+boton_tocado
      let botones_opciones = document.getElementById("divbotones1");
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