var express = require('express');
var router = express.Router();
var jsondata = require('../json/cover.json');

/* GET home page. */
router.get('/', function(req, res) {
  var data = jsondata;
  data.title='stories';
  res.render('index', data);
});

module.exports = router;
