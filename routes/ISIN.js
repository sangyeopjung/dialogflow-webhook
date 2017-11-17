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

    let outObj;
    if (jsonObj === null) {
        outObj = "No data on ISIN " + ISIN + " found.";
    } else {
        outObj = jsonObj;
    }

    let output = outObj.toString();
    //TODO Make message clean
    res.status(200).send(JSON.stringify({'speech': output, 'displayText': output}));
});

module.exports = router;
