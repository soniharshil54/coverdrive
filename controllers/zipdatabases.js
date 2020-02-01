// const express = require("express")
// const mongoose = require("mongoose")
// const Smsdata = require("../models/smsdata")
// var fs = require('fs');
// var archiver = require('archiver');
// let fetch = require('node-fetch');

// exports.zip_database = async function(req, res) {
//     res.download('configs/config.js')
// }

// function zipdatabase() {
//     console.log("zip database")
//     const archive = archiver('zip', { zlib: { level: 9 }});
//   const stream = fs.createWriteStream('target.zip');

//   return new Promise((resolve, reject) => {
//     archive
//       .directory('models', false)
//       .on('error', err => reject(err))
//       .pipe(stream)
//     ;

//     stream.on('close', () => resolve());
//     archive.finalize();
//   });
// }

// zipdatabase().then(result => console.log("result")).catch(error => console.log(error))

