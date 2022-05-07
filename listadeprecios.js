const user = {
  nombre: "",
  apellido: "",
  edad: "",
  titulo: "dra.",
  domicilio: "Guemes 4426 14D",
  
}

// const hola = () => {};
// function hola() 


//array estudios - reemplaza base de datos 
const listaEstudios = [
  {titulo: "AMF", descripcion: "Analisis de materia fecal", descripcion: "toma de muestras", precio: 200}, 
  {titulo: "AOC", descripcion: "Analisis de orina completo", descripcion: "toma de muestras", precio: 500}
];

// let estudio = document.createElement("div");

// estudios.forEach((el) => {
//   estudio.id = el.titulo
//   estudio.
// });

// function cambiarTextoDos() {
//   var x = document.getElementsByClassName("ejemplo");
//   for (i = 0; i < x.length; i++) {
//   x[i].innerHTML = "Hola Codo a Codo! " + (i + 1);
//   }
//   }

function cargarLista() {
  const listaPrecios = document.getElementById("cardsContainer");
  console.log("listaPreciosDebug");
  console.log(listaPrecios);
  listaEstudios.forEach((estudio) => {
    const card= `
    <div class="card">
    <div class="estudio"><button class="add" onclick="addNewEstudio()" type="button" id="blabla">+</button><span class="title">${estudio.titulo}</span></div>
    <div class="card-subtitle">${estudio.subtitulo}</div>
    <div class="card-box">${estudio.descripcion}</div>
    <div class="card-precio">${estudio.precio}</div>
    </div>
    `;
    listaPrecios.innerHTML += card;
  });

}

cargarLista()


// listaEstudios.forEach((estudio) => {
//   const card= `
//   <div class="card">
//   <div class="estudio"><button class="add" onclick="addNewEstudio()" type="button" id="blabla">+</button><span class="title">${estudio.titulo}</span></div>
//   <div class="card-subtitle">${estudio.subtitulo}</div>
//   <div class="card-box">${estudio.descripcion}</div>
//   <div class="card-precio">${estudio.precio}</div>
//   </div>
//   `
  
//   console.log("cardDebug");
//   console.log(card);
  
// });

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
    //change function with pricelist database
    const PEDIDO = `
    <div>
    <p>Value= estudio seleccionado</p>
    </div>
    `
    function addNewEstudio() {
      try{
        $("#seleccion-pedido").after(PEDIDO);
      } catch (e) {
        console.log(e);
    }
    }
    //change function with pricelist database
