document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');

    let tasks = [];

    function renderTasks() {
        pendingTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.text} (${task.date ? task.date : 'No date'})</span>
                <button class="complete" onclick="completeTask('${task.id}')">Complete</button>
                <button class="edit" onclick="editTask('${task.id}')">Edit</button>
                <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>
            `;

            if (task.completed) {
                completedTasksList.appendChild(taskItem);
            } else {
                pendingTasksList.appendChild(taskItem);
            }
        });
    }

    function addTask(text) {
        const id = Date.now().toString();
        const date = new Date().toLocaleString();
        tasks.push({ id, text, completed: false, date });
        renderTasks();
    }

    function completeTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
            renderTasks();
        }
    }

    function editTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            const newText = prompt('Edit task:', task.text);
            if (newText) {
                task.text = newText;
                renderTasks();
            }
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    window.completeTask = completeTask;
    window.editTask = editTask;
    window.deleteTask = deleteTask;
});
