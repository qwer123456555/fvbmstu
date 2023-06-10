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

      if (student.score > 59) {
        scoreElement.style.color = 'green';
      } else {
        scoreElement.style.color = 'red';
      }

      if (student.visits > 22) {
        visitsElement.style.color = 'green';
      } else {
        visitsElement.style.color = 'red';
      }

      splashContainer.classList.add('fade-out');
      container.classList.add('fade-in');
      container.style.display = 'block';
    } else {
      alert('Такого ученика нет');
    }
  });
});
