var express = require('express');
var wechatController = require('../../controllers').wechat;
var authentication = require('../../middlewares').authentication;
var router = express.Router();

/**
 * 微信认证相关
 */

router.get('/', authentication.fetch_access_token, authentication.fetch_ticket, wechatController.index);

module.exports = router;
