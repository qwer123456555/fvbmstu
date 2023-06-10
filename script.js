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

  // Обработка определенных ФИО и вывод соответствующих данных
  if (fullName === "Иван Иванов") {
    var data1 = document.createElement("p");
    data1.classList.add("data");
    data1.textContent = "Данные для Ивана Иванова";
    dataContainer.appendChild(data1);
  } else if (fullName === "Петр Петров") {
    var data2 = document.createElement("p");
    data2.classList.add("data");
    data2.textContent = "Данные для Петра Петрова";
    dataContainer.appendChild(data2);
  } else {
    var dataDefault = document.createElement("p");
    dataDefault.classList.add("data");
    dataDefault.textContent = "Данные для другого ФИО";
    dataContainer.appendChild(dataDefault);
  }
}
