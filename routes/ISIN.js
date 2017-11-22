const express = require('express');
const csv = require('csvtojson');
const router = express.Router();

const csvFilePath = './data/dummyBondDataCsv.csv';
let ISINList = [];

csv()
    .fromFile(csvFilePath)
    .on('json', function(jsonObj) {
        ISINList.push(jsonObj);
    }).on('done', function(error) {
    console.log('Finished reading CSV data.');
});

function getISIN(ISIN) {
    for (let i = 0; i < ISINList.length; i++) {
        if (ISIN === ISINList[i]["ISIN"]) {
            return ISINList[i];
        }
    }
    return null;
}

router.post('/', (req, res, next) => {
    console.log(req.body);
    const ISIN = req.body.result.parameters["ISIN"];
    console.log(ISIN);

    const jsonObj = getISIN(ISIN);

    let output;
    if (jsonObj === null) {
        output = "No data on ISIN " + ISIN + " found.";
    } else {
        output = JSON.stringify(jsonObj);
    }

    //TODO Make message clean
    res.status(200).send({'speech': output, 'displayText': output});
});

module.exports = router;
