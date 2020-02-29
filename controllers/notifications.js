const express = require("express")
const mongoose = require("mongoose")
const Smsdata = require("../models/smsdata")
const Notiffcmid = require("../models/notiffcmid")
const Notification = require("../models/notification")
const ObjectId = mongoose.Types.ObjectId
const User = require("../models/user")
let fetch = require('node-fetch');


exports.get_notification = async function(req, res){
  let offer = await Notification.findOne({_id:req.params.nid})
  if(offer){
      res.json(offer)
      return
  }
  else{
      res.json({"error":"notification not found"})
      return
  }
}

exports.add_registration_token = function(req, res) {
  let regbody = {
    _id: new mongoose.Types.ObjectId(),
    registration_id: req.body.registration_id
}
  const newNotiffcmid = new Notiffcmid(regbody)
  newNotiffcmid.save()
      .then((result => {
          console.log(result)
          res.status(200).header("Access-Control-Allow-Origin", "*").json({status:1,registration_id:result})
      }))
      .catch(err => {
          console.log(err)
          res.status(500).header("Access-Control-Allow-Origin", "*").json({status:0,error:err})
      })
}

exports.get_registration_tokens = async function(req, res){
  let registration_idsref = await Notiffcmid.find()
  let registration_ids = registration_idsref.map(regid => regid.registration_id)
  res.json({registration_ids:registration_ids})
}

 async function get_registration_tokens_send(){
  let registration_idsref = await Notiffcmid.find()
  console.log("registration_idsref")
  console.log(registration_idsref)
  let registration_ids = registration_idsref.map(regid => regid.registration_id)
  console.log("registration_ids")
  console.log(registration_ids)
  return registration_ids
}

exports.get_notifications = async function(req, res){
    let result = await Notification.find().sort({create_date: -1})
    res.json(result)
}

exports.add_send_notification = async function(req,res,next){
  console.log("below file")
  // console.log(req.file.filename)
  
  //console.log(req.params.pid)
  let notificationData = {}
  if(req.file){
      notificationData.isImage = 1
      notificationData.image = `http://95.216.71.108:5600/admin/uploads/${req.file.filename}`
  }
  else{
      notificationData.isImage = 0
      notificationData.image = ""
  }
  notificationData._id = new mongoose.Types.ObjectId()
  notificationData.title = req.body.n_title
  notificationData.message = req.body.n_message
  //let notificationexists = await Notification.findOne({title:req.body.n_title, message: req.body.n_message})
  const newNotification = new Notification(notificationData)
  let notificationadd =  await newNotification.save()
  let registration_ids = await get_registration_tokens_send()
  console.log("registration_ids")
  console.log(registration_ids)
  let notificationssent = await send_notification(registration_ids, notificationData)
  console.log(notificationssent)
  res.json({status:1})
}


exports.send_old_notification = async function(req,res){
  console.log("below file")
  console.log(req.body)
  //console.log(req.file.filename)

  let notification = await Notification.findOne({_id : req.body.notification_id})
  console.log(notification)
  let notificationData = {}
  if(notification.image){
      notificationData.isImage = 1
      notificationData.image = notification.image
  }
  else{
      notificationData.isImage = 0
      notificationData.image = ""
  }
  notificationData._id = notification._id
  notificationData.title = notification.title
  notificationData.message = notification.message
  //let notificationexists = await Notification.findOne({title:req.body.n_title, message: req.body.n_message})
 // const newNotification = new Notification(notificationData)
 // let notificationadd =  await newNotification.save()
  let registration_ids = await get_registration_tokens_send()
  console.log("registration_ids")
  console.log(registration_ids)
  let notificationssent = await send_notification(registration_ids, notificationData)
  console.log(notificationssent)
  res.json({status:1})
}

exports.delete_notifications = function(req, res){
  var idsArrayf = req.body.todeleteids;
  var notificationsDelete = [];
  idsArrayf.forEach(function(item){     
  notificationsDelete.push(new ObjectId(item));
});

Notification.deleteMany({'_id':{'$in': notificationsDelete}},function(){
  res.json({"dodo":"yoyo"});
});
}


