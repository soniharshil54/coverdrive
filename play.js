let categoriesenabled = ["keychain","phonecase"]
let categoriesincart = ["mug","keychain","keychain","phonecase","mug","keychain"]
let totalbuyget = 3
filteredcart = categoriesincart.filter(f => categoriesenabled.includes(f));
var occurance = getOccurance(filteredcart)
var qualifiedcart = getqualifiedcart(occurance, totalbuyget)



function getqualifiedcart(occurancep, totalbuygetp){
    var filteredObject = Object.keys(occurancep).reduce(function(r, e) {
        if (occurancep[e] >= totalbuygetp) r[e] = occurancep[e]
        return r;
      }, {}) 
      return filteredObject
}


  function getOccurance(cartarray){
    let resultoccurance = cartarray.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
      
        return acc;
      }, {});
    return resultoccurance  
}
console.log(qualifiedcart)  
console.log(occurance)  
console.log(filteredcart)