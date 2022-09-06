const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const likeSchema = new Schema({
  authorId: String,
  postId: String,
  time: Date,
});

// Create the model class
const ModelClass = mongoose.model('like', likeSchema);

// Export the model
module.exports = ModelClass;