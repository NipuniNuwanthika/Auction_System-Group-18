'use strict'
//Import Required Models
const productService = require('./productService');
const response = require('../../services/responseService');


module.exports.uploadImages = function (req, res) {
    productService.uploadImages(req, res, function (data) {
        if (data.status) {
            return response.successWithData(data.data, res, data.total)
        } else {
            return response.customError(data.data, res);
        }
    });
}



module.exports.newProduct = function (req, res) {
    productService.newProduct(req.body, res, function (user) {
        if (user.status) {
            return response.successWithMessage(user.data, res)
        } else {
            return response.customError(user.data, res);
        }
    });
}


module.exports.getProductBySeller = function (req, res) {
    productService.getProductBySeller(req.body, res, function (user) {
        if (user.status) {
            return response.successWithData(user.data, res)
        } else {
            return response.customError(user.data, res);
        }
    });
}


 module.exports.getAllProducts = function (req, res) {
    productService.getAllProducts(req.body, res, function (user) {
        if (user.status) {
            return response.successWithData(user.data, res)
        } else {
            return response.customError(user.data, res);
        }
    });
}
