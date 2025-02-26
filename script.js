const input = document.getElementById('input');
const btn = document.getElementById('btn');
const taskList = document.getElementById('taskList');

// Add task button click handler
btn.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText === '') {
        alert('Task cannot be empty!');
        return;
    }

    // Limit the task to 50 words
    const words = taskText.split(/\s+/).slice(0, 50).join(' ');

    // Add task to DOM and save to localStorage
    addTaskToDOM(words);
    saveTask(words);

    // Clear input field
    input.value = '';
});

// Function to add task to DOM
function addTaskToDOM(taskText) {
    const listItem = document.createElement('div');
    listItem.className = 'flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg shadow-sm transition duration-200';

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-text';

    const task = document.createElement('span');
    task.textContent = taskText;
    task.className = 'text-gray-800 text-lg cursor-pointer task text-medium';

    // Add strike-through on click
    task.addEventListener('click', () => {
        task.classList.toggle('line-through');
    });

    taskContainer.appendChild(task);

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fa-solid fa-trash mr-1"></i> Remove';
    removeBtn.className = 'text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 border-2 border-red-500 rounded-lg px-4 py-2 transition-all duration-200 ease-in-out transform hover:scale-105 bg-red-500 hover:bg-red-600';
    removeBtn.setAttribute('aria-label', 'Remove task');

    // Remove task on button click
    removeBtn.addEventListener('click', () => {
        listItem.classList.add('opacity-0', 'transition', 'duration-300');
        setTimeout(() => {
            listItem.remove();
            deleteTask(taskText); // Update localStorage
        }, 300);
    });

    listItem.appendChild(taskContainer);
    listItem.appendChild(removeBtn);

    taskList.appendChild(listItem);
}

// Save task to localStorage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => addTaskToDOM(taskText));
}

// Delete task from localStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks when the page loads
window.addEventListener('load', loadTasks);