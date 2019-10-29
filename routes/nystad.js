var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});
var router = express.Router();
/* GET users listing. */

router.get('/', function(req, res)  {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var html = '';
    html += "<body>";
    html += "<form action='/nystad' method='post' name='form1'>";
    html += "Namn: <input type='text' name='name'>";
    html += "<input type='submit' value='Submit'><br/>";
    html += "</form>";
    html += "<body>";
    res.send(html);
  });
  router.post('/nystad/nu', urlencodedParser, function(req, res) {
    fs.readFile('./stad.json', (err, data) => {
        if (err) throw err;
        var stad = JSON.parse(data);
            newStad = {
                "mail": req.body.name
            }
        stad.push(newStad);
        var savedStad = JSON.stringify(land, null, 2);
        fs.writeFile('email.json', savedStad, (err, data) => {
            if (err) throw err;
        })
        res.send("Ny användare skapad!")
    })
  });
module.exports = router;