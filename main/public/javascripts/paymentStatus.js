var fs = require("fs");
const FILEPATH = "../resources/status.json";

module.exports = {
    getStatus: function (req, res) {
        var response = {
            "paymentStatus": "0"
        };
        var requestPrams = req.body.farmerId;
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
            var statuses = JSON.parse(data);
            for (var status in statuses.payment) {
                if (statuses.payment[status].farmerId === requestPrams) {
                    response = {
                        "paymentStatus": statuses.payment[status].paymentStatus
                    };
                }
            }
            res.send(response).end();
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
    update: function(farmerId, res){
        var requestPrams = {
            "paymentStatus": "1",
            "farmerId": farmerId
        };
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
            var statuses = JSON.parse(data);
            var farmerPresent = false;
            for (var status in statuses.payment) {
                if (statuses.payment[status].farmerId === farmerId) {
                    farmerPresent = true;
                    statuses.payment[status].paymentStatus = "1";
                }
            }
            if(!farmerPresent){
                var requestPramsForNonStatusUser = {
                    "paymentStatus": "1",
                    "farmerId": farmerId
                };
                statuses.payment[statuses.payment.length] = requestPramsForNonStatusUser;
            }

            fs.writeFile(FILEPATH, JSON.stringify(statuses), function (err) {});

            res.send(requestPrams).end();
        });
    }
};