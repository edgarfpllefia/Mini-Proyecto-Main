import { juegos } from './juegos.js'

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const carousel = document.querySelector(".carousel");
const track = document.querySelector(".trackJuegos");
const titulos = document.querySelector("#titulosJuegos");

let valor = 0;
let maxValor = 0;
let posicion = 0;

function iniciarRender(){
    let divs = "";
    juegos.forEach((juego) =>{
        console.log(juego.titulo);
        divs += `<div class="card"><img src="${juego.img}" alt=""></div>`
    })
    track.innerHTML = divs;
    
    const cartas = document.querySelectorAll(".card");
    maxValor = (cartas.length - 1) * 100;

}

left.addEventListener("click", () => {
    console.log("izquierda");
  if (valor < 0) {
    valor += 100;
    posicion -= 1;
    moverCarousel();
    cambiarTitulo();
  }
});

right.addEventListener("click", () => {
    console.log("derecha");
  if (Math.abs(valor) < maxValor) {
    valor -= 100;
    posicion += 1;
    moverCarousel();
    cambiarTitulo();
  }
});

function moverCarousel() {
  track.style.transform = `translateX(${valor}%)`;
}

function cambiarTitulo(){
    titulos.innerHTML = juegos[posicion].titulo;
}

iniciarRender()
cambiarTitulo()