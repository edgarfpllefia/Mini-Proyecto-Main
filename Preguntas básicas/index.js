document.querySelector("button").addEventListener("click", llamarBoton);

const preguntasJS = [
  "¿Qué es JavaScript y para qué se usa?",
  "¿Cómo se declara una variable con var, let y const?",
  "¿Cuál es la diferencia entre let y const?",
  "¿Qué tipos de datos primitivos existen en JavaScript?",
  "¿Cómo se concatena texto con variables en una cadena?",
  "¿Qué son los operadores aritméticos (+, -, *, /, %)?",
  "¿Qué hace el operador === en comparación con ==?",
  "¿Qué es un array y cómo se crea uno?",
  "¿Cómo accedo al primer y al último elemento de un array?",
  "¿Qué métodos de array conoces (push, pop, shift, unshift)?",
  "¿Qué es una función y cómo se declara?",
  "¿Qué diferencia hay entre una función normal y una función flecha?",
  "¿Qué es un objeto en JavaScript y cómo se crea?",
  "¿Cómo accedo a las propiedades de un objeto (punto y corchetes)?",
  "¿Qué es un condicional if y cómo se usa?",
  "¿Cómo funciona un bucle for?",
  "¿Qué hace el bucle while y en qué se diferencia de for?",
  "¿Qué significa null y undefined?",
  "¿Qué es un comentario y cómo se escribe en JavaScript?",
  "¿Cómo mostramos algo en la consola con console.log()?"
];

let numero = 0;
let contador = 0;

function llamarBoton(){
    numero += Math.floor(Math.random() * 20) + 1;
    numero >= 20 ? numero = 0 : numero = numero;
    numero == 0 ? numero += Math.floor(Math.random() * 20) + 1 : numero = numero;
    contador >= 20 ? numero = 0 : numero = numero;
    contador >= 20 ? contador = -1 : contador = contador;
    document.querySelector("#pregunta").innerHTML = preguntasJS[numero];
    console.log(numero);
    contador = contador + 1;
    console.log("Esto es el contador:", contador);
}



