var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1; //When 0, you need to relaunch the server

// Define an alexa-app
var app = new alexa.app('bulletin');
app.launch(function(req, res) {
    function getArticle(err, result) {
        console.log(result)
        res.say(result).send();
    }
    setTimeout(function(){ getArticle(0,"hello"); }, 10);
    return false;
});
app.intent('CommandIntent', {
    "slots": { "COMMAND": "LITERAL" },
    "utterances": ["{hello|goodbye|COMMAND}}"]
}, function(req, res) {
    res.say('You Said ' + req.slot('COMMAND'));
});
module.exports = app;