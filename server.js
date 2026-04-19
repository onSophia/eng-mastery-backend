const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Подключаем встроенный модуль File System
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const categories = [
    // Базовые и бытовые темы
    { id: 'daily', name: 'Повседневность', icon: '☕', description: 'Рутина, привычки, дом, семья' },
    { id: 'food', name: 'Еда и Кулинария', icon: '🍔', description: 'Рестораны, продукты, готовка' },
    { id: 'shopping', name: 'Покупки и Одежда', icon: '🛍️', description: 'Магазины, мода, размеры, деньги' },
    { id: 'home', name: 'Дом и Мебель', icon: '🏠', description: 'Комнаты, ремонт, бытовая техника' },

    // Путешествия и общество
    { id: 'travel', name: 'Путешествия', icon: '✈️', description: 'Аэропорт, отели, ориентирование' },
    { id: 'relationships', name: 'Отношения', icon: '❤️', description: 'Чувства, эмоции, дружба, ссоры' },
    { id: 'entertainment', name: 'Развлечения', icon: '🎬', description: 'Кино, музыка, хобби, искусство' },
    { id: 'sports', name: 'Спорт и Фитнес', icon: '🏃‍♂️', description: 'Тренировки, соревнования, активный отдых' },

    // Профессиональные и сложные темы
    { id: 'health', name: 'Здоровье и Медицина', icon: '🏥', description: 'Симптомы, врачи, аптека' },
    { id: 'business', name: 'Бизнес и Работа', icon: '💼', description: 'Резюме, переговоры, офис, финансы' },
    { id: 'tech', name: 'Технологии и IT', icon: '💻', description: 'Компьютеры, интернет, гаджеты, код' },
    { id: 'education', name: 'Образование', icon: '🎓', description: 'Университет, экзамены, наука' },

    // Продвинутый уровень
    { id: 'nature', name: 'Природа и Экология', icon: '🌲', description: 'Погода, животные, климат' },
    { id: 'law', name: 'Закон и Общество', icon: '⚖️', description: 'Политика, преступность, права' },
    { id: 'science', name: 'Наука и Космос', icon: '🚀', description: 'Исследования, вселенная, физика' }
];

// Функция для чтения базы слов из файла
const getWordsFromDB = () => {
    try {
        const filePath = path.join(__dirname, 'words.json');
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Ошибка чтения файла БД:", error);
        return [];
    }
};

// API Маршруты
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.get('/api/words/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;

    // 1. Читаем все слова из JSON-файла
    const allWords = getWordsFromDB();

    // 2. Фильтруем только нужную категорию
    const filteredWords = allWords.filter(word => word.category === categoryId);

    res.json(filteredWords);
});

app.listen(PORT, () => {
    console.log(`🚀 Бэкенд сервер успешно запущен на http://localhost:${PORT}`);
});

module.exports = app;