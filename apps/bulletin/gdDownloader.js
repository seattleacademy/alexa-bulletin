"use strict";
var https = require('https');
let docURL = "https://docs.google.com/document/export?format=txt&id=";

module.exports = function (docId, cb) {
    https.get(docURL + docId, function (res) {
        const statusCode = res.statusCode;
        if (statusCode !== 200) {
            res.resume();
            return cb(new Error('Request Failed. Status Code:' + statusCode));
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', function (chunk) {
            rawData += chunk;
        });
        res.on('end', function () {
            cb(null, rawData);
        });
    }).on('error', function (e) {
        cb(e);
    });
};
