const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user Schema 
const UserSchema = new Schema({
  seller: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  buyer: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  },
  price: {
    type: Number,
    required: true
  },
  isSold: {
    type: Boolean,
    required: true
  },
  isPayed: {
    type: Boolean,
    required: true
  },
}, { timestamps: true, strict: false });


module.exports = mongoose.model('Bid', UserSchema);
