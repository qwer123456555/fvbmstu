document.getElementById('showDataButton').addEventListener('click', function() {
  var fullName = document.getElementById('fullNameInput').value.toLowerCase();

  var score, visits, swimNormative, pressNormative;

  if (fullName === 'иван иванов') {
    score = 70;
    visits = 25;
    swimNormative = false;
    pressNormative = true;
  } else if (fullName === 'петр петров') {
    score = 40;
    visits = 21;
    swimNormative = true;
    pressNormative = false;
  } else {
    score = 0;
    visits = 0;
    swimNormative = false;
    pressNormative = false;
  }

  var dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = '';

  if (score < 60) {
    var scoreSquare = createSquare('❌', score, 'red');
  } else {
    var scoreSquare = createSquare('✅', score, 'green');
  }

  if (visits < 23) {
    var visitsSquare = createSquare('❌', visits, 'red');
  } else {
    var visitsSquare = createSquare('✅', visits, 'green');
  }

  dataContainer.appendChild(scoreSquare);
  dataContainer.appendChild(visitsSquare);

  var normativesContainer = document.getElementById('normativesContainer');

  if (fullName === 'иван иванов' || fullName === 'петр петров') {
    normativesContainer.style.display = 'block';

    var swimNormativeElement = document.getElementById('swimNormative');
    var pressNormativeElement = document.getElementById('pressNormative');

    swimNormativeElement.textContent = 'Норматив по плаванию: ' + (swimNormative ? '✅' : '❌');
    pressNormativeElement.textContent = 'Норматив по прессу: ' + (pressNormative ? '✅' : '❌');
  } else {
    normativesContainer.style.display = 'none';
  }
});

function createSquare(icon, value, colorClass) {
  var square = document.createElement('div');
  square.className = 'square ' + colorClass;
  square.innerHTML = '<div class="square-container"><span class="icon">' + icon + '</span><span class="value">' + value + '</span></div>';

  return square;
}
