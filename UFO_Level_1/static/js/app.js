
// LOAD TABLE DATA (data.js)
// Assign data to descriptive variable
var tableData = data;

// EXPLORE TABLE DATA
// Get range limits (min, max)
// View unique values


// SELECT ELEMENTS
// Get table body <tbody> reference
var tbody = d3.select('tbody');

// Get forms & buttons reference
var form = d3.select('form');
var datetimeForm = d3.select('#datetime');
var button = d3.select('#filter-btn');


// EVENT HANDLERS
form.on('submit', runFilter);
datetimeForm.on('change', runFilter);
button.on('click', runFilter);


// RENDER COMPLETE TABLE (index.html)
// Loop tableData rows
tableData.forEach((element) => {
    // Append one <tr> (table row) for each element (data row)
    var row = tbody.append('tr');
    // Loop tableData columns
    Object.entries(element).forEach(([key, value]) => {
        // Append one <td> (table cell) per element value (data column)
        row.append('td').text(value);
    })
});



function datetimeQuery(row) {
    return row.datetime === datetimeInput;
}

// var results = tableData.filter(datetimeQuery);
//     console.log(results);



// FILTER FUNCTION
function runFilter() {

    
    console.log("Enter filter function");  // DEBUG MSG


    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get input values (from elements)
    var datetimeInput = datetimeForm.property('value');

    // Check input (out-of-range values)
    if (tableData.includes("datetime", datetimeInput)) {
        console.log("OK");
    } else {
        console.log("Search value is out-of-range");
    }


    // GET RESULTS FROM SEARCH CRITERIA
    var results = tableData.filter((row) => row.datetime === datetimeInput);

  
    console.log(results);  // DEBUG MSG


    // RENDER TO HTML
    // Clear previous rendered table
    tbody.html("");

    // Check results (no-results-found)
    if (results.length === 0) {

        // RENDER ERROR MESSAGE
        tbody.append('p').text("No results found for your search criteria");
        console.log("No results found for your search criteria");

    } else {
        
        // RENDER RESULTS TABLE
        // Loop tableData rows
        results.forEach((element) => {
            // Append one <tr> (table row) for each element (data row)
            var row = tbody.append('tr');
            // Loop tableData columns
            Object.entries(element).forEach(([key, value]) => {
                // Append one <td> (table cell) per element value (data column)
                row.append('td').text(value);
            })
        });
    }

    
    console.log("Exit filter function"); // DEBUG MSG

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