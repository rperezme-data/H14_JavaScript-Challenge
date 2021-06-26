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
var cityForm = d3.select('#city');
var stateForm = d3.select('#state');
var countryForm = d3.select('#country');
var shapeForm = d3.select('#shape');

var filterButton = d3.select('#filter-btn');
var clearButton = d3.select('#clear-btn');


// EVENT HANDLERS
panelForm.on('submit', runFilter);

datetimeForm.on('change', runFilter);
cityForm.on('change', runFilter);
stateForm.on('change', runFilter);
countryForm.on('change', runFilter);
shapeForm.on('change', runFilter);

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
    // datetimeForm.property('value') = "";

    // Render table (complete data)
    renderTable(completeData);
}


// FILTER TABLE FUNCTION
function runFilter() {

    console.log("Filter Table");  // DEBUG MSG

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get input values (from elements)
    var allInput = {
        datetime: datetimeForm.property('value'),
        city: cityForm.property('value'),
        state: stateForm.property('value'),
        country: countryForm.property('value'),
        shape: shapeForm.property('value')
    };

    console.log(allInput);

    // ACTIVE FILTERS ARRAY

    var filters = [];
    var filtersDict = {};

    for (var [key, value] of Object.entries(allInput)) {
        if (value !== "") {
            filtersDict[key] = value;
            filters.push({'key':key, 'value':value});
        }
    }

    console.log(filters);
    console.log(filtersDict);

    // Check input (empty elements)
    if (filters.length === 0) {
        // Render error message
        renderMsg("Please enter a search criteria");

    } else {

        // Get results from search criteria
        var results = completeData.filter(row => filters.every(filter => row[filter.key] === filter.value));

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