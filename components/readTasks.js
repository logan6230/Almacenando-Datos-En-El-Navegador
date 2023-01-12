import { createTask } from "./addTask.js";
import dateElement from "./dateElement.js";
import { uniqueDates, orderDates } from "../services/date.js";

export const displayTask = () => {
  
    const list = document.querySelector('[data-list]')
    const taskList = JSON.parse(localStorage.getItem('task')) || [];
    const dates = uniqueDates(taskList);
    const order = orderDates(dates);
    
    order.forEach(date => {
        //moment es una libreria de formato y funciones con fechas
        const dateMoment = moment(date, "DD/MM/YYYY")
        list.appendChild(dateElement(date))
        taskList.forEach((task) => {
            const taskDate = moment(task.dateFormat, "DD/MM/YYYY")
            //Este metodo dateMoment.diff(taskDate) es propio de la libreria moment
            const diff = dateMoment.diff(taskDate)
            if (diff === 0) {
                list.appendChild(createTask(task));
            }

        });
    })
}