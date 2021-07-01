'use strict'
//Imports
const bidModel = require('./bidModel');
const productModel = require('../product/productModel');
const callBackResponse = require('../../services/callBackResponseService');


module.exports.newBid = function (body, res, callBack) {
    body.isSold = false;
    body.isPayed = false;
    productModel.findOne({ _id: body.product })
        .exec(function (err, product) {
            if (err) {
                callBack(callBackResponse.callbackWithDefaultError(err));
            }
            else if (product == null || product == undefined) {
                callBack(callBackResponse.callbackWithfalseMessage('Bid place unsuccessful. Can not find the product'));
            }
            else {
                bidModel.create(body, function (err, bid) {
                    if (err) {
                        callBack(callBackResponse.callbackWithDefaultError(err));
                    }
                    else if (bid == null || bid == undefined) {
                        callBack(callBackResponse.callbackWithfalseMessage('Bid place unsuccessful'));
                    }
                    else {
                        if (product.max_bid != null && product.max_bid != undefined) {
                            bidModel.findOne({ _id: product.max_bid })
                                .exec(function (err, maxBid) {
                                    if (err) {
                                        console.log(err);
                                        callBack(callBackResponse.callbackWithDefaultError(err));
                                    }
                                    else if (maxBid == null || maxBid == undefined) {
                                        callBack(callBackResponse.callbackWithfalseMessage('Bid place unsuccessful. Can not find the max bid'));
                                    } else {
                                        if (maxBid.price < body.price) {
                                            productModel.updateOne({ _id: body.product }, { max_bid: bid._id }, function (err, product) {
                                                if (err) {
                                                    callBack(callBackResponse.callbackWithDefaultError(err));
                                                }
                                                else if (product == null || product == undefined) {
                                                    callBack(callBackResponse.callbackWithfalseMessage('Bid place unsuccessful. Can not find the product'));
                                                }
                                                else {
                                                    callBack(callBackResponse.callbackWithSucessMessage('Your bid placed successful'));
                                                }
                                            });
                                        } else {
                                            callBack(callBackResponse.callbackWithSucessMessage('Your bid placed successful'));
                                        }
                                    }
                                });
                        } else {
                            productModel.updateOne({ _id: body.product }, { max_bid: bid._id }, function (err, product) {
                                if (err) {
                                    callBack(callBackResponse.callbackWithDefaultError(err));
                                }
                                else if (product == null || product == undefined) {
                                    callBack(callBackResponse.callbackWithfalseMessage('Bid place unsuccessful. Can not find the product'));
                                }
                                else {
                                    callBack(callBackResponse.callbackWithSucessMessage('Your bid placed successful'));
                                }
                            });
                        }
                    }
                });

            }
        });
}



module.exports.getBidByBuyer = function (body, res, callBack) {
    bidModel.find({ buyer: body.buyer })
        .populate('seller')
        .populate('product')
        .sort({ 'updatedAt': -1 })
        .exec(function (error, bid) {
            if (error) {
                callBack(callBackResponse.callbackWithDefaultError(error));
            }
            else if (bid == null || bid == undefined) {
                callBack(callBackResponse.callbackWithfalseMessage("No bid yet"));
            } else {
                callBack(callBackResponse.callbackWithData(bid));
            }
        });
}


module.exports.getBidBySellerAndProduct = function (body, res, callBack) {
    bidModel.find({ seller: body.seller, product: body.product })
        .populate('buyer')
        .sort({ 'price': -1 })
        .exec(function (error, bid) {
            if (error) {
                callBack(callBackResponse.callbackWithDefaultError(error));
            }
            else if (bid == null || bid == undefined) {
                callBack(callBackResponse.callbackWithfalseMessage("No bid yet for the product"));
            } else {
                callBack(callBackResponse.callbackWithData(bid));
            }
        });
}



module.exports.closeBid = function (body, res, callBack) {
    bidModel.updateOne({ _id: body.bid_id }, { isSold: true })
        .exec(function (error, bid) {
            if (error) {
                callBack(callBackResponse.callbackWithDefaultError(error));
            }
            else if (bid == null || bid == undefined) {
                callBack(callBackResponse.callbackWithfalseMessage("Something when wrong!"));
            } else {
                productModel.updateOne({ _id: body.product }, { status: "close_bit", sold_bid: body.bid_id })
                    .exec(function (error, product) {
                        if (error) {
                            callBack(callBackResponse.callbackWithDefaultError(error));
                        }
                        else if (product == null || product == undefined) {
                            callBack(callBackResponse.callbackWithfalseMessage("Something when wrong!"));
                        } else {
                            console.log("Doneeeee");
                            console.log(product);
                            callBack(callBackResponse.callbackWithSucessMessage("Bid close successfully"));
                        }
                    });
            }
        });
}



module.exports.payForBid = function (body, res, callBack) {
    bidModel.updateOne({ _id: body.bid_id }, { isPayed: true })
        .exec(function (error, bid) {
            if (error) {
                callBack(callBackResponse.callbackWithDefaultError(error));
            }
            else if (bid == null || bid == undefined) {
                callBack(callBackResponse.callbackWithfalseMessage("Something when wrong!"));
            } else {
                callBack(callBackResponse.callbackWithSucessMessage("Payment success"));
            }
        });
}
