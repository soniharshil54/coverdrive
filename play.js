// let datep = new Date(Date.now())
// console.log(datep)

var godaw = "hello its thor"
var godawcap = godaw.replace(/\s/g, "")

console.log(godaw)
console.log(godawcap)
// let reqcomp = "VIVO"
// let lowerc = reqcomp.toLowerCase()
// console.log(lowerc)
// console.log(lowerc.charAt(0).toUpperCase() + lowerc.slice(1))

// function getindextosplitarray(oldimagesref){
//     let newoldimagesref = oldimagesref.filter(function(item){
//       let checkit = item.split('-')[1]
//       return checkit=='p';
//     }).length
//     let indexref = newoldimagesref - 1
//     return indexref
// }
// console.log(getindextosplitarray( [ '1-p', '2-p','3-p', '1' ] ))

// let daten = new Date(Date.now()).toDateString()
// console.log(daten)
// function generateOTP()
// {

//     var digits = '0123456789';

//     var otpLength = 4;

//     var otp = '';

//     for(let i=1; i<=otpLength; i++)

//     {

//         var index = Math.floor(Math.random()*(digits.length));

//         otp = otp + digits[index];

//     }

//     return otp;

// }

// console.log(generateOTP())
// let categoriesenabled = ["keychain","phonecase"]
// let categoriesincart = ["mug","keychain","keychain","phonecase","mug","keychain"]
// let totalbuyget = 3
// filteredcart = categoriesincart.filter(f => categoriesenabled.includes(f));
// var occurance = getOccurance(filteredcart)
// var qualifiedcart = getqualifiedcart(occurance, totalbuyget)

// let date = Date.now()
// console.log(date)

// function getqualifiedcart(occurancep, totalbuygetp){
//     var filteredObject = Object.keys(occurancep).reduce(function(r, e) {
//         if (occurancep[e] >= totalbuygetp) r[e] = occurancep[e]
//         return r;
//       }, {}) 
//       return filteredObject
// }


//   function getOccurance(cartarray){
//     let resultoccurance = cartarray.reduce(function (acc, curr) {
//         if (typeof acc[curr] == 'undefined') {
//           acc[curr] = 1;
//         } else {
//           acc[curr] += 1;
//         }
      
//         return acc;
//       }, {});
//     return resultoccurance  
// }
// console.log(qualifiedcart)  
// console.log(occurance)  
// console.log(filteredcart)

// const names = ['John', 'Paul', 'George', 'Ringo', 'John'];

// let unique = [...new Set(names)];
// console.log(unique);

exports.delete_gallery = async function(req, res) {
    console.log(req.body)
    var idsArrayf = req.body.todeleteids;
    var galleryDelete = [];
    idsArrayf.forEach(function (item) {
    let objid = new ObjectId(item)
    galleryDelete.push(objid);
    });
    
    let imagesref = await Gallery.find({ '_id': { '$in': galleryDelete }})
    console.log("galaary images deleted")
    console.log(imagesref)
    let images = imagesref.map(img => img.cover_image)
    console.log("cover images")
    console.log(images)
    let multiimgdelete = []
    
    //let multimage = imagesref.map(img => img.multi_image)
    for(let i = 0; i < imagesref.length; i++){
    let multiimages = imagesref[i].multi_image
    // console.log("outer for loop")
    // console.log(multiimages)
    for(let j = 0; j < multiimages.length; j++){
    multiimgdelete.push(multiimages[j])
    }
    }
    //console.log(imagesref)
    //console.log(multiimgdelete)
    
    await Gallery.deleteMany({ '_id': { '$in': galleryDelete } })
    for(k = 0; k<images.length; k++){
    let pathimg = `./uploads/gallery/${images[k]}`
    //console.log(pathimg)
    fs.unlinkSync(pathimg)
    }
    for(l = 0; l<multiimgdelete.length; l++){
    //console.log(multiimgdelete[l])
    let pathimg = `./uploads/gallery/${multiimgdelete[l]}`
    //console.log(pathimg)
    fs.unlinkSync(pathimg)
    }
    res.json({"deleted":"done"})
    }

    exports.delete_orders = async function(req, res){
        var idsArrayf = req.body.todeleteids;
        var ordersDelete = [];
        idsArrayf.forEach(function(item){     
        ordersDelete.push(new ObjectId(item));
    });
    let orders = await Order.find({'_id':{'$in': ordersDelete}}).populate('products','image cropped_image')
    let products = orders.map(order => order.products)
    let imagestodelete = []
    for(i=0; i < products.length; i++){
        let img = products[i].image
        let cropped_img = products[i].cropped_image
        imagestodelete.push(img, cropped_img)
    }
        let orderdelete = await Order.deleteMany({'_id':{'$in': ordersDelete}})
        if(orderdelete){
            console.log(imagestodelete)
            res.json({"delete":"records deleted"})
        }
        else{
            res.json({"delete":"error in records delete"})
        }
    }