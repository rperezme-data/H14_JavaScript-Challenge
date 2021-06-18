// from data.js
var tableData = data;

// YOUR CODE HERE!

// Set initial values
var datetime = "1/1/2010";
var city = "el cajon";


// Search datetime 
function datetimeQuery(row) {
    return row.datetime === datetime;
}

// Search city 
function cityQuery(row) {
    return row.city === city;
}



// Filter datetime
var results1 = data.filter(datetimeQuery);
console.log("\nFilter datetime")
results1.forEach(result => console.log(result))

// Filter city
var results2 = data.filter(cityQuery);
console.log("\nFilter city")
results2.forEach(result => console.log(result))


// console.log(results);