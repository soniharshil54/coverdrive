const express = require("express")
const mongoose = require("mongoose")
const Product = require("../models/product")
const Phonecase = require("../models/phonecase")
const Phonecase4d = require("../models/phonecase4d")
const Phonecase3d = require("../models/phonecase3d")
const Phonecomp = require("../models/phonecomp")
const ObjectId = mongoose.Types.ObjectId

exports.add_company = function(req, res){
    console.log(req.body)
    let company_name = req.body.company_name
    const newPhonecomp = new Phonecomp(
        {
            _id: new mongoose.Types.ObjectId(),
            name: company_name,

        }
    )
    newPhonecomp.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"company added",company:result})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.delete_company = function(req, res){
    Phonecomp.findOneAndRemove({_id:req.params.cid})
    .then(result=> res.json({"result":"company deLeted","deleteduser":result}))
    .catch(err=>res.status(500).json(err))
}

exports.get_companies = function(req, res){
    Phonecomp.find()
         .then(result=>res.json(result))
         .catch(err=>res.json(err))
}

exports.get_active_companies = function(req, res){
    Phonecomp.find({active_status : 1})
         .then(result=>res.json(result))
         .catch(err=>res.json(err))
}

exports.get_all_companies = function(req, res){
    Phonecomp.find()
         .then(result=>res.json(result))
         .catch(err=>res.json(err))
}


