const express = require("express")
const mongoose = require("mongoose")
const Watch = require("../models/watch")
const Watchtype = require("../models/watchtype")
const Watchmaintype = require("../models/watchmaintype")
const Watchsubtype = require("../models/watchsubtype")
const ObjectId = mongoose.Types.ObjectId

exports.add_watch_type = async function(req, res){
    const newWatchtype = new Watchtype(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.wt_name,
            slider_image: "noimage.png"
        }
    )
    let watchtype = await newWatchtype.save()
    let watchtypeid = watchtype._id
    let watchtypename = watchtype.name
    const newWatchmaintype = new Watchmaintype(
        {
            _id: new mongoose.Types.ObjectId(),
            type_id: watchtypeid,
            type_name : watchtypename,
            subtype_id: "5e2e76e27d507f1a376667dd",
            subtype_name: "Custom Watch",
            name: req.body.wt_name + " " + "Custom Watch",
            slider_image: "noimage.png"
        }
    )
    const newWatchmaintype2 = new Watchmaintype(
        {
            _id: new mongoose.Types.ObjectId(),
            type_id: watchtypeid,
            type_name : watchtypename,
            subtype_id: "5e2e77187d507f1a376667de",
            subtype_name: "Regular Watch",
            name: req.body.wt_name + " " + "Regular Watch",
            slider_image: "noimage.png"
        }
    )
    let watchmaintype1 = await newWatchmaintype.save()
    let watchmaintype2 = await newWatchmaintype2.save()
    res.json(watchtype)
}

