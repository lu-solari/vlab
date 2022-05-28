const users = [
    {
        nombre: "",
        apellido: "",
        edad: "",
        titulo: "dra.",
        domicilio: "Guemes 4426 14D",
    }
]

function sortOn(arr, prop) {
    arr.sort(
        function (a, b) {
            if (a[prop] < b[prop]) {
                return -1;
            } else if (a[prop] > b[prop]) {
                return 1;
            } else {
                return 0;
            }
        }
    );
}


function createUser() {
    users.push({
        nombre: document.getElementById("user_name").value,
        apellido: document.getElementById("user_name").value,
        edad: document.getElementById("user_name").value,
        titulo: document.getElementById("user_name").value,
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
function filterCards() {
    let input = document.querySelector('#searchbar').value
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



//reemplazar base de datos razas
const perro = ["indefinido", "labrador", "boxer", "caniche",];
const gato = ["comun europeo", "persa", "siames",];


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function sugerenciaRaza(especie) {
    const seleccionRaza = document.getElementById("seleccionRaza");
    removeAllChildNodes(seleccionRaza);
    const listaRazas = especie;
    listaRazas.forEach((raza) => {
        const element = document.createElement("option");
        element.value = raza;
        element.textContent = raza;
        seleccionRaza.appendChild(element);
    });
    return seleccionRaza;
}

//
function validateEmail(input) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
        //   document.form1.text1.focus();
        return true;

    } else {
        alert("revisar el mail ingresado");
        //   document.form1.text1.focus();
        return false;
    }
}

function parseAndValidate(number, max, factor) {
    // convert age to a number
    number = parseInt(number, 10);
    //check if age is a number     
    if (isNaN(number)) {
        alert("el valor ingresado no es un numero");
        return false;
    }
    //check if age is a number or less than or greater than max
    else if (number > max) {
        alert("el valor ingresado es mayor a " + max);
        return false;
    }
    //turn all age to days                                    
    else {
        numberParse = number * factor;
        console.log(number + " dias");
        return numberParse;
    }
}


function parseValue(number, max, factor) {
    if (number.length == 0) {
        return 0;
    } else {
        let numberParse = parseAndValidate(number, max, factor);
        return numberParse;
    }
};

function alertaValidacion(string) {
    const alerta = document.createElement('div');
    alerta.classList.add('incorrecto');
    alerta.textContent = string;
    return alerta;
}

//validaciones formulario de pedido
function validarNombrePaciente() {
    let patientName = formulario.patient_name.value;
    if (patientName == 0) {
        alert("completa el nombre de paciente")
        // let input = document.getElementById('patient_name'); //frenar envio de formulario
        // let grupo = input.parentNode;
        // grupo.appendChild(alertaValidacion('mal'));
    } else {
        alert(formulario.patient_name.value);
        solicitudDeRetiro.push({
            nombrePaciente: patientName,
        })
    }
};

function validarRadioEspecie() {
    if (formulario.patient_species[0].checked == true ||
        formulario.patient_species[1].checked == true) {
    } else {
        alert("Completa el campo especie");
    }
};

function validarRadioSexo() {

    if (formulario.patient_sexo[0].checked == true ||
        formulario.patient_sexo[1].checked == true) {
    } else {
        alert("Completa el campo sexo");
    }
}


function validarEdad() {
    let years = formulario.patient_years.value;
    let months = formulario.patient_months.value;
    let days = formulario.patient_days.value;


    if (years !== 0 ||
        months !== 0 ||
        days !== 0) {
        let yearsParse = parseValue(years, 25, 365);
        let monthsParse = parseValue(months, 1000, 30);
        let daysParse = parseValue(days, 1000, 1);
        let edad = yearsParse + monthsParse + daysParse;
        alert("edad: " + edad + " dias");
        solicitudDeRetiro.push({
            edadPaciente: edad,
        })
    }

    else {
        alert("falta completar la edad");
        // e.preventDefault();
        //https://www.w3schools.com/jsref/event_preventdefault.asp
        //Evita que un enlace abra la URL
    }

};

function validarNombreCliente() {
    let nombreCliente = formulario.client_name.value;
    if (nombreCliente == 0) {

        alert("falta completar nombre tenedor");
        // e.preventDefault();
        //https://www.w3schools.com/jsref/event_preventdefault.asp
        //Evita que un enlace abra la URL
    } else {
        solicitudDeRetiro.push({
            nombreCliente: nombreCliente,
        });
    }
};

function validarEmail() {
    let mailCliente = formulario.email_address.value;
    console.log(mailCliente);
    if (formulario.email_address.value == 0) { }
    else {
        console.log(mailCliente);
        validateEmail(mailCliente);
        solicitudDeRetiro.push({
            emailIngresado: mailCliente,
        })
        // e.preventDefault();
        //https://www.w3schools.com/jsref/event_preventdefault.asp
        //Evita que un enlace abra la URL
    }
};

//    function validarCheckbox(){
//         if (formulario.terminos.checked == false){
//             alert("Acepta los términos y condiciones");
//             e.preventDefault();
//         }
//     };


let solicitudDeRetiro = [
    // {nombrePaciente:"", nombreCliente:"", edadPaciente:"", especiePaciente:"", sexoPaciente:"", razaPaciente:"", fechaNacimiento:"", seleccionEstudios:"", emailIngresado:""}
]

// function createsolicitud() {
// solicitudDeRetiro.push ({
//     nombrePaciente: ,
//     nombreCliente: ,
//     edadPaciente:   ,
//     especiePaciente:  ,
//     sexoPaciente: ,
//     razaPaciente: ,
//     fechaNacimiento: , 
//     seleccionEstudios:"",
//     emailIngresado:"",
// })
// };

function validateForm() {
    let formulario = document.getElementsByName('formulario')[0];
    console.log(formulario);
    let elementos = formulario.elements;
    console.log(elementos);
    validarNombrePaciente();
    validarRadioEspecie();
    validarRadioSexo();
    validarEdad();
    validarNombreCliente();
    validarEmail();
    event.preventDefault()

};


//=====================================================================
//Navegacion
//=====================================================================

const open = document.getElementById('open');
const close = document.getElementById('close');
const sidebar = document.getElementById('sidebar');
console.log(sidebar);
const container = document.getElementById('container');
console.log(container);
const bodyInicio = document.getElementById('bodyInicio');
const bodyRegistro = document.getElementById('bodyRegistro');
const bodySolicitud = document.getElementById('bodySolicitud');
const bodyPrecios = document.getElementById('bodyPrecios');
const bodyInformes = document.getElementById('bodyInformes');



const bodySwitch = document.getElementById('bodySwitch');
let bodyTitulo = document.getElementById('bodyTitulo');
let searchbar = document.getElementById('searchbar');

const navInicio = document.getElementsByName('navInicio');
const navRegistro = document.getElementsByName('navRegistro');
const navSolicitud = document.getElementsByName('navSolicitud');
const navPrecios = document.getElementsByName('navPrecios');
const navInformes = document.getElementsByName('navInformes');

function bodyReset(navItem) {
    navInicio.forEach(element => {
        element.classList.remove("active");
    });
    navRegistro.forEach(element => {
        element.classList.remove("active");
    });
    navSolicitud.forEach(element => {
        element.classList.remove("active");
    });
    navPrecios.forEach(element => {
        element.classList.remove("active");
    });
    navInformes.forEach(element => {
        element.classList.remove("active");
    });
        navItem.forEach(element => {
        element.classList.add("active");
    });
    bodyInicio.style.display = 'none';
    bodyRegistro.style.display = 'none';
    bodySolicitud.style.display = 'none';
    bodyPrecios.style.display = 'none';
    bodyInformes.style.display = 'none';
    searchbar.onkeyup = null;


};

function toggleInicio() {
    bodyReset(navInicio);
    bodyInicio.style.display = 'grid';
    bodyTitulo.textContent = 'Inicio';
    scroll();
};

function toggleSolicitud() {
    bodyReset(navSolicitud);
    bodySolicitud.style.display = 'grid';
    bodyTitulo.textContent = 'Solicitud de Retiro';
    sugerenciaEstudios(listaEstudios);
};

function toggleInformes() {
    bodyReset(navInformes);
    bodyInformes.style.display = 'grid';
    bodyTitulo.textContent = 'Mis Informes';
};


function toggleRegistro() {
    bodyReset(navRegistro);
    bodyRegistro.style.display = 'grid';
    bodyTitulo.textContent = 'Registrarse';
    sugerenciaEstudios(listaEstudios);
};

function togglePrecios() {
    bodyReset(navPrecios);
    bodyPrecios.style.display = 'grid';
    bodyTitulo.textContent = 'Lista de Precios';
    cargarLista();
    try {
        searchbar.onkeyup = function() {
            filterCards();
        };
    } catch(error) {
        console.log(error);
    }

};

open.onclick = () => {
    open.style.display = 'none';
    close.style.display = 'block';
    sidebar.classList.remove('hide-sidebar');
    sidebar.classList.add('show-sidebar');
};


close.onclick = () => {
    close.style.display = 'none';
    open.style.display = 'block';

    sidebar.classList.remove('show-sidebar');
    sidebar.classList.add('hide-sidebar');

};


function scroll() {
    const articles = document.querySelectorAll(".article");
    console.log(articles);
    const contenido = document.getElementById('contenido');
    const navLi = document.querySelectorAll("nav .menu ul li");
    console.log(navLi);
    try {
        contenido.onscroll = () => {
            let current = "";



            articles.forEach((article) => {
                const articleTop = article.offsetTop;
                const articleLength = article.offsetHeight;
                const contenidoScroll = contenido.scrollTop;
                if (contenidoScroll >= articleTop - articleLength) {
                    current = article.getAttribute("id");
                    console.log(current);
                }
            });





            navLi.forEach((li) => {
                li.classList.remove("active");
                if (li.classList.contains(current)) {
                    li.classList.add("active");
                    console.log(current);
                }
            });
        }

    }
    catch (error) {
        console.log(error);
    }
}



window.onscroll = function () {

    var section = document.getElementsByClassName("section");



    var bScroll = document.body.scrollTop;
    for (var i = 0; i < section.length; i++) {


        var sHeight = section[i].offsetHeight;
        var offsets = section[i].offsetTop;

        if (bScroll > offsets && bScroll < offsets + sHeight) {
            section[i].className = "section active";
        } else {
            section[i].className = "section";
        }
    }
}

