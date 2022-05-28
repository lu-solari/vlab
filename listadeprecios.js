
const users = [
  {
    nombre: "",
    apellido: "",
    edad: "",
    titulo: "dra.",
    domicilio: "Guemes 4426 14D",
  }  
]

function sortOn (arr, prop) {
  arr.sort (
      function (a, b) {
          if (a[prop] < b[prop]){
              return -1;
          } else if (a[prop] > b[prop]){
              return 1;
          } else {
              return 0;   
          }
      }
  );
}


function createUser() {
  users.push({
    nombre: document.getElementById("user_name").value ,
    apellido:  document.getElementById("user_name").value ,
    edad:  document.getElementById("user_name").value ,
    titulo: document.getElementById("user_name").value ,
    domicilio: "Guemes 4426 14D",
  });
 console.log(users);
}

//array estudios - reemplaza base de datos 
const listaEstudios = [
  { id: "amf", subtitulo: "AMF", titulo: "Analisis de materia fecal", descripcion: "Analisis de materia fecal", descripcion: "toma de muestras", precio: 200 },
  { id: "aoc", subtitulo: "AOC", titulo: "Analisis de vss completo", descripcion: "Analisis de orina completo", descripcion: "toma de muestras", precio: 500 },
  { id: "assac", subtitulo: "acasc", titulo: "Analisis de avavaaswccaca fecal", descripcion: "Analisis de materia fecal", descripcion: "toma de muestras", precio: 200 },
  { id: "asca", subtitulo: "cuasa", titulo: "Analisis de svasva completo", descripcion: "Analisis de orina completo", descripcion: "toma de muestras", precio: 500 },
  { id: "assac", subtitulo: "acasc", titulo: "Analisis avas materia fecal", descripcion: "Analisis de materia fecal", descripcion: "toma de muestras", precio: 200 },
  { id: "ascavava", subtitulo: "cuadvadvsa", titulo: "vsd de orina completo", descripcion: "Analisis de orina completo", descripcion: "toma de muestras", precio: 500 }
];

let usuarioActivo = null 


//opciones formulario de pedido
function sugerenciaEstudios(listaEstudiosParam) {
  const seleccionEstudios = document.getElementById("seleccionEstudios");
  listaEstudiosParam.forEach((estudio) => {
    const element = document.createElement("option");
    element.value = estudio.id;
    element.textContent = estudio.id;
    seleccionEstudios.appendChild(element);
  });
  return seleccionEstudios;
}

function cargarLista() {

  const listaPrecios = document.getElementById("cardsContainer");
  console.log("listaPreciosDebug");
  console.log(listaPrecios);
  try {
    listaEstudios.forEach((estudio) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.appendChild(cardTitulo(estudio));
      card.appendChild(cardSubtitulo(estudio));
      card.appendChild(cardDescripcion(estudio));
      card.appendChild(cardPrecio(estudio));
      listaPrecios.appendChild(card);
    });
  } catch (e) {
    console.log(e)
  }

  function cardTitulo(estudio) {
    const titulo = document.createElement('div');
    titulo.classList.add('title');
    titulo.textContent = estudio.titulo;
    titulo.appendChild(addToPedido(estudio));
    return titulo;
  };

  function addToPedido(estudio) {
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.classList.add("add");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => addNewPedido(estudio));
    return addButton;

  };

  function cardSubtitulo(estudio) {
    const subtitulo = document.createElement("div");
    subtitulo.classList.add('subtitulo');
    subtitulo.textContent = estudio.subtitulo;
    return subtitulo;

  };

  function cardDescripcion(estudio) {
    const descripcion = document.createElement("div");
    descripcion.classList.add('descripcion');
    descripcion.textContent = estudio.descripcion;
    return descripcion;

  };


  function cardPrecio(estudio) {
    const precio = document.createElement("div");
    precio.classList.add('precio');
    precio.textContent = "$   " + estudio.precio;
    return precio;

  };

}



//sets variables for input and search items
function filter() {
  let input = document.querySelector('.searchbar').value
  input = input.toLowerCase();  
  let cards = document.querySelectorAll('.card');

  //loop over cards and compare search with title.
  cards.forEach((el) => {
    let title = el.querySelector('.title').textContent.toLowerCase();
    el.style.display = title.includes(input) ? "list-item" : "none";
  });
}


//item html para cada protocolo solicitado con cantidad
function createItemPedido(pedidoConCantidad) {
  const itemPedido = document.createElement("div");
  itemPedido.className = "pedidoHTML";
  
  const tituloItemPedido = document.createElement("div"); // <div></div>
  tituloItemPedido.className = "titulo-pedidoHTML";
  tituloItemPedido.appendChild(protocoloItemPedido(pedidoConCantidad));
  
  const valorItemPedido = document.createElement("div"); // <div></div>
  valorItemPedido.className = "valor-pedidoHTML";
  valorItemPedido.appendChild(precioItemPedido(pedidoConCantidad));
  valorItemPedido.appendChild(subtotalItemPedido(pedidoConCantidad));
  valorItemPedido.appendChild(contadorItemPedido(pedidoConCantidad));
  
  itemPedido.appendChild(tituloItemPedido);
  itemPedido.appendChild(valorItemPedido);
  return itemPedido;
}


