document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("calendar-container");
  const modal = document.getElementById("task-modal");
  const form = document.getElementById("task-form");
  const btn = document.getElementById("add-task-btn");

  const tasks = JSON.parse(localStorage.getItem("tasks") || "{}");
  const dateList = generateDates("2025-06-12", "2027-12-31");

  let currentIndex = 0;

  // Генерация всех дней
  dateList.forEach((dateStr, i) => {
    const view = document.createElement("div");
    view.className = "day-view";

    const box = document.createElement("div");
    box.className = "day-box";
    box.innerHTML = `<h2>${formatDate(dateStr)}</h2><div class="task-list" id="tasks-${dateStr}"></div>`;
    view.appendChild(box);
    container.appendChild(view);

    renderTasks(dateStr);
  });

  // Кнопка +
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Добавление задачи
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("client-name").value;
    const car = document.getElementById("car-model").value;
    const time = document.getElementById("task-time").value;
    const price = document.getElementById("price").value;
    const place = document.getElementById("location").value;
    const desc = document.getElementById("description").value;

    const date = dateList[currentIndex];
    if (!tasks[date]) tasks[date] = [];
    tasks[date].push({ name, car, time, price, place, desc });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    form.reset();
    modal.style.display = "none";
    renderTasks(date);
  });

  function renderTasks(dateStr) {
    const list = document.getElementById(`tasks-${dateStr}`);
    if (!list) return;
    list.innerHTML = "";

    (tasks[dateStr] || []).forEach(t => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <div><strong>${t.name}</strong></div>
        <div>🕒 ${t.time}</div>
        <div>🚗 ${t.car}</div>
        <div>💰 ${t.price}</div>
        <div>📍 ${t.place}</div>
        ${t.desc ? `<div>📝 ${t.desc}</div>` : ""}
      `;
      list.appendChild(card);
    });
  }

  function formatDate(d) {
    return new Date(d).toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" });
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

  // Свайпы
  let startX = 0;
  container.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && currentIndex < dateList.length - 1) currentIndex++;
      if (dx > 0 && currentIndex > 0) currentIndex--;
      container.style.transform = `translateX(-${100 * currentIndex}%)`;
    }
  });
});
