
var wechatLibs = require('../libs').wechat;

exports.fetch_access_token = function (req, res, next) {
    return global.redisClient.get("wechat", function (err, value) {
        if (value !== null && Date.now() - JSON.parse(value).last < 3600000) {
            req.wechat = JSON.parse(value);
            return next();
        }
        else {
            return wechatLibs.fetch_access_token(function (err, access_token) {
                if (err) {
                    throw err;
                }
                req.wechat = {
                    access_token: access_token,
                    last: Date.now()
                };
                global.redisClient.set("wechat", JSON.stringify(req.wechat));
                return next();
            });
        }
    });
};

exports.fetch_ticket = function (req, res, next) {
    return global.redisClient.get("ticket", function (err, value) {
        if (value !== null && Date.now() - JSON.parse(value).last < 3600000) {
            req.ticket = JSON.parse(value);
            return next();
        }
        else {
            return wechatLibs.fetch_api_ticket(req.wechat.access_token, function (err, ticket) {
                if (err) {
                    throw err;
                }
                req.ticket = {
                    ticket: ticket,
                    last: Date.now()
                };
                global.redisClient.set("ticket", JSON.stringify(req.ticket));
                return next();
            });
        }
    });
};
