const express = require("express")
const mongoose = require("mongoose")
const Product = require("../models/product")
const Phonecase = require("../models/phonecase")
const Phonecase4d = require("../models/phonecase4d")
const Phonecomp = require("../models/phonecomp")
const ObjectId = mongoose.Types.ObjectId

exports.add_company = function(req, res){
    console.log(req.body)
    let company_name = req.body.company_name
    const newPhonecomp = new Phonecomp(
        {
            _id: new mongoose.Types.ObjectId(),
            name: company_name
        }
    )
    newPhonecomp.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"company added"})
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

exports.get_phonecases = function(req, res){
    Phonecase.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_phonecases_by_company = function(req, res){
    Phonecase.find({company: req.params.company})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_4dcovers_by_company = function(req, res){
    Phonecase4d.find({company: req.params.company})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}



exports.get_models_by_company = function(req, res){
    Phonecase.find({company: req.params.company})
    .select('name _id')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_4dcovers_by_model = function(req, res){
    Phonecase4d.find({model_id: req.params.model_id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_phonecase_by_id = async function(req, res){
    let phonecase = await Phonecase.findOne({_id:req.params.id})
    if(phonecase){
        console.log(phonecase)
        let newphone = phonecase.toObject()
        let data = []
        let obj2d = {
            size: phonecase.size_2d,
            price: phonecase.price_2d,
            description: phonecase.description_2d,
            image_header: phonecase.image_header_2d,
            image_inner: phonecase.image_inner_2d
        }
        let obj3d = {
            size: phonecase.size_3d,
            price: phonecase.price_3d,
            description: phonecase.description_3d,
            image_header: phonecase.image_header_3d,
            image_inner: phonecase.image_inner_3d
        }
        let obj4d = {
            size: phonecase.size_4d,
            price: phonecase.price_4d,
            description: phonecase.description_4d,
            image_header: phonecase.image_header_4d,
            image_inner: phonecase.image_inner_4d
        }
      //  phonecase.data = data
        //console.log(phonecase.data)
        //console.log(phonecase)
         data.push(obj2d,obj3d,obj4d)
         var ndata = {data: data};
         let nphonecase = {...newphone, ...ndata};
         delete nphonecase.size_2d;
         delete nphonecase.price_2d;
         delete nphonecase.description_2d;
         delete nphonecase.image_header_2d;
         delete nphonecase.image_inner_2d;
         delete nphonecase.size_3d;
         delete nphonecase.price_3d;
         delete nphonecase.description_3d;
         delete nphonecase.image_header_3d;
         delete nphonecase.image_inner_3d;
         delete nphonecase.size_4d;
         delete nphonecase.price_4d;
         delete nphonecase.description_4d;
         delete nphonecase.image_header_4d;
         delete nphonecase.image_inner_4d;
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
            size_2d: req.body.size_2d,
            size_3d: req.body.size_3d,
            size_4d: req.body.size_4d,
            price_2d: req.body.price_2d,
            price_3d: req.body.price_3d,
            price_4d: req.body.price_4d,
            description_2d: req.body.description_2d,
            description_3d: req.body.description_3d,
            description_4d: req.body.description_4d,
            image_header_2d: "noimage.png",
            image_header_3d: "noimage.png",
            image_header_4d: "noimage.png",
            image_inner_2d: "noimage.png",
            image_inner_3d: "noimage.png",
            image_inner_4d: "noimage.png",
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

exports.add_4d_phonecase = function(req, res){
    console.log(req.body)
    let mid = req.params.modelid
    console.log(mid)
    let model_id = mongoose.Types.ObjectId(mid);
    const newPhonecase4d = new Phonecase4d(
        {
            _id: new mongoose.Types.ObjectId(),
            model_name: req.body.model_name,
            model_id: model_id,
            company: req.body.company,
            slider_image: "noimage.png",
            inner_image: "noimage.png"
        }
    )
    newPhonecase4d.save()
    .then((result => {
        //console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added",product:result})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.edit_phonecase = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Phonecase.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
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

