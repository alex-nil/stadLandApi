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
    html += "<form action='/nyland/nyland/' method='post' name='form1'>";
    html += "Namn: <input type='text' name='name'>";
    html += "<input type='submit' value='Submit'><br/>";
    html += "</form>";
    html += "<body>";
    res.send(html);
  });
  router.post('/', urlencodedParser, function(req, res) {
    fs.readFile('./land.json', (err, data) => {
        if (err) throw err;
        
        var land = JSON.parse(data);
        var newNum = land.length;
            newLand = {
                "Id": newNum + 1,
                "Countryname": req.body.name
            }
        land.push(newLand);
        var savedLand = JSON.stringify(land, null, 2);
        fs.writeFile('land.json', savedLand, (err, data) => {
            if (err) throw err;
        })
        res.send("Nytt land sparat!")
    })
  });
module.exports = router;