window.addEventListener('DOMContentLoaded', function() {
  var dataContainer = document.getElementById('dataContainer');
  var normativesContainer = document.getElementById('normativesContainer');
  var scoreSquare = document.querySelector('.score');
  var visitsSquare = document.querySelector('.visits');

  dataContainer.style.display = 'none';
  normativesContainer.style.display = 'none';

  document.getElementById('showDataButton').addEventListener('click', function() {
    var fullName = document.getElementById('fullNameInput').value.toLowerCase();

    var score, visits, swimNormative, pressNormative;

    if (fullName === 'иван иванов') {
      score = 70;
      visits = 25;
      swimNormative = true;
      pressNormative = true;
    } else if (fullName === 'петр петров') {
      score = 40;
      visits = 21;
      swimNormative = false;
      pressNormative = true;
    } else {
      alert('Такого ученика не существует!');
      return;
    }

    document.getElementById('scoreValue').textContent = score;
    document.getElementById('visitsValue').textContent = visits;

    scoreSquare.classList.remove('green', 'red');
    visitsSquare.classList.remove('green', 'red');

    if (score < 60) {
      scoreSquare.classList.add('red');
    } else {
      scoreSquare.classList.add('green');
    }

    if (visits < 23) {
      visitsSquare.classList.add('red');
    } else {
      visitsSquare.classList.add('green');
    }

    if (fullName === 'иван иванов' || fullName === 'петр петров') {
      normativesContainer.style.display = 'block';

      var swimNormativeElement = document.getElementById('swimNormative');
      var pressNormativeElement = document.getElementById('pressNormative');

      swimNormativeElement.textContent = 'Норматив по плаванию: ' + (swimNormative ? '✅' : '❌');
      pressNormativeElement.textContent = 'Норматив по прессу: ' + (pressNormative ? '✅' : '❌');
    } else {
      normativesContainer.style.display = 'none';
    }

    dataContainer.style.display = 'block';
  });
});
