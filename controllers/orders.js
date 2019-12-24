const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")
const Cartproduct = require("../models/cartproduct")
const ObjectId = mongoose.Types.ObjectId

exports.place_order = function(req, res) {
    var idsproducts = req.body.products;
    let user_id = mongoose.Types.ObjectId(req.body.user_id)
    var productincart = [];
    idsproducts.forEach(function(item){     
    productincart.push(new ObjectId(item));
    })
    const newOrder = new Order(
        {
            _id: new mongoose.Types.ObjectId(),
            products: productincart ,
            user_id: user_id,
            total_amount: req.body_total_amount,
            payment_type: req.body.payment_type
        }
    )
        newOrder.save()
        .then((result => {
            console.log(result)
            res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"order placed"})
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}



exports.add_product_to_cart = async function(req, res) {
    let cproid = mongoose.Types.ObjectId.createFromHexString(req.body.proid)
    const newCartproduct = new Cartproduct(
        {
            _id: cproid,
            product_name: req.body.product_name,
            cover_4d_id : req.body.cover_4d_id ? req.body.cover_4d_id : "na", 
            image: "noimage.png",
            cover_type: req.body.cover_type ? req.body.cover_type : "na",
            print_name : req.body.print_name ? req.body.print_name : "na",
            size: req.body.size ? req.body.size : "na",
            quantity : req.body.quantity ? req.body.quantity : 1
        }
    )
    let cartproduct = await newCartproduct.save()
    res.json({"cartproduct": cartproduct})
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