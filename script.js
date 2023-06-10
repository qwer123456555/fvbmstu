document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('startButton');
  const showDataButton = document.getElementById('showDataButton');
  const fullNameInput = document.getElementById('fullName');
  const scoreElement = document.getElementById('score');
  const visitsElement = document.getElementById('visits');
  const pressNormative = document.getElementById('pressNormative');
  const swimNormative = document.getElementById('swimNormative');
  const dataContainer = document.querySelector('.data-container');
  const normativesContainer = document.querySelector('.normatives-container');

  startButton.addEventListener('click', function() {
    document.querySelector('.splash-container').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
  });

  showDataButton.addEventListener('click', function() {
    const fullName = fullNameInput.value.trim().toLowerCase();
    let score = 0;
    let visits = 0;
    let press = false;
    let swim = false;

    if (fullName === 'иван иванов') {
      score = 70;
      visits = 25;
      press = false;
      swim = true;
    } else if (fullName === 'петр петров') {
      score = 40;
      visits = 21;
      press = true;
      swim = false;
    } else {
      alert('Такого ученика нет');
      return;
    }

    scoreElement.textContent = score;
    visitsElement.textContent = visits;

    if (Number(visits) < 23) {
      visitsElement.parentElement.classList.add('red');
    } else {
      visitsElement.parentElement.classList.remove('red');
    }

    if (press) {
      pressNormative.textContent = '✅';
      pressNormative.classList.add('green');
    } else {
      pressNormative.textContent = '❌';
      pressNormative.classList.remove('green');
    }

    if (swim) {
      swimNormative.textContent = '✅';
      swimNormative.classList.add('green');
    } else {
      swimNormative.textContent = '❌';
      swimNormative.classList.remove('green');
    }

    normativesContainer.style.display = 'flex';
    dataContainer.style.display = 'flex';
  });
});
