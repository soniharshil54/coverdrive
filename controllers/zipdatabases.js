const express = require("express")
const mongoose = require("mongoose")
const Smsdata = require("../models/smsdata")
var fs = require('fs');
var archiver = require('archiver');
var db = require('../configs/config').mongoURI
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;


exports.zip_database_backup = async function(req, res) {
    console.log(db)
    try{
        await databasebackupdump()
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
    try{
        await zipdatabase()
        
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
    
    res.json({"done":"gg"})
    // res.setHeader('Content-Type', 'application/zip')
    // res.setHeader('Content-disposition', 'dump.zip')
    // res.download('dump.zip')
}

exports.json_zip_database_backup = async function(req, res) {
    console.log(db)
    try{
        await jsondatabasebackupdump()
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
    try{
        await jsonzipdatabase()
        
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
    
    res.json({"done":"gg"})
    // res.setHeader('Content-Type', 'application/zip')
    // res.setHeader('Content-disposition', 'dump.zip')
    // res.download('dump.zip')
}

function databasebackupdump(){
    return new Promise(function(resolve, reject){
        var backupDB = spawn('mongodump',[
            '--uri',     db
          ]);
        backupDB.on('exit', function (code) {
            console.log('mongodump exited with code ' + code);
            resolve(code)
          });
          backupDB.on('error', function (err) {
            // *** Process creation failed
            reject(err);
          });  
    })
}
//sh mongodb-backup.sh coverdrive testb
function jsondatabasebackupdump(){
    return new Promise(function(resolve, reject){
        exec('cd controllers && sh mongodb-backup.sh coverdrive ../dbjson', (err, stdout, stderr) => {
            if (err) {
              //some err occurred
              console.error(err)
              reject(err)
            } else {
             // the *entire* stdout and stderr (buffered)
             
             console.log(`stdout: ${stdout}`);
             console.log(`stderr: ${stderr}`);
             resolve(true)
            }
          }); 
    })
}

//jsondatabasebackupdump().then(result => console.log(result)).catch(error => console.log(error))

// function databasebackup(){
//     return new Promise(function(resolve, reject){
//         backup({
//             uri: db,
//             root: `./`,
//             // write files into this dir
//             callback: function(err) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(true);
//                 }
//             }
//         });
//     })
// }

// databasebackup().then(result => console.log("result")).catch(error => console.log(error))

function zipdatabase() {
    console.log("zip database")
    const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream('dbbackup/dump.zip');

  return new Promise((resolve, reject) => {
    archive
      .directory('dump', false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

function jsonzipdatabase() {
    console.log("zip database")
    const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream('dbbackup/dbjson.zip');

  return new Promise((resolve, reject) => {
    archive
      .directory('dbjson', false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

// zipdatabase().then(result => console.log("result")).catch(error => console.log(error))

