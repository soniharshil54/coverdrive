// const express = require("express")
// const mongoose = require("mongoose")
// const Smsdata = require("../models/smsdata")
// let fetch = require('node-fetch');
// const nodemailer = require('nodemailer');

// let transport = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'soniharshil55@gmail.com',
//         pass: 'soni2203'
//     }
// });


// exports.send_mail = function(req, res) {
//     const message = {
//         from: 'soniharshil55@gmail.com', // Sender address
//         to: 'sharshil43@yahoo.com',         // List of recipients
//         subject: 'Design Your Model S | Tesla', // Subject line
//         text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
//     };
//     transport.sendMail(message, function(err, info) {
//         if (err) {
//             console.log("error mail")
//           console.log(err)
//           res.json(err)
//         } else {
//             console.log("success mail")
//           console.log(info);
//           res.json(info)
//         }
//     });
// }

// // exports.post_order_confirm_sms = function(req, res) {
// //   let mobilenumber = req.body.mobilenumber
// //   let user_name = req.body.user_name
// //   let order_id = req.body.orderid_user
// //   let smscontent =`Dear, ${user_name}  Your order has been received Successfully.Your order no. ${order_id}.confirmation call will be received within 24-48 hours.Thank you`
// //   console.log(req.connection.localAddress)
// //   //res.json({"run":"runa"})
// //   fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=${mobilenumber}&country=91&message=${smscontent}&sender=TESTIN&route=4`, { mode: 'no-cors'})
// //     .then(response => {       
// //       console.log(response)
// //       res.status(200).json({user:response})
// //     })
// //     .catch(error => {
// //       res.status(200).json({user:response})
// //       console.log(error)
// //     })
// // }