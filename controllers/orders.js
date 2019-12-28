const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")
const Order = require("../models/order")
const Cartproduct = require("../models/cartproduct")
const ObjectId = mongoose.Types.ObjectId


exports.get_orders_with_data = async function(req, res){
    let orders = await Order.find().populate('products').populate("user_id")
    if(orders){
        res.json(orders)
        return
    }
    else{
        res.json({"error":"order not found"})
        return
    }
}

exports.get_orders = async function(req, res){
    let orders = await Order.find()
    if(orders){
        res.json(orders)
        return
    }
    else{
        res.json({"error":"order not found"})
        return
    }
}

exports.get_order_by_id = async function(req, res){
    let order = await Order.findOne({_id:req.params.orderid}).populate('products').populate("user_id")
    if(order){
        res.json(order)
        return
    }
    else{
        res.json({"error":"order not found"})
        return
    }
}

exports.get_cartproduct_by_id = async function(req, res){
    let cartproduct = await Cartproduct.findOne({_id:req.params.cpid})
    if(cartproduct){
        res.json(cartproduct)
        return
    }
    else{
        res.json({"error":"order not found"})
        return
    }
}

exports.get_all_cartproducts = async function(req, res){
    let cartproduct = await Cartproduct.find()
    if(cartproduct){
        res.json(cartproduct)
        return
    }
    else{
        res.json({"error":"order not found"})
        return
    }
}

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
            order_id: generateorderid,
            products: productincart ,
            user_id: user_id,
            total_amount: req.body_total_amount,
            payment_type: req.body.payment_type
        }
    )
        newOrder.save()
        .then((result => {
            console.log(result)
            res.status(201).header("Access-Control-Allow-Origin", "*").json({order:result})
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}

function generateorderid(){
    let orderid = Math.floor(1000 + Math.random() * 9000);
    let norderid = "OR"+orderid.toString()
    return norderid
}


exports.delete_orders = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var ordersDelete = [];
    idsArrayf.forEach(function(item){     
    ordersDelete.push(new ObjectId(item));
});

Order.deleteMany({'_id':{'$in': ordersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.change_order_status = function(req, res){
    Order.findOneAndUpdate({_id:req.params.oid},req.body)
    .then(result=> res.json({"result":"order status updated","updatedorder":result}))
    .catch(err=>res.status(404).json(err))
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