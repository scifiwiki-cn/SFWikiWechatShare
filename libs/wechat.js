var https = require('https');

exports.fetch_access_token = function (callback) {
    var target = "https://api.weixin.qq.com/cgi-bin/token";
    target += "?appid=" + config.wechat.appid;
    target += "&secret=" + config.wechat.secret;
    target += "&grant_type=client_credential";
    https.get(target, function(req, res){
        var result = '';
        req.on('data',function(data){
            result += data;
        });
        req.on('end',function(){
            result = JSON.parse(result);
            if (result.access_token) {
                callback(null, result.access_token);
            }
            else {
                callback(new Error("网络异常，请稍候再试"));
            }
        });
    });
};

exports.fetch_api_ticket = function (access_token, callback) {
    var target = "https://api.weixin.qq.com/cgi-bin/ticket/getticket";
    target += "?access_token=" + access_token;
    target += "&type=jsapi";
    console.log(target);
    https.get(target, function(req, res){
        var result = '';
        req.on('data',function(data){
            result += data;
        });
        req.on('end',function(){
            console.log(result);
            result = JSON.parse(result);
            if (result.ticket) {
                callback(null, result.ticket);
            }
            else {
                callback(new Error("网络异常，请稍候再试"));
            }
        });
    });
};
