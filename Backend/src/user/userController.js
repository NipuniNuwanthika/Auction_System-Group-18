'use strict'
//Import Required Models
const userService = require('./userService');
const response = require('../../services/responseService');


module.exports.newUser = function (req, res) {
    userService.newUser(req.body, res, function (user) {
        if (user.status) {
            return response.successWithMessage(user.data, res)
        } else {
            return response.customError(user.data, res);
        }
    });
}


module.exports.login = function (req, res) {
    userService.login(req.body, res, function (data) {
        if (data.status) {
            return response.successTokenWithData(data.data, res);
        } else {
            return response.customError(data.data, res);
        }
    });
}