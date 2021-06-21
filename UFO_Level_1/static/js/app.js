
// LOAD TABLE DATA (data.js)
// Assign data to descriptive variable
var tableData = data;

// RENDER TABLE (index.html)
// Get reference to table body <tbody>
var tbody = d3.select("tbody");

// Loop tableData rows
tableData.forEach((element) => {
    // Append one <tr> (table row) for each element (data row)
    var row = tbody.append("tr");
    // Loop tableData columns
    Object.entries(element).forEach(([key, value]) => {
        // Append one <td> (table cell) per element value (data column)
        row.append("td").text(value);
    })
});


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

    console.log("Enter filter function");

    function datetimeQuery(row) {
        return row.datetime === datetimeInput;
    }

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input elements
    var datetimeInput = datetimeForm.property("value");

    var results = tableData.filter(datetimeQuery);
    console.log(results);

    // Loop tableData rows
    results.forEach((element) => {
        // Append one <tr> (table row) for each element (data row)
        var row = tbody.append("tr");
        // Loop tableData columns
        Object.entries(element).forEach(([key, value]) => {
            // Append one <td> (table cell) per element value (data column)
            row.append("td").text(value);
        })
    });

    console.log("Exit filter function");

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