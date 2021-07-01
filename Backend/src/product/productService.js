'use strict'
//Imports
const productModel = require('./productModel');
const callBackResponse = require('../../services/callBackResponseService');
const rename = require('rename');

/**
 * upload media into the server
 */

module.exports.uploadImages = function (req, res, callBack) {
    var imagesNameArr = [];
    const images = req.files['image'];
    if (images.length == undefined) {
        var name = rename(images.name, function () {
            return { suffix: '-' + Date.now() };
        });

        images.mv('./uploads/' + name, function (err, result) {
            if (err) {
                callBack(callBackResponse.callbackWithfalseMessage("Error"));

            } else {
                imagesNameArr.push(name);
                callBack(callBackResponse.callbackWithData(imagesNameArr));
            }
        })
    } else {
        var count = 0;
        images.forEach(element => {
            var name = rename(element.name, function () {
                return { suffix: '-' + Date.now() };
            });
            element.mv('./uploads/' + name, function (err, result) {
                count++;
                if (err) {
                    callBack(callBackResponse.callbackWithfalseMessage("Error"));
                } else {
                    imagesNameArr.push(name);
                    if (count == images.length) {
                        callBack(callBackResponse.callbackWithData(imagesNameArr));
                    }
                }
            });
        });

    }
}



module.exports.newProduct = function (body, res, callBack) {
    body.status = "open_bit";
    productModel.create(body, function (err, newProduct) {
        if (err) {
            callBack(callBackResponse.callbackWithDefaultError(err));
        }
        else if (newProduct == null || newProduct == undefined) {
            callBack(callBackResponse.callbackWithfalseMessage('Product creation unsuccessful'));
        }
        else {
            callBack(callBackResponse.callbackWithSucessMessage('Product creation successful'));
        }
    });
}


module.exports.getProductBySeller = function (body, res, callBack) {
    productModel.find({ seller: body.seller })
        .populate('max_bid')
        .populate('sold_bid')
        .sort({ 'updatedAt': -1 })
        .exec(function (error, products) {
            if (error) {
                callBack(callBackResponse.callbackWithDefaultError(error));
            }
            else if (products == null || products == undefined) {
                callBack(callBackResponse.callbackWithfalseMessage("No products registered yet"));
            } else {
                callBack(callBackResponse.callbackWithData(products));
            }
        });
}


module.exports.getAllProducts = function (body, res, callBack) {
    productModel.find({})
        .populate('max_bid')
        .populate('sold_bid')
        .sort({ 'updatedAt': -1 })
        .exec(function (error, products) {
            if (error) {
                console.log(error);
                callBack(callBackResponse.callbackWithDefaultError(error));
            }
            else if (products == null || products == undefined) {
                callBack(callBackResponse.callbackWithfalseMessage("No products yet"));
            } else {
                callBack(callBackResponse.callbackWithData(products));
            }
        });
}