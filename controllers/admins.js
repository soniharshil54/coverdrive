const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Admin = require("../models/admin")
const Adminside = require("../models/adminside")
const jwt = require("jsonwebtoken")
const Order = require("../models/order")
const User = require("../models/user")
const Otptemp = require("../models/otptemp")
const mail_controller = require("./mailsystems")
const Phonecase = require("../models/phonecase")
const Keychain = require("../models/keychain")
const Mug = require("../models/mug")
const Popholder = require("../models/popholder")
const Sipperbottle = require("../models/sipperbottle")
const Wallclock = require("../models/wallclock")
const Tshirt = require("../models/tshirt")
const Watch = require("../models/watch")
const Photoframe = require("../models/photoframe")

exports.register_admin = function(req, res) {
    Admin.find({email: req.body.email})
        .exec()
        .then(admin => {
            if(admin.length>=1){
                return res.status(500).header("Access-Control-Allow-Origin", "*").json({message:"mail already exists"})
            }
            else {
                bcrypt.hash(req.body.password,10,(err,hash) => {
                    if(err){
                        return res.status(500).json({error:err})
                    }
                    else {
                        //var profile = req.file?req.file.path:"profileUploads/noprofile.png"
                        const newAdmin = new Admin(
                            {
                                _id: new mongoose.Types.ObjectId(),
                                name: req.body.name,
                                email: req.body.email,
                                contact: req.body.contact,
                                password:hash
                            }
                        )
                    
                        newAdmin.save()
                                .then((result => {
                                    console.log(result)
                                    res.status(201).header("Access-Control-Allow-Origin", "*").json({message:"admin created"})
                                }))
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
                                })
                    }
                })
            }
        })
}

exports.post_charges = function(req, res) {
    const newAdminside = new Adminside(
        {
            _id: new mongoose.Types.ObjectId(),
            cod_charges: req.body.cod_charges,
            shipping_charges : req.body.shipping_charges
        }
    )
    newAdminside.save()
        .then((result => {
            console.log(result)
            res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}

exports.edit_delivery_charges = async function(req, res){
    let editcharges = await Adminside.findOneAndUpdate({ _id: '5e1328d8fac4234dcc29d6e8'},req.body,{new: true})
    //return newoid.sequence
    res.json(editcharges)
}

exports.get_charges = function(req, res){
    Adminside.findOne({_id:'5e1328d8fac4234dcc29d6e8'})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_admin = function(req, res){
    Admin.findOne({_id:req.params.aid})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

exports.get_all_admins = function(req, res){
    Admin.find()
             .then(result=>res.json(result))
             .catch(err=>res.json(err))
    
        // Users.countDocuments()	
        //       .then(result=>console.log(result))
        //       .catch(err=>console.log(err))	 
}

exports.login_admin = function(req, res){
    console.log(req.body)
    console.log(req.body.email)
    Admin.findOne({email:req.body.email})
    .then(admin => {
        console.log(admin)
        if(!admin){
            return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"admin with this mail doesnt exist", status:403})
        }

        bcrypt.compare(req.body.password, admin.password, (err,result) => {
            if(err){
                return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"wrong password", status: 403})
            }
            if(result){
                const token = jwt.sign(

                    {
                        email: admin.email,
                        name: admin.name,
                        userId: admin._id
                    },
                    "soni3360")

                    return res.status(200).header("Access-Control-Allow-Origin", "*").json({message: "auth successfull", token:token, admin: admin, status: 200})

            }

            res.status(401).header("Access-Control-Allow-Origin", "*").json({message: "wrong password", status:403})
        })



    })
    .catch(err => {
        console.log(err)
        res.status(500).header("Access-Control-Allow-Origin", "*").json({
            error: err
        })
    })
}

exports.count_admins = function(req, res){
    Admin.countDocuments()	
    .then(result=>res.json(result))
    .catch(err=>res.json(err))	
}

exports.count_summary = async function(req, res){
    let usercount = await User.countDocuments({active:1})
    let ordercount = await Order.countDocuments()	
    let salesamountref = await Order.aggregate([{ $group: { _id: null, sum: { $sum: "$amount" } } }])
    let phonecasecount = await Phonecase.countDocuments()
    let keychaincount = await Keychain.countDocuments()
    let mugcount = await Mug.countDocuments()
    let popholdercount = await Popholder.countDocuments()
    let sipperbottlecount = await Sipperbottle.countDocuments()
    let wallclockcount = await Wallclock.countDocuments()
    let tshirtcount = await Tshirt.countDocuments()
    let watchcount = await Watch.countDocuments()
    let photoframecount = await Photoframe.countDocuments()
    let productscount = phonecasecount + keychaincount + mugcount + popholdercount + sipperbottlecount + wallclockcount + tshirtcount + watchcount + photoframecount
    console.log(salesamountref[0].sum)
    let salesamount = salesamountref[0].sum
    res.json({"usercount":usercount, "ordercount":ordercount, "salesamount":salesamount, "productscount":productscount})
}

exports.generate_report = async function(req, res){
    let allorders = await Order.find().select('_id gst_tax shipping sub_total amount date_ordered order_status products coupon_amount')
    
    res.json(allorders)
}

exports.delete_admin = function(req, res){
    Admin.findOneAndRemove({_id:req.params.did})
    .then(result=> res.json({"result":"admin deteted","deletedadmin":result}))
    .catch(err=>res.status(404).json(err))
}

exports.edit_admin = function(req, res){
    Admin.findOneAndUpdate({_id:req.params.eid},req.body)
    .then(result=> res.json({"result":"admin updated","updatedadmin":result}))
    .catch(err=>res.status(404).json(err))
}

exports.change_password = function(req, res){
    Admin.findOne({_id:req.params.cid})
    .then(admin => {
        console.log(admin)
        console.log(req.body)
        bcrypt.compare(req.body.oldpassword, admin.password, (err,result) => {
            if(err){
                console.log(err)
                return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"old password is wrong", status:401})
            }
            else if(result){
                console.log(result)
                console.log("passmatched")
                bcrypt.hash(req.body.newpassword,10,(err,hash) => {
                    if(err){
                        return res.status(500).json({error:err})
                    }
                    else {
                        let reqBody = {
                            password : hash
                        }
                        Admin.findOneAndUpdate({_id:req.params.cid},reqBody, {useFindAndModify: false})
                        .then(result=> res.status(200).json({"result":"password updated","updatedpassword":result}))
                        .catch(err=>res.status(404).json(err))
                    }
                })
            }
            else {
                console.log("its in ekse")
                return res.status(401).header("Access-Control-Allow-Origin", "*").json({message:"old password is wrong", status:401})
            }
        })
    })
}

