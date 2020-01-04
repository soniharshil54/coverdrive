const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user")
const ObjectId = mongoose.Types.ObjectId
const Smsdata = require("../models/smsdata")

exports.register_user = function(req, res) {
    //let cuserid = mongoose.Types.ObjectId.createFromHexString(req.body.userid)
    let contactstringref = req.body.contact
    let contactstring = contactstringref.toString()
    const newUser = new User(
        {
            _id: new mongoose.Types.ObjectId(),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_id:req.body.email_id,
            contact: contactstring,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            address_type: req.body.address_type,
            pincode: req.body.pincode
        }
    )
        newUser.save()
        .then((result => {
            console.log(result)
            res.status(200).header("Access-Control-Allow-Origin", "*").json({user:result})
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}

exports.get_contacts = function(req,res) {
    User.find().select('contact')
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.post_sms_data = function(req, res) {
    const newSmsdata = new Smsdata(
        {
            _id: new mongoose.Types.ObjectId(),
            sendtotype: req.body.sendtotype,
            sendto: req.body.sendto,
            content:req.body.content
        }
    )
        newSmsdata.save()
        .then((result => {
            console.log(result)
            res.status(200).header("Access-Control-Allow-Origin", "*").json({user:result})
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}

exports.get_sms_data = function(req, res){
    Smsdata.find()
         .then(result=>res.json(result))
         .catch(err=>res.json(err))
}


exports.get_user = async function(req, res){
    let user = await User.findOne({_id:req.params.uid})
    if(user){
        res.json(user)
        return
    }
    else{
        res.json({"error":"user not found"})
        return
    }
}



exports.get_all_users = function(req, res){
        User.find()
             .then(result=>res.json(result))
             .catch(err=>res.json(err))
}

exports.count_users = function(req, res){
    User.countDocuments()	
    .then(result=>res.json(result))
    .catch(err=>res.json(err))	
}

exports.delete_user = function(req, res){
    User.findOneAndRemove({_id:req.params.did})
    .then(result=> res.json({"result":"user deteted","deleteduser":result}))
    .catch(err=>res.status(404).json(err))
}

exports.delete_users = function(req, res){
    var idsArrayf = req.body.todeleteids;
    var usersDelete = [];
    idsArrayf.forEach(function(item){     
    usersDelete.push(new ObjectId(item));
});

User.deleteMany({'_id':{'$in': usersDelete}},function(){
    res.json({"dodo":"yoyo"});
});
}

exports.edit_user = function(req, res){
    User.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"user updated","updateduser":result}))
    .catch(err=>res.status(404).json(err))
}