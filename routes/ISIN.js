const express = require('express');
const router = express.Router();

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
        output = jsonObj;
    }

    res.status(200).send(JSON.stringify({'speech': output, 'displayText': output}));
});

module.exports = router;
