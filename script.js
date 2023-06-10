document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.querySelector('.welcome-screen');
  const container = document.querySelector('.container');
  const nameInput = document.getElementById('nameInput');
  const submitBtn = document.getElementById('submitBtn');
  const studentName = document.querySelector('.student-name');
  const scoreSquare = document.querySelector('.score-square');
  const visitsSquare = document.querySelector('.visits-square');
  const scoreValue = document.querySelector('.score-value');
  const visitsValue = document.querySelector('.visits-value');
  const normativesList = document.querySelector('.normatives-list');

  submitBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();

    if (name === '') {
      alert('Please enter a valid name.');
      return;
    }

    welcomeScreen.style.display = 'none';
    container.style.display = 'block';

    studentName.textContent = name;
    scoreValue.textContent = '70';
    visitsValue.textContent = '25';

    if (parseInt(scoreValue.textContent) >= 60) {
      scoreSquare.style.backgroundColor = '#32cd32';
    } else {
      scoreSquare.style.backgroundColor = '#ff0000';
    }

    if (parseInt(visitsValue.textContent) < 23) {
      visitsSquare.style.backgroundColor = '#ff0000';
    } else {
      visitsSquare.style.backgroundColor = '#32cd32';
    }

    normativesList.innerHTML = `
      <li class="normative">Press</li>
      <li class="normative">Swim</li>
    `;
  });
});
