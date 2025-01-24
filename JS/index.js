import { createElement } from "./createElement.js";

const init = () => {

        let taskArr = [];

        const button = document.querySelector(".add-btn");
        const inputField = document.querySelector(".todo-input");
        const groupItem = document.querySelector(".group-list-item");

        // Save tasks in LocalStorage
        const save = () => {
            localStorage.setItem("tasks", JSON.stringify(taskArr));
        }

        const load = () => {
            const loadData = localStorage.getItem("tasks");
            taskArr = JSON.parse(loadData);
            if (loadData){
                taskArr.forEach((tasks) => TaskInDom(tasks));
            }
            
        }

        // Here we build how tasks will be inserted inside DOM

        const TaskInDom = (data) => {
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

            radioInput.addEventListener("click", function taskDone () {
                if (radioInput.checked){
                    taskContent.classList.toggle("checked");
                }
            })

            const removeButton = createElement("button",{
                class: "remove-btn"
            })
            item.appendChild(removeButton);

            // remove tasks on click 
            
            removeButton.addEventListener("click", function removeTask(event){
                if (event.currentTarget) {
                    item.remove();
                }
                JSON.parse(localStorage.getItem("tasks"));
                
                if (taskArr && Array.isArray(taskArr)){
                    const filteredData = taskArr.filter((task) => task !== data);

                    // resave tasks on task remove
                    localStorage.setItem("tasks", JSON.stringify(filteredData));

                }
        });
                
        }

        // task creation 

        const addTask = () => {
            const data = inputField.value.toLowerCase().trim();
            if (!data){
                return;
            }
            
                taskArr.push(data);
            
            
              
            TaskInDom(data);
            save();
            inputField.value = "";
        }
        addTask();
        
        // with this handler we can add tasks on click, using addTask function
        button.addEventListener("click", addTask);
        load();
    }
    
init();