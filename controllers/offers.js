const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")
const Offer = require("../models/offer")
const ObjectId = mongoose.Types.ObjectId



exports.add_offer = function(req, res) {
    const newOffer = new Offer(
        {
            _id: new mongoose.Types.ObjectId(),
            offer_name: req.body.offer_name,
            product_name : req.body.product_name,
            code: req.body.code,
            expiry_date: req.body.expiry_date,
            termsnconditions: req.body.termsnconditions,
            h_image : "noimage.png"
        }
    )
    newOffer.save()
        .then((result => {
            console.log(result)
            res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"offer created"})
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
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

exports.get_all_offers = function(req, res){
        Offer.find()
             .then(result=>res.json(result))
             .catch(err=>res.json(err))
}

exports.count_offers = function(req, res){
    Offer.countDocuments()	
    .then(result=>res.json(result))
    .catch(err=>res.json(err))	
}

exports.delete_user = function(req, res){
    User.findOneAndRemove({_id:req.params.did})
    .then(result=> res.json({"result":"user deteted","deleteduser":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_offer = function(req, res){
    Offer.findOneAndUpdate({_id:req.params.oid},req.body)
    .then(result=> res.json({"result":"offer updated","updatedoffer":result}))
    .catch(err=>res.status(404).json(err))
}