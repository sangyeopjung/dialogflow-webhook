var express = require('express');
var request = require('request');
var csv = require('csvtojson');
var router = express.Router();

var csvFilePath = '../data/dummyBondData.csv';

function getISIN(ISIN) {
    // TODO Read from excel
    csv.fromFile(csvFilePath)
        .on('json', function(jsonObj) {
        console.log(jsonObj);
    }).on('done', function(error) {
        console.log('end');
    });

    return "Details of ISIN " + ISIN + ": whatever";
}

router.post('/', function(req, res, next) {
    console.log(req);
    var ISIN = req.body.result.parameters["ISIN"];

    var output = getISIN(ISIN);

    res.status(200).send(JSON.stringify({'speech': output, 'displayText': output}));
});

module.exports = router;
