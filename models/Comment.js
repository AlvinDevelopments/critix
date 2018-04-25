var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    rating: Number,
    comment_id: String,
    comment: String,
    author: String,
    post_id: String,
    time: Date
});

var Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;
