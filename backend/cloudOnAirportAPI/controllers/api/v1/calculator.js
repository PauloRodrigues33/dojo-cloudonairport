var gridGenerator = require('../../../helpers/gridGenerator');

module.exports = function (router) {
    router.post('/', function (req, res) {
        var days = gridGenerator.CalculateDaysFromGrid(req.body);
        res.send(days);
    });
};