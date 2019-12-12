const express = require("express")
const mongoose = require("mongoose")
const Admin = require("../models/admin")

exports.register_admin = function(req, res) {
    Admin.find({email: req.body.email})
        .exec()
        .then(admin => {
            if(admin.length>=1){
                return res.status(500).header("Access-Control-Allow-Origin", "*").json({message:"mail already exists"})
            }
            else {
                bcrypt.hash(req.body.password,10,(err,hash) => {
                    if(err){
                        return res.status(500).json({error:err})
                    }
                    else {
                        //var profile = req.file?req.file.path:"profileUploads/noprofile.png"
                        const newAdmin = new User(
                            {
                                _id: new mongoose.Types.ObjectId(),
                                name: req.body.name,
                                email: req.body.email,
                                contact: req.body.contact,
                                password:hash
                            }
                        )
                    
                        newAdmin.save()
                                .then((result => {
                                    console.log(result)
                                    res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"user created"})
                                }))
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
                                })
                    }
                })
            }
        })
}

exports.get_admin = function(req, res){
    Admin.findOne({_id:req.params.aid})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_admins = function(req, res){
        Users.find()
             .then(result=>res.json(result))
             .catch(err=>res.json(err))
    
        Users.countDocuments()	
              .then(result=>console.log(result))
              .catch(err=>console.log(err))	 
}