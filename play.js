var json = {     "name": "David",     "age" : 78,     "NoOfVisits" : 4   };
console.log(json);
//outputs - Object {name: "David", age: 78, NoOfVisits: 4}
//change order to NoOfVisits,age,name

var k = JSON.parse(JSON.stringify( json, ["NoOfVisits","age","name"]));
console.log(k);