function protocoloItemPedido(pedidoConCantidad) {
  try {
    const protocolo = document.createElement("div");
    protocolo.textContent = pedidoConCantidad.titulo;
    protocolo.className = "protocolo";
    return protocolo;

  } catch (e) {
    console.log(e)
  }
}




function contadorItemPedido(pedidoConCantidad) {
  try {
    const contador = document.createElement("div");
    contador.className = "contador";
    contador.appendChild(contadorItemRestar(pedidoConCantidad));
    contador.appendChild(contadorTotal(pedidoConCantidad.cantidad));
    contador.appendChild(contadorItemSumar(pedidoConCantidad));
    return contador;
  } catch (e) {
    console.log(e);
  }
}

function contadorTotal(cantidad) {
  const total = document.createElement('button');
  total.classList.add('btn', 'cantidad');
  total.textContent = cantidad;
  return total;
}

function contadorItemRestar(pedidoConCantidad) {
  const restar = document.createElement('button');
  restar.classList.add('btn');
  restar.addEventListener("click", () => removePedido(pedidoConCantidad));
  if (pedidoConCantidad.cantidad > 1) {
    restar.textContent = '<';

  } else {
    restar.textContent = 'x';

  }

  return restar;
}

function contadorItemSumar(pedidoConCantidad) {

  const sumar = document.createElement('button');
  sumar.classList.add('btn');
  sumar.textContent = '>';
  sumar.addEventListener("click", () => addNewPedido(pedidoConCantidad));
  return sumar;

}


function precioItemPedido(pedidoConCantidad) {
  const itemPrecio = document.createElement('div');
  itemPrecio.classList.add('precio');
  itemPrecio.textContent = "$  " + pedidoConCantidad.precio;
  return itemPrecio;
}

function subtotalItemPedido(pedidoConCantidad) {
  const itemSubtotal = document.createElement('div');
  itemSubtotal.classList.add('precio');
  itemSubtotal.textContent = "$  " + pedidoConCantidad.subtotal;
  return itemSubtotal;
}

function totalItemPedido(pedidoConCantidad) {
  const itemSubtotal = document.createElement('div');
  itemSubtotal.classList.add('precio');
  itemSubtotal.textContent = pedidoConCantidad.cantidad;
  return itemSubtotal;
}



function totalPedido(listaConContador) {
  if (listaConContador.length > 0) {
    let suma = 0;
    listaConContador.forEach((pedidoConCantidad) => {
      suma += pedidoConCantidad.subtotal;
    });
    const total = document.createElement('div');
    total.classList.add('total');
    total.textContent = "$  " + suma;
    return total;
  }
}

//envia lista de pedidos al admin - agrega a base de datos
function solicitarRetiro(listaConContador) {
  if (listaConContador.length > 0) {
    const solicitar = document.createElement('button');
    solicitar.classList.add('btn');
    solicitar.textContent = "pedir retiro de muestras"
    return solicitar;
  }
}

let listaDePedidos = [];// Ejemplo: [{ idDeEstudio: "amf" }, { idDeEstudio: "aoc" }, { idDeEstudio: "amf" }]

function generarListaConContador() {
  const listaConContador = [];  // [{ idDeEstudio: "amf", cantidad: 2 }, { idDeEstudio: "aoc", cantidad: 1}]

  listaDePedidos.forEach((pedido) => {
    let found = listaConContador.find((element) => element.id === pedido.id);

    if (found) {
      found.cantidad += 1;
      found.subtotal = found.precio * found.cantidad;
    } else {
      listaConContador.push({ ...pedido, cantidad: 1, subtotal: pedido.precio, });
    }
  });
  console.log(listaConContador);
  return listaConContador;
}


function reRenderListaDePedidos() {
  try {
    let pedidosHtml = [];

    const listaConContador = generarListaConContador();
    listaConContador.forEach((element) => {
      pedidosHtml.push(createItemPedido(element));
    });

    pedidosHtml.push(totalPedido(listaConContador));
    pedidosHtml.push(solicitarRetiro(listaConContador));
    $("#listaPedido").html(pedidosHtml);
    sortOn(listaDePedidos, "titulo");
    console.log(listaDePedidos);
  } catch (e) {
    console.log(e);
  }
}

function addNewPedido(estudio) {
  try {
    listaDePedidos.push(estudio);
    reRenderListaDePedidos()

  } catch (e) {
    console.log(e)
  }
}

function removePedido(estudio) {
  try {
    let finishedRemoving = false;

    listaDePedidos = listaDePedidos.filter(e => {
      if (finishedRemoving || (e.id !== estudio.id)) {
        return true;
      } else {
        finishedRemoving = true;
        return false;
      }

    })

  } catch (e) {
    console.log(e);
  }

  reRenderListaDePedidos()
}






