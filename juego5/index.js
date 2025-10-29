import { incidencies } from "./data.js";

//Los change son para que no me pille el evento 2 veces, primero para abrir el select y luego al clicar el option. 
//Con change solo detecta el cambio de valor.
document.querySelector("#filtreEstat").addEventListener("change", cambiarEstadoPrioridad);
document.querySelector("#filtrePrioritat").addEventListener("change", cambiarEstadoPrioridad);

document.querySelector("#modificarModal").addEventListener("click", (e) => {
  //Utilizamos el e.target.tagname === BUTTON, para saber si estamos clicando en un boton, el tagname siempre devuelve el valor en mayusculas.
  if (e.target.tagName === "BUTTON") {
    console.log("Esto es un boton");

    e.preventDefault();
    const titulito = document.querySelector("#titulito").value.trim();
    const descripcion = document.querySelector("#descripcion").value.trim();
    const estado = document.querySelector("#estat").value.trim();
    const prioridad = document.querySelector("#prioritat").value.trim();
    const asignado = document.querySelector("#asignado").value.trim();

    if (titulito.length < 3) {
      alert("El título debe tener al menos 3 caracteres");
      return;
    }

    if (descripcion.length < 3) {
      alert("La descripción debe tener al menos 3 caracteres");
      return;
    }

    modificarIncidencia(titulito, descripcion, estado, prioridad, asignado);
  } else {
    console.log("Error, no has clicado en un boton");
  }
});

let id = 0;
const horaActual = new Date().toISOString();
let splitHora = horaActual.split("T");

document.querySelector("#enviarModal").addEventListener("click", (e) => {
  e.preventDefault();
  const titulo = document.querySelector("#titulito").value.trim();
  const descripcion = document.querySelector("#descripcion").value.trim();
  const estado = document.querySelector("#estat").value.trim();
  const prioridad = document.querySelector("#prioritat").value.trim();
  const asignado = document.querySelector("#asignado").value.trim();

  if (titulo.length < 3) {
    alert("El título debe tener al menos 3 caracteres");
    return;
  }
  if (descripcion.length < 3) {
    alert("La descripción debe tener al menos 3 caracteres");
    return;
  }

  crearNuevaIncidencia(titulo, descripcion, estado, prioridad, asignado);
});

const modal = document.querySelector("#modal");
let nuevaIncidencia = document.querySelector("#incidenciaBoton");

nuevaIncidencia.addEventListener("click", (e) => {
  e.preventDefault();
  let tituloIncidencia = "Nova incidencia";
  const botonModificar = document.querySelector("#modificarModal");
  const botonEnviar = document.querySelector("#enviarModal");
  const titulito = document.querySelector("#titulito");
  const descripcion = document.querySelector("#descripcion");
  const estat = document.querySelector("#estat");
  const prioritat = document.querySelector("#prioritat");
  const asignado = document.querySelector("#asignado");

  titulito.value = "";
  descripcion.value = "";
  estat.value = "";
  prioritat.value = "";
  asignado.value = "";

  botonModificar.classList.add("displayNone");
  botonEnviar.classList.remove("displayNone");

  document.querySelector("#tituloIncidencia").innerHTML = tituloIncidencia;
  modal.classList.add("modalAbierto");
  console.log("click boton");
});

//Cerrar modal clicando fuera
let overlay = document.querySelector("#overlayModal").addEventListener("click", (e) => {
  if (e.target == overlayModal) {
    modal.classList.remove("modalAbierto");
    console.log("Click fuera del modal");
  }
});

let boxModal = document.querySelector("#boxModal");
boxModal.addEventListener("click", (e) => {
  e.stopPropagation();

  if (e.target == cerrarModal) {
    modal.classList.remove("modalAbierto");
  }
});

let body = document.querySelector("tbody");

body.addEventListener("click", (e) => {
  let dataEditar = e.target.dataset.editar;
  let dataEliminar = e.target.dataset.eliminar;
  const sectionConfirmacion = document.querySelector(".sectionConfirmacion");
  const contenedorConfirmacion = document.querySelector(".contenedorConfirmacionCerrado");
  const botonSi = document.querySelector("#confirmacionSi");
  const botonNo = document.querySelector("#confirmacionNo");

  if (e.target.dataset.editar) {
    editarTabla(e, dataEditar);
  }
  if (e.target.dataset.eliminar) {
    console.log(e.target.dataset.eliminar);

    sectionConfirmacion.classList.add("sectionConfirmacionAbierto");
    sectionConfirmacion.classList.remove("sectionConfirmacionCerrado");

    sectionConfirmacion.addEventListener("click", (e) => {
      console.log(e.target.classList);
      if (!contenedorConfirmacion.contains(e.target) || botonNo.contains(e.target)) {
        sectionConfirmacion.classList.remove("sectionConfirmacionAbierto");
        console.log("hola");
      }

      if (botonSi.contains(e.target)) {
        eliminarTabla(dataEliminar);
        sectionConfirmacion.classList.remove("sectionConfirmacionAbierto");
      }
    });
  }
});

