// let datep = new Date(Date.now())
// console.log(datep)

let reqcomp = "VIVO"
let lowerc = reqcomp.toLowerCase()
console.log(lowerc)
console.log(lowerc.charAt(0).toUpperCase() + lowerc.slice(1))

function getindextosplitarray(oldimagesref){
    let newoldimagesref = oldimagesref.filter(function(item){
      let checkit = item.split('-')[1]
      return checkit=='p';
    }).length
    let indexref = newoldimagesref - 1
    return indexref
}
console.log(getindextosplitarray( [ '1-p', '2-p','3-p', '1' ] ))

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