const mongoose=require("mongoose");

const CommentSchema = mongoose.Schema({
    text:String,
    author:String,
    upvote:[String],
    downvote:[String]
});



module.exports = mongoose.model('Comment', CommentSchema);
