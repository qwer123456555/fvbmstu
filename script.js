
const modal = document.getElementById('task-modal');
const btn = document.getElementById('add-task-btn');
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const currentDateElem = document.getElementById('current-date');

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

btn.onclick = () => modal.style.display = 'flex';

form.onsubmit = (e) => {
    e.preventDefault();
    const task = {
        name: form['client-name'].value,
        car: form['car-model'].value,
        time: form['task-time'].value,
        price: form['price'].value,
        place: form['location'].value,
        desc: form['description'].value,
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    modal.style.display = 'none';
    form.reset();
    renderTasks();
};

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = \`
            <div class="client">\${task.name}</div>
            <div class="time">\${new Date(task.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div class="car">🚗 \${task.car}</div>
            <div class="price">💰 \${task.price}</div>
            <div class="place">📍 \${task.place}</div>
            \${task.desc ? '<div class="desc">📝 ' + task.desc + '</div>' : ''}
        \`;
        taskList.appendChild(card);
    });
}

renderTasks();