async function send_notification(registration_ids, notifData){
  let fields = {
    data : notifData,
    registration_ids : registration_ids
    }
    console.log(fields)
  let sendnotif = await fetch('https://fcm.googleapis.com/fcm/send',
  {
      headers: {
        'Authorization': 'key=AIzaSyBtZpE7ponG878QsoI4sUuSPVjArpQs0fA',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(fields)
  })
  return sendnotif
}

exports.send_notification_to_android = async function(req, res){
  let registration_ids = await get_registration_tokens_send()
  let message = req.body.message
  let notificationssent = await send_notification(registration_ids, message)
  res.json(notificationssent)
}

exports.post_sms_data = function(req, res) {
    let mobilenumber = req.body.mobilenumber
    let smscontent = req.body.smscontent
    let senderid = "PHCSMR"
    console.log(req.connection.localAddress)
    //res.json({"run":"runa"})
    fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=${mobilenumber}&country=91&message=${smscontent}&sender=${senderid}&route=4`, { mode: 'no-cors'})
      .then(response => {       
        console.log(response)
        res.status(200).json({user:response})
      })
      .catch(error => {
        res.status(200).json({user:response})
        console.log(error)
      })
}

exports.post_all_sms_data = async function(req, res) {
 // let mobilenumber = req.body.mobilenumber
 let smscontent = req.body.smscontent
  let senderid = "PHCSMR"
  //console.log(req.connection.localAddress)
  //res.json({"run":"runa"})
  let contactsall = await getcontacts()
  let sendsmsbody = {
    "sender": "PHCSMR",
    "route": "4",
    "country": "91",
    "sms": [
      {
        "message": smscontent,
        "to": contactsall
      }
    ]
  }
  fetch(`https://api.msg91.com/api/v2/sendsms`,
  {
      headers: {
        "authkey": "156882AcKCbmqX8fWL5e16b85cP1",
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(sendsmsbody)
  })
  .then(function(res){ 
    console.log("all sms then")
    console.log(res)
    res.json({"result":"sms sent"})
    })
  .catch(function(err){
    console.log("sms all catch")
    console.log(err)
    res.json({"result":"error occured"})
  })
}

async function getcontacts() {
  let contactsref = await User.find().select('contact')
  let contactsrefd = contactsref.map(b => {
    return b.contact
  })
  let contacts = removeDuplicates(contactsrefd)
  console.log(contacts)
  return contacts
}

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
};

exports.post_order_confirm_sms = function(req, res) {
  console.log(req.body)
  let mobilenumber = req.body.mobilenumber
  let user_name = req.body.user_name
  let order_id = req.body.orderid_user
  let senderid = "PHCSMR"
  let smscontent =`Dear, ${user_name}  Your order has been received Successfully. Your order no. ${order_id}. confirmation call will be received within 24-48 hours. Thank you`
  console.log(req.connection.localAddress)
  //res.json({"run":"runa"})
  fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=${mobilenumber}&country=91&message=${smscontent}&sender=${senderid}&route=4`, { mode: 'no-cors'})
    .then(response => {       
      console.log(response)
      res.status(200).json({user:response})
    })
    .catch(error => {
      res.status(200).json({user:response})
      console.log(error)
    })
}


exports.send_order_confirm_sms = function(mobilenumber,user_name, order_id) {
  let smscontent =`Dear, ${user_name}  Your order has been received Successfully. Your order no. ${order_id}. confirmation call will be received within 24-48 hours. Thank you`
  let senderid = "PHCSMR"
  //console.log(req.connection.localAddress)
  //res.json({"run":"runa"})
  fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=${mobilenumber}&country=91&message=${smscontent}&sender=${senderid}&route=4`, { mode: 'no-cors'})
    .then(response => {       
      console.log(response)
      return
    })
    .catch(error => {
      console.log(error)
      return
    })
}
exports.send_notification_ravi = async function (req, res){

  //console.log("hello")
  let noti = await User.find().select('address contact')
  res.json(noti)
}

exports.otp_verification = function(req, res) {
  let mobilenumber = req.body.mobilenumber
  let username = req.body.username
  let senderid = "PHCSMR"
  let otp_generated = generateOTP()
  let smscontent =`Dear ${username},  ${otp_generated} is the One-Time-Password(OTP) for Phone Case Maker.Thank you`
  console.log(req.connection.localAddress)
  console.log(req.connection.localAddress)
  //res.json({"run":"runa"})
  fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=${mobilenumber}&country=91&message=${smscontent}&sender=${senderid}&route=4`, { mode: 'no-cors'})
    .then(response => {       
      console.log(response)
      res.status(200).json({status:1,otp:otp_generated})
    })
    .catch(error => {
      res.status(200).json({status:0})
      console.log(error)
    })
}

exports.otp_verification_old = function(req, res) {
  let mobilenumber = req.body.mobilenumber
  let username = req.body.username ? req.body.username : ""
  let otp_generated = generateOTP()
  let smscontent =`Dear ${username},  ${otp_generated} is the One-Time-Password(OTP) for Phone Case Maker.Thank you`
  console.log(req.connection.localAddress)
  //res.json({"run":"runa"})
  fetch(`https://control.msg91.com/api/sendotp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobile=${mobilenumber}&message=${smscontent}&sender=STYCLS&otp=${otp_generated}`,
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST"
  })
  .then(function(res){ 
    console.log(res)
    res.json({status:1,otp:otp_generated})
    })
  .catch(function(err){
     console.log(err) 
     res.json({status:0,otp:otp_generated})
    })
}

function generateOTP()
{

    var digits = '0123456789';

    var otpLength = 4;

    var otp = '';

    for(let i=1; i<=otpLength; i++)

    {

        var index = Math.floor(Math.random()*(digits.length));

        otp = otp + digits[index];

    }

    return otp;

}