var fs = require("fs");

var userPresent = function (name, requestPrams) {
    for (var user in name.users) {
        if (name.users[user].emailId === requestPrams.emailId) {
            return true;
        }
    }
    return false;
};

function addToFile(name, requestPrams, res) {
    name.users[name.users.length] = requestPrams;

    fs.writeFile("../resources/user.json", JSON.stringify(name), function (err) {
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
}
module.exports = {
    login: function (req, res) {
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
    },
    register: function (req, res) {
        var requestPrams = req.body;
        fs.readFile("../resources/user.json", 'utf8', function (err, data) {
            var name = JSON.parse(data);
            if(userPresent(name, requestPrams)){
                res.status(409).end();
            }else {
                addToFile(name, requestPrams, res);
            }
        });
    }
};