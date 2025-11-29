class IncomeMaster {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks") || "{}");
        this.currentDate = new Date().toISOString().split('T')[0];
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.charts = {};
        
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupCharts();
        this.renderCalendar();
        this.renderTasks();
        this.updateAllStats();
        this.showWelcomeNotification();
    }

    setupElements() {
        this.el = {};
        
        // Основные элементы
        const elements = [
            'total-income', 'month-income', 'today-income', 'calendar-grid',
            'current-month', 'prev-month', 'next-month', 'today-btn',
            'tasks', 'day-title', 'modal', 'task-form', 'modal-title',
            'close-modal', 'cancel-btn', 'client', 'car', 'time', 'price',
            'place', 'desc', 'edit-id', 'task-date', 'add-btn',
            'total-completed', 'avg-income', 'total-clients', 'completion-rate',
            'start-date', 'end-date', 'update-chart', 'income-chart',
            'cars-chart', 'tasks-count', 'day-income', 'month-progress',
            'best-day', 'popular-car', 'month-tasks', 'notifications'
        ];

        elements.forEach(id => {
            this.el[id] = document.getElementById(id);
        });

        this.el.tabBtns = document.querySelectorAll('.nav-item');
        this.el.tabContents = document.querySelectorAll('.tab-content');

        // Установка дат по умолчанию
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        this.el.startDate.value = start.toISOString().split('T')[0];
        this.el.endDate.value = end.toISOString().split('T')[0];
    }

    setupEventListeners() {
        // Навигация календаря
        this.el.prevMonth.addEventListener('click', () => this.changeMonth(-1));
        this.el.nextMonth.addEventListener('click', () => this.changeMonth(1));
        this.el.todayBtn.addEventListener('click', () => this.goToToday());
        
        // Модальное окно
        this.el.addBtn.addEventListener('click', () => this.openModal());
        this.el.closeModal.addEventListener('click', () => this.closeModal());
        this.el.cancelBtn.addEventListener('click', () => this.closeModal());
        
        // Формы
        this.el.taskForm.addEventListener('submit', (e) => this.saveTask(e));
        
        // Закрытие модального окна по клику на оверлей
        this.el.modal.addEventListener('click', (e) => {
            if (e.target === this.el.modal) this.closeModal();
        });

        // Выбор даты в календаре
        this.el.calendarGrid.addEventListener('click', (e) => {
            const day = e.target.closest('.calendar-day');
            if (day && day.dataset.date && !day.classList.contains('other-month')) {
                this.selectDate(day.dataset.date);
            }
        });

        // Действия с задачами
        this.el.tasks.addEventListener('click', (e) => {
            const btn = e.target.closest('.action-btn');
            const task = e.target.closest('.task-card');
            if (!btn || !task) return;

            const taskId = parseInt(task.dataset.taskId);
            
            if (btn.classList.contains('toggle')) {
                this.toggleTask(taskId);
            } else if (btn.classList.contains('edit')) {
                this.editTask(taskId);
            } else if (btn.classList.contains('delete')) {
                this.deleteTask(taskId);
            }
        });

        // Переключение вкладок
        this.el.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Обновление графиков
        this.el.updateChart.addEventListener('click', () => this.updateCharts());
    }

    setupCharts() {
        // График доходов по дням
        this.charts.income = new Chart(this.el.incomeChart, {
            type: 'line',
            data: { 
                labels: [], 
                datasets: [{
                    label: 'Доход',
                    data: [],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Доход: ${context.parsed.y.toLocaleString()} ₽`;
                            }
                        }
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { 
                            callback: function(value) {
                                return value.toLocaleString() + ' ₽';
                            },
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                    }
                }
            }
        });

        // График по маркам авто
        this.charts.cars = new Chart(this.el.carsChart, {
            type: 'doughnut',
            data: { 
                labels: [], 
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
                        '#8b5cf6', '#3b82f6', '#84cc16'
                    ],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: { size: 12 },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: ${value.toLocaleString()} ₽ (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });

        this.updateCharts();
    }

    updateCharts() {
        this.updateIncomeChart();
        this.updateCarsChart();
        this.updateAllStats();
    }

    updateIncomeChart() {
        const start = new Date(this.el.startDate.value);
        const end = new Date(this.el.endDate.value);
        const dates = [];
        const income = [];
        const current = new Date(start);

        while (current <= end) {
            const dateStr = current.toISOString().split('T')[0];
            dates.push(current.getDate() + ' ' + current.toLocaleDateString('ru-RU', { month: 'short' }));
            
            let dayIncome = 0;
            if (this.tasks[dateStr]) {
                this.tasks[dateStr].forEach(task => {
                    if (task.done) dayIncome += parseInt(task.price) || 0;
                });
            }
            income.push(dayIncome);
            current.setDate(current.getDate() + 1);
        }

        this.charts.income.data.labels = dates;
        this.charts.income.data.datasets[0].data = income;
        this.charts.income.update();
    }

    updateCarsChart() {
        const carData = {};
        for (const date in this.tasks) {
            this.tasks[date].forEach(task => {
                if (task.done) {
                    const car = task.car;
                    const price = parseInt(task.price) || 0;
                    carData[car] = (carData[car] || 0) + price;
                }
            });
        }

        const entries = Object.entries(carData).sort((a, b) => b[1] - a[1]).slice(0, 8);
        this.charts.cars.data.labels = entries.map(e => e[0]);
        this.charts.cars.data.datasets[0].data = entries.map(e => e[1]);
        this.charts.cars.update();
    }

    updateAllStats() {
        let totalIncome = 0;
        let completedCount = 0;
        let totalCount = 0;
        const clients = new Set();
        const carStats = {};
        const dayStats = {};
        let bestDay = { date: '', income: 0 };
        let popularCar = { name: '', count: 0 };

        // Сбор статистики
        for (const date in this.tasks) {
            let dayIncome = 0;
            this.tasks[date].forEach(task => {
                totalCount++;
                clients.add(task.client);
                
                // Статистика по автомобилям
                const car = task.car;
                carStats[car] = (carStats[car] || 0) + 1;
                
                if (task.done) {
                    completedCount++;
                    const price = parseInt(task.price) || 0;
                    totalIncome += price;
                    dayIncome += price;
                }
            });
            
            // Лучший день
            dayStats[date] = dayIncome;
            if (dayIncome > bestDay.income) {
                bestDay = { date, income: dayIncome };
            }
        }

        // Популярный автомобиль
        for (const [car, count] of Object.entries(carStats)) {
            if (count > popularCar.count) {
                popularCar = { name: car, count };
            }
        }

        // Расчет показателей
        const avg = completedCount ? Math.round(totalIncome / completedCount) : 0;
        const rate = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

        // Обновление интерфейса
        this.el.totalCompleted.textContent = totalIncome.toLocaleString() + ' ₽';
        this.el.avgIncome.textContent = avg.toLocaleString() + ' ₽';
        this.el.totalClients.textContent = clients.size;
        this.el.completionRate.textContent = rate + '%';
        
        // Быстрая статистика
        this.el.bestDay.textContent = bestDay.income > 0 ? 
            bestDay.income.toLocaleString() + ' ₽' : '—';
        this.el.popularCar.textContent = popularCar.name || '—';
        this.el.monthTasks.textContent = totalCount;

        // Прогресс месяца
        this.updateMonthProgress();
        
        // Статистика текущего дня
        this.updateDayStats();
    }

    updateMonthProgress() {
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const progress = (today.getDate() / daysInMonth) * 100;
        this.el.monthProgress.style.width = `${progress}%`;
    }

    updateDayStats() {
        const tasks = this.tasks[this.currentDate] || [];
        const dayIncome = tasks.reduce((sum, task) => {
            return task.done ? sum + (parseInt(task.price) || 0) : sum;
        }, 0);

        this.el.tasksCount.textContent = `${tasks.length} записей`;
        this.el.dayIncome.textContent = `${dayIncome.toLocaleString()} ₽`;
    }

    renderCalendar() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDay = firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                          'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        
        this.el.currentMonth.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

        let html = '';
        // Дни недели
        ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].forEach(day => {
            html += `<div class="calendar-day weekday">${day}</div>`;
        });

        // Пустые дни
        for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
            html += '<div class="calendar-day other-month"></div>';
        }

        // Дни месяца
        const today = new Date().toISOString().split('T')[0];
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, this.currentMonth, day);
            const dateStr = date.toISOString().split('T')[0];
            const hasWork = this.tasks[dateStr] && this.tasks[dateStr].length > 0;
            const isToday = dateStr === today;
            const isSelected = dateStr === this.currentDate;

            let cls = 'calendar-day';
            if (isToday) cls += ' today';
            if (isSelected) cls += ' selected';
            if (hasWork) cls += ' has-work';

            html += `<div class="${cls}" data-date="${dateStr}">${day}</div>`;
        }

        this.el.calendarGrid.innerHTML = html;
    }

    renderTasks() {
        const tasks = this.tasks[this.currentDate] || [];
        const date = new Date(this.currentDate);
        const today = new Date().toISOString().split('T')[0];
        
        let title = this.currentDate === today ? 'Сегодня' : 
            date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
        this.el.dayTitle.textContent = title;

        if (tasks.length === 0) {
            this.el.tasks.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>На этот день записей нет</p>
                    <button class="btn btn-primary" onclick="app.openModal()" style="margin-top: 12px;">
                        <i class="fas fa-plus"></i>
                        Добавить запись
                    </button>
                </div>
            `;
            return;
        }

        this.el.tasks.innerHTML = tasks.map((task, i) => `
            <div class="task-card" data-task-id="${i}">
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
                <div class="price-tag ${task.done ? 'completed' : 'pending'}">
                    ${parseInt(task.price).toLocaleString()} ₽
                    <div style="font-size:12px;margin-top:4px">
                        ${task.done ? '✅ Выполнено' : '❌ Не выполнено'}
                    </div>
                </div>
                ${task.desc ? `<div class="task-description">${task.desc}</div>` : ''}
                <div class="task-actions">
                    <button class="action-btn toggle ${task.done ? 'done' : ''}" 
                            title="${task.done ? 'Отметить невыполненным' : 'Отметить выполненным'}">
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

    updateIncome() {
        let total = 0, month = 0, today = 0;
        const current = new Date().toISOString().split('T')[0];
        const currentMonth = current.slice(0, 7);

        for (const date in this.tasks) {
            this.tasks[date].forEach(task => {
                const price = parseInt(task.price) || 0;
                if (task.done) {
                    total += price;
                    if (date === current) today += price;
                    if (date.slice(0, 7) === currentMonth) month += price;
                }
            });
        }

        this.el.totalIncome.textContent = total.toLocaleString() + ' ₽';
        this.el.monthIncome.textContent = month.toLocaleString() + ' ₽';
        this.el.todayIncome.textContent = today.toLocaleString() + ' ₽';
    }

    openModal(taskId = null) {
        this.el.modal.style.display = 'flex';
        this.el.taskDate.value = this.currentDate;

        if (taskId !== null) {
            const task = this.tasks[this.currentDate][taskId];
            this.el.modalTitle.innerHTML = '<i class="fas fa-edit"></i> Редактировать запись';
            this.el.client.value = task.client;
            this.el.car.value = task.car;
            this.el.time.value = task.time;
            this.el.price.value = task.price;
            this.el.place.value = task.place;
            this.el.desc.value = task.desc || '';
            this.el.editId.value = taskId;
        } else {
            this.el.modalTitle.innerHTML = '<i class="fas fa-plus"></i> Новая запись';
            this.el.taskForm.reset();
            this.el.editId.value = '';
        }
    }

    closeModal() {
        this.el.modal.style.display = 'none';
    }

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
            createdAt: new Date().toISOString()
        };

        const date = this.el.taskDate.value;
        const taskId = this.el.editId.value;

        if (!this.tasks[date]) this.tasks[date] = [];

        if (taskId) {
            taskData.done = this.tasks[date][taskId].done;
            this.tasks[date][taskId] = taskData;
            this.showNotification('Запись обновлена!', 'success');
        } else {
            this.tasks[date].push(taskData);
            this.showNotification('Запись добавлена!', 'success');
        }

        this.saveToStorage();
        this.renderTasks();
        this.renderCalendar();
        this.updateIncome();
        this.updateCharts();
        this.closeModal();
    }

    toggleTask(taskId) {
        const task = this.tasks[this.currentDate][taskId];
        task.done = !task.done;
        
        this.saveToStorage();
        this.renderTasks();
        this.updateIncome();
        this.updateCharts();
        
        const status = task.done ? 'выполнена' : 'не выполнена';
        this.showNotification(`Запись с ${task.client} отмечена как ${status}`, 'info');
    }

    editTask(taskId) {
        this.openModal(taskId);
    }

    deleteTask(taskId) {
        const task = this.tasks[this.currentDate][taskId];
        if (confirm(`Удалить запись с ${task.client}?`)) {
            this.tasks[this.currentDate].splice(taskId, 1);
            if (this.tasks[this.currentDate].length === 0) {
                delete this.tasks[this.currentDate];
            }
            this.saveToStorage();
            this.renderTasks();
            this.renderCalendar();
            this.updateIncome();
            this.updateCharts();
            this.showNotification('Запись удалена', 'info');
        }
    }

    changeMonth(direction) {
        this.currentMonth += direction;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }

    goToToday() {
        const today = new Date();
        this.currentDate = today.toISOString().split('T')[0];
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.renderCalendar();
        this.renderTasks();
        this.showNotification('Переход к сегодняшнему дню', 'info');
    }

    selectDate(date) {
        this.currentDate = date;
        const d = new Date(date);
        this.currentMonth = d.getMonth();
        this.currentYear = d.getFullYear();
        this.renderCalendar();
        this.renderTasks();
    }

    switchTab(tabName) {
        this.el.tabContents.forEach(tab => tab.classList.remove('active'));
        this.el.tabBtns.forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(tabName).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        if (tabName === 'analytics-tab') {
            setTimeout(() => this.updateCharts(), 100);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        notification.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <div class="notification-content">
                <div class="notification-title">${type === 'success' ? 'Успех' : type === 'error' ? 'Ошибка' : 'Информация'}</div>
                <div class="notification-message">${message}</div>
            </div>
        `;

        this.el.notifications.appendChild(notification);

        // Автоматическое удаление через 4 секунды
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    showWelcomeNotification() {
        if (!localStorage.getItem('welcome_shown')) {
            setTimeout(() => {
                this.showNotification('Добро пожаловать в IncomeMaster! Начните добавлять записи о клиентах.', 'info');
                localStorage.setItem('welcome_shown', 'true');
            }, 1000);
        }
    }

    saveToStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    window.app = new IncomeMaster();
});

// Предотвращение масштабирования на iOS
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
