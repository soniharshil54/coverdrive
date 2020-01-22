const express = require("express")
const mongoose = require("mongoose")
const Mug = require("../models/mug")
const ObjectId = mongoose.Types.ObjectId


exports.edit_mug = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Mug.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"mug updated","updatedmug":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_mug_status = function(req, res){
    Mug.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"mug updated","updatedmug":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_mugs = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var mugsDelete = [];
    idsArrayf.forEach(function(item){     
    mugsDelete.push(new ObjectId(item));
});

Mug.deleteMany({'_id':{'$in': mugsDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}


exports.get_active_mugs = function(req, res){
    console.log("gt mugs called")
    Mug.find({available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_mugs = function(req, res){
    console.log("gt mugs called")
    Mug.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_mug_by_id_admin = async function(req, res){
    let mug = await Mug.findOne({_id:req.params.mid})
    if(mug){
        res.json(mug)
        return
    }
    else{
        res.json({"error":"mug not found"})
        return
    }
}

exports.get_mug_by_id = async function(req, res){
    let mug = await Mug.findOne({_id:req.params.mid})
    if(mug){
        res.json(mug)
        return
    }
    else{
        res.json({"error":"mug not found"})
        return
    }
}

exports.add_mug = function(req, res){
    const newMug = new Mug(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.mug_name,
            volume: req.body.mug_volume,
            h_image: "noimage.png",
            in_image: "noimage.png",
            mask_image: "noimage.png",
            overlay_image: "noimage.png",
            price: req.body.price,
            description: req.body.description,
            pick_image_size: req.body.pick_image_size
        }
    )
    newMug.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}


