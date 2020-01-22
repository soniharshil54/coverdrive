const express = require('express')
const mongoose = require('mongoose')
const db = require("./configs/config").mongoURI
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log("connected to mongodb"))
// var backup = require('mongodb-backup');
// backup({
//         uri: db,
//         root: __dirname,
//         // write files into this dir
//         callback: function(err) {
//             if (err) {
//                 console.error(err);
//             } else {
//                 console.log('finish');
//             }
//         }
//     });
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
const fs = require("fs")
//let Offer = require('./models/offer');
//require('./models/Comments');


//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const userRoutes = require("./routes/api/users")
const adminRoutes = require("./routes/api/admins")
const phonecaseRoutes = require("./routes/api/phonecases")
const mugRoutes = require("./routes/api/mugs")
const popholderRoutes = require("./routes/api/popholders")
const tshirtRoutes = require("./routes/api/tshirts")
const orderRoutes = require("./routes/api/orders")
const productRoutes = require("./routes/api/products")
const offerRoutes = require("./routes/api/offers")
const notificationRoutes = require("./routes/api/notifications")
// const pincodeRoutes = require("./routes/api/pincodes")










// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   next();
// });
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/product",productRoutes)
app.use("/api/phonecase", phonecaseRoutes)
app.use("/api/mug", mugRoutes)
app.use("/api/popholder", popholderRoutes)
app.use("/api/tshirt", tshirtRoutes)
app.use("/api/offer",offerRoutes)
app.use("/api/notification",notificationRoutes)
// app.use("/api/pincode",pincodeRoutes)

 app.use('/admin/uploads', express.static('uploads'));


const port = process.env.PORT || 5600;

// var server = app.listen(port,()=>{
//     console.log(server.address().address)
//     console.log(`server connected on localhost:${port}`)});

var server = app.listen(port,"95.216.71.108",()=>{
    console.log(server.address().address)
    console.log(`server connected on localhost:${port}`)});