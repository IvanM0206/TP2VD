# VD | IA y Opinión Pública

Narrativa visual de datos en formato de test o paseo interactivo basada en encuestas sobre diversos temas de inteligencia artificial y la opinión sobre ellos del público. Realizada para la materia Visualización de Datos por los alumnos Iván Mondrzak, Federico Peitti y Franco Setti.

---

### Referencias:

- [Stanford AI Index Report, la fuente de inspiración](https://aiindex.stanford.edu/report/)
- [Flourish: armado de gráficos de barras y mapas](https://flourish.studio/)
- [Radar animado: para los gráficos de torta](https://codepen.io/vii120/pen/yLGYqJq)
- Funciones y animaciones del flujo, como la escritura y la interactividad de elaboración propia con JavaScript

![thumbnail](thumbnail.png)

---

## Motivación

Detrás del desarrollo de este trabajo, se buscaba comunicar los resultados de un estudio masivo realizado por la universidad de Stanford ([Starford AI Index Report 2024](https://aiindex.stanford.edu/report/)), el cual incluye métricas de todo tipo relacionadas con inteligencia artificial. En particular, se decidió trabajar con el capítulo 9 de dicho reporte, basado en opinión pública para comunicar un mensaje claro, acotado y conciso.

## Consideraciones generales

**Desarrollo**

En esencia, la idea del proyecto consiste en tener un conjunto de preguntas que puede hacer el usuario subdividido por algunas categorías de interés. Toda la interacción se resuelve en un flujo de idas y vueltas en las que (1) se introduce el tema, (2) en caso de haber una pregunta asociada se busca la interacción con el usuario y (3) se presentan los datos, con algún formato de respuesta que puede o no estar personalizada. A medida que se navega por las preguntas, estas van desapareciendo para el usuario, de forma que se repita la menor información posible.

**Desarrollo**
Entre las funciones clave detrás del proyecto se encuentran: `typeWrite`, la encargada de animar la escritura de los textos; y por otro lado muchas funciones de orden que administran la visibilidad de los componentes y las rutas visitadas.

**Expansión**

Eventualmente podría pensarse en implementar una API que vincule el listado de preguntas/categorías con componentes de Flourish o personalizados tal que se permita contener una cantidad variable de temáticas, incluso teniendo múltiples "rutas" que se disparan tras otras preguntas, personalizando aún más la experiencia.
