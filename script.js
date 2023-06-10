document.addEventListener('DOMContentLoaded', function() {
  var showDataButton = document.getElementById('showDataButton');
  var fullNameInput = document.getElementById('fullName');
  var scoreSquare = document.querySelector('.score.square');
  var visitsSquare = document.querySelector('.visits.square');
  var normativesContainer = document.querySelector('.normatives-container');
  var swimNormative = document.getElementById('swimNormative');
  var pressNormative = document.getElementById('pressNormative');
  var dataContainer = document.querySelector('.data-container');

  showDataButton.addEventListener('click', function() {
    var fullName = fullNameInput.value;
    var score = '';
    var visits = '';
    var press = false;
    var swim = false;

    if (fullName.toLowerCase() === 'иван иванов') {
      score = '70';
      visits = '25';
      press = true;
      swim = false;
    } else if (fullName.toLowerCase() === 'петр петров') {
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

    if (visits >= 23) {
      visitsSquare.classList.add('green');
      visitsSquare.classList.remove('red');
    } else {
      visitsSquare.classList.add('red');
      visitsSquare.classList.remove('green');
    }

    if (press) {
      pressNormative.innerHTML = '&#10004;'; // Галочка
      pressNormative.classList.add('green');
    } else {
      pressNormative.innerHTML = '&#10060;'; // Крестик
      pressNormative.classList.add('red');
    }

    if (swim) {
      swimNormative.innerHTML = '&#10004;'; // Галочка
      swimNormative.classList.add('green');
    } else {
      swimNormative.innerHTML = '&#10060;'; // Крестик
      swimNormative.classList.add('red');
    }

    dataContainer.style.display
