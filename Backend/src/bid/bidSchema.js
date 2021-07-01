//import validator class
const joi = require('joi');

//product bid Schema and validations to be done 
module.exports.newBid = joi.object().keys({
    seller: joi.string().min(24).max(24).required(),
    buyer: joi.string().min(24).max(24).required(),
    product: joi.string().min(24).max(24).required(),
    price: joi.number().required(),
});


module.exports.byBuyer = joi.object().keys({
    buyer: joi.string().min(24).max(24).required(),
});


module.exports.bySellerProduct = joi.object().keys({
    seller: joi.string().min(24).max(24).required(),
    product: joi.string().min(24).max(24).required(),
});

module.exports.closeBid = joi.object().keys({
    product: joi.string().min(24).max(24).required(),
    bid_id: joi.string().min(24).max(24).required(),
});

module.exports.payForBid = joi.object().keys({
    bid_id: joi.string().min(24).max(24).required(),
});
