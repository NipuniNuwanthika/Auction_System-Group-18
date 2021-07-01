'use strict'
//Import Express
const express = require('express');
//user router
const router = express.Router();
//Import body parser
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.json());


//import controllers
const userController = require('../src/user/userController');
const productController = require('../src/product/productController');
const bidController = require('../src/bid/bidController');

//import Validator class
const validator = require('../validators/validator');

//import validator Schemas 
const userSchema = require('../src/user/userSchema');
const productSchema = require('../src/product/productSchema');
const bidSchema = require('../src/bid/bidSchema');


//user routes
router.route('/api/user').post(validator.validateBody(userSchema.newUser), userController.newUser);
router.route('/api/user/login').post(validator.validateBody(userSchema.login), userController.login);

// media upload routes
router.route('/api/images/upload').post(productController.uploadImages);

// product routes
router.route('/api/product').post(validator.validateBody(productSchema.newProduct), productController.newProduct);
router.route('/api/product/get-by-seller').post(validator.validateBody(productSchema.getBySeller), productController.getProductBySeller);
router.route('/api/product/get-all').get(productController.getAllProducts);

// product bid routes
router.route('/api/bid').post(validator.validateBody(bidSchema.newBid), bidController.newBid);
router.route('/api/bid/get-by-buyer').post(validator.validateBody(bidSchema.byBuyer), bidController.getBidByBuyer);
router.route('/api/bid/get-by-seller-product').post(validator.validateBody(bidSchema.bySellerProduct), bidController.getBidBySellerAndProduct);
router.route('/api/bid/close').post(validator.validateBody(bidSchema.closeBid), bidController.closeBid);
router.route('/api/bid/pay-for-bid').post(validator.validateBody(bidSchema.payForBid), bidController.payForBid);

module.exports = router;