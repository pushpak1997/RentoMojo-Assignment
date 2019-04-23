const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Comment = require('../models/comment');

router.get("/",function(req,res){

    Comment.find({},function(err,allComments){
        if(err){
            console.log(err);
        } else{
            res.json(allComments);
        }
    });
});


router.post("/",function(req,res){
    console.log("post comment ",req.body);
    var text =req.body.text;
    var author= req.body.author;
    var newComment= {text:text,author:author};
    Comment.create(newComment,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            res.json(newlyCreated);
        }
    });
});

router.put("/upvote/:comment_id",function(req,res){
    var id = req.params.comment_id;
    var user_id=req.body.id;
    Comment.findOne({_id:id}).then(function (doc){
        // console.log("results are ",doc);
        console.log("update api called ",doc);
        if(!doc.upvote){
            doc.upvote = [user_id];
            console.log(doc.upvote);
            // return doc.upvote;
        }
        else if(doc.upvote.includes(user_id)){
            console.log("upvotes contain already ",doc.upvote);

            // doc.upvote.push(user_id);
        }
        else{
            doc.upvote.push(user_id);
        }

        var newupvote={upvote:doc.upvote};
        Comment.findByIdAndUpdate(req.params.comment_id, newupvote, {new: true},function(err,updatedComment){
            if(err){
                res.redirect("back");
            } else{
                res.status(200).json({staus: true});
            }
        });

    })

});

router.put("/downvote/:comment_id",function(req,res){
    var id = req.params.comment_id;
    var user_id=req.body.id;
    Comment.findOne({_id:id}).then(function (doc){
        // console.log("results are ",doc);
        console.log("downvote api called ",doc);
        if(!doc.downvote){
            doc.downvote = [user_id];
            console.log(doc.downvote);
            // return doc.upvote;
        }
        else if(doc.downvote.includes(user_id)){
            console.log("downvotes contain already ",doc.downvote);
            // doc.downvote.push(user_id);
        }
        else{
            doc.downvote.push(user_id);
        }

        var newdownvote={downvote:doc.downvote};
        Comment.findByIdAndUpdate(req.params.comment_id, newdownvote, {new: true},function(err,updatedComment){
            if(err){
                res.redirect("back");
            } else{
                res.status(200).json({staus: true , });
            }
        });

    })

});



module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

