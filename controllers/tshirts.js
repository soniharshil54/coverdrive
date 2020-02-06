const express = require("express")
const mongoose = require("mongoose")
const Tshirt = require("../models/tshirt")
const Tshirttype = require("../models/tshirttype")
const Tshirtmaintype = require("../models/tshirtmaintype")
const Tshirtsubtype = require("../models/tshirtsubtype")
const ObjectId = mongoose.Types.ObjectId

exports.add_tshirt_type = async function(req, res){
    const newTshirttype = new Tshirttype(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.tt_name,
            slider_image: "noimage.png"
        }
    )
    let tshirttype = await newTshirttype.save()
    let tshirttypeid = tshirttype._id
    let tshirttypename = tshirttype.name
    const newTshirtmaintype = new Tshirtmaintype(
        {
            _id: new mongoose.Types.ObjectId(),
            type_id: tshirttypeid,
            type_name : tshirttypename,
            subtype_id: "5e32ccfb1d82674557b07784",
            subtype_name: "Graphic T-shirt",
            name: req.body.tt_name + " " + "Graphic T-shirt",
            slider_image: "noimage.png"
        }
    )
    const newTshirtmaintype2 = new Tshirtmaintype(
        {
            _id: new mongoose.Types.ObjectId(),
            type_id: tshirttypeid,
            type_name : tshirttypename,
            subtype_id: "5e32cd668719bf459bfa93c6",
            subtype_name: "Solid T-shirt",
            name: req.body.tt_name + " " + "Solid T-shirt",
            slider_image: "noimage.png"
        }
    )
    const newTshirtmaintype3 = new Tshirtmaintype(
        {
            _id: new mongoose.Types.ObjectId(),
            type_id: tshirttypeid,
            type_name : tshirttypename,
            subtype_id: "5e32cd728719bf459bfa93c7",
            subtype_name: "Custom T-shirt",
            name: req.body.tt_name + " " + "Custom T-shirt",
            slider_image: "noimage.png"
        }
    )
    let tshirtmaintype1 = await newTshirtmaintype.save()
    let tshirtmaintype2 = await newTshirtmaintype2.save()
    let tshirtmaintype3 = await newTshirtmaintype3.save()
    res.json(tshirttype)
}

exports.add_tshirt_sub_type = async function(req, res){
    let tyid1 = mongoose.Types.ObjectId("5e32ccfb1d82674557b07784")
    let tyid2 = mongoose.Types.ObjectId("5e32cd668719bf459bfa93c6")
    let tyid3 = mongoose.Types.ObjectId("5e32cd728719bf459bfa93c7")
    const newTshirtsubtype1 = new Tshirtsubtype(
        {
            _id: tyid1,
            name: "Graphic T-shirt"
        }
    )
    const newTshirtsubtype2 = new Tshirtsubtype(
        {
            _id: tyid2,
            name: "Solid T-shirt"
        }
    )
    const newTshirtsubtype3 = new Tshirtsubtype(
        {
            _id: tyid3,
            name: "Custom T-shirt"
        }
    )
    await newTshirtsubtype1.save()
    await newTshirtsubtype2.save()
    await newTshirtsubtype3.save()
    res.json({"tshirt":"added"})
}

