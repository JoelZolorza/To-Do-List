const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-check-circle';
const unCheck = 'fa-circle';
const lineThrough = 'line-through';
let id = 0;

//funcion agregar tarea

function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){
        return  
    }

    const REALIZADO = realizado ?check :unCheck
    const LINE = realizado ?lineThrough : ''

    const elemento = ` 
                    <li id="elemento">
                        <i class="far ${REALIZADO} " data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>`

    lista.insertAdjacentHTML("beforeend",elemento);
} 

//funcion tarea Realizada

function tareaRealizda(element){
    element.classList.toggle(check)
    element.classList.toggle(unCheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
}



//Tarea Eliminada
function tareaEliminada(){}

botonEnter.addEventListener('click',()=>{
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea, id, false, false)
    }
    input.value = ''
    id++
});


document.addEventListener('keyup', function (event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea, id, false, false)
        }
        input.value=''
        id++
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData === 'realizado'){
        tareaRealizda(element)
    }
    else if (elementData === 'eliminado') {
        tareaEliminada(element)
    }
})



