function showData() {
  var fullName = document.getElementById("fullNameInput").value;
  var dataContainer = document.getElementById("dataContainer");

  // Очищаем содержимое контейнера данных
  dataContainer.innerHTML = "";

  // Создаем элементы для отображения данных
  var fullNameHeading = document.createElement("h2");
  fullNameHeading.textContent = "Ваше ФИО:";
  var fullNameData = document.createElement("p");
  fullNameData.textContent = fullName;

  // Добавляем элементы в контейнер данных
  dataContainer.appendChild(fullNameHeading);
  dataContainer.appendChild(fullNameData);
}
