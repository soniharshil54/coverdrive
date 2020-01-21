const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")
const Offer = require("../models/offer")
const ObjectId = mongoose.Types.ObjectId

//expo

exports.add_offer_old = function(req, res) {
    const newOffer = new Offer(
        {
            _id: new mongoose.Types.ObjectId(),
            offer_name: req.body.offer_name,
            product_name : req.body.product_name,
            code: req.body.code,
            active_status: "1",
            expiry_date: req.body.expiry_date,
            termsnconditions: req.body.termsnconditions,
            h_image : "noimage.png"
        }
    )
    newOffer.save()
        .then((result => {
            console.log(result)
            res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}

exports.add_offer = async function(req, res) {
    let codeused = await Offer.findOne({code: req.body.code})
    if(codeused){
        let result = {
            status : 0,
            message : "Coupon Code is already used"
        }
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }
    const newOffer = new Offer(
        {
            _id: new mongoose.Types.ObjectId(),
            offer_name: req.body.offer_name,
            offer_type: req.body.offer_type,
            categories : req.body.categories,
            code: req.body.code,
            flat_discount: req.body.flat_discount,
            freeshipping: req.body.freeshipping , 
            firsttime_dis: req.body.firsttime_dis,
            buy_product: req.body.buy_product,
            get_product: req.body.get_product,
            min_spend: req.body.min_spend ? req.body.min_spend : 0,
            max_spend: req.body.max_spend ? req.body.max_spend : 50000,
            expiry_date: req.body.expiry_date,
            usage_limit: req.body.usage_limit,
            termsnconditions: req.body.termsnconditions,
            free_shipping_allow : req.body.free_shipping_allow,
            h_image : "noimage.png"
        }
    )
    let offer = await newOffer.save()
    res.status(201).header("Access-Control-Allow-Origin", "*").json(offer)
}


exports.apply_coupon = async function(req, res){
    console.log("apply coupon called")
    var idsArrayf = req.body.cartproducts;
    var userid = req.body.userid
    var subamount = req.body.subamount
    var gst = req.body.gst
    var shipping = req.body.shipping
    var codcharges = req.body.codcharges
    var couponCode = req.body.code
    var codeMessage = `Coupon ${couponCode} successfully applied.`
    var productsCart = [];
    idsArrayf.forEach(function(item){     
    productsCart.push(new ObjectId(item));
    });
    let offer = await Offer.findOne({code: couponCode})
    if(!offer){
        let resultRes = {
            "status":0,
            "message":"Coupon doesn't exist"
        }
        res.status(201).json({result:resultRes})
    }
    let offerType = offer.offer_type
    let freeshippingallow = offer.free_shipping_allow === 1 ? true : false
    let user = await User.findOne({_id:userid})
    let isofferusedbyuser = await User.findOne({_id:userid ,code_used:offer._id})
    if(isofferusedbyuser){
        let resultRes = {
            "status":0,
            "message":"You have already used this coupon"
        }
        res.status(201).json({result:resultRes})
    }
    let cartProducts = await Cartproduct.find({'_id':{'$in': productsCart}})
    let totalAmount = parseInt(subamount) + parseInt(gst) + parseInt(shipping) + parseInt(codcharges)
    let maxSpend = offer.max_spend
    let only_online = offer.only_online
    let minSpend = offer.min_spend
    if(totalAmount >= maxSpend || totalAmount <= minSpend){
        console.log("cart amount not sufficient for the offer")
        let resultRes = {
            "status":0,
            "message":"Cart amount is not sufficient for this coupon"
        }
        res.status(201).json({result:resultRes})
    }
    else {
    if(offerType === "freeshipping"){
        console.log("free shipping")
        let responseBody = {
            status : 1,
            message: codeMessage,
            discount : shipping,
            shipping : 0
        }
        await User.findOneAndUpdate({ _id: userid },{ $push: { code_used: offer._id } });
        await Offer.findOneAndUpdate({code: couponCode}, {$inc : {'usage_count' : 1}})
        res.status(200).json({result:responseBody})
    }
    else if(offerType === "flatdis"){
        console.log("in flatdis")
       // let totalAmount = subamount + gst + shipping + codcharges
        let discount = 0
        if(freeshippingallow){
             discount = parseInt(offer.flat_discount) + parseInt(shipping),
             shipping = 0
        }
        else{
              discount = offer.flat_discount
        }
        let responseBody = {
            status : 1,
            message: codeMessage,
            shipping,
            discount
        }
        await User.findOneAndUpdate({ _id: userid },{ $push: { code_used: offer._id } });
        await Offer.findOneAndUpdate({code: couponCode}, {$inc : {'usage_count' : 1}})
        res.status(200).json({result:responseBody})
    }
    else if(offerType === "firsttime"){
        console.log("in firsttim")
        let totalAmount = subamount + gst + shipping + codcharges
        let isusedbyuser = user.firstordermade === 1 ? true : false
        let discount = 0
        if(!isusedbyuser){
            if(freeshippingallow){
                discount = parseInt(offer.firsttime_dis) + parseInt(shipping)
                shipping = 0
           }
           else{
            discount = parseInt(offer.firsttime_dis)
           }
            let responseBody = {
                status : 1,
                message: codeMessage,
                shipping,
                discount
            }
            await Offer.findOneAndUpdate({code: couponCode}, {$inc : {'usage_count' : 1}})
            
            res.status(200).json({result:responseBody})
        }
        else{
            console.log("not a first order")
            let resultRes = {
                "status":0,
                "message":"Coupon only valid for the first order"
            }
            res.status(201).json({result:resultRes})
        }
    }
    else if(offerType === "bogo"){
        console.log("in bogo")
        let discount = 0
      //  let buyref = offer.buy_product
     //   console.log("buyref", buyref)
     //   let getref = offer.get_product
     //   console.log("getref", getref) 
       // let totalbuyget = parseInt(buyref) + parseInt(getref)
       let totalbuyget = 2
        console.log("totalbuyget", totalbuyget)
        let uniquecartProducts = new Set(cartProducts)
        let withquantitiesmult = cartProducts.filter(product => {
            console.log(product.quantity)
            return parseInt(product.quantity) > 1
            
        }).map(productcat => productcat.category)
        console.log(withquantitiesmult)
        let categoriesenabled = offer.categories
        let categoriesincart = cartProducts.map(cartproduct => cartproduct.category)
        let filteredcart = categoriesincart.filter(f => categoriesenabled.includes(f));
        var occurance = getOccurance(filteredcart)
        let qualifiedcats = getqualifiedcart(occurance, totalbuyget)
        let qualcatsarrayref = Object.keys(qualifiedcats)
        let qualcatsarrayref2 = qualcatsarrayref.concat(withquantitiesmult);
        let qualcatsarray = [...new Set(qualcatsarrayref2)]
        let todiscountcartpros = []
        console.log("qualcatsarray")
        console.log(qualcatsarray)
        if(Array.isArray(qualcatsarray) && qualcatsarray.length === 0){
            let resultRes = {
                "status":0,
                "message":"offer doesnt match the quantity"
            }
            res.status(201).json({result:resultRes})
            return
        }
        for(i=0; i < qualcatsarray.length; i++){
            let refcartproject = cartProducts.filter(cartpro => cartpro.category === qualcatsarray[i])
            let returncartproduct = refcartproject.reduce(function(prev, curr) {
                return prev.subtotal < curr.subtotal ? prev : curr;
            });
            todiscountcartpros.push(returncartproduct)
        }
        let discountamount = todiscountcartpros.map(pro => pro.subtotal).reduce((a, b) => parseInt(a) + parseInt(b), 0)
        if(freeshippingallow && discountamount){
            discount = parseInt(discountamount) + parseInt(shipping)
            shipping = 0
       }
       else{
        discount = discountamount
       }
        let responseBody = {
            status : 1,
            message: codeMessage,
            discount: discount,
            only_online: only_online,
            shipping: shipping
        }
        await User.findOneAndUpdate({ _id: userid },{ $push: { code_used: offer._id } });
        await Offer.findOneAndUpdate({code: couponCode}, {$inc : {'usage_count' : 1}})
        res.status(200).json({result:responseBody})
    }
    else{
        console.log("no offers matched")
        let resultRes = {
            "status":0,
            "message":"Coupon is not valid"
        }
        res.status(201).json({result:resultRes})
    }
}
   // console.log(cartProducts)
}

function getOccurance(cartarray){
    let resultoccurance = cartarray.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
      
        return acc;
      }, {});
    return resultoccurance  
}

function getqualifiedcart(occurancep, totalbuygetp){
    var filteredObject = Object.keys(occurancep).reduce(function(r, e) {
        if (occurancep[e] >= totalbuygetp) r[e] = occurancep[e]
        return r;
      }, {}) 
      return filteredObject
}


exports.get_offer = async function(req, res){
    let offer = await Offer.findOne({_id:req.params.oid})
    if(offer){
        res.json(offer)
        return
    }
    else{
        res.json({"error":"offer not found"})
        return
    }
}

exports.delete_offers = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var offersDelete = [];
    idsArrayf.forEach(function(item){     
    offersDelete.push(new ObjectId(item));
});

Offer.deleteMany({'_id':{'$in': offersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.get_offers = function(req, res){
    edit_offer_status_again()
    Offer.find({active_status : 1})
         .then(result=>res.json(result))
         .catch(err=>res.json(err))
}

exports.get_all_offers = function(req, res){
    edit_offer_status_again()
        Offer.find()
             .then(result=>res.json(result))
             .catch(err=>res.json(err))
}

exports.count_offers = function(req, res){
    Offer.countDocuments()	
    .then(result=>res.json(result))
    .catch(err=>res.json(err))	
}

// exports.delete_user = function(req, res){
//     User.findOneAndRemove({_id:req.params.did})
//     .then(result=> res.json({"result":"user deteted","deleteduser":result}))
//     .catch(err=>res.status(404).json(err))
// }

exports.edit_offer = function(req, res){
    Offer.findOneAndUpdate({_id:req.params.oid},req.body)
    .then(result=> res.json({"result":"offer updated","updatedoffer":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_offers = function(req, res){
    Offer.updateMany({},req.body)
    .then(result=> res.json({"result":"offers updated","updatedoffers":result}))
    .catch(err=>res.status(404).json(err))
}

function edit_offer_status_again(){
    let datenow = new Date(Date.now())
    let offerdeactive = {
        active_status : 0
    }
    // Offer.findOne({expiry_date : {$lte: datenow}})
    // .then(result=> console.log(result))
    // .catch(err=> console.log(err))
    Offer.findOneAndUpdate({expiry_date : {$lte: datenow}},offerdeactive)
    .then(result=> console.log(result))
    .catch(err=> console.log(err))
}



exports.edit_offer_status = function(req, res){
    Offer.findOneAndUpdate({_id:req.params.oid},req.body)
    .then(result=> res.json({"result":"offer updated","updatedoffer":result}))
    .catch(err=>res.status(404).json(err))
}