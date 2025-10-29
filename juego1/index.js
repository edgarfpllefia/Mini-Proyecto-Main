
document.querySelector("#botonComprobar").addEventListener("click", comprobarNumero);

let frasesResultado = [
    `<p>Escribe tu primer valor</p>`,
    `<p>El número que has puesto es más pequeño</p>`,
    `<p>El número que has puesto es más grande</p>`,
    `<p>Felicidades es el número correcto!!!</p>`,
    `<p>Lo siento.<br>Demasiados intentos</p><br><button id="newButton">Volver a generar número Random</button>`,
]

let historialNumeros = [];

let resultado = document.querySelector("#divResultado");
resultado.innerHTML = frasesResultado[0];
let valoresPuestos = document.querySelector("#numerosPuestos");
let intentos = document.querySelector("#intentos");

let numeroRandom = Math.floor(Math.random() * 20) + 1;
console.log(numeroRandom);



let contador = 1;

resultado.addEventListener("click", (e)=>{
    if(e.target.id == "newButton"){
        generarRandom();
    }
})

function comprobarNumero(){
    
    const valor = document.querySelector("#valorNumero").value;
    historialNumeros.push(valor);
    intentos.innerHTML =  `<p>Intentos: ${contador}</p>`;
    
    
    if(valor < numeroRandom && contador < 5){
        contador = contador + 1;
        resultado.innerHTML = frasesResultado[1];
    }else if (valor > numeroRandom && contador < 5){
        contador = contador + 1;
        resultado.innerHTML = frasesResultado[2];
    }else if(valor == numeroRandom && contador < 5){
        resultado.innerHTML = frasesResultado[3];
    }else {
        contador = 5;
        resultado.innerHTML = frasesResultado[4];
    }

    let numeritos = " ";

    for (let i = 0; i < historialNumeros.length; i++) {
        if (i >= 0) {
            numeritos += " ";
            numeritos += historialNumeros[i];
        }
    }
    valoresPuestos.textContent = numeritos;
}


function generarRandom() {
    numeroRandom = Math.floor(Math.random() * 20) + 1;
    resultado.innerHTML = frasesResultado[0];
    valoresPuestos.innerHTML = " ";
    historialNumeros = [];
    intentos.innerHTML =  `<p>Numero de intentos son: ${contador}</p>`;
    console.log(numeroRandom);
    contador = 1;
}






