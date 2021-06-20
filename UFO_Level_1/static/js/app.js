
// LOAD TABLE DATA
// Assign the data from `data.js` to a descriptive variable
var tableData = data;

// SELECT ELEMENTS
var form = d3.select("form");
var datetimeForm = d3.select("#datetime");
var button = d3.select("#filter-btn");

// EVENT HANDLERS
form.on("submint", runFilter);
datetimeForm.on("change", runFilter);
button.on("click", runFilter);


function datetimeQuery(row) {
    return row.datetime === datetimeInput;
}


// FILTER FUNCTION
function runFilter() {

    function datetimeQuery(row) {
        return row.datetime === datetimeInput;
    }

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input elements
    var datetimeInput = datetimeForm.property("value");

    var results = tableData.filter(datetimeQuery);
    console.log(results);

}




// // Search datetime 
// function datetimeQuery(row) {
//     return row.datetime === datetime;
// }

// // Search city 
// function cityQuery(row) {
//     return row.city === city;
// }


// // Filter datetime
// var results1 = data.filter(datetimeQuery);
// console.log("\nFilter datetime")
// results1.forEach(result => console.log(result))

// // Filter city
// var results2 = data.filter(cityQuery);
// console.log("\nFilter city")
// results2.forEach(result => console.log(result))


// console.log(results);