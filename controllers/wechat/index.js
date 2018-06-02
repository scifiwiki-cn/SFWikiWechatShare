var crypto = require('crypto');

exports.index = function (req, res, next) {
    var ticket = req.ticket;
    var url = decodeURI(req.query.url);
    var nonce = (function (length) {
        var alphabet = "qwertyuiopasdfghjklxzcvbnm1234567890";
        var result = [];
        for(var i = 0; i < length; i++) {
            result.push(alphabet.charAt(Math.floor(Math.random() * (alphabet.length - 1))));
        }
        return result.join("");
    })(12);
    var timestamp = Date.now() / 1000;
    var array = [{
        key: "noncestr",
        value: nonce
    }, {
        key: "jsapi_ticket",
        value: ticket
    }, {
        key: "timestamp",
        value: timestamp
    }, {
        key: "url",
        value: url
    }];
    array.sort(function (item1, item2) {
        return item1.value.toString() < item2.value.toString();
    });
    var result = "";
    array.forEach(function (item) {
        if (result !== "") {
            result += "&";
        }
        result += item.key + "=" + item.value;
    });
    var sha1 = crypto.createHash('sha1');
    sha1.update(result);
    return res.json({
        nonce: nonce,
        timestamp: timestamp,
        ticket: ticket,
        signature: sha1.digest('hex')
    });
};