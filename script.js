document.addEventListener("DOMContentLoaded", () => {
  const dates = genDates('2025-06-12', '2027-12-31');
  let idx = dates.indexOf(today()) || 0;
  const tasks = JSON.parse(localStorage.getItem("tasks") || "{}");

  const el = {
    title: document.getElementById("day-title"),
    list: document.getElementById("tasks"),
    add: document.getElementById("add-btn"),
    modal: document.getElementById("modal"),
    form: document.getElementById("form"),
    cancel: document.getElementById("cancel"),
    wrapper: document.getElementById("calendar-wrapper"),
    fields: ["client", "car", "time", "price", "place", "desc", "edit"].reduce(
      (o, id) => ((o[id] = document.getElementById(id)), o),
      {}
    ),
    income: {
      total: document.getElementById("total-income"),
      month: document.getElementById("month-income"),
      today: document.getElementById("today-income"),
    },
  };

  function today() {
    return new Date().toISOString().split("T")[0];
  }

  el.add.onclick = () => openModal();
  el.cancel.onclick = () => (el.modal.style.display = "none");

  el.form.onsubmit = (e) => {
    e.preventDefault();
    const date = dates[idx];
    const o = el.fields;
    let day = tasks[date] || [];
    const task = {
      client: o.client.value,
      car: o.car.value,
      time: o.time.value,
      price: o.price.value,
      place: o.place.value,
      desc: o.desc.value,
      done: false,
    };

    if (o.edit.value !== "") {
      day[+o.edit.value] = { ...day[+o.edit.value], ...task };
    } else {
      day.push(task);
    }

    tasks[date] = day;
    save();
    el.modal.style.display = "none";
    draw();
  };

  el.list.onclick = (e) => {
    const t = e.target;
    if (!t.dataset.i) return;
    const i = +t.dataset.i;
    const date = dates[idx];
    const day = tasks[date];

    if (t.classList.contains("toggle")) {
      day[i].done = !day[i].done;
    } else if (t.classList.contains("edit")) {
      openModal(i, day[i]);
      return;
    } else if (t.classList.contains("del")) {
      day.splice(i, 1);
    }

    save();
    draw();
  };

  function openModal(i, obj) {
    const o = el.fields;
    el.modal.style.display = "flex";

    if (i != null) {
      o.client.value = obj.client;
      o.car.value = obj.car;
      o.time.value = obj.time;
      o.price.value = obj.price;
      o.place.value = obj.place;
      o.desc.value = obj.desc;
      o.edit.value = i;
    } else {
      Object.values(o).forEach((f) => (f.value = ""));
      o.edit.value = "";
    }
  }

  function draw() {
    const date = dates[idx];
    const localeDate = new Date(date).toLocaleDateString("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    el.title.textContent = localeDate;
    el.list.innerHTML = "";

    (tasks[date] || []).forEach((t, i) => {
      el.list.innerHTML += `
        <div class="task">
          <div class="info">
            <div class="client">${t.client}</div>
            <div class="details">${t.time} • ${t.car} • ${t.place} • <span class="price">${t.price}₽</span></div>
            ${t.desc ? `<div class="details">${t.desc}</div>` : ""}
          </div>
          <div class="actions">
            <button class="toggle" data-i="${i}">${t.done ? "✅" : "❌"}</button>
            <button class="edit" data-i="${i}">✏️</button>
            <button class="del" data-i="${i}">🗑️</button>
          </div>
        </div>
      `;
    });

    updateIncome();
  }

  function updateIncome() {
    let tot = 0,
      mon = 0,
      tod = 0;
    const now = today();
    const nowMonth = now.slice(0, 7);

    for (const d in tasks) {
      tasks[d].forEach((t) => {
        const price = +t.price || 0;
        if (t.done) {
          tot += price;
          if (d === now) tod += price;
          if (d.slice(0, 7) === nowMonth) mon += price;
        }
      });
    }

    el.income.total.textContent = `${tot} ₽`;
    el.income.month.textContent = `${mon} ₽`;
    el.income.today.textContent = `${tod} ₽`;
  }

  function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function genDates(from, to) {
    const res = [];
    let d = new Date(from), D = new Date(to);
    while (d <= D) {
      res.push(d.toISOString().split("T")[0]);
      d.setDate(d.getDate() + 1);
    }
    return res;
  }

  // Свайп по всему экрану
  let startX = 0;
  document.body.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  document.body.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 30) {
      if (dx < 0 && idx < dates.length - 1) idx++;
      else if (dx > 0 && idx > 0) idx--;
      draw();
    }
  });

  draw();
});
