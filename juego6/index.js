import { casillas } from "./data/data.js";
import { preguntas } from "./data/preguntas.js";

//Jugadores 1 y 2

let jugadorUno = {
    posicion: 0,
    top: 570 + "px",
    left: 190 + "px"
}

let jugadorDos = {
    posicion: 0,
    top: 570 + "px",
    left: 235 + "px" 
}

// Event para saber donde posiciones X y Y
// let contador = 1;

window.addEventListener("click", (e)=>{
        console.log("valor x = ", e.clientX, "Valor y = ", e.clientY);
    
        
    });
    
    //Selectores del DOM
    
    const fichaUno = document.querySelector(".fichaUno");
    const fichaDos = document.querySelector(".fichaDos");
    const dadoUno = document.querySelector("#botonDadoUno");
    const dadoDos = document.querySelector("#botonDadoDos");
    const cajaDado = document.querySelector("#cajaDado")
    const pTurno = document.querySelector("#pTurno");
    const pregunta = document.querySelector("#pregunta");
    const respuestaUno = document.querySelector(".respuestaUno");
    const respuestaDos = document.querySelector(".respuestaDos");
    const respuestaTres = document.querySelector(".respuestaTres");
    const respuestas = document.querySelector(".respuestas");
    const h2Ganador = document.querySelector("#h2Ganador");
    const reset = document.querySelector("#resetGame");
    
    let preguntaRandom = "";
    let dado = 0;
    let jugador = 0;
    let contrario = 1;
    let volverSalida = false;
    let turnos= 1;
    let dadito;
    let contadorDado=0
    
//Listeners

dadoUno.addEventListener("click", (e)=>{
    dado = tirarDado();
    jugador = 1;
    contrario = 2;
    
    turnoJugador(contrario);
    moverFicha(dado, jugador);
    generarDado();
    //Si las posiciones coinciden, se ejecuta la function volverCasillaInicial 2 segundos después.
    if(jugadorUno.posicion == jugadorDos.posicion){
        setTimeout(volverCasillaInicial,2000);
    }
    ///Solo entra si el valor de accion es casilla(numero) y hago que esta funcion no se ejecute hasta dos segundos después, para que primero llegue a la casilla inicial y luego al salto.
    if(casillas[jugadorUno.posicion].accion != "pregunta" && casillas[jugadorUno.posicion].accion != "noTirar" && casillas[jugadorUno.posicion].accion != "tirar" && casillas[jugadorUno.posicion].accion != "ganador"){
        //pongo los botones en disabled true, para no poder tirar hasta que se mueva.
        //cuando llame a saltar, al final llamo a turnoJugador y deja tirar a quien le toque.
        dadoUno.disabled = true;
        dadoDos.disabled = true;
        setTimeout(saltar,2000);
        console.log(casillas[jugadorUno.posicion].accion);
        console.log("MMMMMMMMMMMMMMMMM");
    }
    if(casillas[jugadorUno.posicion].accion == "noTirar"){
        console.log("dentro de no tirar 1:")
        noTirar();
    }
    if(casillas[jugadorUno.posicion].accion === "tirar"){
        volverATirar();
    }
    if(casillas[jugadorUno.posicion].accion === "pregunta"){
        generarPregunta();
    }
})

dadoDos.addEventListener("click", (e)=>{
    dado = tirarDado();
    jugador = 2;
    contrario = 1;
    turnoJugador(contrario);
    moverFicha(dado, jugador);
    generarDado();
    //Si las posiciones coinciden, se ejecuta la function volverCasillaInicial 2 segundos después.
    if(jugadorDos.posicion == jugadorUno.posicion){
    setTimeout(volverCasillaInicial,2000);
    
    }
    //Solo entra si el valor de accion es casilla(numero) y hago que esta funcion no se ejecute hasta dos segundos después, para que primero llegue a la casilla inicial y luego al salto.
    if(casillas[jugadorDos.posicion].accion != "pregunta" && casillas[jugadorDos.posicion].accion != "noTirar" && casillas[jugadorDos.posicion].accion != "tirar" && casillas[jugadorDos.posicion].accion != "ganador"){
        //pongo los botones en disabled true, para no poder tirar hasta que se mueva.
        //cuando llame a saltar, al final llamo a turnoJugador y deja tirar a quien le toque.
        dadoUno.disabled = true;
        dadoDos.disabled = true;
        setTimeout(saltar,2000);   
    }
    if(casillas[jugadorDos.posicion].accion === "noTirar"){
        console.log("llamo a no tirar")
        noTirar();
    }
    if(casillas[jugadorDos.posicion].accion === "tirar"){
        volverATirar();
    }
    if(casillas[jugadorDos.posicion].accion === "pregunta"){
        generarPregunta();
    }

})