exports.send_mail_forget_password = async function(req, res){
    const generateotp = generateOTPmail()
    const newOtptemp = new Otptemp(
        {
            _id: new mongoose.Types.ObjectId(),
            tempotp : generateotp
        }
    )
    let otpdata = await newOtptemp.save()
    let mailsent = await mail_controller.send_forget_password_mail(otpdata)
    res.json(mailsent)
}

exports.forget_password_otp_verify = async function(req, res){
    let otpid = req.body.nhash
    let otpwritten = req.body.otpwritten
    let otpdata = await Otptemp.findOne({_id : otpid, tempotp : otpwritten})
    
    if(otpdata){
        let isexpired = checkexpirartion(otpdata.create_time)
        if(!isexpired){
            res.json({status : 1, message : "otp verified successfully"})
        }
        else {
            res.json({status : 2, message : "otp expired"})
        }
    }
    else {
        res.json({status : 0, message : "otp does not match"})
    }
}

exports.verify_mail_otp = async function(req, res){
    let otpid = req.body.nhash
    let otpindbref = await Otptemp.findOne({_id:otpid})
    let npassword = req.body.newpassword
    let hashpass = await bcryptpassword(npassword)
    let passwordbody = {
        password : hashpass
    }
    // let otptext = req.body.
    if(otpindbref){
        let passup = await Admin.findOneAndUpdate({_id:"5dfdb186ea2524278d142cdc"},passwordbody)
        res.json(passup)
    }
   
   else{
       res.json({status : 0, message : "something went wrong"})
   }
}

exports.check_forget_pass_url = async function(req, res){
    let otpindbref = await Otptemp.findOne({_id : req.body.forgetid})
    let isexpired = checkexpirartion(otpindbref.create_time)
    // let otpindb = otpindbref.tempotp
    // let userotp = req.body_writtenotp
    if(otpindbref && !isexpired){
        res.json({status : 1, message : "link working..."})
    }
    else {
        res.json({status : 0, message : "link expired"})
    }
}

function checkexpirartion(dbdate){
    var date1 = new Date();
var date2 = new Date(dbdate);
if(date1-date2 > 10*60*1000){
  return true
}
else{
    return false
}
}

function bcryptpassword(password){
    return new Promise(function(resolve, reject){
        bcrypt.hash(password,10,(err,hash) => {
            if(err){
                reject(err)
            }
            else {
                resolve(hash)
            }
        })
    })
}

exports.add_mail_otp = function(req,res){
    const newOtptemp = new Otptemp(
        {
            _id: new mongoose.Types.ObjectId(),
            tempotp : "itstartedhere56456"
        }
    )
    newOtptemp.save()
        .then((result => {
            console.log(result)
            res.status(201).header("Access-Control-Allow-Origin", "*").json(result)
        }))
        .catch(err => {
            console.log(err)
            res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
        })
}

function generateOTPmail(){
    var digits = '0123456789';
    var otpLength = 9;
    var otp = '';
    for(let i=1; i<=otpLength; i++)
    {
        var index = Math.floor(Math.random()*(digits.length));
        otp = otp + digits[index];
    }
    return otp;
}