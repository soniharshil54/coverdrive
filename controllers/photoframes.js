const express = require("express")
const mongoose = require("mongoose")
const Photoframe = require("../models/photoframe")
const Photoframetype = require("../models/photoframetype")
const ObjectId = mongoose.Types.ObjectId


exports.add_photoframe_type = function(req, res){
    const newPhotoframetype = new Photoframetype(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.pt_name,
            slider_image: "noimage.png"
        }
    )
    newPhotoframetype.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.get_all_photoframe_types = function(req, res){
    console.log("gt pt called")
    Photoframetype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_active_photoframe_types = function(req, res){
    console.log("gt pt called")
    Photoframetype.find({active_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_photoframes_by_typeid = async function(req, res){
    console.log("gt mt called")
    let typeid = req.params.typeid
    let photoframes
    if(typeid === "5e301af4fda53f3126a601c1"){
        photoframes = await Photoframe.find({photoframe_type:"Custom Photoframe", available_status : 1})
        res.json(photoframes)
    }
    else if(typeid === "5e301b1afda53f3126a601c2"){
        photoframes = await Photoframe.find({photoframe_type:"Regular Photoframe", available_status : 1})
        res.json(photoframes)
    }
    else{
        res.json({"message":"Bad Request"})
    }
    
}

exports.edit_photoframe_type = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Photoframetype.findOneAndUpdate({_id:req.params.ptid},req.body)
    .then(result=> res.json({"result":"pt updated","updatedpt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.get_pt_by_id_admin = async function(req, res){
    let ptype = await Photoframetype.findOne({_id:req.params.ptid})
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
    Photoframetype.findOneAndUpdate({_id:req.params.ptid},req.body)
    .then(result=> res.json({"result":"ptype updated","updatedptype":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_photoframe = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Photoframe.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"photoframe updated","updatedphotoframe":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_photoframes = function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    Photoframe.updateMany({},req.body)
    .then(result=> res.json({"result":"photoframe updated","updatedphotoframes":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_photoframe_status = function(req, res){
    Photoframe.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"photoframe updated","updatedphotoframe":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_photoframes = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var photoframesDelete = [];
    idsArrayf.forEach(function(item){     
    photoframesDelete.push(new ObjectId(item));
});

Photoframe.deleteMany({'_id':{'$in': photoframesDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}


exports.delete_photoframe_types = async function(req, res){
    var idsArrayf = req.body.todeleteids;
    var photoframesDelete = [];
    idsArrayf.forEach(function(item){     
        photoframesDelete.push(new ObjectId(item));
});

let deletephotoframetypes = await Photoframetype.deleteMany({'_id':{'$in': photoframesDelete}})
//let deletephotoframemaintypes = await Photoframemaintype.deleteMany({'type_id':{'$in': photoframesDelete}})
let deletephotoframees = await Photoframe.deleteMany({'photoframe_type':{'$in': photoframesDelete}})
res.json({"yoyo":"dodo"})
}


exports.get_active_photoframes = function(req, res){
    console.log("gt photoframes called")
    Photoframe.find({available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_photoframes = function(req, res){
    console.log("gt photoframes called")
    Photoframe.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_photoframe_by_id_admin = async function(req, res){
    let photoframe = await Photoframe.findOne({_id:req.params.mid})
    if(photoframe){
        res.json(photoframe)
        return
    }
    else{
        res.json({"error":"photoframe not found"})
        return
    }
}

exports.get_photoframe_by_id = async function(req, res){
    let photoframe = await Photoframe.findOne({_id:req.params.mid})
    if(photoframe){
        res.json(photoframe)
        return
    }
    else{
        res.json({"error":"photoframe not found"})
        return
    }
}

exports.add_photoframe = async function(req, res){
    let photoframetyperef = await Photoframetype.findOne({_id : req.body.photoframe_type})
    console.log(photoframetyperef)
    let photoframetypename = photoframetyperef.name
    const newPhotoframe = new Photoframe(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.photoframe_name,
            photoframe_type : req.body.photoframe_type,
            photoframe_type_name : photoframetypename,
            size: req.body.photoframe_size,
            h_image: "noimage.png",
            shadow_image: "noimage.png",
            mask_image: "noimage.png",
            overlay_image: "noimage.png",
            price: req.body.price,
            description: req.body.description,
            pick_image_size: req.body.pick_image_size
        }
    )
    let result = await newPhotoframe.save()
    res.json(result)
}


