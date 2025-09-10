const express = require('express');
const categories = require('./routes/categories');
const sale = require('./routes/sale');
const order = require('./routes/order');
const products = require('./routes/products');
const sequelize = require('./database/database');
const cors = require('cors')
const Category = require('./database/models/category');
const Product = require('./database/models/product');
const PORT = 3333;

Category.hasMany(Product);
Product.belongsTo(Category);

const app = express();
app.use(express.static('public'))
app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/categories', categories);
app.use('/products', products);
app.use('/sale', sale);
app.use('/order', order);

// Инициализация базы данных
const initDB = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully');
    } catch (err) {
        console.error('Database sync error:', err);
    }
};

// Инициализируем базу данных при старте
initDB();

// Для локальной разработки
if (process.env.NODE_ENV !== 'production') {
    const start = async () => {
        try {
            await sequelize.sync().then(
                result => {/*console.log(result) */},
                err => console.log(err)
            );
            
            app.listen(PORT, () => {
                console.log(`\n\nServer started on ${PORT} port...`)
            })
        } catch (err) {
            console.log(err);
        }
    }
    start();
}

// Экспортируем приложение для Vercel
module.exports = app;

// app.listen('3333');