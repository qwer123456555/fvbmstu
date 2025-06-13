document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "{}");
  const taskList = document.getElementById("task-list");
  const dayTitle = document.getElementById("day-title");
  const modal = document.getElementById("task-modal");
  const form = document.getElementById("task-form");
  const btn = document.getElementById("add-task-btn");

  const dates = generateDates("2025-06-12", "2027-12-31");
  let currentIndex = 0;

  function renderDay() {
    const date = dates[currentIndex];
    dayTitle.textContent = formatDate(date);
    taskList.innerHTML = "";

    const dayTasks = tasks[date] || [];
    dayTasks.forEach(t => {
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
      taskList.appendChild(card);
    });
  }

  renderDay();

  btn.addEventListener("click", () => {
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

    const date = dates[currentIndex];
    if (!tasks[date]) tasks[date] = [];
    tasks[date].push({ name, car, time, price, place, desc });

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
