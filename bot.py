from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters, CallbackQueryHandler
from telegram import InputMediaPhoto
import random
import time

# Список локацій та шлях до зображень
location_images = {
    "Озеро": "lake.jpg",  # Локальний шлях до картинки
    "Річка": "river.jpg",
    "Морське узбережжя": "beach.jpg"
}

# Список можливих риб
fishes = ["Щука", "Лящ", "Карп", "Окунь", "Сом"]

# Функція, яка відповідає на команду /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Привіт! Я твій рибальський бот.\n\n"
        "Вибери одну з локацій для рибалки:\n"
        "1. Озеро\n"
        "2. Річка\n"
        "3. Морське узбережжя\n"
        "Просто надішли номер локації для вибору."
    )

# Функція для обробки вибору локації
async def choose_location(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_choice = update.message.text.strip()
    
    # Перевіряємо, чи вибір є в списку локацій
    if user_choice.isdigit():
        choice_index = int(user_choice) - 1
        if 0 <= choice_index < len(location_images):
            location_name = list(location_images.keys())[choice_index]
            image_path = location_images[location_name]
            await update.message.reply_text(f"Ти обрав локацію: {location_name}. Готовий до рибалки!")
            # Надсилаємо картинку
            await update.message.reply_photo(photo=open(image_path, 'rb'))
            # Додаємо кнопку для закидання удочки
            keyboard = [
                [InlineKeyboardButton("Закинути удочку", callback_data=f"fishing_{location_name}")]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            await update.message.reply_text("Щоб закинути удочку, натисни на кнопку!", reply_markup=reply_markup)
        else:
            await update.message.reply_text("Невірний вибір. Спробуй ще раз.")
    else:
        await update.message.reply_text("Будь ласка, надішли номер локації (1, 2 або 3).")

# Функція для обробки натискання на кнопку "Закинути удочку"
async def fish(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()

    # Отримуємо локацію з callback_data
    location = query.data.split('_')[1]

    # Симуляція рибалки (випадковий вибір риби)
    fish_caught = random.choice(fishes)
    
    # Затримка, щоб зробити процес більш реалістичним
    await query.edit_message_text(text=f"Закидаємо удочку на локації: {location}...\n")
    time.sleep(2)  # Затримка в 2 секунди
    
    # Повідомлення про рибу
    await query.edit_message_text(text=f"Ти зловив: {fish_caught} на локації {location}!")

# Основна функція, де запускається бот
def main():
    # Вставляй свій токен, який ти отримав від BotFather
    application = Application.builder().token("7599162536:AAHFg1HVNuYaYocAZFTyqEHcwwi1pJkYZqM").build()

    # Додаємо обробники для команд
    application.add_handler(CommandHandler("start", start))
    
    # Додаємо обробник для вибору локації
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, choose_location))

    # Додаємо обробник для натискання на кнопку "Закинути удочку"
    application.add_handler(CallbackQueryHandler(fish, pattern="fishing_"))

    # Запускаємо бота
    application.run_polling()

if __name__ == '__main__':
    main()
