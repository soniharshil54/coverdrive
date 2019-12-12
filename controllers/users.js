const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")

exports.register_user = function(req, res) {
    const newUser = new User(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            contact: req.body.contact,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city
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

exports.get_user = async function(req, res){
    let user = await User.findOne({_id:req.params.uid})
    if(user){
        res.json(user)
        return
    }
    else{
        res.json({"error":"user not found"})
        return
    }
}

exports.get_all_users = function(req, res){
        User.find()
             .then(result=>res.json(result))
             .catch(err=>res.json(err))
}

exports.count_users = function(req, res){
    User.countDocuments()	
    .then(result=>res.json(result))
    .catch(err=>res.json(err))	
}

exports.delete_user = function(req, res){
    User.findOneAndRemove({_id:req.params.did})
    .then(result=> res.json({"result":"user deteted","deleteduser":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_user = function(req, res){
    User.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"user updated","updateduser":result}))
    .catch(err=>res.status(404).json(err))
}