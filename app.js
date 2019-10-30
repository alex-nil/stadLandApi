var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});
var indexRouter = require('./routes/index');
var stadRouter = require('./routes/stad');
var landRouter = require('./routes/land');
var nylandRouter = require('./routes/nyland');
var sparanyRouter = require('./routes/sparany');
var fetch = require('node-fetch');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/stad', stadRouter);
app.use('/land', landRouter);
app.use('/nyland', nylandRouter);
app.use('/sparany', sparanyRouter);

app.get('/nystad', function(req, res, next)  {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    fs.readFile('land.json', (err, data) => {
        var land = JSON.parse(data);
        if (err) throw err;

        var landNum = land;
        landNum + 1;
        var html = '';
        html += "<body>";
        html += "<form action='/nystad/spara' method='post' name='form1'>";
        html += "ny Stad: <input type='text' name='name'><br>";
        html += "antal invånare: <input type='text' name='pop'>";
        html += "<select name='land' size='" + landNum + "'>";
        for (let i = 0; i<land.length; i++) {
            html += "<option value='" + land[i].countryname + "'>" + land[i].countryname + "</option>";
        }
        html += "</select>";
        html += "<input type='submit' value='Submit'><br/>";
        html += "</form>";
    
        res.send(html);
})
  });
  app.post('/nystad/spara', urlencodedParser, function(req, res) {
    fs.readFile('stad.json', (err, data) => {
        var stad = JSON.parse(data);
        if (err) throw err;
        var myNewNum;
        fs.readFile('land.json', (err, data) => {
            var land = JSON.parse(data);
            let countryNum = req.body.land;
            for (let i = 0; i<land.length; i++) {
                if (countryNum === land[i].countryname) {
                    myNewNum = land[i].id;
                }
            }
            
            var newNum = stad.length;
                newStad = {
                    "id": newNum + 1,
                    "stadname": req.body.name,
                    "countryid": myNewNum,
                    "population": req.body.pop
                }
            stad.push(newStad);
            var savedStad = JSON.stringify(stad, null, 2);
            fs.writeFile('stad.json', savedStad, (err, data) => {
                if (err) throw err;
            })
            res.send("Ny stad sparad!")
        })
       
       
    })
  });


module.exports = app;
