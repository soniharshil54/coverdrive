const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Admin = require("../models/admin")
const jwt = require("jsonwebtoken")
const Order = require("../models/order")
const User = require("../models/user")

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
    console.log(req.body)
    console.log(req.body.email)
    Admin.findOne({email:req.body.email})
    .then(admin => {
        console.log(admin)
        if(!admin){
            return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"admin with this mail doesnt exist", status:403})
        }

        bcrypt.compare(req.body.password, admin.password, (err,result) => {
            if(err){
                return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"wrong password", status: 403})
            }
            if(result){
                const token = jwt.sign(

                    {
                        email: admin.email,
                        name: admin.name,
                        userId: admin._id
                    },
                    "soni3360",
                    {
                        expiresIn: '1h'
                    })

                    return res.status(200).header("Access-Control-Allow-Origin", "*").json({message: "auth successfull", token:token, admin: admin, status: 200})

            }

            res.status(401).header("Access-Control-Allow-Origin", "*").json({message: "wrong password", status:403})
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

exports.count_summary = async function(req, res){
    let usercount = await User.countDocuments()	
    let ordercount = await Order.countDocuments()	
    let salesamount = await Order.aggregate([{ $group: { _id: null, sum: { $sum: "$amount" } } }])
    console.log(salesamount)
    res.json({"user":usercount, "order":ordercount})
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

exports.change_password = function(req, res){
    Admin.findOne({_id:req.params.cid})
    .then(admin => {
        console.log(admin)
        console.log(req.body)
        bcrypt.compare(req.body.oldpassword, admin.password, (err,result) => {
            if(err){
                console.log(err)
                return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"old password is wrong", status:401})
            }
            else if(result){
                console.log(result)
                console.log("passmatched")
                bcrypt.hash(req.body.newpassword,10,(err,hash) => {
                    if(err){
                        return res.status(500).json({error:err})
                    }
                    else {
                        let reqBody = {
                            password : hash
                        }
                        Admin.findOneAndUpdate({_id:req.params.cid},reqBody, {useFindAndModify: false})
                        .then(result=> res.status(200).json({"result":"password updated","updatedpassword":result}))
                        .catch(err=>res.status(404).json(err))
                    }
                })
            }
            else {
                console.log("its in ekse")
                return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"old password is wrong", status:401})
            }
        })
    })
}