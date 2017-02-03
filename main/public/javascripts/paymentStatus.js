var fs = require("fs");
const FILEPATH = "../resources/status.json";

module.exports = {
    getStatus: function (req, res) {
        var requestPrams = req.body.aadharCard;
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
            res.status(404).end();
        });
    },
    add: function(aadharCard, res){
        var requestPrams = {
            "paymentStatus": "0",
            "userID": aadharCard
        };
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
            var status = JSON.parse(data);
                status.payment[status.payment.length] = requestPrams;

                fs.writeFile(FILEPATH, JSON.stringify(status), function (err) {});
        });
    }
};