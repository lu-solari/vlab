 
const getListaEstudios = require(["getListaEstudios"]);

const user = {
    nombre: "",
    apellido: "",
    edad: "",
    titulo: "dra.",
    domicilio: "Guemes 4426 14D",
  }


  //opciones formulario de pedido
  function sugerenciaEstudios(listaEstudios) {
  const seleccionEstudios = document.getElementById("seleccionEstudios");
  listaEstudios.forEach((estudio) => {
  const element = document.createElement("option"); 
  element.value = estudio.id;
  element.textContent= estudio.id;
  seleccionEstudios.appendChild(element);
  });
  return seleccionEstudios;
  }
  sugerenciaEstudios(listaEstudios);