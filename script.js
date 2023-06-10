document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    var fullName = document.getElementById("fullName").value;
    var result = document.getElementById("result");

    // Выводим данные
    result.innerHTML = "Ваши данные: " + fullName;
});
