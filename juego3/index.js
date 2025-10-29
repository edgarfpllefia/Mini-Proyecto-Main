document.querySelector("#iniciarUniverso").addEventListener("click", iniciarUniverso);

document.querySelector("#detenerUniverso").addEventListener("click", detenerUniverso);

document.querySelector("#reiniciarUniverso").addEventListener("click", reiniciarUniverso);


let universo = "";
let filas = 60;
let columnas = 155;
let random = 0;
const porcentaje = 30;
let contador= 0;
let matriz = [];
let matrizVacia = [];


function dibujarUniverso(matriz){
    universo = "";
    for(let i = 0; i < matriz.length ; i++){
        universo += `<div class="fila">`;
        for(let j = 0 ; j < matriz[i].length ; j++){
            let clase =  matriz[i][j] ? "celula viva" : "celula morta"
            universo += `<div class="${clase}" data-id="${i}-${j}"></div>`;
        }
        universo += `</div>`;
    }
}

function porcentajeAleatorio(porcentaje){

    let randomPorcentaje = Math.random()*100 < porcentaje

    return randomPorcentaje;
}

function crearMatriz(filas, columnas){
    matriz = [];
    for (let i = 0 ; i < filas; i++){
    let matrizFilas = []
        for(let j = 0 ; j < columnas ; j++){
            matrizFilas.push(porcentajeAleatorio(porcentaje))
        }
        matriz.push(matrizFilas)
    }
    console.log("Esto es la matriz creada: ", matriz);
}

function contarVecinosVivos(matriz, i, j) {
  let contador = 0;

  // arriba
  if (i-1 >= 0) {
    if (matriz[i-1][j]) contador++;                  // arriba
    if (j-1 >= 0 && matriz[i-1][j-1]) contador++;   // arriba izquierda
    if (j+1 < matriz[i-1].length && matriz[i-1][j+1]) contador++; // arriba derecha
  }

  // abajo
  if (i+1 < matriz.length) {
    if (matriz[i+1][j]) contador++;                  // abajo
    if (j-1 >= 0 && matriz[i+1][j-1]) contador++;   // abajo izquierda
    if (j+1 < matriz[i+1].length && matriz[i+1][j+1]) contador++; // abajo derecha
  }

  // izquierda
  if (j-1 >= 0 && matriz[i][j-1]) contador++;

  // derecha
  if (j+1 < matriz[i].length && matriz[i][j+1]) contador++;

  return contador;
}

function evolucionarCelula(matriz, i, j){
    let vecinos = contarVecinosVivos(matriz, i, j);
    let viva = matriz[i][j]

    if(viva){
        if (vecinos < 2) return false;
        if (vecinos === 2 || vecinos === 3) return true;
        if (vecinos > 3) return false;
    }else{
        if (vecinos === 3) return true;
    }

  return false;
}

function crearMatrizEvolucionada(matriz){
    console.log(matriz);
    let nuevaMatriz = [];

    matriz.forEach((fila, i) =>{
        let nuevaFila = [];
        fila.forEach((celula, j) => {
            let celulaEvolucionada = evolucionarCelula(matriz, i, j);
            nuevaFila.push(celulaEvolucionada);
        });
        nuevaMatriz.push(nuevaFila);
    })

    return nuevaMatriz;
}

function copiarMatriz(superMatriz){
   matrizCopia.length = 0;
   superMatriz.forEach((fila, i) => {
    let nuevaFila = [];
        fila.forEach((celula, j) => {
            nuevaFila.push(superMatriz[i][j]);
        })
            matrizCopia.push(nuevaFila);
   })
   return matrizCopia;
}

function reiniciarUniverso(){
crearMatriz(filas, columnas);
dibujarUniverso(matriz);
document.querySelector("#universo").innerHTML = universo;
}

let intervalo;

function iniciarUniverso(){

intervalo = setInterval(()=>{
    matriz = crearMatrizEvolucionada(matriz);
    dibujarUniverso(matriz);
    document.querySelector("#universo").innerHTML = universo;   
},1);

matrizCopia = copiarMatriz(matriz)
}

function detenerUniverso(){
 clearInterval(intervalo);
}


reiniciarUniverso();



