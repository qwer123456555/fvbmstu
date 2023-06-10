function showData() {
    var nameInput = document.getElementById('name');
    var name = nameInput.value;

    // Здесь можно добавить код для обработки ФИО и вывода данных

    var resultDiv = document.getElementById('result');
    resultDiv.innerText = 'Данные для ' + name;
}
