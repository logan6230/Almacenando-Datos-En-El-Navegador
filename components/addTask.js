import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTask } from './readTasks.js';

export const addTask = (event) => {
    //Evita que se refresque la informacion cuando uno hace click
    event.preventDefault();
    const list = document.querySelector('[data-list]');
    const input = document.querySelector('[data-form-input]');
    const calendar = document.querySelector('[data-form-date]');

    const value = input.value;
    const date = calendar.value;
    const dateFormat = moment(date).format("DD/MM/YYYY");

    if (value === "" || date === "") {
        return alert('Los campos son obligatorios')
    }

    input.value = '';
    calendar.value = '';

    const complete = false;

    //Creamos un objeto que contenga clave y valor
    //uuid.v4() es una libreria para crear numeros aleatorios unicos de uuid
    const taskObject = {
        value: value,
        dateFormat: dateFormat,
        complete: complete,
        id: uuid.v4()
    }

    list.innerHTML = ''

    //JSON.parse() me trasforma el objeto de string a un objeto Js 
    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    taskList.push(taskObject)
    //JSON.stringify me convierte la informacion a cadena de texto JSON
    localStorage.setItem('task', JSON.stringify(taskList))

    displayTask();
}



export const createTask = ({ value, dateFormat, complete, id }) => {

    const task = document.createElement('li');
    task.classList.add('card');

    //backticks
    const taskContent = document.createElement('div');

    const check = checkComplete(id)
    if (complete) {        
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
    }
    const titleTask = document.createElement('span');
    titleTask.classList.add('task');
    titleTask.innerText = value;
    taskContent.appendChild(check);
    taskContent.appendChild(titleTask);

    const dateElement = document.createElement("span")
    dateElement.innerHTML = dateFormat
    task.appendChild(taskContent);
    task.appendChild(dateElement)
    task.appendChild(deleteIcon(id));
    return task;
};