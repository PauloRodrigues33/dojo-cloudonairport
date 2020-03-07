'use strict';

module.exports = function (router) {

    router.get('/', function (req, res) {
        res.send('<div>Servidor Online</div>');
    });

};
