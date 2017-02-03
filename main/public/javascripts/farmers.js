var fs = require("fs");
var responce = {"farmers": []};
const FILEPATH = "../resources/farmersDetail.json";
const USERFILEPATH = "../resources/user.json";


function farmerDetailsRelatedToFEF(requestPrams, res) {
    fs.readFile(FILEPATH, 'utf8', function (err, data) {
        var details = JSON.parse(data);
        var counter = 0;
        for (var farmer in details.farmers) {
            if (details.farmers[farmer].FEF === requestPrams.FEFid) {
                responce.farmers[counter++] = details.farmers[farmer];
            }
        }
        if(responce.farmers.length === 0){
          res.status(404).end();
        }
        res.send(responce).end();
    });
}

function specificFarmerDetails(requestPrams, res) {
    fs.readFile(FILEPATH, 'utf8', function (err, data) {
        var details = JSON.parse(data);
        var counter = 0;
        for (var farmer in details.farmers) {
            if (details.farmers[farmer].idProof === requestPrams.idProof || details.farmers[farmer].aadharCard === requestPrams.aadharCard) {
                responce.farmers[counter++] = details.farmers[farmer];
            }
        }
        if(responce.farmers.length === 0){
            res.status(404).end();
        }
        res.send(responce).end();
    });
}

function allFarmers(res) {
    fs.readFile(FILEPATH, 'utf8', function (err, data) {
        var details = JSON.parse(data);
        if(details.farmers.length === 0){
            res.status(404).end();
        }
        res.send(details).end();
    });
}

var farmerPresent = function (name, requestPrams) {
    for (var farmer in name.farmers) {
        if (name.farmers[farmer].idProof === requestPrams.idProof || name.farmers[farmer].aadharCard === requestPrams.aadharCard || name.farmers[farmer].landReg === requestPrams.landReg) {
            return true;
        }
    }
    return false;
};

function checkIfUserHAsAccess(details, requestPrams, res, name) {
    if(isRoleFEF(name, requestPrams.FEF)) {
        details.farmers[details.farmers.length] = requestPrams;

        fs.writeFile(FILEPATH, JSON.stringify(details), function (err) {
            if (err) {
                res.status(500).end();
            }
        });
        res.status(200).end();
    }
    res.status(401).end();
}

var userPresent = function (name, emailId) {
    for (var user in name.users) {
        if (name.users[user].emailId === emailId) {
            return true;
        }
    }
    return false;
};

var isRoleFEF = function (name, emailId) {
    for (var user in name.users) {
        if (name.users[user].emailId === emailId && name.users[user].role === "FEF") {
            return true;
        }
    }
    return false;
};

function checkIfFEFisRegistered(requestPrams, details, res) {
    fs.readFile(USERFILEPATH, 'utf8', function (err, data) {
        var name = JSON.parse(data);
        if (userPresent(name, requestPrams.FEF)) {
            checkIfUserHAsAccess(details, requestPrams, res, name);
        }
        res.status(400).end();
    });
}
module.exports = {
    addFarmer: function (req, res) {
        var requestPrams = req.body;
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
            var details = JSON.parse(data);
            if(farmerPresent(details, requestPrams)){
                res.status(409).end();
            }else {
                checkIfFEFisRegistered(requestPrams, details, res);
            }

        });
    },
    getFarmers: function(req, res){
        var requestPrams = req.body;
        if(requestPrams.FEFid){
            farmerDetailsRelatedToFEF(requestPrams, res);
        }else if(requestPrams.idProof || requestPrams.aadharCard){
            specificFarmerDetails(requestPrams, res);
        } else {
            allFarmers(res)
        }
    }
};