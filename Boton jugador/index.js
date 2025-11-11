// const hayUsuario = true;
// const USUARIO = "Edgar";

// const textInfo = `<h3>Usuario: <h3> <br> <p>${USUARIO}</p>`
// const noUsuario = `<p>No hay ningún usuario</p>`

// document.querySelector("#mensaje").innerHTML = hayUsuario ? textInfo : noUsuario;


// document.querySelector("#boton").addEventListener("click", tipoJugador);

// let validar = true;

// function tipoJugador(){
//     console.log("has hecho click")
//     let jugadorA = "Turno jugador A";
//     let jugadorB = "Turno jugador B";
//     let turnoA = `<p>Turno Jugador A</p>`;
//     let turnoB = `<p>Turno Jugador B</p>`;
//     document.querySelector("#boton").innerHTML = validar ? jugadorA : jugadorB;
//     document.querySelector("#turno").innerHTML = validar ? turnoA : turnoB;
//     validar = !validar;
// }


//Aquí hago delegación de eventos. Pillo el div que rodea al botón para poder cambiarlo y crear un boton nuevo.

document.querySelector("#divButton").addEventListener("click", tipoJugador);
let validar = true;
const botonJugadorA = `<button>Boton Jugador A</button>`;
const botonJugadorB = `<button>Boton Jugador B</button>`;

function tipoJugador(){
    console.log("Hola");
    let turnoA = `<p>Turno Jugador A</p>`;
    let turnoB = `<p>Turno Jugador B</p>`;
    document.querySelector("#divButton").innerHTML = validar ? botonJugadorA : botonJugadorB;
    document.querySelector("#turno").innerHTML = validar ? turnoA : turnoB;
    validar = !validar;
}

