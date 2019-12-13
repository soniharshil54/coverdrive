const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Admin = require("../models/admin")
const jwt = require("jsonwebtoken")

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
                        const newAdmin = new Admin(
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
                                    res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"admin created"})
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

exports.login_admin = function(req, res){
    console.log(req.body.email)
    Admin.find({email:req.body.email})
    .exec()
    .then(admin => {
        console.log(admin)
        if(admin.length < 1){
            return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"admin with this mail doesnt exist"})
        }

        bcrypt.compare(req.body.password, admin[0].password, (err,result) => {
            if(err){
                return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"wrong password"})
            }
            if(result){
                const token = jwt.sign(

                    {
                        email: admin[0].email,
                        name: admin[0].name,
                        userId: admin[0]._id
                    },
                    "soni3360",
                    {
                        expiresIn: '1h'
                    })

                    return res.status(200).header("Access-Control-Allow-Origin", "*").json({message: "auth successfull", token:token, admin: admin})

            }

            res.status(401).header("Access-Control-Allow-Origin", "*").json({message: "wrong password"})
        })



    })
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({
            error: err
        })
    })
}

exports.count_admins = function(req, res){
    Admin.countDocuments()	
    .then(result=>res.json(result))
    .catch(err=>res.json(err))	
}

exports.delete_admin = function(req, res){
    Admin.findOneAndRemove({_id:req.params.did})
    .then(result=> res.json({"result":"admin deteted","deletedadmin":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_admin = function(req, res){
    Admin.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"admin updated","updatedadmin":result}))
    .catch(err=>res.status(404).json(err))
}