document.addEventListener('DOMContentLoaded', function() {
  var showDataButton = document.getElementById('showDataButton');
  var fullNameInput = document.getElementById('fullName');
  var scoreSquare = document.getElementById('score');
  var visitsSquare = document.getElementById('visits');
  var pressNormative = document.getElementById('pressNormative');
  var swimNormative = document.getElementById('swimNormative');
  var normativesContainer = document.querySelector('.normatives-container');
  var dataContainer = document.querySelector('.data-container');

  showDataButton.addEventListener('click', function() {
    var fullName = fullNameInput.value.toLowerCase();
    var score = '';
    var visits = '';
    var press = false;
    var swim = false;

    if (fullName === 'иван иванов') {
      score = '70';
      visits = '25';
      press = true;
      swim = false;
    } else if (fullName === 'петр петров') {
      score = '40';
      visits = '21';
      press = false;
      swim = true;
    } else {
      dataContainer.style.display = 'none';
      alert('Такого ученика нет');
      return;
    }

    scoreSquare.textContent = score;
    visitsSquare.textContent = visits;

    if (Number(visits) < 23) {
      visitsSquare.classList.add('red');
    } else {
      visitsSquare.classList.remove('red');
    }

    if (press) {
      pressNormative.innerHTML = '&#9989;';
      pressNormative.classList.add('green');
    } else {
      pressNormative.innerHTML = '&#10060;';
      pressNormative.classList.remove('green');
    }

    if (swim) {
      swimNormative.innerHTML = '&#9989;';
      swimNormative.classList.add('green');
    } else {
      swimNormative.innerHTML = '&#10060;';
      swimNormative.classList.remove('green');
    }

    normativesContainer.style.display = 'flex';
    dataContainer.style.display = 'flex';
  });
});
