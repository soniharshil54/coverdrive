const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const Product = require("../models/product")
const Keychain = require("../models/keychain")
const Mug = require("../models/mug")
const Photoframe = require("../models/photoframe")
const Popholder = require("../models/popholder")
const Slipperbottle = require("../models/slipperbottle")
const Wallclock = require("../models/wallclock")
const Watch = require("../models/watch")
const Mainslide = require("../models/mainslide")
const Secondaryslide = require("../models/secondaryslide")
const ObjectId = mongoose.Types.ObjectId


exports.get_sliders = function(req, res){
    Mainslide.find({active_status: 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_secondary_sliders = function(req, res){
    Secondaryslide.find({active_status: 1})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_secondary_sliders = function(req, res){
    Secondaryslide.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_sliders = function(req, res){
    Mainslide.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.update_all_sliders = async function(req, res){
   let slides =   await Mainslide.updateMany({}, {sort_order:0})
   res.json(slides)
}

exports.add_product_slide = function(req, res){
    console.log(req.body)
    const newMainslide = new Mainslide(
        {
            _id: new mongoose.Types.ObjectId(),
            product_name: req.body.productname,
            active_status: "1",
            product_display_name: req.body.productdisplayname,
            slider_image: req.body.slidename
        }
    )
    newMainslide.save()
    .then((result => {
        //console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added",product:result})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_secondary_slider = function(req, res){
    console.log(req.body)
    const newSecondaryslide = new Secondaryslide(
        {
            _id: new mongoose.Types.ObjectId(),
            slider_name: req.body.slider_name,
            slider_display_name: req.body.sliderdisplayname,
            product_name: req.body.product_name,
            active_status: req.body.active_status,
            slider_image: req.body.sliderimage
        }
    )
    newSecondaryslide.save()
    .then((result => {
        //console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added",product:result})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}

exports.add_slider = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Mainslide.findOneAndUpdate({product_name:req.params.productname},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

// exports.add_secondary_slider = function(req, res){
//     console.log(req.body)
//     console.log(req.params)
//     Secondaryslide.findOneAndUpdate({product_name:req.params.productname},req.body)
//     .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
//     .catch(err=>res.status(404).json(err))
// }


exports.edit_slider_status = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Mainslide.findOneAndUpdate({_id:req.params.sid},req.body)
    .then(result=> res.json({"result":"slider status updated","updatedslider":result}))
    .catch(err=>res.status(404).json(err))
}

// exports.edit_slider_name = function(req, res){
//     console.log(req.body)
//     console.log(req.params)
//     Mainslide.findOneAndUpdate({_id:req.params.sid},req.body)
//     .then(result=> res.json({"result":"slider status updated","updatedslider":result}))
//     .catch(err=>res.status(404).json(err))
// }

exports.edit_sec_slider_status = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Secondaryslide.findOneAndUpdate({_id:req.params.sid},req.body)
    .then(result=> res.json({"result":"slider status updated","updatedslider":result}))
    .catch(err=>res.status(404).json(err))
}

// exports.add_keychain_image = function(){

// }  

exports.add_keychain = function(req, res){
    console.log(req.body)
    const newKeychain = new Keychain(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            size: req.body.size,
            h_image: "noimage.png",
            in_image: "noimage.png",
            price: req.body.price,
            description: req.body.description
        }
    )
    newKeychain.save()
    .then((result => {
        //console.log(result)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"product added",product:result})
    }))
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    })
}


exports.edit_keychain = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Keychain.findOneAndUpdate({_id:req.params.kid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_mug = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Mug.findOneAndUpdate({_id:req.params.kid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_popholder = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Popholder.findOneAndUpdate({_id:req.params.kid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_photoframe = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Photoframe.findOneAndUpdate({_id:req.params.kid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_slipperbottle = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Slipperbottle.findOneAndUpdate({_id:req.params.kid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_watch = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Watch.findOneAndUpdate({_id:req.params.kid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_wallclock = function(req, res){
    console.log(req.body)
    console.log(req.params)
    Wallclock.findOneAndUpdate({_id:req.params.kid},req.body)
    .then(result=> res.json({"result":"keychain updated","updatedkeychain":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_keychains = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Keychain.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_slipperbottles = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Slipperbottle.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_mugs = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Mug.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_popholders = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Popholder.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_photoframes = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Photoframe.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_watches = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Watch.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.delete_wallclocks = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

Wallclock.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.get_keychains = function(req, res){
    Keychain.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_mugs = function(req, res){
    Mug.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_photoframes = function(req, res){
    Photoframe.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_popholders = function(req, res){
    Popholder.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_slipperbottles = function(req, res){
    Slipperbottle.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_wallclocks = function(req, res){
    Wallclock.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_watches = function(req, res){
    Watch.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
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
            description: req.body.description
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
            description: req.body.description
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
            description: req.body.description
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
            description: req.body.description
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
            description: req.body.description
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
            description: req.body.description
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

