// Функція для старту гри
function startFishing() {
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

    // Додаємо кнопки для вибору удочки та наживки
    document.getElementById("gameArea").innerHTML += `
        <button onclick="catchFish('${location}', 'Черв'як')">Ловити з черв'яком</button>
        <button onclick="catchFish('${location}', 'Комахи')">Ловити з комахами</button>
    `;
}

// Функція для ловлі риби
function catchFish(location, bait) {
    const fishList = ['Щука', 'Карп', 'Окунь'];
    const randomFish = fishList[Math.floor(Math.random() * fishList.length)];
    const result = `Ви спіймали ${randomFish} на ${bait} в ${location}!`;
    
    // Виводимо результат
    document.getElementById("fishCaught").innerHTML = result;

    // Можна додати звуковий ефект
    const audio = new Audio('assets/sound.mp3');
    audio.play();
}
