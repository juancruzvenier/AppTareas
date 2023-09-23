//mis variables
let id;
let LISTA;

const btnAñadir = document.querySelector("#btnAñadir");
const input = document.querySelector("#input");
const lista = document.querySelector("#lista");
const tachado = "tachado";
const tareaHecha = "fa-circle-check";
const tareaPorHacer = "fa-circle";
const listItem = document.querySelector("#listItem");

const toastBorrado = 
Toastify({
    text: "Tarea Borrada",
    duration: 1500,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true, 
    style: {
        background: "linear-gradient(to right, #da3754, #c97c7a)",
    },
    onClick: function () { } 
});

const toastAñadido =
Toastify({
    text: "Añadiste una tarea nueva",
    duration: 1500,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "left", 
    stopOnFocus: true, 
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () { }
})



function añadirTarea(tarea, id, completado, borrado) {

    if (borrado) {
        return;
    }

    const COMPLETADO = completado ? tareaHecha : tareaPorHacer
    const TACHADO = completado ? tachado : " ";

    const listItem = `
                                    <li id="listItem">
                                    <i class="fa-regular ${COMPLETADO}" id="${id}" data="completado"></i>
                                    <p class="text ${TACHADO}">${tarea}</p>
                                    <i class="fa-solid fa-circle-minus" style="color: rgb(184, 26, 26);" id="${id}" data="borrado"></i>
                                    </li> 
                            `;

    lista.innerHTML = listItem + lista.innerHTML;
}



function tareaCompletada(item) {
    item.classList.toggle(tareaHecha);
    item.classList.toggle(tareaPorHacer);
    item.parentNode.querySelector('.text').classList.toggle(tachado);
    LISTA[item.id].completado = LISTA[item.id].completado ? false : true;
}

function tareaBorrada(item) {
    item.parentNode.parentNode.removeChild(item.parentNode);
    LISTA[item.id].borrado = true;
toastBorrado.showToast()

}


btnAñadir.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea.trim()) {
        añadirTarea(tarea, id, false, false)
        LISTA.push({
            nombre: tarea,
            id: id,
            completado: false,
            eliminado: false
        })
        toastAñadido.showToast();


    }
    localStorage.setItem('AppTareas', JSON.stringify(LISTA))
    input.value = " ";
    id += 1;
})

document.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        const tarea = input.value;
        if (tarea.trim()) {
            añadirTarea(tarea, id, false, false)
            LISTA.push({
                nombre: tarea,
                id: id,
                completado: false,
                elimado: false
            })
            toastAñadido.showToast();
        }

        localStorage.setItem('AppTareas', JSON.stringify(LISTA))
        input.value = " ";
        id += 1;
    }
})

lista.addEventListener("click", (event) => {
    const item = event.target;
    const itemData = item.attributes.data.value;

    if (itemData === "completado") {
        tareaCompletada(item)
    } else if (itemData === "borrado") {
        tareaBorrada(item)
    }
    localStorage.setItem('AppTareas', JSON.stringify(LISTA))
})

let data = localStorage.getItem('AppTareas');
if (data) {
    LISTA = JSON.parse(data);
    id = LISTA.length;
    cargarLista(LISTA);
} else {
    LISTA = [];
    id = 0;
}

function cargarLista(DATA) {
    DATA.forEach(function (x) {
        añadirTarea(x.nombre, x.id, x.completado, x.borrado)
    })
}