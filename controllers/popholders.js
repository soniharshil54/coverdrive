const express = require("express")
const mongoose = require("mongoose")
const Popholder = require("../models/popholder")
const Popholdertype = require("../models/popholdertype")
const ObjectId = mongoose.Types.ObjectId


exports.add_popholder_type = function(req, res){
    const newPopholdertype = new Popholdertype(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.pt_name,
            slider_image: "noimage.png"
        }
    )
    newPopholdertype.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.get_all_popholder_types = function(req, res){
    console.log("gt pt called")
    Popholdertype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_active_popholder_types = function(req, res){
    console.log("gt pt called")
    Popholdertype.find({active_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_popholders_by_typeid = async function(req, res){
    console.log("gt mt called")
    let typeid = req.params.typeid
    let popholders
    if(typeid === "5e301af4fda53f3126a601c1"){
        popholders = await Popholder.find({popholder_type:"Custom Popholder", available_status : 1})
        res.json(popholders)
    }
    else if(typeid === "5e301b1afda53f3126a601c2"){
        popholders = await Popholder.find({popholder_type:"Regular Popholder", available_status : 1})
        res.json(popholders)
    }
    else{
        res.json({"message":"Bad Request"})
    }
    
}

exports.edit_popholder_type = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Popholdertype.findOneAndUpdate({_id:req.params.ptid},req.body)
    .then(result=> res.json({"result":"pt updated","updatedpt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.get_pt_by_id_admin = async function(req, res){
    let ptype = await Popholdertype.findOne({_id:req.params.ptid})
    if(ptype){
        res.json(ptype)
        return
    }
    else{
        res.json({"error":"ptype not found"})
        return
    }
}

exports.edit_ptype_status = function(req, res){
    Popholdertype.findOneAndUpdate({_id:req.params.ptid},req.body)
    .then(result=> res.json({"result":"ptype updated","updatedptype":result}))
    .catch(err=>res.status(404).json(err))
}

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
            popholder_type : req.body.popholder_type,
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


