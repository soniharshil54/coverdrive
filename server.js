const express = require('express')
const mongoose = require('mongoose')
const db = require("./configs/config").mongoURI
const cors = require("cors")
const userRoutes = require("./routes/api/users")
const adminRoutes = require("./routes/api/admins")
const phonecaseRoutes = require("./routes/api/phonecases")
// const orderRoutes = require("./routes/api/orders")
const productRoutes = require("./routes/api/products")
// const pincodeRoutes = require("./routes/api/pincodes")
// const offerRoutes = require("./routes/api/offers")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());




mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log("connected to mongodb"))


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   next();
// });
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)
// app.use("/api/order",orderRoutes)
app.use("/api/product",productRoutes)
app.use("/api/phonecase", phonecaseRoutes)
// app.use("/api/pincode",pincodeRoutes)
// app.use("/api/offer",offerRoutes)
// app.use('/productimagesuploads', express.static('productimagesploads'));


const port = process.env.PORT || 5600;
app.listen(port,()=>console.log(`server connected on localhost:${port}`));