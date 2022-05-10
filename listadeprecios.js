const user = {
  nombre: "",
  apellido: "",
  edad: "",
  titulo: "dra.",
  domicilio: "Guemes 4426 14D",

}

//array estudios - reemplaza base de datos 
const listaEstudios = [
  { id: "amf", titulo: "AMF", subtitulo: "Analisis de materia fecal", descripcion: "Analisis de materia fecal", descripcion: "toma de muestras", precio: 200 },
  { id: "aoc", titulo: "AOC", subtitulo: "Analisis de orina completo", descripcion: "Analisis de orina completo", descripcion: "toma de muestras", precio: 500 }
];


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
  });} catch (e)  {
    console.log(e)
  }

  function cardTitulo(estudio) {
  const titulo = document.createElement('div');
  titulo.classList.add('title');
  titulo.textContent= estudio.titulo;
  titulo.appendChild(addToPedido(estudio));
  return titulo;
  };

  function addToPedido(estudio) {
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.classList.add("add");
    addButton.textContent = "+";
    addButton.addEventListener("click",() => addNewPedido(estudio));
    return addButton;

  };

  function cardSubtitulo(estudio) {
    const subtitulo = document.createElement("div");
    subtitulo.classList.add('subtitulo');
    subtitulo.textContent=estudio.subtitulo;
    return subtitulo;

  };

  function cardDescripcion(estudio) {
    const descripcion = document.createElement("div");
    descripcion.classList.add('descripcion');
    descripcion.textContent=estudio.descripcion;
    return descripcion;

  };


  function cardPrecio(estudio) {
    const precio = document.createElement("div");
    precio.classList.add('subtitulo');
    precio.textContent=estudio.precio;
    return precio;

  };

}

cargarLista()

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
  const itemPedido = document.createElement("div"); // <div></div>
  itemPedido.className = "pedidoHTML"; 

  itemPedido.appendChild(protocoloItemPedido(pedidoConCantidad));
  itemPedido.appendChild(contadorItemPedido(pedidoConCantidad));
  itemPedido.appendChild(precioItemPedido(pedidoConCantidad));
  itemPedido.appendChild(subtotalItemPedido(pedidoConCantidad));
  return itemPedido;
}


function protocoloItemPedido(pedidoConCantidad) {
  try {
    const protocolo = document.createElement("div");
    protocolo.textContent = pedidoConCantidad.titulo; 
    protocolo.className = "protocolo";
    return protocolo;

  } catch(e){
  console.log(e)
}
}




function totalPedido(listaConContador) {
  let suma = 0;
  listaConContador.forEach((pedidoConCantidad) => {
    suma += pedidoConCantidad.subtotal;
  });
  const total = document.createElement('div');
  total.classList.add('total');
  total.textContent= suma;
  return total;
}

function contadorItemPedido(pedidoConCantidad) {
  try {
    const contador = document.createElement("div");
    contador.className = "contador";
    contador.appendChild (contadorItemRestar(pedidoConCantidad));
    contador.appendChild (contadorTotal(pedidoConCantidad.cantidad));
    contador.appendChild (contadorItemSumar(pedidoConCantidad));
    return contador;  
  } catch(e) {
    console.log(e);
  }
  
  
}

function contadorTotal(cantidad) {
  const total = document.createElement('button');
  total.classList.add('btn');
  total.textContent= cantidad;
  return total;
}

function contadorItemRestar(pedidoConCantidad) {
const restar = document.createElement('button');
restar.classList.add('btn');
restar.textContent= '<';
restar.addEventListener("click",() => removePedido(pedidoConCantidad));

return restar;
}

function contadorItemSumar(pedidoConCantidad) {
  
const sumar = document.createElement('button');
sumar.classList.add('btn');
sumar.textContent= '>';
sumar.addEventListener("click",() => addNewPedido(pedidoConCantidad));
return sumar;
 
}


function precioItemPedido(pedidoConCantidad) {
  const itemPrecio = document.createElement('div');
  itemPrecio.classList.add('precio');
  itemPrecio.textContent= pedidoConCantidad.precio;
  return itemPrecio;
}

function subtotalItemPedido(pedidoConCantidad) {
  const itemSubtotal = document.createElement('div');
  itemSubtotal.classList.add('precio');
  itemSubtotal.textContent=  pedidoConCantidad.subtotal;
  return itemSubtotal;
}

function totalItemPedido(pedidoConCantidad) {
  const itemSubtotal = document.createElement('div');
  itemSubtotal.classList.add('precio');
  itemSubtotal.textContent= pedidoConCantidad.cantidad;
  return itemSubtotal;
}

//envia lista de pedidos al admin - agrega a base de datos
const solicitar = document.createElement('button');
solicitar.classList.add('btn');
solicitar.textContent= 'solicitar retiro de muestras';

let listaDePedidos = [];// Ejemplo: [{ idDeEstudio: "amf" }, { idDeEstudio: "aoc" }, { idDeEstudio: "amf" }]

function generarListaConContador(listaDePedidos) {
  const listaConContador = [];  // [{ idDeEstudio: "amf", cantidad: 2 }, { idDeEstudio: "aoc", cantidad: 1}]
  
  listaDePedidos.forEach((pedido) => {
    let found = listaConContador.find((element) => element.id === pedido.id);
    
    if (found) {
      found.cantidad += 1;
      found.subtotal = found.precio*found.cantidad;
    } else {
      listaConContador.push({...pedido, cantidad: 1, subtotal: pedido.precio });
    }
  });
  
  return listaConContador;
}


function reRenderListaDePedidos() {
  try {
    let pedidosHtml = [];

    const listaConContador = generarListaConContador(listaDePedidos);
    listaConContador.forEach((element) => {
      
      pedidosHtml.push(createItemPedido(element));
    });
    
    pedidosHtml.push(totalPedido(listaConContador));
      
    $("#listaPedido").html(pedidosHtml);
    
    listaDePedidos.sort();


    
  } catch (e) {
    console.log(e);
  }
}

function addNewPedido(estudio) {
try {
  listaDePedidos.push(estudio);
  reRenderListaDePedidos()

}catch(e) {
  console.log(e)
}
}

function removePedido(estudio) {
  try {
    console.log(estudio.id)
  
    let finishedRemoving = false;

    listaDePedidos = listaDePedidos.filter(e =>{
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