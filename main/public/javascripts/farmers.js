var fs = require("fs");

module.exports = {
    addFarmer: function (req, res) {
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
    }
};