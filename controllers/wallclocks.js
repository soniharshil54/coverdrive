const express = require("express")
const mongoose = require("mongoose")
const Wallclock = require("../models/wallclock")
const ObjectId = mongoose.Types.ObjectId


// exports.add_wallclock_type = function(req, res){
//     const newWallclocktype = new Wallclocktype(
//         {
//             _id: new mongoose.Types.ObjectId(),
//             name: req.body.kt_name,
//             slider_image: "noimage.png"
//         }
//     )
//     newWallclocktype.save()
//     .then((result => {
//         console.log(result)
//         res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
//     }))
//     .catch(err => {
//         console.log(err)
//         res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
//     })
// }

// exports.get_all_wallclock_types = function(req, res){
//     console.log("gt kt called")
//     Wallclocktype.find()
//     .then(result=>res.json(result))
//     .catch(err=>res.json(err))
// }

// exports.get_active_wallclock_types = function(req, res){
//     console.log("gt kt called")
//     Wallclocktype.find({active_status : 1})
//     .then(result=>res.json(result))
//     .catch(err=>res.json(err))
// }

// exports.edit_wallclock_type = function(req, res){
//     console.log(req.body)
//     console.log(req.params)
//     Wallclocktype.findOneAndUpdate({_id:req.params.ktid},req.body)
//     .then(result=> res.json({"result":"kt updated","updatedkt":result}))
//     .catch(err=>res.status(404).json(err))
// }

// exports.get_kt_by_id_admin = async function(req, res){
//     let ktype = await Wallclocktype.findOne({_id:req.params.ktid})
//     if(ktype){
//         res.json(ktype)
//         return
//     }
//     else{
//         res.json({"error":"ktype not found"})
//         return
//     }
// }

// exports.edit_ktype_status = function(req, res){
//     Wallclocktype.findOneAndUpdate({_id:req.params.ktid},req.body)
//     .then(result=> res.json({"result":"ktype updated","updatedktype":result}))
//     .catch(err=>res.status(404).json(err))
// }

exports.edit_wallclock = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Wallclock.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"wallclock updated","updatedwallclock":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_wallclocks = function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    Wallclock.updateMany({},req.body)
    .then(result=> res.json({"result":"wallclock updated","updatedwallclocks":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_wallclock_status = function(req, res){
    Wallclock.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"wallclock updated","updatedwallclock":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_wallclocks = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var wallclocksDelete = [];
    idsArrayf.forEach(function(item){     
    wallclocksDelete.push(new ObjectId(item));
});

Wallclock.deleteMany({'_id':{'$in': wallclocksDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}


exports.get_active_wallclocks = function(req, res){
    console.log("gt wallclocks called")
    Wallclock.find({available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_wallclocks = function(req, res){
    console.log("gt wallclocks called")
    Wallclock.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_wallclock_names = function(req, res){
    console.log("gt wallclocks called")
    Wallclock.find().select('name')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_wallclock_by_id_admin = async function(req, res){
    let wallclock = await Wallclock.findOne({_id:req.params.mid})
    if(wallclock){
        res.json(wallclock)
        return
    }
    else{
        res.json({"error":"wallclock not found"})
        return
    }
}

exports.get_wallclock_by_id = async function(req, res){
    let wallclock = await Wallclock.findOne({_id:req.params.mid})
    if(wallclock){
        res.json(wallclock)
        return
    }
    else{
        res.json({"error":"wallclock not found"})
        return
    }
}

exports.add_wallclock = function(req, res){
    const newWallclock = new Wallclock(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.wallclock_name,
            size: req.body.wallclock_size,
            h_image: "noimage.png",
            shadow_image: "noimage.png",
            mask_image: "noimage.png",
            overlay_image: "noimage.png",
            price: req.body.price,
            description: req.body.description,
            pick_image_size: req.body.pick_image_size
        }
    )
    newWallclock.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}


