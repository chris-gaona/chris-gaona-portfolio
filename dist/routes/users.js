"use strict";var express=require("express");var router=express.Router();var mongoose=require("mongoose");var User=mongoose.model("User");var jwt=require("express-jwt");var auth=jwt({secret:"SECRET",userProperty:"payload"});router.get("/:username",auth,function(e,r,s){var o=e.params.username;User.findOne({username:o},"_id username firstName",function(e,o){if(e)return s(e);r.json(o)})});module.exports=router;