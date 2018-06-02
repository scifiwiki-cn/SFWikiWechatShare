var express = require('express');
var wechatRouter = require('./wechat');
var router = express.Router();

router.use('/wechat', wechatRouter);

module.exports = router;
