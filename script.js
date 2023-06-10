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
  }

  var dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = '';

  var scoreSquare = createSquare('Баллы', score, score < 60 ? 'red' : 'green');
  var visitsSquare = createSquare('Посещения', visits, visits < 23 ? 'red' : 'green');

  dataContainer.appendChild(scoreSquare);
  dataContainer.appendChild(visitsSquare);

  var normativesContainer = document.getElementById('normativesContainer');

  if (fullName === 'иван иванов' || fullName === 'петр петров') {
    normativesContainer.style.display = 'block';

    var swimNormativeElement = document.getElementById('swimNormative');
    var pressNormativeElement = document.getElementById('pressNormative');

    swimNormativeElement.textContent = 'Норматив по плаванию: ' + (swimNormative ? 'Галочка' : 'Крестик');
    pressNormativeElement.textContent = 'Норматив по прессу: ' + (pressNormative ? 'Галочка' : 'Крестик');
  } else {
    normativesContainer.style.display = 'none';
  }
});

function createSquare(label, value, colorClass) {
  var square = document.createElement('div');
  square.className = 'square ' + colorClass;
  square.innerHTML = '<span class="value">' + value + '</span><span class="label">' + label + '</span>';

  return square;
}