respuestas.addEventListener("click", (e)=>{

        if(e.target.textContent === preguntaRandom.correcta){
            console.log("DENTRO");
            pregunta.innerHTML = "RESPUESTA CORRECTA"
            respuestaUno.disabled = true;
            respuestaDos.disabled = true;
            respuestaTres.disabled = true;
            turnoJugador(contrario);
        }
        if(e.target.textContent !== preguntaRandom.correcta){
            console.log("DENTRO INCORRECTA");
            pregunta.innerHTML = "RESPUESTA INCORRECTA"
            respuestaUno.disabled = true;
            respuestaDos.disabled = true;
            respuestaTres.disabled = true;
            retrocederCasilla();
            turnoJugador(contrario);
        }
    })

reset.addEventListener("click", (e)=>{
    
    reiniciarJuego();

})

// -----------------------

//Mover ficha uno y dos con transicion + limite casilla 36 así consigo que no salga del array.
function moverFicha(dado, jugador){

    //Aquí solo entra si cae encima de la otra ficha
    if(volverSalida){
        console.log("dentro de volver salida");
        if(contrario == 1){
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
            volverSalida = false;
        }
        if(contrario == 2){
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
            volverSalida = false;
        }
    }else{
    //Posiciones anteriores, para poder hacer el movimiento de ficha.
    // const posicionAnteriorUno = jugadorUno.posicion;
    // const posicionAnteriorDos = jugadorDos.posicion;

        if(jugador == 1){
            console.log(dado); //dado
            jugadorUno.posicion = jugadorUno.posicion + dado;
            console.log(jugadorUno.posicion); //posicion jugador + dado
            if(jugadorUno.posicion >= casillas.length){
                jugadorUno.posicion = 36;
                fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
                fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
                fichaUno.innerHTML;
                finJuego()
            }else{
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
            }
        }else if(jugador == 2){
            console.log(dado); //dado
            jugadorDos.posicion = jugadorDos.posicion + dado;
            console.log(jugadorDos.posicion); //posicion jugador + dado
            if(jugadorDos.posicion >= casillas.length){
                jugadorDos.posicion = 36;
                fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
                fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
                fichaDos.innerHTML;
                finJuego();
            }else{
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
            }
        }
    }
}

//Funcion para generar número random entre 1 y 6
function tirarDado(){
    const numeroRandom = Math.floor(Math.random()*6 + 1 );
    return numeroRandom;
}

//
function generarDado(){

    dadito = setInterval(daditoRandom,100)

    contadorDado = 0;

}

//Function para organizar los turnos de los jugadores dependiendo del valor contrario estarán los botones del jugador 1 o 2 desactivados.
//Turnos por defecto es 1, si un jugador cae en no tirar, turnos cambia a -2 y tienen que pasar dos tiradas para poder tirar.
function turnoJugador(contrario){
    if(turnos != 1){
        if(jugador == 1){
            dadoUno.disabled = false;
            dadoDos.disabled = true;
        }
        if(jugador == 2){
            dadoDos.disabled = false;
            dadoUno.disabled = true;
        }
        turnos = turnos + 1;
        console.log("ESTAMOS DENTRO: ", turnos);
    }
    if (turnos == 1){
        if(contrario == 1){
            console.log("le toca al 1")
            dadoDos.disabled = true;
            dadoUno.disabled = false;
            pTurno.innerHTML = `Turno jugador ${contrario}`;
        }
        if(contrario == 2){
            console.log("le toca al 2")
            dadoUno.disabled = true;
            dadoDos.disabled = false;
            pTurno.innerHTML = `Turno jugador ${contrario}`;
        }
    }
    // }else{
    //     turnos = turnos + 1;
    //     console.log("dentro de turno");
    // }
}

