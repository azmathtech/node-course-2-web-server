const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

//hbs is handlebarjs which is a templeting helper to build pages
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//app.use is how you create middleware for express
//the middleware is executed in the order written
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:  ${req.method}  ${req.originalUrl}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

//because we do not use next() this stops everything from executing
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Under Construction',
//     welcomeMessage: 'The site is currently under maintenance!'
//   });
// });

app.use(express.static(__dirname + '/public')); //middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Andrew',
  //   likes: ['Biking', 'Cities']
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my page'
    //currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unabel to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
