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
        models.users.findOne({
            where: {
                emailId: requestPrams.emailId,
                password: requestPrams.password
            }

        }).then(function (user) {
            if (user) {
                var response = {
                    "role": user.dataValues.role,
                    "userName": user.dataValues.name,
                    "emailId": user.dataValues.emailId
                };
                res.json(response);
            } else {
                res.status(404).json({error: 'no user found'});
            }
        }).catch(function (error) {
            res.status(500).json({error: error});
        });
    },
    register: function (req, res) {
        models.users.create({
            name: req.body.name,
            role: req.body.role,
            password: req.body.password,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            emailId: req.body.emailId
        }).then(function (user) {
            var response = {
                "role": user.dataValues.role,
                "userName": user.dataValues.name,
                "emailId": user.dataValues.emailId
            };

            res.json(response);
        }).catch(function (error) {
            if(error.name == "SequelizeUniqueConstraintError"){
                res.status(409).json({error: error.message});
            } else {
                res.status(500).json({error: error.errors});
            }
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