//Primero comparan en que posicion están los dos jugador.
//Si coinciden, mira quien fue el ultimo jugador en tirar para saber a quien mover a la casilla inicial. Le envio que la posicion del jugador es 0.
function volverCasillaInicial(){
    // if(jugadorUno.posicion == jugadorDos.posicion){
        if(contrario == 1){
            jugadorUno.posicion = 0;
            volverSalida = true;
            moverFicha();
            pregunta.innerHTML = "Jugador 1 vuelve a casilla de salida";
            console.log("Adios ficha 1");

        }
        if(contrario == 2){
            jugadorDos.posicion = 0;
            volverSalida = true;
            moverFicha();
            pregunta.innerHTML = "Jugador 2 vuelve a casilla de salida";
            console.log("Adios ficha 2");
        }
    // }
}

function saltar(){

    let accion = "";

    if( jugador == 1 ){
        accion = casillas[jugadorUno.posicion].accion;
        if(accion == "casilla21"){
            console.log("salto 21")
            jugadorUno.posicion = 21;
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
        }
        if(accion == "casilla11"){
            console.log("salto 11")
            jugadorUno.posicion = 11;
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
        }
        if(accion == "salida"){
            console.log("salida")
            jugadorUno.posicion = 0;
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
        }
        if(accion == "casilla29"){
            console.log("salto 29")
            jugadorUno.posicion = 29;
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
        }
        if(accion == "casilla24"){
            console.log("casilla 24")
            jugadorUno.posicion = 24;
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
        }
        if(accion == "casilla9"){
            console.log("casilla 9")
            jugadorUno.posicion = 9;
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
        }
        if(accion == "casilla27"){
            console.log("casilla 27")
            jugadorUno.posicion = 27;
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
        }
        if(accion == "casilla20"){
            console.log("casilla 20")
            jugadorUno.posicion = 20;
            fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
            fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
            fichaUno.innerHTML;
        }
        turnoJugador(contrario);
    }
    if( jugador == 2){
        accion = casillas[jugadorDos.posicion].accion;
        if(accion == "casilla21"){
            console.log("salto 21")
            jugadorDos.posicion = 21;
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
        }
        if(accion == "casilla11"){
            console.log("salto 11")
            jugadorDos.posicion = 11;
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
        }
        if(accion == "salida"){
            console.log("salida")
            jugadorDos.posicion = 0;
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
        }
        if(accion == "casilla29"){
            console.log("salto 29")
            jugadorDos.posicion = 29;
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
        }
        if(accion == "casilla24"){
            console.log("casilla 24")
            jugadorDos.posicion = 24;
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
        }
        if(accion == "casilla9"){
            console.log("casilla 9")
            jugadorDos.posicion = 9;
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
        }
        if(accion == "casilla27"){
            console.log("casilla 27")
            jugadorDos.posicion = 27;
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
        }
        if(accion == "casilla20"){
            console.log("casilla 20")
            jugadorDos.posicion = 20;
            fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
            fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
            fichaDos.innerHTML;
        }
        turnoJugador(contrario);
    }
    //Después del salto vuelvo a mirar si estan las dos en la misma posición.
    if(jugadorUno.posicion == jugadorDos.posicion){
        setTimeout(volverCasillaInicial,2000);
    }
}

//Pone el valor de turnos a 0, para que tenga que pasar por el else de turnoJugador()
function noTirar(){
    turnos = -2;
    console.log(turnos);
}

//Cambia el valor del contrario, para que pueda a volver a tirar el mismo jugador.
function volverATirar(){

    if(jugador == 1){
        contrario = 1;
        turnoJugador(contrario);
    }
    if(jugador == 2){
        contrario = 2;
        turnoJugador(contrario);
    }
    
}