//Función que crea la tabla
function crearTabla(selectValue = "tots", selectPrioridad = "totes") {
  let tabla = "";
  let claseEstado = "";
  let clasePrioridad = "";
  let incidenciesFiltradas = [];

  incidenciesFiltradas = incidencies.filter((inc) => {
    const coincideEstado = selectValue === "tots" || inc.estat === selectValue;
    const coincidePrioridad = selectPrioridad === "totes" || inc.prioritat === selectPrioridad;
    return coincideEstado && coincidePrioridad;
  });

  for (let i = 0; i < incidenciesFiltradas.length; i++) {
    incidenciesFiltradas[i].estat === "obert" ? (claseEstado = "colorObert") : " ";
    incidenciesFiltradas[i].estat === "en_proces" ? (claseEstado = "colorEnProces") : " ";
    incidenciesFiltradas[i].estat === "tancat" ? (claseEstado = "colorTancat") : " ";
    incidenciesFiltradas[i].prioritat === "alta" ? (clasePrioridad = "colorAlta") : " ";
    incidenciesFiltradas[i].prioritat === "mitjana" ? (clasePrioridad = "colorMitjana") : " ";
    incidenciesFiltradas[i].prioritat === "baixa" ? (clasePrioridad = "colorBaixa") : " ";

    tabla += `
      <tr>
        <td>${incidenciesFiltradas[i].id}</td>
        <td>${incidenciesFiltradas[i].titol}</td>
        <td>${incidenciesFiltradas[i].descripcio}</td>
        <td><span class="${claseEstado} badge text-dark">${incidenciesFiltradas[i].estat}</span></td>
        <td><span id="prioridad" class="${clasePrioridad} badge">${incidenciesFiltradas[i].prioritat}</span></td>
        <td>${incidenciesFiltradas[i].dataCreacio}</td>
        <td>${incidenciesFiltradas[i].assignat}</td>
        <td>
          <button id="botonEditar" data-editar="${incidenciesFiltradas[i].id}" class="btn btn-sm btn-success">Edita</button>
          <button id="botonEliminar" data-eliminar="${incidenciesFiltradas[i].id}" class="btn btn-sm btn-danger">Elimina</button>
        </td>
      </tr>`;
  }

  if (incidencies.length == 0) {
    tabla = `<td style="text-align: center"> Sense incidencies</td>`;
  }

  renderizarIncidencias();
  body.innerHTML = tabla;
}

//Renderiza la información de los KPIs
function renderizarIncidencias() {
  const incidenciasAbiertas = incidencies.filter((abiertas) => abiertas.estat === "obert");
  const incidenciasEnProceso = incidencies.filter((enProceso) => enProceso.estat === "en_proces");
  const incidenciasCerradas = incidencies.filter((cerradas) => cerradas.estat === "tancat");

  document.querySelector("#totalIncidencias").innerHTML = incidencies.length;
  document.querySelector("#totalObertes").innerHTML = incidenciasAbiertas.length;
  document.querySelector("#totalProces").innerHTML = incidenciasEnProceso.length;
  document.querySelector("#totalTancades").innerHTML = incidenciasCerradas.length;
}

function editarTabla(e, indice) {
  const tituloIncidencia = "Editar incidencia";
  const titulito = document.querySelector("#titulito");
  const descripcion = document.querySelector("#descripcion");
  const estat = document.querySelector("#estat");
  const prioritat = document.querySelector("#prioritat");
  const asignado = document.querySelector("#asignado");
  const botonModificar = document.querySelector("#modificarModal");
  const botonEnviar = document.querySelector("#enviarModal");

  botonModificar.classList.remove("displayNone");
  botonEnviar.classList.add("displayNone");

  document.querySelector("#tituloIncidencia").innerHTML = tituloIncidencia;
  id = Number(indice) - 1;
  e.preventDefault();
  titulito.value = incidencies[id].titol;
  descripcion.value = incidencies[id].descripcio;
  estat.value = incidencies[id].estat;
  prioritat.value = incidencies[id].prioritat;
  asignado.value = incidencies[id].assignat;
  modal.classList.add("modalAbierto");
  console.log(incidencies[id].titol);
}

function eliminarTabla(indice) {
  const id = Number(indice);
  incidencies = incidencies.filter((objeto) => objeto.id != id);
  crearTabla();
  console.log(id);
}

function crearNuevaIncidencia(titulo, descripcion, estado, prioridad, asignado) {
  let idActual = incidencies.length + 1;

  let nuevaIncidencia = {
    id: `${idActual}`,
    titol: `${titulo}`,
    descripcio: `${descripcion}`,
    estat: `${estado}`,
    prioritat: `${prioridad}`,
    dataCreacio: `${splitHora[0]}`,
    assignat: `${asignado}`,
  };

  incidencies.push(nuevaIncidencia);
  modal.classList.remove("modalAbierto");

  crearTabla();
}

//Manejamos el valor del select en los filtros para que cree la tabla
function cambiarEstadoPrioridad() {
  let selectEstado = document.querySelector("#filtreEstat").value;
  let selectPrioridad = document.querySelector("#filtrePrioritat").value;
  crearTabla(selectEstado, selectPrioridad);
}

//Al clicar en resetear filtros, cambiamos los valores de Estado y Prioridad y creamos la tabla sin filtros.
document.querySelector("#resetFilters").addEventListener("click", (e) => {
  document.querySelector("#filtreEstat").value = "tots";
  document.querySelector("#filtrePrioritat").value = "totes";
  crearTabla();
});

function modificarIncidencia(titulo, descripcion, estado, prioridad, asignado) {
  incidencies[id] = {
    id: `${id + 1}`,
    titol: `${titulo}`,
    descripcio: `${descripcion}`,
    estat: `${estado}`,
    prioritat: `${prioridad}`,
    dataCreacio: `${splitHora[0]}`,
    assignat: `${asignado}`,
  };

  modal.classList.remove("modalAbierto");
  crearTabla();
}

function validarFormulario() {}

cambiarEstadoPrioridad();