exports.get_phonecases = function(req, res){
    Phonecase.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_active_phonecases = function(req, res){
    Phonecase.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_phonecases = function(req, res){
    Phonecase.find().select('name company _id create_date available_status').sort({create_date: -1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}



exports.get_phonecases_by_company = function(req, res){
    let reqcomp = req.params.company
    let lowerc = reqcomp.toLowerCase()
     let bcomp = lowerc.charAt(0).toUpperCase() + lowerc.slice(1)
   // let bcomp = reqcomp.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
    Phonecase.find({company: bcomp})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_4d_phonecases = function(req, res){
    Phonecase4d.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_4dcovers_by_company = function(req, res){
    Phonecase4d.find({company: req.params.company})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_4dcovers_by_company_2 = function(req, res){
    Phonecase.find({company: req.params.company})
    .populate('covers_4d')
    .select('covers_id')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_4dcovers_by_model_2 = function(req, res){
    Phonecase.findOne({_id: req.params.model_id})
    .populate('covers_4d')
    .select('covers_id')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_4dcovers_by_company_3 = function(req, res){
    let models = Phonecase.find({company: req.params.company}).populate('covers_4d').select('name _id covers_4d')
    res.json({"models":models})
    // Phonecase.find({company: req.params.company})
    // .populate('covers_4d')
    // .select('covers_id')
    // .then(result=>res.json(result))
    // .catch(err=>res.json(err))
}

exports.get_4dcovers_by_model = function(req, res){
    Phonecase4d.find({model_id: req.params.model_id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_4d_phonecase_by_id = function(req, res){
    Phonecase4d.findOne({_id: req.params.id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.edit_all_4d_phonecases = async function(req, res){
    console.log(req.body)
    let editbody = {
        slider_image : "cover4dn.jpg",
        inner_image : "mask.png",
    }
    let phonecaseupdate = await Phonecase4d.updateMany({}, editbody)
    console.log(phonecaseupdate)
   res.json({"result":"done"})
}

exports.add_4d_phonecase = async function(req, res){
    console.log(req.body)
    let mid = req.params.modelid
    console.log(mid)
    //let model_id = mongoose.Types.ObjectId(mid);
    const newPhonecase4d = new Phonecase4d(
        {
            _id: new mongoose.Types.ObjectId(),
            model_name: req.body.model_name,
            model_id: req.body.model_id,
            company: req.body.company,
            slider_image: "noimage.png",
            inner_image: "noimage.png",
            mask_image: "noimage.png",
            png_image: "noimage.png",
            header_image: "noimage.png"
        }
    )
    let cover_id = await newPhonecase4d.save()
    console.log("cover_id")
    console.log(cover_id._id)
    let cover_id_mon = mongoose.Types.ObjectId(cover_id._id);
    console.log("cover_id_mon")
    console.log(cover_id_mon)
    let phonemodel = await Phonecase.findOne({_id:req.params.modelid})
   // console.log(phonemodel)
    let covers_4d = phonemodel.covers_4d
    covers_4d.push(cover_id_mon)
    let cover_data = {
        covers_4d : covers_4d
    }
    let phonemodeladd = await Phonecase.findOneAndUpdate({_id:req.params.modelid},cover_data)

    console.log(phonemodeladd)
    res.json({result:cover_id})
    
}

exports.delete_4d_phonecases = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Phonecase4d.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.get_models_by_company = function(req, res){
    let reqcomp = req.params.company
    let lowerc = reqcomp.toLowerCase()
     let bcomp = lowerc.charAt(0).toUpperCase() + lowerc.slice(1)
    Phonecase.find({company: bcomp})
    .select('name _id')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_models_by_company_id = async function(req, res){
    let companyref = await Phonecomp.findOne({_id:req.params.cid})
    let bcomp = companyref.name
    let phonecases = await Phonecase.find({company: bcomp,available_status: 1}).select('name _id')
    res.json(phonecases)
}

exports.get_phonecase_by_id_admin = function(req, res){
    Phonecase.findOne({_id: req.params.pid})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}



exports.get_phonecase_by_id = async function(req, res){
    let phonecase = await Phonecase.findOne({_id:req.params.id}).populate('covers_4d')
    // let phonecase = await Phonecase.findOne({_id:req.params.id}).populate('covers_4d')
    //let phonecase = await phonecaseo.populate('covers_4d')

    if(phonecase){
        console.log(phonecase)
        let newphone = phonecase.toObject()
        let data = []
        let obj2d = {
            type:"2d",
            title: "2D phonecase",
            size: phonecase.size_2d,
            available: phonecase.available_2d ,
            price: phonecase.price_2d,
            description: phonecase.description_2d,
            image_header: phonecase.image_header_2d,
            image_cover: phonecase.image_inner_2d,
            image_mask: phonecase.image_mask_2d,
            pick_image_size: "312x633"
        }
        let obj3d = {
            type:"3d",
            title: "3D phonecase",
            size: phonecase.size_3d,
            available: phonecase.available_3d ,
            price: phonecase.price_3d,
            description: phonecase.description_3d,
            image_header: phonecase.image_header_3d,
            image_cover: phonecase.image_inner_3d,
            image_mask: phonecase.image_mask_3d,
            pick_image_size: "312x633"
        }
        let obj4d = {
            type:"4d",
            title: "4D phonecase",
            size: phonecase.size_4d,
            available: phonecase.available_4d,
            price: phonecase.price_4d,
            description: phonecase.description_4d,
            image_header: phonecase.image_header_4d,
            image_inner: phonecase.image_inner_4d,
            pick_image_size: "312x633"
        }
      //  phonecase.data = data
        //console.log(phonecase.data)
        //console.log(phonecase)
        if(phonecase.available_2d === 1){
            data.push(obj2d)
        }
        if(phonecase.available_3d === 1){
            data.push(obj3d)
        }
        if(phonecase.available_4d === 1){
            data.push(obj4d)
        }

         var ndata = {data: data};
         let nphonecase = {...newphone, ...ndata};
         delete nphonecase.size_2d;
         delete nphonecase.price_2d;
         delete nphonecase.description_2d;
         delete nphonecase.image_header_2d;
         delete nphonecase.image_inner_2d;
         delete nphonecase.image_mask_2d;
         delete nphonecase.size_3d;
         delete nphonecase.price_3d;
         delete nphonecase.description_3d;
         delete nphonecase.image_header_3d;
         delete nphonecase.image_inner_3d;
         delete nphonecase.image_mask_3d;
         delete nphonecase.size_4d;
         delete nphonecase.price_4d;
         delete nphonecase.description_4d;
         delete nphonecase.image_header_4d;
         delete nphonecase.image_inner_4d;
         delete nphonecase.available_2d;
         delete nphonecase.available_3d;
         delete nphonecase.available_4d;
         console.log(nphonecase)
       // let newp = JSON.stringify(nphonecase)
        res.json(nphonecase)
        return
    }
    else{
        res.json({"error":"phonecase not found"})
        return
    }
}

exports.add_phonecase = function(req, res){
    console.log(req.body)
    const newPhonecase = new Phonecase(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            company: req.body.company,
            size_2d: req.body.size_2d ? req.body.size_2d : "Add 2d Size here",
            size_3d: req.body.size_3d ? req.body.size_3d : "Add 3d Size here" ,
            size_4d: req.body.size_4d ? req.body.size_4d : "Add 4d Size here" ,
            price_2d: req.body.price_2d ? req.body.price_2d : "200" ,
            price_3d: req.body.price_3d ? req.body.price_3d : "300",
            price_4d: req.body.price_4d ? req.body.price_4d : "400",
            description_2d: req.body.description_2d ? req.body.description_2d : "Add 2d Description here" ,
            description_3d: req.body.description_3d ? req.body.description_3d : "Add 3d Description here",
            description_4d: req.body.description_4d ? req.body.description_4d : "Add 4d Description here",
            image_header_2d: "noimage.png",
            image_header_3d: "noimage.png",
            image_header_4d: "noimage.png",
            image_inner_2d: "noimage.png",
            image_inner_3d: "noimage.png",
            image_inner_4d: "noimage.png",
            image_mask_2d: "noimage.png",
            image_mask_3d: "noimage.png",
            available_2d: req.body.available_2d ? req.body.available_2d : 0,
            available_3d: req.body.available_3d ? req.body.available_3d : 0,
            available_4d: req.body.available_4d ? req.body.available_4d : 0,
            available_status: req.body.available_status
        }
    )
    newPhonecase.save()
    .then((result => {
        //console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added",product:result})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_4d_phonecase = async function(req, res){
    console.log(req.body)
    let mid = req.params.modelid
    console.log(mid)
    //let model_id = mongoose.Types.ObjectId(mid);
    const newPhonecase4d = new Phonecase4d(
        {
            _id: new mongoose.Types.ObjectId(),
            model_name: req.body.model_name,
            model_id: req.body.model_id,
            company: req.body.company,
            slider_image: "noimage.png",
            inner_image: "noimage.png",
            mask_image: "noimage.png",
            png_image: "noimage.png",
            header_image: "noimage.png"
        }
    )
    let cover_id = await newPhonecase4d.save()
    console.log("cover_id")
    console.log(cover_id._id)
    let cover_id_mon = mongoose.Types.ObjectId(cover_id._id);
    console.log("cover_id_mon")
    console.log(cover_id_mon)
    let phonemodel = await Phonecase.findOne({_id:req.params.modelid})
   // console.log(phonemodel)
    let covers_4d = phonemodel.covers_4d
    covers_4d.push(cover_id_mon)
    let cover_data = {
        covers_4d : covers_4d
    }
    let phonemodeladd = await Phonecase.findOneAndUpdate({_id:req.params.modelid},cover_data)

    console.log(phonemodeladd)
    res.json({result:cover_id})
    
}

// exports.add_4d_phonecase = function(req, res){
//     console.log(req.body)
//     let mid = req.params.modelid
//     console.log(mid)
//     let model_id = mongoose.Types.ObjectId(mid);
//     const newPhonecase4d = new Phonecase4d(
//         {
//             _id: new mongoose.Types.ObjectId(),
//             model_name: req.body.model_name,
//             model_id: model_id,
//             company: req.body.company,
//             slider_image: "noimage.png",
//             inner_image: "noimage.png"
//         }
//     )
//     newPhonecase4d.save()
//     .then((result => {
//         Phonecase.findOne({_id:req.params.modelid})
//         .then(resultn => {
//             console.log(resultn)
//             //return
//             let models = resultn.covers_4d
//             let model_id_n = mongoose.Types.ObjectId(result._id);
//             models.push(model_id_n)
//             let ncovers = {
//                 covers_4d : models
//             }
//             Product.findOneAndUpdate({_id:req.params.modelid},{ncovers})
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
//         })
//         //console.log(result)
       
//         //res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added",product:result})
//     }))
//       .catch(err => {
//         console.log(err)
//         res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
//     })
// }

exports.edit_phonecase = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Phonecase.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_phonecase_status = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Phonecase.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"phonecase updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_4d_phonecase_status = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Phonecase4d.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"4d phonecase updated","updated4dphonecase":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_all_phonecases = async function(req, res){
    console.log(req.body)
    let editbody = {
        image_inner_2d : "cover.png",
        image_mask_2d : "mask.png",
        image_inner_3d : "cover.png",
        image_mask_3d : "mask.png"
    }
    let phonecaseupdate = await Phonecase.updateMany({}, editbody)
    console.log(phonecaseupdate)
   res.json({"result":"done"})
}

exports.edit_all_4d_phonecases = async function(req, res){
    console.log(req.body)
    let editbody = {
        slider_image : "cover4dn.jpg",
        inner_image : "mask.png",
    }
    let phonecaseupdate = await Phonecase4d.updateMany({}, editbody)
    console.log(phonecaseupdate)
   res.json({"result":"done"})
}

exports.edit_company = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Phonecomp.findOneAndUpdate({_id:req.params.cid},req.body)
    .then(result=> res.json({"result":"company updated","updatedcompany":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_company_name = async function(req, res){
    console.log(req.body)
    console.log(req.params)
    let compdata = {
        name : req.body.name
    }
    let oldcompany = req.body.oldname
    let companydata = {
        company: req.body.name
    }
    let updatecompname = await Phonecomp.findOneAndUpdate({_id:req.params.cid},compdata)
    let phonecaseupdate = await Phonecase.updateMany({company: oldcompany }, companydata)
    console.log(phonecaseupdate)
   res.json({"result":"done"})
}

exports.delete_phonecases = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Phonecase.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_4d_phonecases = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Phonecase4d.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_companies = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var companiesDelete = [];
    idsArrayf.forEach(function(item){     
    companiesDelete.push(new ObjectId(item));
});

Phonecomp.deleteMany({'_id':{'$in': companiesDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.add_product = function(req, res) {
    const newProduct = new Product(
        {
            _id: new mongoose.Types.ObjectId(),
            name:"phonecover",
            categories: [
                {
                    model:"samsung",
                    subcategory: ["m30", "m50", "j7", "j2"],
                    price:120,
                    availability_status: 1
                },
                {
                    model:"oppo",
                    subcategory: ["a5", "a7"],
                    price:120,
                    availability_status: 1
                },
                {
                    model:"xiaomi",
                    subcategory: ["redmi8", "redmi note7", "note6", "redmi6a"],
                    price:120,
                    availability_status: 1
                },
                {
                    model:"vivo",
                    subcategory: ["v5", "v7", "v11"],
                    price:120,
                    availability_status: 1
                }
            ]
        }
    )
        newProduct.save()
        .then((result => {
            console.log(result)
            res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added"})
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}

exports.add_category = async function(req, res){
    let newCategory = req.body.new_category
    let product_id = req.body.product_id
    let product = await Product.findOne({_id:product_id})
    let categories = product.categories
    categories.push(newCategory)
    Product.findOneAndUpdate({_id:product_id},{categories})
    .then(result=> res.json({"result":"user updated","updateduser":result}))
    .catch(err=>res.status(404).json(err))
}

exports.add_category = async function(req, res){
    let newCategory = req.body.new_category
    let product_id = req.body.product_id
    let product = await Product.findOne({_id:product_id})
    let categories = product.categories
    categories.push(newCategory)
    Product.findOneAndUpdate({_id:product_id},{categories})
    .then(result=> res.json({"result":"user updated","updateduser":result}))
    .catch(err=>res.status(404).json(err))
}

exports.update_subcategory = async function(req, res){
    let newCategory = req.body.new_category
    let product_id = req.body.product_id
    let product = await Product.findOne({_id:product_id})
    let categories = product.categories
    categories.push(newCategory)
    Product.findOneAndUpdate({_id:product_id},{categories})
    .then(result=> res.json({"result":"user updated","updateduser":result}))
    .catch(err=>res.status(404).json(err))
}

exports.get_all_3d_phonecases = function(req, res){
    Phonecase3d.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_3dcovers_by_company = function(req, res){
    Phonecase3d.find({company: req.params.company})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_3dcovers_by_company_2 = function(req, res){
    Phonecase.find({company: req.params.company})
    .populate('covers_3d')
    .select('covers_id')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_3dcovers_by_model_2 = function(req, res){
    Phonecase.findOne({_id: req.params.model_id})
    .populate('covers_3d')
    .select('covers_id')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_3dcovers_by_company_3 = function(req, res){
    let models = Phonecase.find({company: req.params.company}).populate('covers_3d').select('name _id covers_3d')
    res.json({"models":models})
    // Phonecase.find({company: req.params.company})
    // .populate('covers_3d')
    // .select('covers_id')
    // .then(result=>res.json(result))
    // .catch(err=>res.json(err))
}

exports.get_3dcovers_by_model = function(req, res){
    Phonecase3d.find({model_id: req.params.model_id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_3d_phonecase_by_id = function(req, res){
    Phonecase3d.findOne({_id: req.params.id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.edit_all_3d_phonecases = async function(req, res){
    console.log(req.body)
    let editbody = {
        slider_image : "cover3dn.jpg",
        inner_image : "mask.png",
    }
    let phonecaseupdate = await Phonecase3d.updateMany({}, editbody)
    console.log(phonecaseupdate)
   res.json({"result":"done"})
}

exports.add_3d_phonecase = async function(req, res){
    console.log(req.body)
    let mid = req.params.modelid
    console.log(mid)
    //let model_id = mongoose.Types.ObjectId(mid);
    const newPhonecase3d = new Phonecase3d(
        {
            _id: new mongoose.Types.ObjectId(),
            model_name: req.body.model_name,
            model_id: req.body.model_id,
            company: req.body.company,
            slider_image: "noimage.png",
            inner_image: "noimage.png",
            mask_image: "noimage.png",
            png_image: "noimage.png",
            header_image: "noimage.png"
        }
    )
    let cover_id = await newPhonecase3d.save()
    console.log("cover_id")
    console.log(cover_id._id)
    let cover_id_mon = mongoose.Types.ObjectId(cover_id._id);
    console.log("cover_id_mon")
    console.log(cover_id_mon)
//     let phonemodel = await Phonecase.findOne({_id:req.params.modelid})
//    // console.log(phonemodel)
//     let covers_3d = phonemodel.covers_3d
//     covers_3d.push(cover_id_mon)
//     let cover_data = {
//         covers_3d : covers_3d
//     }
//     let phonemodeladd = await Phonecase.findOneAndUpdate({_id:req.params.modelid},cover_data)

    // console.log(phonemodeladd)
    res.json({result:cover_id})
    
}

exports.delete_3d_phonecases = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Phonecase3d.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.edit_3d_phonecase_status = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Phonecase3d.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"3d phonecase updated","updated3dphonecase":result}))
    .catch(err=>res.status(404).json(err))
}

