<script>
  let welcomeText = "¡Hola! Este chat va a ser tu guía en el sitio web. Los pasos a seguir son simples: elegí una temática y seleccioná una pregunta para conocer más sobre diversos temas relacionados con inteligencia artificial, la perspectiva de la gente y comparar con tus opiniones.";

  let topicsTexts = {
      "Trabajo": "En esta sección podrás descubrir y reflexionar acerca de si la inteligencia artificial y sus avances más recientes son positivos o negativos para el empleo a nivel global.",
      "Uso cotidiano": "¿Se usa en exceso la IA? ¿Se explotan sus beneficios en pos de la productividad? ¿Se utilizan en exceso los modelos como Chat-GPT para todo tipo de tareas? En esta sección abarcaremos estas preguntas y más.",
      "Lenguaje": "En tan solo un par de años, muchos modelos de IA han logrado viralizarse y generaron fuertes discusiones por todo el mundo. Conocer estos modelos da una noción de las diferencias entre ellos."
  }

let respuestas_por_pregunta2 = {
    Trabajo: {
      "Riesgo de empleo": ["Texto usuario", "Texto Chat", {
        "Si, definitivamente": "todos concuerdan con vos",
        "No, para nada": "nadie concuerda con vos",
      }]
    },
    "Uso cotidiano": {
      "¿Que tanto se usa Chat-GPT?": ["Texto usuario", "Texto Chat", {
        "Sí, lo uso cada día.": "muchos piensan como vos",
        "Sí, lo uso cada semana":
          "pocos concuerdan",
        "Sí, lo uso raramente": "mira vos",
        "No, no tenía idea": "vos y alguien más coinciden",
      }],
    },
    Lenguajes: {
      "Chat-GPT": ["Texto Usuario", "Texto Chat", {
        "Lo conozco y lo uso a menudo":
          "No sos el único, desde que salió su popularidad fue en ascenso sin descanso.",
        "Lo conozco pero no lo uso":
          "Hay bastante gente como vos, que todavía no incorporó la herramienta pese a conocer de su existencia. Sin embargo, muchos otros ya están inmersos en el uso de la IA en su vida diaria.",
        "No lo conocía": "Raro, te lo presento: https://chatgpt.com/",
      }],
      "Impacto positivo/negativo": ["Texto usuario", "Texto Chat", {
        "Positivo": "Y",
        "Negativo": "N"
      }],
      "Modelos más populares": ["Texto usuario", "Texto Chat", {
        "A": "ad"
      }]
    },
  };
</script>