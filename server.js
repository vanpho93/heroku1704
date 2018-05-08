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
    res.redirect('/');
});

app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const singer = singers.find(singer => singer.id === +id);
    if (!singer) return res.send('Khong tim thay.');
    res.render('update', { singer });
});

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, image, link } = req.body;
    const singer = singers.find(singer => singer.id === +id);
    if (!singer) return res.send('Khong tim thay.');
    singer.name = name;
    singer.link = link;
    singer.image = image;
    res.redirect('/');
});

app.get('/remove/:id', (req, res) => {
    const { id } = req.params;
    const index = singers.findIndex(singer => singer.id === +id);
    if (index === -1) return res.send('Khong tim thay.');
    singers.splice(index, 1);
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => console.log('Server started!'));

app.locals.isDev = process.env.NODE_ENV !== 'production';

if (app.locals.isDev) {
    const reload = require('reload');
    reload(app);
}