function generarPregunta(){

    pTurno.innerHTML = `Turno jugador ${jugador}`;
    preguntaRandom = preguntas[Math.floor(Math.random()*100)]

    respuestaUno.disabled = false;
    respuestaDos.disabled = false;
    respuestaTres.disabled = false;

    dadoUno.disabled = true;
    dadoDos.disabled = true;

    pregunta.innerHTML = preguntaRandom.pregunta;
    respuestaUno.innerHTML = preguntaRandom.respuestas[0];
    respuestaDos.innerHTML = preguntaRandom.respuestas[1];
    respuestaTres.innerHTML = preguntaRandom.respuestas[2];

    console.log(preguntaRandom);
}

function retrocederCasilla(){
    if(jugador == 1){
        jugadorUno.posicion = jugadorUno.posicion - 1
        fichaUno.style.left = casillas[jugadorUno.posicion].x + "px";
        fichaUno.style.top = casillas[jugadorUno.posicion].y + "px";
        fichaUno.innerHTML;
    }
    if(jugador == 2){
        jugadorDos.posicion = jugadorDos.posicion - 1
        fichaDos.style.left = casillas[jugadorDos.posicion].x + "px";
        fichaDos.style.top = casillas[jugadorDos.posicion].y + "px";
        fichaDos.innerHTML;
    }
}

function daditoRandom(){
    
    contadorDado = contadorDado + 1;

        let daditoRandom = Math.floor(Math.random() * 6);
        switch(daditoRandom){
            case 1: cajaDado.style.backgroundImage = "url('/images/caraUno.png')";
                break;
            case 2: cajaDado.style.backgroundImage = "url(/images/caraDos.png)";
                break;
            case 3: cajaDado.style.backgroundImage = "url(/images/caraTres.png)";
                break;
            case 4: cajaDado.style.backgroundImage = "url(/images/caraCuatro.png)";
                break;
            case 5: cajaDado.style.backgroundImage = "url(/images/caraCinco.png)";
                break;
            case 6: cajaDado.style.backgroundImage = "url(/images/caraSeis.png)";
                break;
            default: cajaDado.style.backgroundImage = "url('/images/caraUno.png')";
                break;
            }
            if(contadorDado == 10){
                switch(dado){
            case 1: cajaDado.style.backgroundImage = "url('/images/caraUno.png')";
                break;
            case 2: cajaDado.style.backgroundImage = "url(/images/caraDos.png)";
                break;
            case 3: cajaDado.style.backgroundImage = "url(/images/caraTres.png)";
                break;
            case 4: cajaDado.style.backgroundImage = "url(/images/caraCuatro.png)";
                break;
            case 5: cajaDado.style.backgroundImage = "url(/images/caraCinco.png)";
                break;
            case 6: cajaDado.style.backgroundImage = "url(/images/caraSeis.png)";
                break;
            default: cajaDado.style.backgroundImage = "url('/images/caraUno.png')";
                break;
            }
                clearInterval(dadito);
            }
}

function reiniciarJuego(){

    dadoUno.disabled = false;
    dadoDos.disabled = false;

    jugadorUno.posicion = 0
    jugadorUno.top = 570 + "px";
    jugadorUno.left = 190 + "px";

    jugadorDos.posicion = 0
    jugadorDos.top = 570 + "px";
    jugadorDos.left = 235 + "px";


    dadoUno.innerHTML = "Tirar dado";
    dadoDos.innerHTML = "Tirar dado";
    pregunta.innerHTML = "Tira el dado para comenzar el juego";
    pTurno.innerHTML = "Turno jugador";
    cajaDado.innerHTML = "0";
    respuestaUno.innerHTML = "-";
    respuestaDos.innerHTML = "-";
    respuestaTres.innerHTML = "-";
    cajaDado.style.backgroundImage = "url('/images/caraUno.png')";


    fichaUno.style.left = jugadorUno.left;
    fichaUno.style.top = jugadorUno.top;
    fichaUno.innerHTML;
    fichaDos.style.left = jugadorDos.left;
    fichaDos.style.top = jugadorDos.top;
    fichaDos.innerHTML;
}

function finJuego(){
    h2Ganador.innerHTML = `Victoria del Jugador ${jugador}`;
    dadoUno.disabled = true;
    dadoDos.disabled = true;
}












