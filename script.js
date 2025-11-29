// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Инициализация приложения
  class IncomeCalendar {
    constructor() {
      this.dates = this.generateDates('2025-01-01', '2027-12-31');
      this.currentDate = new Date().toISOString().split('T')[0];
      this.currentMonth = new Date().getMonth();
      this.currentYear = new Date().getFullYear();
      this.tasks = JSON.parse(localStorage.getItem("tasks") || "{}");
      this.reminders = JSON.parse(localStorage.getItem("reminders") || "{}");
      
      this.initializeElements();
      this.setupEventListeners();
      this.renderCalendar();
      this.renderTasks();
      this.updateIncome();
      this.setupChart();
    }

    initializeElements() {
      // Основные элементы
      this.el = {
        // Заголовки доходов
        totalIncome: document.getElementById('total-income'),
        monthIncome: document.getElementById('month-income'),
        todayIncome: document.getElementById('today-income'),
        
        // Календарь
        calendarGrid: document.getElementById('calendar-grid'),
        currentMonth: document.getElementById('current-month'),
        prevMonth: document.getElementById('prev-month'),
        nextMonth: document.getElementById('next-month'),
        todayBtn: document.getElementById('today-btn'),
        
        // Задачи
        tasksContainer: document.getElementById('tasks'),
        dayTitle: document.getElementById('day-title'),
        
        // Модальное окно
        modal: document.getElementById('modal'),
        taskForm: document.getElementById('task-form'),
        modalTitle: document.getElementById('modal-title'),
        closeModal: document.getElementById('close-modal'),
        cancelBtn: document.getElementById('cancel-btn'),
        
        // Форма
        client: document.getElementById('client'),
        car: document.getElementById('car'),
        time: document.getElementById('time'),
        price: document.getElementById('price'),
        place: document.getElementById('place'),
        desc: document.getElementById('desc'),
        setReminder: document.getElementById('set-reminder'),
        editId: document.getElementById('edit-id'),
        taskDate: document.getElementById('task-date'),
        
        // Навигация
        tabBtns: document.querySelectorAll('.tab-btn'),
        tabContents: document.querySelectorAll('.tab-content'),
        
        // График
        startDate: document.getElementById('start-date'),
        endDate: document.getElementById('end-date'),
        updateChart: document.getElementById('update-chart'),
        incomeChart: document.getElementById('income-chart'),
        
        // Кнопка добавления
        addBtn: document.getElementById('add-btn')
      };
      
      // Установка дат для графика
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      this.el.startDate.value = firstDay.toISOString().split('T')[0];
      this.el.endDate.value = today.toISOString().split('T')[0];
    }

    setupEventListeners() {
      // Навигация по календарю
      this.el.prevMonth.addEventListener('click', () => this.changeMonth(-1));
      this.el.nextMonth.addEventListener('click', () => this.changeMonth(1));
      this.el.todayBtn.addEventListener('click', () => this.goToToday());
      
      // Выбор даты в календаре
      this.el.calendarGrid.addEventListener('click', (e) => {
        const dayElement = e.target.closest('.calendar-day');
        if (dayElement && !dayElement.classList.contains('other-month')) {
          this.selectDate(dayElement.dataset.date);
        }
      });
      
      // Управление задачами
      this.el.tasksContainer.addEventListener('click', (e) => {
        const taskElement = e.target.closest('.task-card');
        if (!taskElement) return;
        
        const taskId = taskElement.dataset.taskId;
        const actionBtn = e.target.closest('.action-btn');
        
        if (actionBtn) {
          if (actionBtn.classList.contains('toggle')) {
            this.toggleTask(taskId);
          } else if (actionBtn.classList.contains('edit')) {
            this.editTask(taskId);
          } else if (actionBtn.classList.contains('delete')) {
            this.deleteTask(taskId);
          }
        }
      });
      
      // Модальное окно
      this.el.addBtn.addEventListener('click', () => this.openModal());
      this.el.closeModal.addEventListener('click', () => this.closeModal());
      this.el.cancelBtn.addEventListener('click', () => this.closeModal());
      this.el.modal.addEventListener('click', (e) => {
        if (e.target === this.el.modal) this.closeModal();
      });
      
      // Форма
      this.el.taskForm.addEventListener('submit', (e) => this.saveTask(e));
      
      // Навигация по вкладкам
      this.el.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
      });
      
      // График
      this.el.updateChart.addEventListener('click', () => this.updateChart());
      
      // Свайпы
      this.setupSwipeEvents();
      
      // Напоминания
      this.checkReminders();
    }

    // Генерация дат
    generateDates(start, end) {
      const dates = [];
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      while (startDate <= endDate) {
        dates.push(startDate.toISOString().split('T')[0]);
        startDate.setDate(startDate.getDate() + 1);
      }
      
      return dates;
    }

    // Рендер календаря
    renderCalendar() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
      const startDay = firstDay.getDay();
      const daysInMonth = lastDay.getDate();
      
      // Заголовок месяца
      const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                         'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      this.el.currentMonth.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
      
      // Дни недели
      const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      let calendarHTML = weekdays.map(day => 
        `<div class="calendar-day weekday">${day}</div>`
      ).join('');
      
      // Пустые ячейки перед первым днем
      for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
        calendarHTML += '<div class="calendar-day other-month"></div>';
      }
      
      // Дни месяца
      const today = new Date().toISOString().split('T')[0];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(this.currentYear, this.currentMonth, day);
        const dateString = date.toISOString().split('T')[0];
        const hasWork = this.tasks[dateString] && this.tasks[dateString].length > 0;
        const isToday = dateString === today;
        const isSelected = dateString === this.currentDate;
        
        let className = 'calendar-day';
        if (isToday) className += ' today';
        if (isSelected) className += ' selected';
        if (hasWork) className += ' has-work';
        
        calendarHTML += `
          <div class="${className}" data-date="${dateString}">
            ${day}
          </div>
        `;
      }
      
      this.el.calendarGrid.innerHTML = calendarHTML;
    }

    // Рендер задач
    renderTasks() {
      const tasks = this.tasks[this.currentDate] || [];
      const date = new Date(this.currentDate);
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const localeDate = date.toLocaleDateString('ru-RU', options);
      
      this.el.dayTitle.textContent = localeDate;
      
      if (tasks.length === 0) {
        this.el.tasksContainer.innerHTML = `
          <div class="task-card" style="text-align: center; opacity: 0.7;">
            <p>На этот день записей нет</p>
            <button class="btn btn-primary" onclick="app.openModal()" style="margin-top: 12px;">
              Добавить запись
            </button>
          </div>
        `;
        return;
      }
      
      this.el.tasksContainer.innerHTML = tasks.map((task, index) => `
        <div class="task-card" data-task-id="${index}">
          <div class="task-header">
            <h3 class="client-name">${task.client}</h3>
            <div class="task-time">${task.time}</div>
          </div>
          
          <div class="task-details">
            <div class="detail-item">
              <i class="fas fa-car"></i>
              <span>${task.car}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${task.place}</span>
            </div>
          </div>
          
          <div class="price-tag">${task.price} ₽</div>
          
          ${task.desc ? `
            <div class="task-description">
              <i class="fas fa-sticky-note"></i> ${task.desc}
            </div>
          ` : ''}
          
          <div class="task-actions">
            <button class="action-btn toggle ${task.done ? 'done' : ''}" 
                    title="${task.done ? 'Выполнено' : 'Не выполнено'}">
              <i class="fas ${task.done ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            </button>
            <button class="action-btn edit" title="Редактировать">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" title="Удалить">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    // Открытие модального окна
    openModal(taskId = null) {
      this.el.modal.style.display = 'flex';
      this.el.taskDate.value = this.currentDate;
      
      if (taskId !== null) {
        // Редактирование существующей задачи
        const task = this.tasks[this.currentDate][taskId];
        this.el.modalTitle.textContent = 'Редактировать запись';
        this.el.client.value = task.client;
        this.el.car.value = task.car;
        this.el.time.value = task.time;
        this.el.price.value = task.price;
        this.el.place.value = task.place;
        this.el.desc.value = task.desc || '';
        this.el.setReminder.checked = task.reminder || false;
        this.el.editId.value = taskId;
      } else {
        // Новая задача
        this.el.modalTitle.textContent = 'Новая запись';
        this.el.taskForm.reset();
        this.el.editId.value = '';
      }
    }

    closeModal() {
      this.el.modal.style.display = 'none';
    }

    // Сохранение задачи
    saveTask(e) {
      e.preventDefault();
      
      const taskData = {
        client: this.el.client.value,
        car: this.el.car.value,
        time: this.el.time.value,
        price: this.el.price.value,
        place: this.el.place.value,
        desc: this.el.desc.value,
        done: false,
        reminder: this.el.setReminder.checked
      };
      
      const date = this.el.taskDate.value;
      const taskId = this.el.editId.value;
      
      if (!this.tasks[date]) {
        this.tasks[date] = [];
      }
      
      if (taskId !== '') {
        // Обновление существующей задачи
        this.tasks[date][taskId] = { ...this.tasks[date][taskId], ...taskData };
      } else {
        // Добавление новой задачи
        this.tasks[date].push(taskData);
      }
      
      // Установка напоминания
      if (taskData.reminder) {
        this.setReminder(date, taskData);
      }
      
      this.saveToStorage();
      this.renderTasks();
      this.renderCalendar();
      this.updateIncome();
      this.closeModal();
    }

    // Управление задачами
    toggleTask(taskId) {
      this.tasks[this.currentDate][taskId].done = 
        !this.tasks[this.currentDate][taskId].done;
      this.saveToStorage();
      this.renderTasks();
      this.updateIncome();
    }

    editTask(taskId) {
      this.openModal(taskId);
    }

    deleteTask(taskId) {
      if (confirm('Удалить эту запись?')) {
        this.tasks[this.currentDate].splice(taskId, 1);
        if (this.tasks[this.currentDate].length === 0) {
          delete this.tasks[this.currentDate];
        }
        this.saveToStorage();
        this.renderTasks();
        this.renderCalendar();
        this.updateIncome();
      }
    }

    // Напоминания
    setReminder(date, task) {
      const reminderDate = new Date(date);
      reminderDate.setDate(reminderDate.getDate() - 1);
      
      this.reminders[reminderDate.toISOString().split('T')[0]] = {
        date: date,
        client: task.client,
        time: task.time,
        notified: false
      };
      
      localStorage.setItem("reminders", JSON.stringify(this.reminders));
    }

    checkReminders() {
      const today = new Date().toISOString().split('T')[0];
      const reminder = this.reminders[today];
      
      if (reminder && !reminder.notified) {
        if (Notification.permission === 'granted') {
          new Notification('Напоминание о записи', {
            body: `Завтра в ${reminder.time} у вас запись с ${reminder.client}`,
            icon: '/icon.png'
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Напоминание о записи', {
                body: `Завтра в ${reminder.time} у вас запись с ${reminder.client}`,
                icon: '/icon.png'
              });
            }
          });
        }
        
        reminder.notified = true;
        localStorage.setItem("reminders", JSON.stringify(this.reminders));
      }
    }

    // Навигация по календарю
    changeMonth(direction) {
      this.currentMonth += direction;
      
      if (this.currentMonth < 0) {
        this.current
