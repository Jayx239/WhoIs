var express = require('express');
var router = express.Router();

var okCaller = require('../components/scraper/okcaller');

var parser = new okCaller.OkCallerParser();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ScreenNumber', function(req,res, next) {
  console.log(req.query);
  var args = {phoneNumber: req.query.phoneNumber};
  parser.parse(args,function(details) {
    res.json(details);
  })
});

module.exports = router;
