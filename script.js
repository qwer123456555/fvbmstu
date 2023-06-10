function showData() {
  var fullName = document.getElementById("fullNameInput").value.toLowerCase();
  var dataContainer = document.getElementById("dataContainer");
  var normatives = document.getElementById("normatives");

  // Очищаем содержимое контейнеров данных
  dataContainer.innerHTML = "";
  normatives.innerHTML = "";

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
  if (fullName === "иван иванов") {
    score = 70;
    visits = 25;
    scoreSquare.classList.add("green");
    visitsSquare.classList.add("green");
  } else if (fullName === "петр петров") {
    score = 40;
    visits = 21;
    scoreSquare.classList.add("red");
    visitsSquare.classList.add("red");
  } else {
    // ФИО не соответствует заданным условиям
    return;
  }

  // Устанавливаем значения баллов и посещений
  scoreSquare.textContent = score;
  visitsSquare.textContent = visits;

  // Добавляем квадраты в контейнер данных
  dataContainer.appendChild(scoreSquare);
  dataContainer.appendChild(visitsSquare);

  // Генерируем значения нормативов в зависимости от ФИО
  var runningNorm = getRandomNorm();
  var absNorm = fullName === "петр петров" ? "✓" : getRandomNorm();
  var pushupsNorm = getRandomNorm();
  var swimmingNorm = fullName === "иван иванов" ? "✕" : getRandomNorm();

  // Создаем элементы для отображения нормативов
  var runningItem = createNormItem("Бег:", runningNorm);
  var absItem = createNormItem("Пресс:", absNorm);
  var pushupsItem = createNormItem("Отжимания:", pushupsNorm);
  var swimmingItem = createNormItem("Плавание:", swimmingNorm);

  // Добавляем элементы в список нормативов
  normatives.appendChild(runningItem);
  normatives.appendChild(absItem);
  normatives.appendChild(pushupsItem);
  normatives.appendChild(swimmingItem);
}
