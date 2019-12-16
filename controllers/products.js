const express = require("express")
const mongoose = require("mongoose")
const Product = require("../models/product")

exports.add_keychain = function(req, res){
    const newKeychain = new Keychain(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            size: req.body.size,
            h_image: "path/head.jpg",
            in_image: "path/in.jpg",
            price: req.body.price,
            description: req.body.description,
            availability_status: req.body.availability_status
        }
    )
    newKeychain.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added"})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_mug = function(req, res){
    const newMug = new Mug(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            size: req.body.size,
            h_image: "path/head.jpg",
            in_image: "path/in.jpg",
            price: req.body.price,
            description: req.body.description,
            availability_status: req.body.availability_status
        }
    )
    newMug.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added"})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_photoframe = function(req, res){
    const newPhotoframe = new Photoframe(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            size: req.body.size,
            h_image: "path/head.jpg",
            in_image: "path/in.jpg",
            price: req.body.price,
            description: req.body.description,
            availability_status: req.body.availability_status
        }
    )
    newPhotoframe.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added"})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_popholder = function(req, res){
    const newPopholder = new Popholder(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            size: req.body.size,
            h_image: "path/head.jpg",
            in_image: "path/in.jpg",
            price: req.body.price,
            description: req.body.description,
            availability_status: req.body.availability_status
        }
    )
    newPopholder.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added"})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_slipperbottle = function(req, res){
    const newSlipperbottle = new Slipperbottle(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            size: req.body.size,
            h_image: "path/head.jpg",
            in_image: "path/in.jpg",
            price: req.body.price,
            description: req.body.description,
            availability_status: req.body.availability_status
        }
    )
    newSlipperbottle.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added"})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_wallclock = function(req, res){
    const newWallclock = new Wallclock(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            size: req.body.size,
            h_image: "path/head.jpg",
            in_image: "path/in.jpg",
            price: req.body.price,
            description: req.body.description,
            availability_status: req.body.availability_status
        }
    )
    newWallclock.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added"})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_watch = function(req, res){
    const newWatch = new Watch(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            size: req.body.size,
            h_image: "path/head.jpg",
            in_image: "path/in.jpg",
            price: req.body.price,
            description: req.body.description,
            availability_status: req.body.availability_status
        }
    )
    newWatch.save()
    .then((result => {
        console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added"})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
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

