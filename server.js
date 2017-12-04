const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



var server = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
server.set('view engine', 'hbs');


server.use((req,res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('unable to append server file');
    }
  })
  next();
})

// app.use((req,res,next) => {
//   res.render('maint.hbs')
// })

server.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

server.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
})

server.get('/', (req,res) => {
  res.render('index.hbs', {
    pageTitle: 'home page',
    welcomeMessage: 'Index page'
  })
})

server.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Error can not be found'
  })
})



server.listen(port, function() {
  console.log(`listening on port ${port}`);
});
