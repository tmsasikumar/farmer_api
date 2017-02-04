var fs = require("fs");
const FILEPATH = "../resources/status.json";

module.exports = {
    getStatus: function (req, res) {
        var requestPrams = req.body.farmerId;
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
            var statuses = JSON.parse(data);
            for (var status in statuses.payment) {
                if (statuses.payment[status].userID === requestPrams) {
                    var response = {
                        "status": statuses.payment[status].paymentStatus
                    };
                    res.send(response);
                }
            }
            var response = {
                "paymentStatus": "0",
                "farmerid": requestPrams
            };
            res.send(response);
        });
    },
    add: function(farmerid, res){
        var requestPrams = {
            "paymentStatus": "0",
            "farmerid": farmerid
        };
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
            var status = JSON.parse(data);
                status.payment[status.payment.length] = requestPrams;

                fs.writeFile(FILEPATH, JSON.stringify(status), function (err) {});
        });
    },
    update: function(farmerid){
        var requestPrams = {
            "paymentStatus": "1",
            "farmerid": farmerid
        };
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
            var statuses = JSON.parse(data);
            var farmerPresent = false;
            for (var status in statuses.payment) {
                if (statuses.payment[status].farmerId === farmerid) {
                    farmerPresent = true;
                    statuses.payment[status].paymentStatus = "1";
                }
            }
            if(!farmerPresent){
                var requestPrams = {
                    "paymentStatus": "1",
                    "farmerid": farmerid
                };
                statuses.payment[status.payment.length] = requestPrams;
            }

            fs.writeFile(FILEPATH, JSON.stringify(statuses), function (err) {});
        });
    }
};