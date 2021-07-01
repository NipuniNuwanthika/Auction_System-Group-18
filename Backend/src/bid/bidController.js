'use strict'
//Import Required Models
const bidService = require('./bidService');
const response = require('../../services/responseService');


module.exports.newBid = function (req, res) {
    bidService.newBid(req.body, res, function (data) {
        if (data.status) {
            return response.successWithMessage(data.data, res, data.total)
        } else {
            return response.customError(data.data, res);
        }
    });
}


  module.exports.getBidByBuyer = function (req, res) {
    bidService.getBidByBuyer(req.body, res, function (data) {
        if (data.status) {
            return response.successWithData(data.data, res, data.total)
        } else {
            return response.customError(data.data, res);
        }
    });
}


/**
 * get bid by seller id and product id
  @param {} req expression
  @param {} res 
 */
  module.exports.getBidBySellerAndProduct = function (req, res) {
    bidService.getBidBySellerAndProduct(req.body, res, function (data) {
        if (data.status) {
            return response.successWithData(data.data, res, data.total)
        } else {
            return response.customError(data.data, res);
        }
    });
}

/**
 * close bid
  @param {} req expression
  @param {} res 
 */
  module.exports.closeBid = function (req, res) {
    bidService.closeBid(req.body, res, function (data) {
        if (data.status) {
            return response.successWithMessage(data.data, res, data.total)
        } else {
            return response.customError(data.data, res);
        }
    });
}


/**
 * pya for bid
  @param {} req expression
  @param {} res 
 */
  module.exports.payForBid = function (req, res) {
    bidService.payForBid(req.body, res, function (data) {
        if (data.status) {
            return response.successWithMessage(data.data, res, data.total)
        } else {
            return response.customError(data.data, res);
        }
    });
}

