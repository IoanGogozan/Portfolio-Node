

var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json"));
  res.render('recommendations', { data: JSON.parse(data)
 });
});

router.post('/', function(req, res, next) {
  const { avatar, name, role, description } = req.body;
  const currentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json")));
  currentData.push({ avatar, name, role, description });
  fs.writeFileSync(path.resolve(__dirname, "../data/recommendations.json"), JSON.stringify(currentData, null, 4));
  res.redirect('/recommendations');
});


module.exports = router;