window.addEventListener('DOMContentLoaded', function() {
  var dataContainer = document.getElementById('dataContainer');
  var normativesContainer = document.getElementById('normativesContainer');
  var scoreSquare = document.querySelector('.score');
  var visitsSquare = document.querySelector('.visits');

  dataContainer.style.display = 'none';
  normativesContainer.style.display = 'none';

  document.getElementById('showDataButton').addEventListener('click', function() {
    var fullName = document.getElementById('fullNameInput').value.toLowerCase();

    var score, visits, press, swim;
    var isExistingUser = true;

    if (fullName === 'иван иванов') {
      score = 70;
      visits = 25;
      press = true;
      swim = false;
    } else if (fullName === 'петр петров') {
      score = 40;
      visits = 21;
      press = false;
      swim = true;
    } else {
      isExistingUser = false;
    }

    if (isExistingUser) {
      dataContainer.style.display = 'flex';
      normativesContainer.style.display = 'block';

      scoreSquare.textContent = score;
      visitsSquare.textContent = visits;

      if (visits >= 23) {
        visitsSquare.classList.add('green');
        visitsSquare.classList.remove('red');
      } else {
        visitsSquare.classList.add('red');
        visitsSquare.classList.remove('green');
      }

      var pressElement = document.getElementById('pressNormative');
      var swimElement = document.getElementById('swimNormative');

      if (press) {
        pressElement.innerHTML = '&#10004;'; // Галочка
        pressElement.classList.add('green');
      } else {
        pressElement.innerHTML = '&#10060;'; // Крестик
        pressElement.classList.add('red');
      }

      if (swim) {
        swimElement.innerHTML = '&#10004;'; // Галочка
        swimElement.classList.add('green');
      } else {
        swimElement.innerHTML = '&#10060;'; // Крестик
        swimElement.classList.add('red');
      }
    } else {
      dataContainer.style.display = 'none';
      normativesContainer.style.display = 'none';
      alert('Такого ученика нет');
    }
  });
});
