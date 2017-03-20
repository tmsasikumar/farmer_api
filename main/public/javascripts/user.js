var fs = require("fs");
var models = require("../../models");
const FILEPATH = "../resources/user.json";

var userPresent = function (name, requestPrams) {
    for (var user in name.users) {
        if (name.users[user].emailId === requestPrams.emailId) {
            return true;
        }
    }
    return false;
};

module.exports = {
    login: function (req, res) {
        var requestPrams = req.body;
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
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
    },
    register: function (req, res) {
        console.log(req.body);
        models.Users.create({
            name: req.body.name,
            role: req.body.role,
            password: req.body.password,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            emailId: req.body.emailId
        }).then(function(users){
            res.json(users.dataValues);
        }).catch(function(error){
            console.log("ops: " + error);
            res.status(500).json({ error: 'error' });
        });
        // var requestPrams = req.body;
        // fs.readFile(FILEPATH, 'utf8', function (err, data) {
        //     var name = JSON.parse(data);
        //     if(userPresent(name, requestPrams)){
        //         res.status(409).end();
        //     }else {
        //         name.users[name.users.length] = requestPrams;
        //
        //         fs.writeFile(FILEPATH, JSON.stringify(name), function (err) {
        //             if (err) {
        //                 res.status(500).end();
        //             }
        //         });
        //         var responce = {
        //             "role": requestPrams.role,
        //             "userName": requestPrams.name,
        //             "emailId": requestPrams.emailId
        //         };
        //         res.send(responce);
        //     }
        // });
    }
};