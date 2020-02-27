const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")
const Order = require("../models/order")
const Cartproduct = require("../models/cartproduct")
const Pincode = require("../models/pincode")
const Ordercounter = require("../models/ordercounter")
const Modelrequest = require("../models/modelrequest")
const ObjectId = mongoose.Types.ObjectId
const mail_controller = require("./mailsystems")
const notification_controller = require("./notifications")




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

exports.get_orders_with_data_optimized = async function(req, res){
    let orders = await Order.find().select('_id order_id amount date_ordered order_status').populate('products','_id product_name').populate("user_id","_id contact first_name last_name")
    if(orders){
        res.json(orders)
        return
    }
    else{
        res.json({"error":"order not found"})
        return
    }
}

exports.get_active_orders_with_data_optimized = async function(req, res){
    let orders = await Order.find({active : 1}).select('_id active order_id amount date_ordered order_status').populate('products','_id product_name').populate("user_id","_id contact first_name last_name")
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

exports.get_active_orders = async function(req, res){
    let orders = await Order.find({active:1})
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

exports.get_order_by_custom_id = async function(req, res){
    let order = await Order.findOne({order_id:req.params.corderid}).populate('products').populate("user_id")
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
    let ordersbycon = await Order.find({'user_id':{'$in': usersSelected}}).sort({date_ordered: -1})
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

async function get_next_order_id(){
    let newoid = await Ordercounter.findOneAndUpdate({ _id: 'orderid'},{ $inc: { sequence: 1 } },{new: true})
    return newoid.sequence
    res.json({"noid":newoid.sequence})
}

exports.place_order = async function(req, res) {
    var idsproducts = req.body.products;
    let user_id = mongoose.Types.ObjectId(req.body.user_id)
    var productincart = [];
    let ordercounter = await get_next_order_id()
    let stroid = ordercounter.toString().padStart(4, "0")
    let order_id = `OR${stroid}`
    idsproducts.forEach(function(item){     
    productincart.push(new ObjectId(item));
    })
    const newOrder = new Order(
        {
            _id: new mongoose.Types.ObjectId(),
            order_id: order_id,
            products: productincart ,
            user_id: user_id,
            gst_tax: req.body.gst_tax,
            shipping: req.body.shipping,
            sub_total:req.body.subtotal,
            amount: req.body.amount,
            order_status: req.body.order_status ? req.body.order_status: "Processing",
            payment_type: req.body.payment_type,
            coupon_amount: req.body.coupon_amount,
            coupon_used: req.body.coupon_used
        }
    )
    let newOrderRef  =  await  newOrder.save()
    let orderref = await Order.findOne({order_id:order_id}).populate('products').populate("user_id")
    console.log(orderref)
    let productref = orderref.products
    let arrayforhtmlref = productref.map(({product_name, cropped_image,quantity, subtotal})=>({product_name, cropped_image, quantity, subtotal}))
    let contact = orderref.user_id.contact
    let username = `${orderref.user_id.first_name} ${orderref.user_id.last_name}` 
    let htmlgenerated = htmlforcartproducts(arrayforhtmlref)
   // let mailsent = await mail_controller.send_mail(htmlgenerated,orderref)
    let smssent = notification_controller.send_order_confirm_sms(contact,username,order_id)
    let userupdate = await User.findOneAndUpdate({_id:req.body.user_id},{firstordermade : 1})
    //console.log(userupdate)
    res.json({order:newOrderRef})
}

exports.place_mock_order = async function(req, res) {
   
    // let newOrderRef  =  await  newOrder.save()
    let orderref = await Order.findOne({order_id:"OR4591"}).populate('products').populate("user_id")
    let productref = orderref.products
    let arrayforhtmlref = productref.map(({product_name, quantity, subtotal})=>({product_name, quantity, subtotal}))
    let htmlgenerated = htmlforcartproducts(arrayforhtmlref)
    let mailsent = await mail_controller.send_mail(htmlgenerated,orderref)
    //let userupdate = await User.findOneAndUpdate({_id:req.body.user_id},{firstordermade : 1})
    //console.log(userupdate)
    res.json({"result":mailsent})
}


function htmlforcartproducts(productarray){
    let rowhtml = ""
    for(i=0; i< productarray.length; i++){
        let imgsrc =  `http://95.216.71.108:5600/admin/uploads/${productarray[i].cropped_image}`
        rowhtml += `<tr style="font-family:Arial, sans-serif;line-height:1.3em;">
        <td style="line-height:1.3em;font-family:Arial, sans-serif;text-align:left;word-wrap:break-word;font-size:14px;padding:15px 12px;border-top:1px dotted #c9c9c9;vertical-align:top;">
          
         
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Arial, sans-serif;line-height:1.3em;font-size:13px;vertical-align:top;color:black;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
        <td style="font-family:Arial, sans-serif;line-height:1.3em;padding-right:15px;">
          <img width="70" height="70" src="${imgsrc}" alt="" style="border-radius:3px;padding:0;margin:0;">
        </td>
          <td width="100%" style="font-family:Arial, sans-serif;line-height:1.3em;">
          
          <div style="font-weight:bold;font-size:15px;padding-bottom:3px;">
          ${productarray[i].product_name} </div>
          
          
          </td>
         
        </tr></tbody></table>
        </td>
          <td style="line-height:1.3em;font-family:Arial, sans-serif;text-align:left;word-wrap:break-word;font-size:14px;padding:15px 12px;border-top:1px dotted #c9c9c9;vertical-align:top;">
          ${productarray[i].quantity} </td>
          <td style="line-height:1.3em;font-family:Arial, sans-serif;word-wrap:break-word;font-size:14px;padding:15px 12px;border-top:1px dotted #c9c9c9;vertical-align:top;text-align:right;">
          <span><span>₹</span>${productarray[i].subtotal}</span>
        </td>
          </tr>`
    }
    return rowhtml
}


exports.post_pincodes = async function(req, res) {
    const newPincode = new Pincode(
        {
            _id : new mongoose.Types.ObjectId(),
            cod_available : req.body.pincodes
        }
    )
    let newPincodeRef  =  await  newPincode.save()
    res.json({pincode : newPincodeRef})
}


exports.get_pincodes = function(req, res){
    Pincode.find()
         .then(result=>res.json(result))
         .catch(err=>res.json(err))
}


exports.update_pincodes = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Pincode.findOneAndUpdate({_id:"5e1c136af8a20910954994c7"},req.body)
    .then(result=> res.json({"result":"pincodes updated","updatedpincode":result}))
    .catch(err=>res.status(404).json(err))
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

exports.deactivate_orders = function(req, res){
    // console.log(req.body.todeactiveids)
     var idsArrayf = req.body.todeactiveids;
    // console.log(idsArrayf)
     var ordersDeactive = [];
     idsArrayf.forEach(function(item){     
     ordersDeactive.push(new ObjectId(item));
 });
 
 let deactivebody = {
     active : 0
 }
 
 Order.updateMany({'_id':{'$in': ordersDeactive}}, deactivebody,function(err, result){
    // console.log(result)
     res.json({"dodo":"yoyo"});
 });
 }

exports.delete_orders_new = async function(req, res){
    var idsArrayf = req.body.todeleteids;
    var ordersDelete = [];
    idsArrayf.forEach(function(item){     
    ordersDelete.push(new ObjectId(item));
});
let orders = await Order.find({'_id':{'$in': ordersDelete}}).populate('products','image cropped_image')
let products = orders.map(order => order.products)
let imagestodelete = []
for(i=0; i < products.length; i++){
    let img = products[i].image
    let cropped_img = products[i].cropped_image
    imagestodelete.push(img, cropped_img)
}
    let orderdelete = await Order.deleteMany({'_id':{'$in': ordersDelete}})
    if(orderdelete){
        console.log(imagestodelete)
        res.json({"delete":"records deleted"})
    }
    else{
        res.json({"delete":"error in records delete"})
    }
}

exports.delete_model_requests = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var reqDelete = [];
    idsArrayf.forEach(function(item){     
    reqDelete.push(new ObjectId(item));
});

Modelrequest.deleteMany({'_id':{'$in': reqDelete}},function(){
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

exports.add_order_counter = async function(req, res) {
   // let cproid = mongoose.Types.ObjectId.createFromHexString(req.body.proid)
    const newOrdercounter = new Ordercounter(
        {
            _id: 'orderid',
            sequence: 0
        }
    )
    let cartproduct = await newOrdercounter.save()
    res.json({"cartproduct": cartproduct})
}

exports.edit_all_orders = function(req, res){
    Order.updateMany({},{coupon_amount : 0})
    .then(result=> res.json({"result":"user updated","updateduser":result}))
    .catch(err=>res.status(404).json(err))
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