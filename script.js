// Отримуємо елементи сторінки
const lakeButton = document.getElementById('lake');
const riverButton = document.getElementById('river');
const gameResult = document.getElementById('game-result');

// Перевірка, чи існують елементи
if (lakeButton && riverButton && gameResult) {
    // Функція для відображення результату гри
    function showResult(location) {
        // Генеруємо випадковий результат
        const fishCaught = Math.random() > 0.5; // 50% шанс зловити рибу
        if (fishCaught) {
            gameResult.textContent = `Вітаємо! Ви зловили рибу на ${location}!`;
        } else {
            gameResult.textContent = `На ${location} не пощастило, спробуйте ще раз!`;
        }
    }

    // Додаємо обробники подій для кнопок
    lakeButton.addEventListener('click', () => {
        showResult('озері');
    });

    riverButton.addEventListener('click', () => {
        showResult('річці');
    });
} else {
    console.error("Один або більше елементів не знайдено на сторінці!");
}
