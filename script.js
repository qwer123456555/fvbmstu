document.addEventListener('DOMContentLoaded', function() {
  const splashContainer = document.querySelector('.splash-container');
  const fullNameInput = document.getElementById('fullName');
  const startButton = document.getElementById('startButton');
  const container = document.querySelector('.container');
  const studentNameElement = document.getElementById('studentName');
  const scoreElement = document.getElementById('score');
  const visitsElement = document.getElementById('visits');
  const swimNormativeElement = document.getElementById('swimNormative');
  const pressNormativeElement = document.getElementById('pressNormative');
  const backButton = document.querySelector('.back-button');

  startButton.addEventListener('click', function() {
    const fullName = fullNameInput.value.trim().toLowerCase();

    if (fullName === '') {
      alert('Введите имя');
      return;
    }

    const students = {
      'иван иванов': {
        score: 70,
        visits: 25,
        swimNormative: '✅',
        pressNormative: '❌'
      },
      'петр петров': {
        score: 40,
        visits: 21,
        swimNormative: '✅',
        pressNormative: '❌'
      }
    };

    const student = students[fullName];

    if (student) {
      studentNameElement.textContent = fullName.toUpperCase();
      scoreElement.textContent = student.score;
      visitsElement.textContent = student.visits;
      swimNormativeElement.textContent = student.swimNormative;
      pressNormativeElement.textContent = student.pressNormative;

      splashContainer.classList.add('fade-out');
      container.classList.add('fade-in');
      container.style.display = 'block';

      if (student.score > 59) {
        scoreElement.parentNode.style.backgroundColor = #4caf50;
      } else {
        scoreElement.parentNode.style.backgroundColor = 'red';
      }

      if (student.visits > 22) {
        visitsElement.parentNode.style.backgroundColor = #4caf50;
      } else {
        visitsElement.parentNode.style.backgroundColor = 'red';
      }
    } else {
      alert('Такого ученика нет');
    }
  });

  backButton.addEventListener('click', function() {
    splashContainer.classList.remove('fade-out');
    container.classList.remove('fade-in');
    container.style.display = 'none';
  });
});
