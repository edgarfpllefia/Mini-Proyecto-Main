
//Eventos de teclas para mover pacman.
//Se llama a la función moverPacman y se le envia los parametros del nuevo movimiento esperado
window.addEventListener("keydown", (e) =>{
    
    if(e.key === "ArrowUp"){
        direccionPacman = 'arriba';
        moverPacman(-1,0)
    }
    if(e.key === "ArrowDown"){
        direccionPacman = 'abajo';
        moverPacman(+1,0)
    }
    if(e.key === "ArrowLeft"){
        direccionPacman = 'izquierda';
        moverPacman(0,-1)
    }
    if(e.key === "ArrowRight"){
        direccionPacman = 'derecha';
        moverPacman(0,+1)
    }
})

//Columnnas con las que se va a crear la matriz del tablero.
let direccionPacman = 'izquierda';

let filasTotales = 14;
let columnasTotales = 14;

//Matriz vacia 
const matriz = [];

//Creación de los enemigos con Random tanto columna como filas, limitandolo a las filas y columnas que he puesto.
const enemigo = [
    {
        fila: Math.floor(Math.random() * filasTotales),
        columna: Math.floor(Math.random() * columnasTotales),
    },
    {   
        fila: Math.floor(Math.random() * filasTotales),
        columna: Math.floor(Math.random() * columnasTotales),
    },
    {
        fila: Math.floor(Math.random() * filasTotales),
        columna: Math.floor(Math.random() * columnasTotales),
    },
    {
        fila: Math.floor(Math.random() * filasTotales),
        columna: Math.floor(Math.random() * columnasTotales),
    },
];

//Variable pacman, con el valor de la fila y columna donde va a comenzar.
let pacman = {
    fila:7,
    columna:7
}

let container = document.querySelector("#divPrincipal")

//Creo las posiciones vacias dentro de la matriz.
//Primero creo la variable con un array vacio, hago push dentro del array fila, y luego hago push de la fila.
function crearMatriz(){
    for(let i = 0 ; i < 15 ; i++){
        let fila = []
        for(let x = 0 ; x < 15 ; x++){
            fila.push(""); 
        }
        matriz.push(fila);
    }
}

//Se crean dentro de matriz los enemigos.
function crearEnemigos(){
    console.log(matriz);
    for(let contador = 0 ; contador < 4 ; contador++){
        matriz[enemigo[contador].fila][enemigo[contador].columna] = `<img src="assets/images/fantasma.png" alt="fantasma">`
    }
    container.innerHTML = matriz;
}

//Crea el pacman dentro de la matriz, en el parametro que se le de en su variable pacman
function crearPacman(){
    matriz[pacman.fila][pacman.columna] = `<img src="assets/images/pacman.png" alt="pacman" class="pacman-${direccionPacman}">`;
}

//Renderiza dentro de cada fila/columna lo que tenga dentro del valor matriz.
function render(){
    
    let divs = "";
    for(let i = 0 ; i <  15; i++){
        divs += `<div class="fila">`;
        for(let x = 0 ; x < 15 ; x++ ){
            divs += `<div class="columna">${matriz[i][x]}</div>`;
        }
        divs += `</div>`;
    }
    container.innerHTML = divs;
}


//Llegan los parametros del addEventListener. Si el pacman está dentro de los limites, se moverá.
function moverPacman(moverFila,moverColumna){

    matriz[pacman.fila][pacman.columna] = "";

    if(pacman.fila == 0 && moverFila == -1){
        console.log("fin arriba");
            crearPacman();
            render();
    }else if(pacman.columna == 0 && moverColumna == -1){
            console.log("fin izquierda")
            crearPacman();
            render();
    }else if(pacman.fila == filasTotales && moverFila == +1){
            console.log("fin abajo")
            crearPacman();
            render();
    }else if(pacman.columna == columnasTotales && moverColumna == +1){
            console.log("fin derecha")
            crearPacman();
            render();
    }else{
        console.log("sin limites");
    pacman.fila += moverFila;
    pacman.columna += moverColumna;
    crearPacman();
    render();
    }
}


crearMatriz();
crearEnemigos();
crearPacman()
render();