exports.get_all_tshirt_types = function(req, res){
    //console.log("gt tt called")
    Tshirttype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.update_it_all = async function(req,res){
    await Tshirttype.updateMany({_id:"5e33ed82abdd2f537529c7e9"},{"type_name":"mentshirt"})
    await Tshirttype.updateMany({_id:"5e33eda1abdd2f537529c7ed"},{"type_name":"womentshirt"})
    await Tshirttype.updateMany({_id:"5e33edbfabdd2f537529c7f1"},{"type_name":"coupletshirt"})

    await Tshirtsubtype.updateMany({_id:"5e32ccfb1d82674557b07784"},{"subtype_name":"graphictshirt"})
    await Tshirtsubtype.updateMany({_id:"5e32cd668719bf459bfa93c6"},{"subtype_name":"solidtshirt"})
    await Tshirtsubtype.updateMany({_id:"5e32cd728719bf459bfa93c7"},{"subtype_name":"customtshirt"})

    await Tshirtmaintype.updateMany({_id:"5e33ed82abdd2f537529c7ea"},{"type":"mentshirt","subtype":"graphictshirt"})
    await Tshirtmaintype.updateMany({_id:"5e33ed82abdd2f537529c7eb"},{"type":"mentshirt","subtype":"solidtshirt"})
    await Tshirtmaintype.updateMany({_id:"5e33ed82abdd2f537529c7ec"},{"type":"mentshirt","subtype":"customtshirt"})
    await Tshirtmaintype.updateMany({_id:"5e33eda1abdd2f537529c7ee"},{"type":"womentshirt","subtype":"graphictshirt"})
    await Tshirtmaintype.updateMany({_id:"5e33eda1abdd2f537529c7ef"},{"type":"womentshirt","subtype":"solidtshirt"})
    await Tshirtmaintype.updateMany({_id:"5e33eda1abdd2f537529c7f0"},{"type":"womentshirt","subtype":"customtshirt"})
    await Tshirtmaintype.updateMany({_id:"5e33edbfabdd2f537529c7f2"},{"type":"coupletshirt","subtype":"graphictshirt"})
    await Tshirtmaintype.updateMany({_id:"5e33edbfabdd2f537529c7f3"},{"type":"coupletshirt","subtype":"solidtshirt"})
    await Tshirtmaintype.updateMany({_id:"5e33edbfabdd2f537529c7f4"},{"type":"coupletshirt","subtype":"customtshirt"})

    await Tshirt.updateMany({maintype_id:"5e33ed82abdd2f537529c7ea"},{"type":"mentshirt","subtype":"graphictshirt"})
    await Tshirt.updateMany({maintype_id:"5e33ed82abdd2f537529c7eb"},{"type":"mentshirt","subtype":"solidtshirt"})
    await Tshirt.updateMany({maintype_id:"5e33ed82abdd2f537529c7ec"},{"type":"mentshirt","subtype":"customtshirt"})
    await Tshirt.updateMany({maintype_id:"5e33eda1abdd2f537529c7ee"},{"type":"womentshirt","subtype":"graphictshirt"})
    await Tshirt.updateMany({maintype_id:"5e33eda1abdd2f537529c7ef"},{"type":"womentshirt","subtype":"solidtshirt"})
    await Tshirt.updateMany({maintype_id:"5e33eda1abdd2f537529c7f0"},{"type":"womentshirt","subtype":"customtshirt"})
    await Tshirt.updateMany({maintype_id:"5e33edbfabdd2f537529c7f2"},{"type":"coupletshirt","subtype":"graphictshirt"})
    await Tshirt.updateMany({maintype_id:"5e33edbfabdd2f537529c7f3"},{"type":"coupletshirt","subtype":"solidtshirt"})
    await Tshirt.updateMany({maintype_id:"5e33edbfabdd2f537529c7f4"},{"type":"coupletshirt","subtype":"customtshirt"})
    res.json({"all":"updated"})
}

exports.get_all_tshirt_subtypes = function(req, res){
   // console.log("gt tt called")
    Tshirtsubtype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_tshirt_main_types = function(req, res){
   // console.log("gt tt called")
    Tshirtmaintype.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_tshirt_main_types_by_typeid = function(req, res){
   // console.log("gt tt called")
    Tshirtmaintype.find({type_id:req.params.typeid ,active_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_active_tshirt_types = function(req, res){
   // console.log("gt tt called")
    Tshirttype.find({active_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_tshirtes_by_main_typeid = function(req, res){
   // console.log("gt tt called")
    Tshirt.find({maintype_id : req.params.mtypeid ,available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}



exports.edit_tshirt_type = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Tshirttype.findOneAndUpdate({_id:req.params.ttid},req.body)
    .then(result=> res.json({"result":"tt updated","updatedtt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_tshirt_maintype = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Tshirtmaintype.findOneAndUpdate({_id:req.params.tmtid},req.body)
    .then(result=> res.json({"result":"tmt updated","updatedtmt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.get_tt_by_id_admin = async function(req, res){
    let ttype = await Tshirttype.findOne({_id:req.params.ttid})
    if(ttype){
        res.json(ttype)
        return
    }
    else{
        res.json({"error":"ttype not found"})
        return
    }
}

exports.get_tmt_by_id_admin = async function(req, res){
    let tmtype = await Tshirtmaintype.findOne({_id:req.params.tmtid})
    if(tmtype){
        res.json(tmtype)
        return
    }
    else{
        res.json({"error":"tmtype not found"})
        return
    }
}

exports.edit_ttype_status = function(req, res){
    Tshirttype.findOneAndUpdate({_id:req.params.ttid},req.body)
    .then(result=> res.json({"result":"ttype updated","updatedttype":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_wmaintype_status = function(req, res){
    Tshirtmaintype.findOneAndUpdate({_id:req.params.tmtid},req.body)
    .then(result=> res.json({"result":"ttype updated","updatedttype":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_tshirt = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Tshirt.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"tshirt updated","updatedtshirt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_tshirts = function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    Tshirt.updateMany({},req.body)
    .then(result=> res.json({"result":"tshirt updated","updatedtshirts":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_add_tshirt_type_name = async function(req, res){
    //console.log(req.body)
    //console.log(req.params)
    await Tshirt.updateMany({type_id:"5e2fe09fd6506f79a39c6fad"},{type_name:"Men Tshirt"})
    await Tshirt.updateMany({type_id:"5e30038af16db81e325b69c4"},{type_name:"Women Tshirt"})
    await Tshirt.updateMany({type_id:"5e300399f16db81e325b69c7"},{type_name:"Couple Tshirt"})
    res.json({"tshirtes":"updated"})
}

exports.edit_tshirt_status = function(req, res){
    Tshirt.findOneAndUpdate({_id:req.params.mid},req.body)
    .then(result=> res.json({"result":"tshirt updated","updatedtshirt":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_tshirts = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var tshirtsDelete = [];
    idsArrayf.forEach(function(item){     
    tshirtsDelete.push(new ObjectId(item));
});

Tshirt.deleteMany({'_id':{'$in': tshirtsDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_tshirtmaintypes = async function(req, res){
    var idsArrayf = ['5e302986b316ea33db34c616','5e302986b316ea33db34c617'];
    var tshirtsDelete = [];
    idsArrayf.forEach(function(item){     
    tshirtsDelete.push(new ObjectId(item));
});

let deletetshirtmaintypes = await Tshirtmaintype.deleteMany({'_id':{'$in': tshirtsDelete}})
res.json({"yoyo":"dodo"})
}

exports.delete_tshirt_types = async function(req, res){
    var idsArrayf = req.body.todeleteids;
    var tshirtsDelete = [];
    idsArrayf.forEach(function(item){     
    tshirtsDelete.push(new ObjectId(item));
});

let deletetshirttypes = await Tshirttype.deleteMany({'_id':{'$in': tshirtsDelete}})
let deletetshirtmaintypes = await Tshirtmaintype.deleteMany({'type_id':{'$in': tshirtsDelete}})
let deletetshirtes = await Tshirt.deleteMany({'type_id':{'$in': tshirtsDelete}})
res.json({"yoyo":"dodo"})
}

exports.get_active_tshirts = function(req, res){
   // console.log("gt tshirts called")
    Tshirt.find({available_status : 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_tshirts = function(req, res){
   // console.log("gt tshirts called")
    Tshirt.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_tshirt_names = function(req, res){
   // console.log("gt tshirts called")
    Tshirt.find().select('name')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_tshirt_by_id_admin = async function(req, res){
    let tshirt = await Tshirt.findOne({_id:req.params.mid})
    if(tshirt){
        res.json(tshirt)
        return
    }
    else{
        res.json({"error":"tshirt not found"})
        return
    }
}

exports.get_tshirt_by_id = async function(req, res){
    let tshirt = await Tshirt.findOne({_id:req.params.mid})
    if(tshirt){
        res.json(tshirt)
        return
    }
    else{
        res.json({"error":"tshirt not found"})
        return
    }
}

exports.get_tshirts_by_type = async function(req, res){
    let ttid = req.params.ttid
    let tshirt
    if(ttid == "5e28474558d8b85a2ba32f64"){
        tshirts = await Tshirt.find({type:"RegularTshirt", available_status : 1})
    }
    else if(ttid == "5e28476b58d8b85a2ba32f65"){
        tshirts = await Tshirt.find({type:"EngravedTshirt", available_status : 1})
    }
    else if(ttid == "5e28477f58d8b85a2ba32f66"){
        tshirts = await Tshirt.find({type:"LetterTshirt", available_status : 1})
    }
    else{
        res.json({"error":"invalid request"})
    }
   // let tshirt = await Tshirt.findOne({_id:req.params.mid})
    if(tshirts){
        res.json(tshirts)
        return
    }
    else{
        res.json({"error":"tshirt not found"})
        return
    }
}

exports.add_tshirt = async function(req, res){
    let typeid = req.body.tshirt_type
    let subtypeid = req.body.tshirt_subtype
    console.log(req.body.tshirt_type)
    let tshirttyperef = await Tshirttype.findOne({_id : typeid})
    let tshirttypestatic = tshirttyperef.type_name
    let tshirtsubtyperef = await Tshirtsubtype.findOne({_id : subtypeid})
    let tshirtsubtypestatic = tshirtsubtyperef.subtype_name
  //  console.log(tshirttyperef)
    let tshirttypename = tshirttyperef.name
    console.log(tshirttypename)
    
    console.log(typeid, subtypeid)
    let maintypeid = await Tshirtmaintype.findOne({type_id : typeid, subtype_id : subtypeid})
 //   console.log(maintypeid)
    const newTshirt = new Tshirt(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.tshirt_name,
            maintype_id: maintypeid._id,
            maintype_name: maintypeid.name,
            type_id : typeid,
            type_name: tshirttypename,
            type: tshirttypestatic,
            subtype: tshirtsubtypestatic,
            subtype_id : subtypeid,
            sizes_available: req.body.tshirt_size,
            sizes_available_2: req.body.tshirt_size_2,
            h_image: "noimage.png",
            shadow_image: "noimage.png",
            mask_image: "noimage.png",
            overlay_image: "noimage.png",
            price: req.body.price,
            description: req.body.description,
            pick_image_size: req.body.pick_image_size
        }
    )
    let tshirt = await newTshirt.save()
    res.json(tshirt)
}






