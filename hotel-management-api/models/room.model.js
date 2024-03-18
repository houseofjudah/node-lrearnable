
const mongoose = require('mongoose');
const RoomType = require('./roomType.model');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Room', roomSchema);