console.log("Hola Mundo!");


function sumar(){
    const num1 = parseInt(document.querySelector("#inputUno").value);
    const num2 = parseInt(document.querySelector("#inputDos").value);
    let resultado = num1 + num2;
    const valorInput = document.querySelector("#resultado").innerHTML = resultado;
    document.querySelector("#inputUno").value = null;
    document.querySelector("#inputDos").value = null;
    console.log(resultado);
    console.log("Sumando");
}

function multiplicar(){

    document.querySelector("#tablaMultiplicar").innerHTML = "";

    const num1 = parseInt(document.querySelector("#inputTres").value);
    if(num1 < 0 || num1 > 10){
        const numeroErroneo = "El numero que has introducido es mayor o menor de 0 o 10";
        document.querySelector("#tablaMultiplicar").innerHTML = numeroErroneo;
        console.log("Error")
    }else{
        for(let contador = 0 ; contador < 10 ; contador ++){
            let resultado = num1 * contador;
            let valor = `${num1}  x  ${contador}  =  ${resultado} <br>`
            document.querySelector("#tablaMultiplicar").innerHTML += valor;
        }
    }

    
}

const btnSumar = document.querySelector("#botonSumar");
btnSumar.addEventListener("click", sumar);

const btnMultiplicar = document.querySelector("#botonMultiplicar");
btnMultiplicar.addEventListener("click", multiplicar);