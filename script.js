class IncomeCalendar {
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
        this.renderCalendar();
        this.renderTasks();
        this.updateIncome();
        this.setupCharts();
    }

    setupElements() {
        this.el = {};
        const ids = [
            'total-income', 'month-income', 'today-income', 'calendar-grid',
            'current-month', 'prev-month', 'next-month', 'today-btn',
            'tasks', 'day-title', 'modal', 'task-form', 'modal-title',
            'close-modal', 'cancel-btn', 'client', 'car', 'time', 'price',
            'place', 'desc', 'edit-id', 'task-date', 'add-btn',
            'total-completed', 'avg-income', 'total-clients', 'completion-rate',
            'start-date', 'end-date', 'update-chart', 'income-chart',
            'cars-chart'
        ];

        ids.forEach(id => {
            this.el[id] = document.getElementById(id);
        });

        this.el.tabBtns = document.querySelectorAll('.tab-btn');
        this.el.tabContents = document.querySelectorAll('.tab-content');

        // Set default dates
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        this.el.startDate.value = start.toISOString().split('T')[0];
        this.el.endDate.value = end.toISOString().split('T')[0];
    }

    setupEventListeners() {
        // Calendar navigation
        this.el.prevMonth.addEventListener('click', () => this.changeMonth(-1));
        this.el.nextMonth.addEventListener('click', () => this.changeMonth(1));
        this.el.todayBtn.addEventListener('click', () => this.goToToday());
        
        // Modal
        this.el.addBtn.addEventListener('click', () => this.openModal());
        this.el.closeModal.addEventListener('click', () => this.closeModal());
        this.el.cancelBtn.addEventListener('click', () => this.closeModal());
        
        // Forms
        this.el.taskForm.addEventListener('submit', (e) => this.saveTask(e));
        
        // Modal overlay close
        this.el.modal.addEventListener('click', (e) => {
            if (e.target === this.el.modal) this.closeModal();
        });

        // Calendar day selection
        this.el.calendarGrid.addEventListener('click', (e) => {
            const day = e.target.closest('.calendar-day');
            if (day && day.dataset.date && !day.classList.contains('other-month')) {
                this.selectDate(day.dataset.date);
            }
        });

        // Task actions
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

        // Tabs
        this.el.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Charts
        this.el.updateChart.addEventListener('click', () => this.updateCharts());
    }

    setupCharts() {
        // Income chart
        this.charts.income = new Chart(this.el.incomeChart, {
            type: 'line',
            data: { 
                labels: [], 
                datasets: [{
                    label: 'Доход',
                    data: [],
                    borderColor: '#007AFF',
                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        display: false 
                    } 
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        ticks: { 
                            callback: function(value) {
                                return value + ' ₽';
                            }
                        }
                    }
                }
            }
        });

        // Cars chart
        this.charts.cars = new Chart(this.el.carsChart, {
            type: 'doughnut',
            data: { 
                labels: [], 
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#007AFF', '#5856D6', '#34C759', '#FF9500', '#FF3B30',
                        '#5AC8FA', '#FF2D55', '#4CD964'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        position: 'bottom',
                        labels: {
                            color: 'white'
                        }
                    } 
                }
            }
        });

        this.updateCharts();
    }

    updateCharts() {
        this.updateIncomeChart();
        this.updateCarsChart();
        this.updateStats();
    }

    updateIncomeChart() {
        const start = new Date(this.el.startDate.value);
        const end = new Date(this.el.endDate.value);
        const dates = [];
        const income = [];
        const current = new Date(start);

        while (current <= end) {
            const dateStr = current.toISOString().split('T')[0];
            dates.push(current.getDate() + '.' + (current.getMonth() + 1));
            
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

    updateStats() {
        let totalIncome = 0;
        let completedCount = 0;
        let totalCount = 0;
        const clients = new Set();

        for (const date in this.tasks) {
            this.tasks[date].forEach(task => {
                totalCount++;
                clients.add(task.client);
                if (task.done) {
                    completedCount++;
                    totalIncome += parseInt(task.price) || 0;
                }
            });
        }

        const avg = completedCount ? Math.round(totalIncome / completedCount) : 0;
        const rate = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

        this.el.totalCompleted.textContent = totalIncome.toLocaleString() + ' ₽';
        this.el.avgIncome.textContent = avg.toLocaleString() + ' ₽';
        this.el.totalClients.textContent = clients.size;
        this.el.completionRate.textContent = rate + '%';
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
        // Weekdays
        ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].forEach(day => {
            html += `<div class="calendar-day weekday">${day}</div>`;
        });

        // Empty days
        for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
            html += '<div class="calendar-day other-month"></div>';
        }

        // Days
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
                    <button class="action-btn toggle ${task.done ? 'done' : ''}">
                        <i class="fas ${task.done ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    </button>
                    <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
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
            this.el.modalTitle.textContent = 'Редактировать запись';
            this.el.client.value = task.client;
            this.el.car.value = task.car;
            this.el.time.value = task.time;
            this.el.price.value = task.price;
            this.el.place.value = task.place;
            this.el.desc.value = task.desc || '';
            this.el.editId.value = taskId;
        } else {
            this.el.modalTitle.textContent = 'Новая запись';
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
            done: false
        };

        const date = this.el.taskDate.value;
        const taskId = this.el.editId.value;

        if (!this.tasks[date]) this.tasks[date] = [];

        if (taskId) {
            taskData.done = this.tasks[date][taskId].done;
            this.tasks[date][taskId] = taskData;
        } else {
            this.tasks[date].push(taskData);
        }

        this.saveToStorage();
        this.renderTasks();
        this.renderCalendar();
        this.updateIncome();
        this.updateCharts();
        this.closeModal();
    }

    toggleTask(taskId) {
        this.tasks[this.currentDate][taskId].done = !this.tasks[this.currentDate][taskId].done;
        this.saveToStorage();
        this.renderTasks();
        this.updateIncome();
        this.updateCharts();
    }

    editTask(taskId) {
        this.openModal(taskId);
    }

    deleteTask(taskId) {
        if (confirm('Удалить запись?')) {
            this.tasks[this.currentDate].splice(taskId, 1);
            if (this.tasks[this.currentDate].length === 0) {
                delete this.tasks[this.currentDate];
            }
            this.saveToStorage();
            this.renderTasks();
            this.renderCalendar();
            this.updateIncome();
            this.updateCharts();
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

    saveToStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    window.app = new IncomeCalendar();
});
