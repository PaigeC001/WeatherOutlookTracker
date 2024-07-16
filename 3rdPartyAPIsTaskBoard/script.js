document.addEventListener('DOMContentLoaded', () => {
    const newTaskButton = document.getElementById('new-task-button');
    const taskModal = document.getElementById('task-modal');
    const closeModalButton = document.querySelector('.close');
    const taskForm = document.getElementById('task-form');
    const taskLists = document.querySelectorAll('.task-list');

    function saveTasks() {
        const tasks = [];
        taskLists.forEach(list => {
            list.querySelectorAll('.task').forEach(task => {
                tasks.push({
                    id: task.getAttribute('data-id'),
                    title: task.querySelector('.task-title').textContent,
                    description: task.querySelector('.task-desc').textContent,
                    deadline: task.getAttribute('data-deadline'),
                    status: task.closest('.column').id
                });
            });
        });
        console.log('Saving tasks:', tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('Loading tasks:', tasks);
        tasks.forEach(task => {
            createTaskElement(task.id, task.title, task.description, task.deadline, task.status);
        });
    }

    function createTaskElement(id, title, description, deadline, status) {
        const task = document.createElement('div');
        task.className = 'task';
        task.setAttribute('data-id', id);
        task.setAttribute('data-deadline', deadline);
        task.setAttribute('draggable', true);

        const now = new Date();
        const taskDeadline = new Date(deadline);
        if (taskDeadline < now) {
            task.classList.add('overdue');
        } else if ((taskDeadline - now) / (1000 * 60 * 60 * 24) <= 2) {
            task.classList.add('nearing-deadline');
        }

        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.textContent = title;

        const taskDesc = document.createElement('div');
        taskDesc.className = 'task-desc';
        taskDesc.textContent = description;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            task.remove();
            saveTasks();
        });

        task.appendChild(taskTitle);
        task.appendChild(taskDesc);
        task.appendChild(deleteButton);

        const taskList = document.querySelector(`#${status} .task-list`);
        taskList.appendChild(task);

        task.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.getAttribute('data-id'));
            e.dataTransfer.dropEffect = 'move';
        });

        task.addEventListener('dragend', () => {
            saveTasks();
        });
    }

    function generateUniqueId() {
        return 'task-' + Math.random().toString(36).substr(2, 9);
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.title.value.trim();
        const description = e.target.description.value.trim();
        const deadline = e.target.deadline.value;

        if (!title || !description || !deadline) {
            alert('All fields are required.');
            return;
        }

        const id = generateUniqueId();
        console.log('Creating task:', { id, title, description, deadline });

        createTaskElement(id, title, description, deadline, 'not-started');
        saveTasks();
        taskModal.style.display = 'none';
        taskForm.reset();
    });

    newTaskButton.addEventListener('click', () => {
        taskModal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', () => {
        taskModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == taskModal) {
            taskModal.style.display = 'none';
        }
    });

    taskLists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const task = document.querySelector(`[data-id='${id}']`);
            if (task) {
                list.appendChild(task);
                saveTasks();
            }
        });
    });

    loadTasks();
});
