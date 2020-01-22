const express = require("express")
const mongoose = require("mongoose")
const Mug = require("../models/mug")
const Keychain = require("../models/keychain")
const Keychaintype = require("../models/keychaintype")
const ObjectId = mongoose.Types.ObjectId

exports.add_keychain_type = function(req, res){
    const newKeychaintype = new Keychaintype(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.kt_name,
            slider_image: "noimage.png"
        }
    )
    newKeychaintype.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.get_all_keychain_types = function(req, res){
    console.log("gt kt called")
    Keychaintype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}



exports.edit_mug = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Mug.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"mug updated","updatedmug":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_keychain_type = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Keychaintype.findOneAndUpdate({_id:req.params.ktid},req.body)
    .then(result=> res.json({"result":"kt updated","updatedkt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.get_kt_by_id_admin = async function(req, res){
    let ktype = await Keychaintype.findOne({_id:req.params.ktid})
    if(ktype){
        res.json(ktype)
        return
    }
    else{
        res.json({"error":"ktype not found"})
        return
    }
}

exports.edit_all_mugs = function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    Mug.updateMany({},req.body)
    .then(result=> res.json({"result":"mug updated","updatedmugs":result}))
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




