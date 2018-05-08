const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/', (req, res) => res.send('POST METHOD'));

app.put('/', (req, res) => res.send('PUT METHOD'));

app.delete('/', (req, res) => res.send('DELETE METHOD'));

app.listen(process.env.PORT || 3000, () => console.log('Server started!'));

app.locals.isDev = process.env.NODE_ENV !== 'production';

if (app.locals.isDev) {
    const reload = require('reload');
    reload(app);
}
