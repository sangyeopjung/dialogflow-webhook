var express = require('express');
var request = require('request');
var config = require('../config');
var router = express.Router();

function getISIN(ISIN) {
    // TODO Read from excel
    return "whatever";
}

router.post('/ISIN', function(req, res, next) {
    console.log(req);
    var ISIN = req.body.result.parameters["ISIN"];

    var output = getISIN(ISIN);

    res.status(200).send(JSON.stringify({'speech': output, 'displayText': output}));
});

module.exports = router;
