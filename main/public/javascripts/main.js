var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/login', function (req, res) {
    var requestPrams = req.body;
    fs.readFile("../resources/user.json", 'utf8', function (err, data) {
        var name = JSON.parse(data);
        for (var user in name.users) {
            if (name.users[user].userid === requestPrams.emailId && name.users[user].password === requestPrams.password) {
                var responce = {
                    "role": name.users[user].role,
                    "userName": name.users[user].name
                };
                res.send(responce);
            }
        }
        res.status(404).end();
    });
});
var server = app.listen(8081,  function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
