var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});
var router = express.Router();
/* GET users listing. */

router.get('/', function(req, res, next)  {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var html = '';
    html += "<body>";
    html += "<form action='/nystad/spara' method='post' name='form1'>";
    html += "ny Stad: <input type='text' name='name'>";
    html += "<input type='submit' value='Submit'><br/>";
    html += "</form>";
    html += "<body>";
    res.send(html);
  });
  router.post('/nystad/spara', urlencodedParser, function(req, res) {
    fs.readFile('./stad.json', (err, data) => {
        if (err) throw err;
        
        var stad = JSON.parse(data);
        var newNum = stad.length;
            newStad = {
                "id": newNum + 1,
                "countryname": req.body.name
            }
        stad.push(newStad);
        var savedStad = JSON.stringify(land, null, 2);
        fs.writeFile('stad.json', savedStad, (err, data) => {
            if (err) throw err;
        })
        res.send("Ny stad sparad!")
    })
  });
module.exports = router;