exports.add_watch_sub_type = function(req, res){
    let tyid = mongoose.Types.ObjectId(req.body.tyid)
    const newWatchsubtype = new Watchsubtype(
        {
            _id: tyid,
            name: req.body.wt_name
        }
    )
    newWatchsubtype.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.update_it_all = async function(req,res){
    await Watchtype.updateMany({_id:"5e2fe09fd6506f79a39c6fad"},{"type_name":"menwatch"})
    await Watchtype.updateMany({_id:"5e30038af16db81e325b69c4"},{"type_name":"womenwatch"})
    await Watchtype.updateMany({_id:"5e300399f16db81e325b69c7"},{"type_name":"couplewatch"})

    await Watchsubtype.updateMany({_id:"5e2e77187d507f1a376667de"},{"subtype_name":"regularwatch"})
    await Watchsubtype.updateMany({_id:"5e2e76e27d507f1a376667dd"},{"subtype_name":"customwatch"})

    await Watchmaintype.updateMany({_id:"5e2fe09fd6506f79a39c6fae"},{"type":"menwatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e2fe09fd6506f79a39c6faf"},{"type":"menwatch","subtype":"regularwatch"})
    //await Watchmaintype.updateMany({_id:"5e33ed82abdd2f537529c7ec"},{"type":"menwatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e30038af16db81e325b69c5"},{"type":"womenwatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e30038af16db81e325b69c6"},{"type":"womenwatch","subtype":"regularwatch"})
    //await Watchmaintype.updateMany({_id:"5e33eda1abdd2f537529c7f0"},{"type":"womenwatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e300399f16db81e325b69c8"},{"type":"couplewatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e300399f16db81e325b69c9"},{"type":"couplewatch","subtype":"regularwatch"})
    //await Watchmaintype.updateMany({_id:"5e33edbfabdd2f537529c7f4"},{"type":"couplewatch","subtype":"customwatch"})

    await Watch.updateMany({maintype_id:"5e2fe09fd6506f79a39c6fae"},{"type":"menwatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e2fe09fd6506f79a39c6faf"},{"type":"menwatch","subtype":"regularwatch"})
    //await Watch.updateMany({maintype_id:"5e33ed82abdd2f537529c7ec"},{"type":"menwatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e30038af16db81e325b69c5"},{"type":"womenwatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e30038af16db81e325b69c6"},{"type":"womenwatch","subtype":"regularwatch"})
    //await Watch.updateMany({maintype_id:"5e33eda1abdd2f537529c7f0"},{"type":"womenwatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e300399f16db81e325b69c8"},{"type":"couplewatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e300399f16db81e325b69c9"},{"type":"couplewatch","subtype":"regularwatch"})
    //await Watch.updateMany({maintype_id:"5e33edbfabdd2f537529c7f4"},{"type":"couplewatch","subtype":"customwatch"})
    res.json({"all":"updated"})
}

exports.get_all_watch_types = function(req, res){
    console.log("gt wt called")
    Watchtype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_watch_sub_types = function(req, res){
    console.log("gt wt called")
    Watchsubtype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_watch_main_types = function(req, res){
    console.log("gt wt called")
    Watchmaintype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_watch_main_types_by_typeid = function(req, res){
    console.log("gt wt called")
    Watchmaintype.find({type_id:req.params.typeid ,active_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_active_watch_types = function(req, res){
    console.log("gt wt called")
    Watchtype.find({active_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_watches_by_main_typeid = function(req, res){
    console.log("gt wt called")
    Watch.find({maintype_id : req.params.mtypeid ,available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}



exports.edit_watch_type = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Watchtype.findOneAndUpdate({_id:req.params.wtid},req.body)
    .then(result=> res.json({"result":"wt updated","updatedwt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_watch_maintype = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Watchmaintype.findOneAndUpdate({_id:req.params.wmtid},req.body)
    .then(result=> res.json({"result":"wmt updated","updatedwmt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.get_wt_by_id_admin = async function(req, res){
    let wtype = await Watchtype.findOne({_id:req.params.wtid})
    if(wtype){
        res.json(wtype)
        return
    }
    else{
        res.json({"error":"wtype not found"})
        return
    }
}

exports.get_wmt_by_id_admin = async function(req, res){
    let wmtype = await Watchmaintype.findOne({_id:req.params.wmtid})
    if(wmtype){
        res.json(wmtype)
        return
    }
    else{
        res.json({"error":"wmtype not found"})
        return
    }
}

exports.edit_wtype_status = function(req, res){
    Watchtype.findOneAndUpdate({_id:req.params.wtid},req.body)
    .then(result=> res.json({"result":"wtype updated","updatedwtype":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_wmaintype_status = function(req, res){
    Watchmaintype.findOneAndUpdate({_id:req.params.wmtid},req.body)
    .then(result=> res.json({"result":"wtype updated","updatedwtype":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_watch = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Watch.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"watch updated","updatedwatch":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_watchs = function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    Watch.updateMany({},req.body)
    .then(result=> res.json({"result":"watch updated","updatedwatchs":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_add_watch_type_name = async function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    await Watch.updateMany({type_id:"5e2fe09fd6506f79a39c6fad"},{type_name:"Men Watch"})
    await Watch.updateMany({type_id:"5e30038af16db81e325b69c4"},{type_name:"Women Watch"})
    await Watch.updateMany({type_id:"5e300399f16db81e325b69c7"},{type_name:"Couple Watch"})
    res.json({"watches":"updated"})
}

exports.edit_watch_status = function(req, res){
    Watch.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"watch updated","updatedwatch":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_watchs = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var watchsDelete = [];
    idsArrayf.forEach(function(item){     
    watchsDelete.push(new ObjectId(item));
});

Watch.deleteMany({'_id':{'$in': watchsDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_watchmaintypes = async function(req, res){
    var idsArrayf = ['5e302986b316ea33db34c616','5e302986b316ea33db34c617'];
    var watchsDelete = [];
    idsArrayf.forEach(function(item){     
    watchsDelete.push(new ObjectId(item));
});

let deletewatchmaintypes = await Watchmaintype.deleteMany({'_id':{'$in': watchsDelete}})
res.json({"yoyo":"dodo"})
}

exports.delete_watch_types = async function(req, res){
    var idsArrayf = req.body.todeleteids;
    var watchsDelete = [];
    idsArrayf.forEach(function(item){     
    watchsDelete.push(new ObjectId(item));
});

let deletewatchtypes = await Watchtype.deleteMany({'_id':{'$in': watchsDelete}})
let deletewatchmaintypes = await Watchmaintype.deleteMany({'type_id':{'$in': watchsDelete}})
let deletewatches = await Watch.deleteMany({'type_id':{'$in': watchsDelete}})
res.json({"yoyo":"dodo"})
}

exports.get_active_watchs = function(req, res){
    console.log("gt watchs called")
    Watch.find({available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_watchs = function(req, res){
    console.log("gt watchs called")
    Watch.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_watch_by_id_admin = async function(req, res){
    let watch = await Watch.findOne({_id:req.params.mid})
    if(watch){
        res.json(watch)
        return
    }
    else{
        res.json({"error":"watch not found"})
        return
    }
}

exports.get_watch_by_id = async function(req, res){
    let watch = await Watch.findOne({_id:req.params.mid})
    if(watch){
        res.json(watch)
        return
    }
    else{
        res.json({"error":"watch not found"})
        return
    }
}

exports.get_watchs_by_type = async function(req, res){
    let wtid = req.params.wtid
    let watch
    if(wtid == "5e28474558d8b85a2ba32f64"){
        watchs = await Watch.find({type:"RegularWatch", available_status : 1})
    }
    else if(wtid == "5e28476b58d8b85a2ba32f65"){
        watchs = await Watch.find({type:"EngravedWatch", available_status : 1})
    }
    else if(wtid == "5e28477f58d8b85a2ba32f66"){
        watchs = await Watch.find({type:"LetterWatch", available_status : 1})
    }
    else{
        res.json({"error":"invalid request"})
    }
   // let watch = await Watch.findOne({_id:req.params.mid})
    if(watchs){
        res.json(watchs)
        return
    }
    else{
        res.json({"error":"watch not found"})
        return
    }
}

exports.add_watch = async function(req, res){
    let typeid = req.body.watch_type
    console.log(req.body.watch_type)
    let watchtyperef = await Watchtype.findOne({_id : typeid})
    console.log(watchtyperef)
    let watchtypename = watchtyperef.name
    console.log(watchtypename)
    let subtypeid = req.body.watch_subtype
    console.log(typeid, subtypeid)
    let maintypeid = await Watchmaintype.findOne({type_id : typeid, subtype_id : subtypeid})
    console.log(maintypeid)
    const newWatch = new Watch(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.watch_name,
            maintype_id: maintypeid._id,
            maintype_name: maintypeid.name,
            type_id : typeid,
            type_name: watchtypename,
            subtype_id : subtypeid,
            size: req.body.watch_size,
            h_image: "noimage.png",
            shadow_image: "noimage.png",
            mask_image: "noimage.png",
            overlay_image: "noimage.png",
            price: req.body.price,
            description: req.body.description,
            pick_image_size: req.body.pick_image_size
        }
    )
    let watch = await newWatch.save()
    res.json(watch)
}






