document.getElementById('showDataButton').addEventListener('click', function() {
  var fullName = document.getElementById('fullNameInput').value.toLowerCase();

  var dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = '';

  var normativesContainer = document.getElementById('normativesContainer');
  normativesContainer.style.display = 'none';

  if (fullName === 'иван иванов') {
    var score = 70;
    var visits = 25;
    var swimNormative = false;
    var pressNormative = true;
  } else if (fullName === 'петр петров') {
    var score = 40;
    var visits = 21;
    var swimNormative = true;
    var pressNormative = false;
  }

  var scoreSquare = createSquare('Баллы', score, score < 60 ? 'red' : 'green');
  var visitsSquare = createSquare('Посещения', visits, 'green');

  dataContainer.appendChild(scoreSquare);
  dataContainer.appendChild(visitsSquare);

  if (fullName === 'иван иванов' || fullName === 'петр петров') {
    normativesContainer.style.display = 'block';

    var swimNormativeElement = document.getElementById('swimNormative');
    var pressNormativeElement = document.getElementById('pressNormative');

    swimNormativeElement.textContent = 'Норматив по плаванию: ' + (swimNormative ? 'Галочка' : 'Крестик');
    pressNormativeElement.textContent = 'Норматив по прессу: ' + (pressNormative ? 'Галочка' : 'Крестик');
  }
});

function createSquare(label, value, colorClass) {
  var square = document.createElement('div');
  square.className = 'square ' + colorClass;
  square.textContent = value;

  var labelElement = document.createElement('div');
  labelElement.textContent = label;

  square.appendChild(labelElement);

  return square;
}
