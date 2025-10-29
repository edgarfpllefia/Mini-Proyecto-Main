const preguntasArray = [
  {
    pregunta: "¿Qué etiqueta HTML define el contenido principal de una página?",
    respostes: ["<section>", "<article>", "<main>"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué atributo proporciona texto alternativo para imágenes?",
    respostes: ["title", "alt", "aria-label"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué meta se usa para hacer una página responsive en móviles?",
    respostes: [
      "meta name='viewport' content='width=device-width, initial-scale=1'",
      "meta charset='UTF-8'",
      "meta name='description' content='...'"
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué etiqueta se usa para enlazar una hoja de estilos externa?",
    respostes: ["style src='styles.css'", "link rel='stylesheet' href='styles.css'", "script src='styles.css'></script"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué selector CSS tiene mayor especificidad?",
    respostes: ["elemento", ".clase elemento", "#id .clase elemento"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué propiedad hace que el ancho incluya padding y borde?",
    respostes: ["display: inline-block", "box-sizing: content-box", "box-sizing: border-box"],
    correcta: 2,
  },
  {
    pregunta: "En Flexbox, ¿qué valor distribuye los ítems con espacio alrededor?",
    respostes: ["justify-content: center", "justify-content: space-around", "justify-content: space-between"],
    correcta: 1,
  },
  {
    pregunta: "En CSS Grid, ¿qué propiedad define las columnas?",
    respostes: ["grid-template-columns", "grid-columns", "columns"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué valor de position posiciona relativo al viewport y saca del flujo?",
    respostes: ["absolute", "fixed", "relative"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué unidad CSS escala con la fuente del elemento raíz?",
    respostes: ["em", "rem", "px"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué operador en JavaScript compara valor y tipo?",
    respostes: ["==", "===", "="],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el ámbito de una variable declarada con let dentro de un bloque?",
    respostes: ["Global", "De función", "De bloque"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué método crea un nuevo array transformando cada elemento?",
    respostes: ["forEach", "map", "reduce"],
    correcta: 1,
  },
  {
    pregunta: "En un manejador de eventos, ¿cómo evitas la acción por defecto (navegar, enviar, etc.)?",
    respostes: ["event.stopPropagation()", "event.preventDefault()", "return false fuera de jQuery"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué evento se dispara cuando el HTML ha sido parseado (sin esperar imágenes)?",
    respostes: ["load", "readystatechange", "DOMContentLoaded"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué método selecciona el primer elemento que coincide con un selector CSS?",
    respostes: ["document.getElementById()", "document.querySelector()", "document.querySelectorAll()"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué hace el atributo defer en un script externo?",
    respostes: [
      "Bloquea el parseo hasta descargar y ejecutar",
      "Ejecuta en cuanto descarga, sin garantizar orden",
      "Difiere la ejecución hasta después del parseo y mantiene el orden"
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Cómo se importa por defecto un módulo ES?",
    respostes: [
      'import algo from "./modulo.js"',
      'import { algo } from "./modulo.js"',
      'const algo = require("./modulo.js")'
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué opción del Web Storage persiste al cerrar el navegador?",
    respostes: ["sessionStorage", "localStorage", "window.name"],
    correcta: 1,
  },
  {
    pregunta: "Una Promesa con estado \"fulfilled\" representa…",
    respostes: [
      "Una operación pendiente",
      "Una operación completada con éxito",
      "Una operación fallida"
    ],
    correcta: 1,
  },
];

let casilla = 0;
let random = 0;
let total = 0;
let bloqueador = 0;
let valor = null;
let elemento = document.querySelector(".progress-fill");
let contadorPreguntas = 1;


document.querySelector("#tirarDado").addEventListener("click", tirarDado);
document.querySelector("#respuestaA").addEventListener("click", detectarRespuesta);
document.querySelector("#respuestaB").addEventListener("click", detectarRespuesta);
document.querySelector("#respuestaC").addEventListener("click", detectarRespuesta);

function tirarDado(){
    random = Math.floor(Math.random() *(6 - 1 + 1)) + 1;
    document.querySelector(".dice-number").innerHTML = random;
    generarPregunta(random)
    document.querySelector("#respuestaA").disabled = false;
    document.querySelector("#respuestaB").disabled = false;
    document.querySelector("#respuestaC").disabled = false;
}

function generarPregunta(numeroRandom){
    total += numeroRandom;
    let preguntita = preguntasArray[total-1].pregunta;
    let respuesta1 = `<span class="answer-letter">A)</span>${preguntasArray[total-1].respostes[0]}`
    let respuesta2 = `<span class="answer-letter">B)</span>${preguntasArray[total-1].respostes[1]}`
    let respuesta3 = `<span class="answer-letter">C)</span>${preguntasArray[total-1].respostes[2]}`
    console.log(respuesta1);
    let correcta = preguntasArray[numeroRandom].correcta;
    
    document.querySelector("#pregunta").innerHTML = preguntita;
    document.querySelector("#respuestaA").innerHTML = respuesta1;
    document.querySelector("#respuestaB").innerHTML = respuesta2;
    document.querySelector("#respuestaC").innerHTML = respuesta3;

    document.querySelector("#preguntaNumero").innerHTML = `Pregunta ${contadorPreguntas} de 10`

    contadorPreguntas = contadorPreguntas + 1;
    console.log("Hola", contadorPreguntas);
    tiempo();
}

function detectarRespuesta(e){
    let target = e.target.dataset.respuesta;
    console.log(target);
    if(target == preguntasArray[total-1].correcta){
        casilla += 5;
        document.querySelector("#casillaNumero").innerHTML = casilla;
        valor = true;
      }else if(casilla == 0 ){
          casilla = 0;
          document.querySelector("#casillaNumero").innerHTML = casilla;
      }else{
        casilla -= 1;
        document.querySelector("#casillaNumero").innerHTML = casilla;
        valor = false;
    }
    bloqueador = 1
    desactivarBoton(bloqueador)
    barraProgresion(valor)
    finalJuego()
}

function finalJuego(){
  let final = "Has ganado el juego!!!"
  if(casilla >= 20){
    let pregunta = document.querySelector("#pregunta");
    pregunta.classList.add("ganar");
    pregunta.innerHTML = final;
    desactivarBoton()
  }
}

function barraProgresion(valor){
  elemento = document.querySelector(".progress-fill");
  let progreso = parseInt(elemento.style.width) || 0;

  if(valor == true){
    progreso += 25;
  }else if(valor == false){
    progreso -= 5;
  }

  if(progreso >= 100){
    progreso = 100;
  }if (progreso <= 0){
    progreso = 0;
  }
  
  let final = elemento.style.width = progreso+"%";
  document.querySelector("#porciento").innerHTML = final;

  console.log(elemento.style.width);

}

function tiempo(){

  const timer = document.querySelector("#tiempo");
  let tiempo = 30;
  console.log("aaaa");
  const temporizador = setInterval(() => {
    tiempo --;
    console.log("adios: ", timer.textContent);
    timer.textContent = "⏱️ "+tiempo + "s";

    if(tiempo <= 0){
      clearInterval(temporizador);
      timer.textContent = "Tiempo finalizado"
      bloqueador = 1;
      desactivarBoton(bloqueador);
    }
  }, 1000);
}


function desactivarBoton(){
  if(casilla>=20){
  document.querySelector("#tirarDado").disabled = true;
  }
  if(bloqueador == 1){
    document.querySelector("#respuestaA").disabled = true;
    document.querySelector("#respuestaB").disabled = true;
    document.querySelector("#respuestaC").disabled = true;
  }
}


//Después investigar para darle a los 2 jugadores
