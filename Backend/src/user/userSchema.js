//import validator class
const joi = require('joi');

//user login Schema and validations to be done 
module.exports.login = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(1).max(30).required(),
    type: joi.string().required()
});

//admin registration Schema and validations to be done 
module.exports.newUser = joi.object().keys({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    address: joi.any().required(),
    phone: joi.number().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    type: joi.string().required()
});
