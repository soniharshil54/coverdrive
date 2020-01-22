const express = require("express")
const mongoose = require("mongoose")
const Popholder = require("../models/popholder")
const ObjectId = mongoose.Types.ObjectId


exports.edit_popholder = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Popholder.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"popholder updated","updatedpopholder":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_popholders = function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    Popholder.updateMany({},req.body)
    .then(result=> res.json({"result":"popholder updated","updatedpopholders":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_popholder_status = function(req, res){
    Popholder.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"popholder updated","updatedpopholder":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_popholders = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var popholdersDelete = [];
    idsArrayf.forEach(function(item){     
    popholdersDelete.push(new ObjectId(item));
});

Popholder.deleteMany({'_id':{'$in': popholdersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}


exports.get_active_popholders = function(req, res){
    console.log("gt popholders called")
    Popholder.find({available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_popholders = function(req, res){
    console.log("gt popholders called")
    Popholder.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_popholder_by_id_admin = async function(req, res){
    let popholder = await Popholder.findOne({_id:req.params.mid})
    if(popholder){
        res.json(popholder)
        return
    }
    else{
        res.json({"error":"popholder not found"})
        return
    }
}

exports.get_popholder_by_id = async function(req, res){
    let popholder = await Popholder.findOne({_id:req.params.mid})
    if(popholder){
        res.json(popholder)
        return
    }
    else{
        res.json({"error":"popholder not found"})
        return
    }
}

exports.add_popholder = function(req, res){
    const newPopholder = new Popholder(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.popholder_name,
            size: req.body.popholder_size,
            h_image: "noimage.png",
            shadow_image: "noimage.png",
            mask_image: "noimage.png",
            overlay_image: "noimage.png",
            price: req.body.price,
            description: req.body.description,
            pick_image_size: req.body.pick_image_size
        }
    )
    newPopholder.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}


