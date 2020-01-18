const express = require("express")
const mongoose = require("mongoose")
const Smsdata = require("../models/smsdata")
let fetch = require('node-fetch');


exports.post_sms_data = function(req, res) {
    let mobilenumber = req.body.mobilenumber
    let smscontent = req.body.smscontent
    console.log(req.connection.localAddress)
    //res.json({"run":"runa"})
    fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=${mobilenumber}&country=91&message=${smscontent}&sender=TESTIN&route=4`, { mode: 'no-cors'})
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
  let mobilenumber = req.body.mobilenumber
  let user_name = req.body.user_name
  let order_id = req.body.orderid_user
  let smscontent =`Dear, ${user_name}  Your order has been received Successfully.Your order no. ${order_id}.confirmation call will be received within 24-48 hours.Thank you`
  console.log(req.connection.localAddress)
  //res.json({"run":"runa"})
  fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=${mobilenumber}&country=91&message=${smscontent}&sender=TESTIN&route=4`, { mode: 'no-cors'})
    .then(response => {       
      console.log(response)
      res.status(200).json({user:response})
    })
    .catch(error => {
      res.status(200).json({user:response})
      console.log(error)
    })
}