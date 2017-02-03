var express = require('express');
var app = express();
var fs = require("fs");
var cors = require("cors");
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

function login(req, res) {
    var requestPrams = req.body;
    fs.readFile("../resources/user.json", 'utf8', function (err, data) {
        var name = JSON.parse(data);
        for (var user in name.users) {
            if (name.users[user].emailId === requestPrams.emailId && name.users[user].password === requestPrams.password) {
                var response = {
                    "role": name.users[user].role,
                    "userName": name.users[user].name,
                    "emailId": name.users[user].emailId
                };
                res.send(response);
            }
        }
        res.status(404).end();
    });
}
app.post('/api/login', function (req, res) {
    login(req, res);
});

app.post('/api/register', function (req, res) {
    var requestPrams = req.body;
    fs.readFile("../resources/user.json", 'utf8', function (err, data) {
        var name = JSON.parse(data);
        name.users[name.users.length] = requestPrams;

        fs.writeFile("../resources/user.json", JSON.stringify(name),  function(err) {
            if (err) {
                res.status(500).end();
            }
        });
        var responce = {
            "role": requestPrams.role,
            "userName": requestPrams.name,
            "emailId": requestPrams.emailId
        };
        res.send(responce);
    });
});

app.post('/api/addFarmer', function (req, res) {
    var requestPrams = req.body;
    fs.readFile("../resources/farmersDetail.json", 'utf8', function (err, data) {
        var details = JSON.parse(data);
        details.farmers[details.farmers.length] = requestPrams;

        fs.writeFile("../resources/farmersDetail.json", JSON.stringify(details),  function(err) {
            if (err) {
                res.status(500).end();
            }
        });
        res.status(200).end();
    });
});


var server = app.listen(8081,  function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
