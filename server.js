const express = require('express');
const { urlencoded } = require('body-parser');
const { singers, Singer } = require('./Singer');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('singer', { singers }));

app.get('/add', (req, res) => res.render('create'));

app.post('/add', (req, res) => {
    const { name, link, image } = req.body;
    const singer = new Singer(name, link, image);
    singers.push(singer);
    // res.send('Da nhan');
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => console.log('Server started!'));

app.locals.isDev = process.env.NODE_ENV !== 'production';

if (app.locals.isDev) {
    const reload = require('reload');
    reload(app);
}
