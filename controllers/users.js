const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

exports.user_test_friends = function(req, res) {
    let uid = req.params.uid
    res.json({"user":uid})
};