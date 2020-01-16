const express = require("express")
const mongoose = require("mongoose")
const Smsdata = require("../models/smsdata")
let fetch = require('node-fetch');


exports.post_sms_data = function(req, res) {
    let mobilenumber = "9426823617"
    let smscontent = "hello"
    console.log(req.connection.localAddress)
    res.json({"run":"runa"})
    // fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=9426823617&country=91&message=HelloTEST&sender=TESTIN&route=4`, { mode: 'no-cors'})
    //   .then(response => {       
    //     console.log(response)
    //     res.status(200).json({user:response})
    //   })
    //   .catch(error => {
    //     res.status(200).json({user:response})
    //     console.log(error)
    //   })
    // const newSmsdata = new Smsdata(
    //     {
    //         _id: new mongoose.Types.ObjectId(),
    //         sendtotype: "Personal",
    //         sendto: req.body.mobilenumber,
    //         content:req.body.smscontent
    //     }
    // )
    //     newSmsdata.save()
    //     .then((result => {
    //         console.log(result)
    //         res.status(200).header("Access-Control-Allow-Origin", "*").json({user:result})
    //     }))
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).header("Access-Control-Allow-Origin", "*").json({error:err})
    //     })
}