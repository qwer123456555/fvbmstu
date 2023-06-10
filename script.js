document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.querySelector('.welcome-screen');
  const nameInput = document.getElementById('nameInput');
  const submitBtn = document.getElementById('submitBtn');
  const container = document.querySelector('.container');
  const studentName = document.querySelector('.student-name');
  const scoreSquare = document.querySelector('.score-square');
  const visitsSquare = document.querySelector('.visits-square');
  const scoreValue = document.querySelector('.score-value');
  const visitsValue = document.querySelector('.visits-value');
  const normativeIcons = document.querySelectorAll('.normative-icon');

  submitBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();

    if (name === '') {
      alert('Please enter a valid name.');
      return;
    }

    welcomeScreen.style.display = 'none';
    container.style.display = 'flex';

    studentName.textContent = name;
    scoreValue.textContent = '70';
    visitsValue.textContent = '25';

    if (parseInt(scoreValue.textContent) >= 60) {
      scoreSquare.classList.add('green');
    } else {
      scoreSquare.classList.remove('green');
    }

    if (parseInt(visitsValue.textContent) < 23) {
      visitsSquare.classList.add('red');
    } else {
      visitsSquare.classList.remove('red');
    }

    normativeIcons.forEach(function(icon) {
      icon.innerHTML = "&#10004;";
    });
  });
});
