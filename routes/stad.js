var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next)  {
  fs.readFile("./stad.json", (err,data) => {
    if (err) throw err;
    var stad = JSON.parse(data);
    res.send(stad);
  })
  
});

module.exports = router;
