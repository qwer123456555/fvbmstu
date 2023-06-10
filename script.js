document.addEventListener('DOMContentLoaded', () => {
  const fullNameInput = document.getElementById('fullName');
  const startButton = document.getElementById('startButton');
  const container = document.querySelector('.container');
  const scoreElement = document.getElementById('score');
  const visitsElement = document.getElementById('visits');
  const swimNormativeElement = document.getElementById('swimNormative');
  const pressNormativeElement = document.getElementById('pressNormative');
  const showDataButton = document.getElementById('showDataButton');

  startButton.addEventListener('click', () => {
    const fullName = fullNameInput.value.toLowerCase();
    const students = {
      'иван иванов': {
        score: 70,
        visits: 25,
        swimNormative: '✅',
        pressNormative: '❌',
      },
      'петр петров': {
        score: 40,
        visits: 21,
        swimNormative: '❌',
        pressNormative: '✅',
      },
    };

    if (fullName in students) {
      const student = students[fullName];
      scoreElement.textContent = student.score;
      visitsElement.textContent = student.visits;
      swimNormativeElement.textContent = student.swimNormative;
      pressNormativeElement.textContent = student.pressNormative;
    } else {
      scoreElement.textContent = '';
      visitsElement.textContent = '';
      swimNormativeElement.textContent = '';
      pressNormativeElement.textContent = '';
      alert('Такого ученика нет');
    }
  });

  showDataButton.addEventListener('click', () => {
    container.style.display = 'block';
  });
});
