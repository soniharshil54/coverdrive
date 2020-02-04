const express = require("express")
const mongoose = require("mongoose")
const Sipperbottle = require("../models/sipperbottle")
const ObjectId = mongoose.Types.ObjectId


exports.edit_sipperbottle = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Sipperbottle.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"sipperbottle updated","updatedsipperbottle":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_sipperbottles = function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    Sipperbottle.updateMany({},req.body)
    .then(result=> res.json({"result":"sipperbottle updated","updatedsipperbottles":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_sipperbottle_status = function(req, res){
    Sipperbottle.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"sipperbottle updated","updatedsipperbottle":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_sipperbottles = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var sipperbottlesDelete = [];
    idsArrayf.forEach(function(item){     
    sipperbottlesDelete.push(new ObjectId(item));
});

Sipperbottle.deleteMany({'_id':{'$in': sipperbottlesDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}


exports.get_active_sipperbottles = function(req, res){
    console.log("gt sipperbottles called")
    Sipperbottle.find({available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_sipperbottles = function(req, res){
    console.log("gt sipperbottles called")
    Sipperbottle.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_sipperbottle_names = function(req, res){
    console.log("gt sipperbottles called")
    Sipperbottle.find().select('name')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_sipperbottle_by_id_admin = async function(req, res){
    let sipperbottle = await Sipperbottle.findOne({_id:req.params.mid})
    if(sipperbottle){
        res.json(sipperbottle)
        return
    }
    else{
        res.json({"error":"sipperbottle not found"})
        return
    }
}

exports.get_sipperbottle_by_id = async function(req, res){
    let sipperbottle = await Sipperbottle.findOne({_id:req.params.mid})
    if(sipperbottle){
        res.json(sipperbottle)
        return
    }
    else{
        res.json({"error":"sipperbottle not found"})
        return
    }
}

exports.add_sipperbottle = function(req, res){
    const newSipperbottle = new Sipperbottle(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.sipperbottle_name,
            volume: req.body.sipperbottle_volume,
            h_image: "noimage.png",
            in_image: "noimage.png",
            mask_image: "noimage.png",
            overlay_image: "noimage.png",
            price: req.body.price,
            description: req.body.description,
            pick_image_size: req.body.pick_image_size
        }
    )
    newSipperbottle.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}


