// Функція для старту гри
function startFishing() {
    // При натисканні на "Почати риболовлю" приховуємо цю кнопку і показуємо вибір локацій
    document.getElementById("gameArea").innerHTML = `
        <h2>Виберіть локацію для риболовлі:</h2>
        <button onclick="selectLocation('Озеро')">Озеро</button>
        <button onclick="selectLocation('Річка')">Річка</button>
    `;
}

// Функція для вибору локації
function selectLocation(location) {
    document.getElementById("locationSelect").classList.add('hidden');  // Сховати кнопки вибору
    document.getElementById("fishCaught").innerHTML = `Ви на локації: ${location}. Ловіть рибу!`;

    // Додаємо кнопки для вибору наживки
    document.getElementById("gameArea").innerHTML = `
        <button onclick="catchFish('${location}', 'Черв'як')">Ловити з черв'яком</button>
        <button onclick="catchFish('${location}', 'Комахи')">Ловити з комахами</button>
    `;
}

// Функція для ловлі риби
function catchFish(location, bait) {
    // Показуємо анімацію риби
    document.getElementById("fishAnimation").classList.remove('hidden');
    const fish = document.createElement("img");
    fish.src = "assets/fish1.png";  // Можна додавати різні риби
    fish.classList.add("fish");
    document.getElementById("fishAnimation").appendChild(fish);

    // Затримка перед тим, як показати результат
    setTimeout(function() {
        const result = `Ви спіймали рибу на ${bait} в ${location}!`;
        document.getElementById("fishCaught").innerHTML = result;
        // Приховуємо анімацію після ловлі
        document.getElementById("fishAnimation").classList.add('hidden');
    }, 2000);  // Затримка на 2 секунди для анімації
}
