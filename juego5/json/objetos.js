const incidencies = [
    {
    nombre: "Hola",
    edad: 15,
    ciudad: "Barcelona",
    },
    {
    nombre: "Adios",
    edad: 12,
    ciudad: "Madrid",
    }
]

const objetoJSON = JSON.stringify(incidencies);

console.log(objetoJSON);

const returnOBJ = JSON.parse(objetoJSON);

console.log(returnOBJ);

localStorage.setItem("bd", objetoJSON);

const bdObject = localStorage.getItem("bd");

console.log(bdObject);