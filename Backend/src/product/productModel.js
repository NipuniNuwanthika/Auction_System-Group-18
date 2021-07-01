const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user Schema 
const UserSchema = new Schema({
  seller: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  max_bid: {
    type: Schema.ObjectId,
    ref: 'Bid',
  },
  sold_bid: {
    type: Schema.ObjectId,
    ref: 'Bid',
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  default_image: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { timestamps: true, strict: false });


module.exports = mongoose.model('Product', UserSchema);
