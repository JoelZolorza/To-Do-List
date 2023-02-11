const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-check-circle';
const unCheck = 'fa-circle';
const lineThrough = 'line-through';
let id 
//Array
let LIST 







//Creacion de fecha
const Fecha = new Date()
fecha.innerHTML = Fecha.toLocaleDateString('es-AR',{weekday:'long',month:'short',day:'numeric'})



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

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(unCheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST(element.id).realizado = LIST(element.id).realizado ? false : true
}

//funcion de tarea eliminada

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST(element.id).eliminado = true
}






botonEnter.addEventListener('click',()=>{
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado:false,
            eliminado:false

        })
    }
    localStorage.setItem('ToDoList', JSON.stringify(LIST))
    input.value = ''
    id++
    console.log(LIST)
});


document.addEventListener('keyup', function (event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado:false,
                eliminado:false
    
            })
        }
        localStorage.setItem('ToDoList', JSON.stringify(LIST))
        input.value=''
        id++
        console.log(LIST)
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData === 'realizado'){
        tareaRealizada(element)
    }
    else if (elementData === 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('ToDoList', JSON.stringify(LIST))
})


//Local Storage get Item
let data = localStorage.getItem('ToDoList')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)

}else{
    LIST = []
    id = 0 
}

function cargarLista(DATA) {
    DATA.forEach(function(i) {
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    });
}