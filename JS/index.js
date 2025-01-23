// créer un tableau vide
// sauvegarder les données
// les charger les données
// insérer les éléments dans le DOM
// ajouter les tâches
// supprimer les tâches


import { createElement } from "./createElement.js";

const init = () => {

        let taskArr = [];

        const taskContainer = document.querySelector(".task");
        const button = document.querySelector(".add-btn");
        const inputField = document.querySelector(".todo-input");

        const save = () => {
            localStorage.setItem("tasks", JSON.stringify(taskArr));
        }

        const load = () => {
            const loadData = localStorage.getItem("tasks");
            taskArr = JSON.parse(loadData);
            taskArr.forEach((tasks) => TaskInDom(tasks));
        }


        // Here we define how tasks will be inserted inside DOM

        const TaskInDom = (data) => {
            const groupItem = createElement("ul", {
                class: "group-list-item",
            });
            taskContainer.appendChild(groupItem);

            const item = createElement("li", {
                class: "item"
            });
            groupItem.appendChild(item);

            const radioInput = createElement("input",{
                type: "radio",
                class: "input-radio"
            });
            item.appendChild(radioInput);

            const taskContent = createElement("p", {
                class: "task-content"
            })
            item.appendChild(taskContent);
            taskContent.textContent = data;

            const removeButton = createElement("button",{
                class: "remove-btn"
            })
            item.appendChild(removeButton);
            
            removeButton.addEventListener("click", function removeTask(){
                groupItem.remove();
                save();
            })
        }
        const addTask = () => {
            const data = inputField.value;
            if (!data){
                return;
            }
            taskArr.push(data);
            TaskInDom(data);
            save();
            inputField.value = "";
        }
        addTask();
        button.addEventListener("click", addTask);
        load();
    }
    

    

    


init();