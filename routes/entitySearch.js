const express = require('express');
const request = require('request');
const config = require('../config');
const router = express.Router();

router
    .get('/:id', (req, res, next) => {
        if (req.params.id === undefined)
            res.status(400).send("No ID provided");

        const options = {
            rejectUnauthorized: false,
            url: "https://permid.org/" + req.params.id + "?format=json-ld&access-token=" + config.accessToken,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        console.log("Sending " + options.method +" request to: " + options.url);

        request(options, (error, response, body) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }

            const parsed = JSON.parse(body);
            console.log("Response body:\n", parsed);
            res.status(200).send(parsed);
        });
    })

    .get('/permid/:query', (req, res, next) => {
        if (req.params.query === undefined)
            res.status(400).send("No query provided");

        const options = {
            rejectUnauthorized: false,
            url: "https://api.thomsonreuters.com/permid/search?access-token=" + config.accessToken + "&q=" + req.params.query,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        console.log("Sending " + options.method +" request to: " + options.url);

        request(options, (error, response, body) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }

            const parsed = JSON.parse(body);
            console.log("Response body:\n", parsed);
            res.status(200).send(parsed);
        });
    })
;

module.exports = router;