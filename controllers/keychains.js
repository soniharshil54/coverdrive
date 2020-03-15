const express = require("express")
const mongoose = require("mongoose")
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

exports.get_active_keychain_types = function(req, res){
    console.log("gt kt called")
    Keychaintype.find({active_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
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

exports.edit_ktype_status = function(req, res){
    Keychaintype.findOneAndUpdate({_id:req.params.ktid},req.body)
    .then(result=> res.json({"result":"ktype updated","updatedktype":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_keychain = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Keychain.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_keychains = function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    Keychain.updateMany({},{type:"CustomKeychain"})
    .then(result=> res.json({"result":"keychain updated","updatedkeychains":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_keychain_status = function(req, res){
    Keychain.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_keychains = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var keychainsDelete = [];
    idsArrayf.forEach(function(item){     
    keychainsDelete.push(new ObjectId(item));
});

Keychain.deleteMany({'_id':{'$in': keychainsDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}


exports.get_active_keychains = function(req, res){
    console.log("gt keychains called")
    Keychain.find({available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_keychains = function(req, res){
    console.log("gt keychains called")
    Keychain.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_keychain_names = function(req, res){
    console.log("gt keychains called")
    Keychain.find().select('name')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_keychain_by_id_admin = async function(req, res){
    let keychain = await Keychain.findOne({_id:req.params.mid})
    if(keychain){
        res.json(keychain)
        return
    }
    else{
        res.json({"error":"keychain not found"})
        return
    }
}

exports.get_keychain_by_id = async function(req, res){
    let keychain = await Keychain.findOne({_id:req.params.mid})
    if(keychain){
        res.json(keychain)
        return
    }
    else{
        res.json({"error":"keychain not found"})
        return
    }
}

exports.get_keychains_by_type = async function(req, res){
    let ktid = req.params.ktid
    let keychain
    if(ktid == "5e28474558d8b85a2ba32f64"){
        keychains = await Keychain.find({type:"CustomKeychain", available_status : 1})
    }
    else if(ktid == "5e28476b58d8b85a2ba32f65"){
        keychains = await Keychain.find({type:"RegularKeychain", available_status : 1})
    }
    else{
        res.json({"error":"invalid request"})
    }
   // let keychain = await Keychain.findOne({_id:req.params.mid})
    if(keychains){
        res.json(keychains)
        return
    }
    else{
        res.json({"error":"keychain not found"})
        return
    }
}

exports.add_keychain = async function(req, res){
    let keychainexists = await Keychain.countDocuments({name : req.body.keychain_name})
    console.log(keychainexists)
    if(keychainexists > 0){
        console.log("its in if of keychainexists")
        res.json({status:0, result: "keychain name already exists !!!"})
    }
    else{
        console.log("its in else of keychainexists")
        const newKeychain = new Keychain(
            {
                _id: new mongoose.Types.ObjectId(),
                name: req.body.keychain_name,
                type : req.body.keychain_type,
                h_image: "noimage.png",
                shadow_image: "noimage.png",
                mask_image: "noimage.png",
                overlay_image: "noimage.png",
                price: req.body.price,
                description: req.body.description,
                pick_image_size: req.body.pick_image_size
            }
        )
        let result = await newKeychain.save()
        res.json(result)
    }
}






