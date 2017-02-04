var fs = require("fs");
const FILEPATH = "../resources/faq.json";

module.exports = {
    faqs: function (req, res) {
        var requestPrams = req.body;
        fs.readFile(FILEPATH, 'utf8', function (err, data) {
            var name = JSON.parse(data);
            res.send(name);           
        });
    }
};