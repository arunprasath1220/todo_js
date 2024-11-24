document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector('.enter');
    const saveButton = document.querySelector('.save');
    const taskContainer = document.createElement('ul');
    document.querySelector('.ground').appendChild(taskContainer);

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };
    const saveTasksToStorage = () => {
        const tasks = Array.from(taskContainer.children).map(taskItem => {
            return taskItem.querySelector('.task-content').textContent;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    const addTaskToDOM = (taskText) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskContent.className = 'task-content';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';

        taskItem.appendChild(taskContent);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            taskContainer.removeChild(taskItem);
            saveTasksToStorage(); 
        });

        editButton.addEventListener('click', () => {
            const currentText = taskContent.textContent;
            const newText = prompt("Edit your task:", currentText);

            if (newText !== null && newText.trim() !== "") {
                taskContent.textContent = newText.trim();
                saveTasksToStorage(); 
            }
        });

        taskContainer.appendChild(taskItem);
    };

    saveButton.addEventListener('click', () => {
        const taskText = inputField.value.trim();

        if (taskText !== "") {
            addTaskToDOM(taskText);
            saveTasksToStorage(); 
            inputField.value = ''; 
        } else {
            alert("Please enter a task!");
        }
    });

    inputField.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            saveButton.click();
        }
    });

    loadTasks();
});
