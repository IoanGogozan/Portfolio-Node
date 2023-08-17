

var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

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

router.post('/', jsonParser, function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json"));
  let recommendationsArray = JSON.parse(rawdata);
  if(recommendationsArray.filter(x => x.name === req.body.name).length == 0) {
    const newArray = recommendationsArray.concat([req.body])
    fs.writeFileSync(path.resolve(__dirname, "../data/recommendations.json"), JSON.stringify(newArray));
  }
  res.end();
});

router.delete('/', jsonParser, function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json"));
  let recommendationsArray = JSON.parse(rawdata);
  const newArray = recommendationsArray.filter(x => x.name !== req.body.name)
  if (newArray.length !== recommendationsArray.length ) {
    fs.writeFileSync(path.resolve(__dirname, "../data/recommendations.json"), JSON.stringify(newArray));
  }
  res.end();
});


module.exports = router;