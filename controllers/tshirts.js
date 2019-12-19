const express = require("express")
const mongoose = require("mongoose")
const Product = require("../models/product")
const Phonecase = require("../models/phonecase")
const Phonecomp = require("../models/phonecomp")
const Tshirttype = require("../models/tshirttype")
const ObjectId = mongoose.Types.ObjectId

exports.add_type = function(req, res){
    console.log(req.body)
    let type_name = req.body.type_name
    const newTshirttype = new Tshirttype(
        {
            _id: new mongoose.Types.ObjectId(),
            name: type_name
        }
    )
    newTshirttype.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"company added"})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.get_types = function(req, res){
    Tshirttype.find()
         .then(result=>res.json(result))
         .catch(err=>res.json(err))
}

exports.get_tshirts = function(req, res){
    Tshirt.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.add_tshirt = function(req, res){
    console.log(req.body)
    const newTshirt = new Tshirt(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            type: req.body.type,
            category: req.body.category,
            size: req.body.size,
            h_image: "noimage.png",
            in_image: "noimage.png",
            sizes_available: req.body.sizes,
            price: req.body.price,
            description: req.body.description,
            available_status: req.body.available_status
        }
    )
    newTshirt.save()
    .then((result => {
        //console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added",product:result})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.edit_tshirt = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Tshirt.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_tshirts = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Tshirt.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.add_stuff = function(req, res) {
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

