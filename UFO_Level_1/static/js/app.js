// LOAD TABLE DATA (data.js)
// Assign data to descriptive variable
var completeData = data;


// EXPLORE TABLE DATA
// MapReduce
var countries = completeData.map((row) => row.country);
var shapes = completeData.map((row) => row.shape);

// Get unique values
var distinctCountries = [...new Set(countries)];
var distinctShapes = [...new Set(shapes)];

console.log(distinctCountries);  // DEBUG MSG
console.log(distinctShapes);  // DEBUG MSG



// SELECT ELEMENTS
// Get table body <tbody> reference
var tbody = d3.select('tbody');

// Get forms & buttons reference
var panelForm = d3.select('form');
var datetimeForm = d3.select('#datetime');
var filterButton = d3.select('#filter-btn');
var clearButton = d3.select('#clear-btn');


// EVENT HANDLERS
panelForm.on('submit', runFilter);
datetimeForm.on('change', runFilter);
filterButton.on('click', runFilter);
clearButton.on('click', refreshTable);


// RENDER TABLE FUNCTION
function renderTable(tableData) {

    console.log("Render Table");  // DEBUG MSG

    // Clear table body
    tbody.html("");

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
}


// RENDER MESSAGE FUNCTION
function renderMsg(errorMsg) {

    console.log("Error Message");  // DEBUG MSG

    // Clear table body
    tbody.html("");
    // Render error message
    tbody.append('p').text(errorMsg).style('color', 'orange').style('font-weight', 'bold');
}


// REFRESH TABLE FUNCTION
function refreshTable() {

    console.log("Refresh Table");  // DEBUG MSG
    
    // Prevent the page from refreshing
    // d3.event.preventDefault();
    
    // Reset input element
    // datetimeForm.property('value') = [];
    
    // Render table (complete data)
    renderTable(completeData);
}


// FILTER TABLE FUNCTION
function runFilter() {

    console.log("Filter Table");  // DEBUG MSG

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Get input values (from elements)
    var datetimeInput = datetimeForm.property('value');
    
    // Check input (empty elements)
    if (datetimeInput.length === 0) {
        // Render error message
        renderMsg("Please enter a search criteria");
    
    } else {

        // GET RESULTS FROM SEARCH CRITERIA
        var results = completeData.filter((row) => row.datetime === datetimeInput);

        // Check results (no-results-found)
        if (results.length === 0) {
            // Render error message
            renderMsg("No results found for your search criteria");
        } else {
            // Render table (filtered data)
            renderTable(results);
        }

    }

}


// Render table (complete data)
renderTable(completeData);
