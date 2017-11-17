const express = require('express');
const Converter = require('csvtojson').Converter;
const router = express.Router();

const csvFilePath = './data/dummyBondDataCsv.csv';
let ISINList = [];

//TODO
async function readCSV() {
    var converter = new Converter({});

    // await csv()
    //     .fromFile(csvFilePath)
    //     .on('json', function(jsonObj) {
    //         list.push(jsonObj);
    //     }).on('done', function(error) {
    //         console.log('end');
    //     });

    await converter.fromFile(csvFilePath, function(err, result) {
        if (err)
            console.log(err);

        let jsonObj = result;
        console.log(jsonObj);
        return jsonObj;
    });

    return list;
}

function getISIN(ISIN) {
    for (let i = 0; i < ISINList.length; i++) {
        console.log("comparing ", ISIN, ISINList[i]["ISIN"]);
        if (ISIN === ISINList[i]["ISIN"]) {
            return ISINList[i];
        }
    }
    return null;
}

router.post('/', function(req, res, next) {
    console.log(req.body);
    const ISIN = req.body.result.parameters["ISIN"];
    console.log(ISIN);

    // if (ISINList.length === 0)
    //     ISINList = readCSV();
    //
    // const jsonISIN = getISIN(ISIN);
    // console.log(jsonISIN);
    //
    // let output;
    // if (jsonISIN === null) {
    //     output = "No data on ISIN " + ISIN + " found.";
    // } else {
    //     output = jsonObj.toString();
    // }

    let output = 'details on ' + ISIN + ' are .... whatever';
    res.status(200).send(JSON.stringify({'speech': output, 'displayText': output}));
});

module.exports = router;
