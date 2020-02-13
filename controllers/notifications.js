const express = require("express")
const mongoose = require("mongoose")
const Smsdata = require("../models/smsdata")
const Notiffcmid = require("../models/notiffcmid")
let fetch = require('node-fetch');


exports.add_registration_token = function(req, res) {
  let regbody = {
    _id: new mongoose.Types.ObjectId(),
    registration_id: req.body.registration_id
}
  const newNotiffcmid = new Notiffcmid(regbody)
  newNotiffcmid.save()
      .then((result => {
          console.log(result)
          res.status(200).header("Access-Control-Allow-Origin", "*").json({registration_id:registration_id})
      }))
      .catch(err => {
          console.log(err)
          res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
      })
}

exports.get_registration_tokens = async function(req, res){
  let registration_idsref = await Notiffcmid.find()
  let registration_ids = registration_idsref.map(regid => regid.registration_id)
  res.json({registration_ids:registration_ids})
}


async function send_notification(registration_ids, message){
  let fields = {
    registration_ids : registration_ids,
    data : message
  }
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
  // let registration_ids = await getregids()
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