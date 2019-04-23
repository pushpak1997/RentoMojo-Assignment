const mongoose=require("mongoose");

const CommentSchema = mongoose.Schema({
    text:String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    upvote:[String],
    downvote:[String]
});



module.exports = mongoose.model('Comment', CommentSchema);
