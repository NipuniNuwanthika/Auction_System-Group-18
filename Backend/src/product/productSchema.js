//import validator class
const joi = require('joi');

//product Schema and validations to be done 
module.exports.newProduct = joi.object().keys({
    seller: joi.string().min(24).max(24).required(),
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    default_image: joi.number().required(),
    images: joi.array().required()
});

module.exports.getBySeller = joi.object().keys({
    seller: joi.string().min(24).max(24).required(),
});