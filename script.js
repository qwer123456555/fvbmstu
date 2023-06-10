// Функция для отображения данных
function showData() {
  var fullName = document.getElementById("fullNameInput").value.toLowerCase();
  var dataContainer = document.getElementById("dataContainer");

  // Очищаем содержимое контейнера данных
  dataContainer.innerHTML = "";

  // Создаем элементы для отображения данных ФИО
  var fullNameHeading = document.createElement("h2");
  fullNameHeading.textContent = "Ваше ФИО:";
  var fullNameData = document.createElement("p");
  fullNameData.textContent = fullName;

  // Добавляем элементы в контейнер данных
  dataContainer.appendChild(fullNameHeading);
  dataContainer.appendChild(fullNameData);

  // Создаем квадраты для отображения баллов и посещений
  var scoreSquare = document.createElement("div");
  scoreSquare.classList.add("square");
  var visitsSquare = document.createElement("div");
  visitsSquare.classList.add("square");

  // Устанавливаем значения баллов и посещений в зависимости от ФИО
  var score, visits;
  var normatives = {
    "иван иванов": {
      score: 70,
      visits: 25,
      swim: true,
      press: false,
    },
    "петр петров": {
      score: 40,
      visits: 21,
      swim: false,
      press: true,
    },
  };

  if (normatives.hasOwnProperty(fullName)) {
    score = normatives[fullName].score;
    visits = normatives[fullName].visits;
    var swimNormative = normatives[fullName].swim ? "Галочка" : "Крестик";
    var pressNormative = normatives[fullName].press ? "Галочка" : "Крестик";

    scoreSquare.classList.add(score >= 60 ? "green" : "red");
    visitsSquare.classList.add(visits >= 23 ? "green" : "red");

    // Создаем элементы для отображения нормативов
    var normativesHeading = document.createElement("h3");
    normativesHeading.textContent = "Нормативы:";
    var normativesList = document.createElement("ul");
    var swimItem = document.createElement("li");
    var pressItem = document.createElement("li");
    swimItem.textContent = "Плавание: " + swimNormative;
    pressItem.textContent = "Пресс: " + pressNormative;
    normativesList.appendChild(swimItem);
    normativesList.appendChild(pressItem);

    // Добавляем элементы в контейнер данных
    dataContainer.appendChild(scoreSquare);
    dataContainer.appendChild(visitsSquare);
    dataContainer.appendChild(normativesHeading);
    dataContainer.appendChild(normativesList);
  }
}

// Обработчик события для кнопки "Показать данные"
var showDataButton = document.getElementById("showDataButton");
showDataButton.addEventListener("click", showData);
