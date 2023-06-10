document.addEventListener('DOMContentLoaded', () => {
  const fullNameInput = document.getElementById('fullName');
  const startButton = document.getElementById('startButton');
  const container = document.querySelector('.container');
  const studentNameElement = document.getElementById('studentName');
  const scoreElement = document.getElementById('score');
  const visitsElement = document.getElementById('visits');
  const swimNormativeElement = document.getElementById('swimNormative');
  const pressNormativeElement = document.getElementById('pressNormative');

  startButton.addEventListener('click', () => {
    const fullName = fullNameInput.value.toLowerCase().trim();
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

    if (fullName in students) {
      const student = students[fullName];
      studentNameElement.textContent = fullName;
      scoreElement.textContent = student.score;
      visitsElement.textContent = student.visits;
      swimNormativeElement.textContent = student.swimNormative;
      pressNormativeElement.textContent = student.pressNormative;

      container.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      alert('Такого ученика нет');
    }
  });
});
