const express = require('express');
const { urlencoded } = require('body-parser');
const app = express();

app.use(urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.get('/add', (req, res) => res.render('add'));

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('POST METHOD');
});

// app.put('/', (req, res) => res.send('PUT METHOD'));
// app.delete('/', (req, res) => res.send('DELETE METHOD'));

app.listen(process.env.PORT || 3000, () => console.log('Server started!'));

app.locals.isDev = process.env.NODE_ENV !== 'production';

if (app.locals.isDev) {
    const reload = require('reload');
    reload(app);
}
