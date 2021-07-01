'use strict'
//Imports
const modelUser = require('./userModel');
const callBackResponse = require('../../services/callBackResponseService');


module.exports.newUser = function (body, res, callBack) {

    //check if email already exist with user type
    modelUser.findOne({ email: body.email, type: body.type }, function (error, userRet) {
        if (error) {
            callBack(callBackResponse.callbackWithDefaultError(error));
        }
        else if (userRet != null || userRet != undefined) {
            callBack(callBackResponse.callbackWithfalseMessage('Email address already exist'));
        }
        else {
            modelUser.create(body, function (err, newuser) {
                if (err) {
                    callBack(callBackResponse.callbackWithDefaultError(err));
                }
                else if (newuser == null || newuser == undefined) {
                    callBack(callBackResponse.callbackWithfalseMessage('Account creation unsuccessful'));
                }
                else {
                    callBack(callBackResponse.callbackWithSucessMessage('Account creation successful'));
                }
            });
        }
    });
}



module.exports.login = function (body, res, callBack) {
    modelUser.findOne({ email: body.email, type: body.type, password: body.password }).exec(function (error, userRet) {
        if (error) {
            callBack(callBackResponse.callbackWithDefaultError(error));
        }
        else if (userRet == null || userRet == undefined) {
            callBack(callBackResponse.callbackWithfalseMessage("Email or password is incorrect"));
        } else {
            callBack(callBackResponse.callbackWithData(userRet));
        }
    });
}


