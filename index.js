const express = require('express');
const app = express();
const connectDb = require('./config/db');
const path = require('path');

//connecting db
connectDb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, './public')));

app.set('view engine', 'ejs');

//defining routes
app.use('/', require('./routes/index'));
app.use('/url', require('./routes/url'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})