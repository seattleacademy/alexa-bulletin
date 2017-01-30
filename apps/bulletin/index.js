var alexa = require('alexa-app');
var gdDownloader = require('./gdDownloader');

var docId = "1NWsJGeDsZ_uRsHKUJYRjbKB-gTLW-9gygEPNjmm6DHA";
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1; //When 0, you need to relaunch the server

// Define an alexa-app
var app = new alexa.app('bulletin');
app.launch(function(req, res) {
    gdDownloader(docId, function(err, txt) {
        if (err) {
            console.log('Error on getting text ', err);
            return;
        }
        res.say(txt).send();
        console.log(txt);
    })
    return false;
});
app.intent('CommandIntent', {
    "slots": { "COMMAND": "LITERAL" },
    "utterances": ["{hello|goodbye|COMMAND}}"]
}, function(req, res) {
    res.say('You Said ' + req.slot('COMMAND'));
});
module.exports = app;
