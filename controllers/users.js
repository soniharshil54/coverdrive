const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")

exports.register_user = function(req, res) {
    const newUser = new User(
        {
            _id: new mongoose.Types.ObjectId(),
            name: "john doe",
            email: "john@yahoo.com",
            dob: "30-07-1998",
            contact: "8686868686",
            address: "vraj street",
            state: "gujarat",
            city: "surat"
        }
    )
        newUser.save()
        .then((result => {
            console.log(result)
            res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"user created"})
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}

exports.get_user = function(req, res){
    User.findOne({_id:req.params.uid})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_users = function(req, res){
    app.get("/get",(req,res,next) => {
        Users.find()
             .then(result=>res.json(result))
             .catch(err=>res.json(err))
    
        Users.countDocuments()	
              .then(result=>console.log(result))
              .catch(err=>console.log(err))	 
    
    })
}