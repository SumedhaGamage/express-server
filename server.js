const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('Unable to log in to server.log file');
        }
    });
    next();

});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.send({
        name: 'Sumedha',
        like: [
            'biking', 'gaming'
        ]
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs' ,{
        title: 'About Page',
        header: 'This is Header Page',
        year : new Date().getFullYear()
    });
});

app.get('/:id/username/:name', (req, res) => {
    res.render('welcome.hbs', {
        title: `${req.param('name')}`,
        welcomeMessage: `Welcome ${req.param('name')}`,
        year: new Date().getFullYear()
    })
});
app.listen(3000, () => {
    console.log('Server is up in port 3000');
});
