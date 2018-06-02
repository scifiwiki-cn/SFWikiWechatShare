
exports.index = function (req, res, next) {
    var ticket = req.ticket;
    return res.json(ticket);
};