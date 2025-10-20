let ronda = 0;
let puntaje = 0;
const rondasTotales = 5;


const acertijos = [
  {
    pregunta: "Un robo ocurrió en una joyería. El ladrón dejó huellas de barro y llevaba un sombrero. ¿Quién crees que fue?",
    opciones: ["El jardinero", "El contador", "El chef", "El guardia"],
    respuesta: "El jardinero"
  },
  {
    pregunta: "Un hombre fue encontrado muerto con un vaso en la mano y el suelo mojado. No hay señales de violencia. ¿Qué pasó?",
    opciones: ["Murió ahogado", "Murió congelado", "Fue un accidente eléctrico", "Lo envenenaron"],
    respuesta: "Murió congelado"
  },
  {
    pregunta: "En una habitación sin ventanas hay tres interruptores. Solo uno enciende una lámpara en otra habitación. ¿Cómo descubres cuál es?",
    opciones: [
      "Pruebas los interruptores de uno en uno",
      "Enciendes uno, esperas y tocas la bombilla",
      "Abres la puerta y miras",
      "Usas un espejo"
    ],
    respuesta: "Enciendes uno, esperas y tocas la bombilla"
  },
  {
    pregunta: "Tres amigos comieron juntos. Todos pidieron sopa. Dos murieron, uno no. ¿Por qué?",
    opciones: [
      "El tercero no la comió",
      "La sopa estaba envenenada y el tercero pidió otra",
      "El tercero tomó agua primero",
      "Los otros eran alérgicos"
    ],
    respuesta: "La sopa estaba envenenada y el tercero pidió otra"
  },
  {
    pregunta: "Un hombre entra a un bar y pide un vaso de agua. El camarero saca una pistola. El hombre dice 'gracias' y se va. ¿Por qué?",
    opciones: [
      "Era un ladrón y se rindió",
      "Tenía hipo y el susto lo curó",
      "El camarero lo confundió con otro",
      "El arma era falsa"
    ],
    respuesta: "Tenía hipo y el susto lo curó"
  },
  {
    pregunta: "Un crimen ocurrió en una biblioteca. Los sospechosos: la bibliotecaria, el estudiante y el guardia. ¿Quién fue?",
    opciones: [
      "La bibliotecaria, sabía los horarios",
      "El estudiante, necesitaba dinero",
      "El guardia, tenía acceso y llaves",
      "Ninguno, fue un accidente"
    ],
    respuesta: "El guardia, tenía acceso y llaves"
  },
{
  pregunta: "Un hombre fue encontrado muerto en su oficina. La policía no encontró huellas, pero el calendario tenía el número 6 escrito con sangre. ¿Qué significa?",
  opciones: [
    "El asesino regresará en junio",
    "El asesino era el sexto empleado",
    "El número indica la fecha del crimen",
    "El número representa una pista sobre el nombre del asesino"
  ],
  respuesta: "El asesino era el sexto empleado"
},
{
  pregunta: "Una mujer llama a la policía diciendo que su esposo fue asesinado. Cuando llega la policía, encuentran la mesa puesta para dos. ¿Qué descubren?",
  opciones: [
    "Ella cenó con el asesino",
    "El asesino era un vecino",
    "El esposo no está muerto",
    "Ella planeaba el crimen"
  ],
  respuesta: "Ella cenó con el asesino"
},
{
  pregunta: "Un detective encuentra un cuerpo en el campo. No hay señales de lucha, pero el hombre sostiene una cerilla usada. ¿Qué pasó?",
  opciones: [
    "Estaba encendiendo un fuego",
    "Cayó desde un globo aerostático",
    "Intentó defenderse",
    "Fue alcanzado por un rayo"
  ],
  respuesta: "Cayó desde un globo aerostático"
},
{
  pregunta: "Un hombre entra en una habitación oscura con una cerilla, una vela y una lámpara de gas. ¿Qué enciende primero?",
  opciones: [
    "La lámpara de gas",
    "La vela",
    "La cerilla",
    "Ninguna"
  ],
  respuesta: "La cerilla"
},
{
  pregunta: "Durante una carrera, adelantas al segundo lugar. ¿En qué posición quedas?",
  opciones: [
    "Primero",
    "Segundo",
    "Tercero",
    "Empatado con el primero"
  ],
  respuesta: "Segundo"
}
];

/**
 * Inicia el juego
 */
function iniciarJuego() {
  ronda = 1;
  puntaje = 0;
  siguienteRonda();
}

/**
 * Muestra un acertijo al azar
 */
function siguienteRonda() {
  const root = document.getElementById("root");

  if (ronda > rondasTotales) {
    terminarJuego();
    return;
  }

  const acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];

  root.innerHTML = `
    <h2>Acertijo ${ronda} de ${rondasTotales}</h2>
    <p>${acertijo.pregunta}</p>
    <div id="opciones"></div>
    <p>Puntaje: ${puntaje}</p>
  `;

  const cont = document.getElementById("opciones");

  acertijo.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => verificarRespuesta(op, acertijo.respuesta);
    cont.appendChild(btn);
    cont.appendChild(document.createElement("br"));
  });
}

/**
 * Verifica si la respuesta es correcta
 */
function verificarRespuesta(opcion, respuestaCorrecta) {
  if (opcion === respuestaCorrecta) {
    alert("✅ Correcto!");
    puntaje += 100;
  } else {
    alert("❌ Incorrecto. La respuesta era: " + respuestaCorrecta);
    puntaje -= 50;
  }

  ronda++;
  siguienteRonda();
}

/**
 * Muestra el resultado final
 */
function terminarJuego() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h2>🏁 Fin del juego</h2>
    <p>Puntaje final: ${puntaje}</p>
    <button onclick="iniciarJuego()">Jugar de nuevo</button>
    <button onclick="Home(personas)">Volver al inicio</button>
  `;
}