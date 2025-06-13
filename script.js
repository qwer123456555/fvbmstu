document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "{}");
  const taskList = document.getElementById("task-list");
  const dayTitle = document.getElementById("day-title");
  const modal = document.getElementById("task-modal");
  const form = document.getElementById("task-form");
  const btn = document.getElementById("add-task-btn");

  const totalEl = document.getElementById("total-income");
  const monthEl = document.getElementById("month-income");
  const todayEl = document.getElementById("today-income");

  const dates = generateDates("2025-06-12", "2027-12-31");

  let today = new Date().toISOString().split("T")[0];
  let currentIndex = dates.indexOf(today);
  if (currentIndex === -1) currentIndex = 0;

  function renderDay() {
    const date = dates[currentIndex];
    dayTitle.textContent = formatDate(date);
    taskList.innerHTML = "";

    const dayTasks = tasks[date] || [];
    dayTasks.forEach((t, i) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <div><strong>${t.name}</strong></div>
        <div>🕒 ${t.time}</div>
        <div>🚗 ${t.car}</div>
        <div>💰 ${t.price}</div>
        <div>📍 ${t.place}</div>
        ${t.desc ? `<div>📝 ${t.desc}</div>` : ""}
        <div class="task-status" data-index="${i}">${t.done ? "✅" : "❌"}</div>
        <div class="task-actions">
          <button onclick="editTask('${date}', ${i})">✏️</button>
          <button onclick="deleteTask('${date}', ${i})">🗑️</button>
        </div>
      `;
      taskList.appendChild(card);
    });

    updateIncomes();
  }

  renderDay();

  btn.addEventListener("click", () => {
    form.reset();
    document.getElementById("edit-index").value = "";
    modal.style.display = "flex";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("client-name").value;
    const car = document.getElementById("car-model").value;
    const time = document.getElementById("task-time").value;
    const price = document.getElementById("price").value;
    const place = document.getElementById("location").value;
    const desc = document.getElementById("description").value;
    const editIndex = document.getElementById("edit-index").value;

    const date = dates[currentIndex];
    if (!tasks[date]) tasks[date] = [];

    if (editIndex === "") {
      tasks[date].push({ name, car, time, price, place, desc, done: false });
    } else {
      tasks[date][editIndex] = { ...tasks[date][editIndex], name, car, time, price, place, desc };
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    form.reset();
    modal.style.display = "none";
    renderDay();
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Свайпы
  let startX = 0;
  const wrapper = document.getElementById("calendar-wrapper");

  wrapper.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && currentIndex < dates.length - 1) currentIndex++;
      else if (dx > 0 && currentIndex > 0) currentIndex--;
      renderDay();
    }
  });

  document.addEventListener("click", e => {
    if (e.target.classList.contains("task-status")) {
      const i = +e.target.dataset.index;
      const date = dates[currentIndex];
      tasks[date][i].done = !tasks[date][i].done;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderDay();
    }
  });

  window.editTask = (date, index) => {
    const task = tasks[date][index];
    document.getElementById("client-name").value = task.name;
    document.getElementById("car-model").value = task.car;
    document.getElementById("task-time").value = task.time;
    document.getElementById("price").value = task.price;
    document.getElementById("location").value = task.place;
    document.getElementById("description").value = task.desc;
    document.getElementById("edit-index").value = index;
    modal.style.display = "flex";
  };

  window.deleteTask = (date, index) => {
    if (confirm("Удалить задачу?")) {
      tasks[date].splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderDay();
    }
  };

  function updateIncomes() {
    let total = 0, month = 0, todaySum = 0;
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const thisMonth = now.toISOString().slice(0, 7);

    for (let d in tasks) {
      for (let t of tasks[d]) {
        if (!t.done) continue;
        const price = parseInt(t.price) || 0;
        total += price;
        if (d.startsWith(thisMonth)) month += price;
        if (d === todayStr) todaySum += price;
      }
    }

    totalEl.textContent = `${total} ₽`;
    monthEl.textContent = `${month} ₽`;
    todayEl.textContent = `${todaySum} ₽`;
  }

  function generateDates(start, end) {
    const res = [];
    let d = new Date(start);
    const stop = new Date(end);
    while (d <= stop) {
      res.push(d.toISOString().split("T")[0]);
      d.setDate(d.getDate() + 1);
    }
    return res;
  }

  function formatDate(d) {
    return new Date(d).toLocaleDateString("ru-RU", {
      weekday: "long", day: "numeric", month: "long"
    });
  }
});
