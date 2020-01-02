const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")
const Order = require("../models/order")
const Cartproduct = require("../models/cartproduct")
const Modelrequest = require("../models/modelrequest")
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

exports.get_modelrequests = async function(req, res){
    let modelreqs = await Modelrequest.find().populate("user_id")
    if(modelreqs){
        res.json(modelreqs)
        return
    }
    else{
        res.json({"error":"model requests not found"})
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

exports.get_orders_by_contact = async function(req, res){
    let users = await User.find({contact: req.params.contact}).select("_id")
    let useridarray = users.map(a => {
        let onlyid = a._id
        return onlyid
    })
    var idsArrayf = useridarray;
    var usersSelected = [];
    idsArrayf.forEach(function(item){     
    usersSelected.push(new ObjectId(item));
});
// console.log(usersSelected)
    let ordersbycon = await Order.find({'user_id':{'$in': usersSelected}})
    // console.log(ordersbycon)
    res.json(ordersbycon)
}

async function getorderbycon(contact){
    console.log("it ran")
    let users = await User.find({contact:contact})
    
    console.log(users)
    return users
}

// getorderbycon("9789876578").then(result => console.log(result)).catch(e => console.log(e))



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
            order_id: generateorderid(),
            products: productincart ,
            user_id: user_id,
            gst_tax: req.body.gst_tax,
            shipping: req.body.shipping,
            sub_total:req.body.subtotal,
            amount: req.body.amount,
            order_status: "Pending",
            payment_type: req.body.payment_type
        }
    )
        newOrder.save()
        .then((result => {
            console.log(result)
            res.status(200).header("Access-Control-Allow-Origin", "*").json({order:result})
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}


exports.place_model_request = function(req, res) {
    let modelbody = {
        _id: new mongoose.Types.ObjectId(),
        model_name: req.body.model_name
    }
    if(req.body.user_id !== ""){
        let user_id = mongoose.Types.ObjectId(req.body.user_id)
        modelbody.user_id = user_id
    }
    const newModelrequest = new Modelrequest(modelbody)
    newModelrequest.save()
        .then((result => {
            console.log(result)
            res.status(200).header("Access-Control-Allow-Origin", "*").json({modelrequest:result})
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
    console.log(req.params.oid)
    console.log(req.body)
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