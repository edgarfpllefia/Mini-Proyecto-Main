const texto  = "  hola caracola como estas tu   ";

console.log(texto.slice(0,5))

const textoTruncado = texto.slice(0,6) + "...";

console.log(texto.trim().split(" ").length)

const total = "2025-8-13T18:30:16:00"

const desmontar = total.split("T");

const fecha = desmontar[0];
const hora = desmontar[1];

const nuevaFecha = fecha.split("-");
const nuevaHora = hora.split(":");

console.log(nuevaFecha[2] + " del " + nuevaFecha[1] + " de " + nuevaFecha[0] + " a las " + nuevaHora[0] + " horas " + nuevaHora[1] + " minutos ");


