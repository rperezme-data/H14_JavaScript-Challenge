// LOAD TABLE DATA (data.js)
// Assign data to descriptive variable
var completeData = data;


// GET UNIQUE VALUES (from complete data)
// Countries
var distinctCountries = [...new Set(completeData.map((row) => row.country))];
// Shapes
var distinctShapes = [...new Set(completeData.map((row) => row.shape))];


// SELECT ELEMENTS
// Get table body <tbody> reference
var tbody = d3.select('tbody');
// Get forms reference
var panelForm = d3.select('form');
var datetimeForm = d3.select('#datetime');
var cityForm = d3.select('#city');
var stateForm = d3.select('#state');
// Get dropdowns reference
var countryDropdown = d3.select('#country-drop');
var shapeDropdown = d3.select('#shape-drop');
// Get buttons reference
var filterButton = d3.select('#filter-btn');
var clearButton = d3.select('#clear-btn');


// EVENT HANDLERS
// Forms
panelForm.on('submit', runFilter);
datetimeForm.on('change', runFilter);
cityForm.on('change', runFilter);
stateForm.on('change', runFilter);
// Dropdowns
countryDropdown.on('change', runFilter);
shapeDropdown.on('change', runFilter);
// Buttons
filterButton.on('click', runFilter);
clearButton.on('click', refreshTable);


// RENDER DROPDOWNS
// Countries
distinctCountries.forEach((country) => {
    countryDropdown.append('option').text(country);
})
// Shapes
distinctShapes.forEach((shape) => {
    shapeDropdown.append('option').text(shape);
})


// RENDER TABLE FUNCTION
function renderTable(tableData) {
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


// Render table (complete data)
renderTable(completeData);


// RENDER MESSAGE FUNCTION
function renderMsg(errorMsg) {
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

    // vs. REFRESH WEBPAGE
}


// FILTER TABLE FUNCTION
function runFilter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Get input values (from elements)
    var allInput = {
        datetime: datetimeForm.property('value'),
        city: cityForm.property('value'),
        state: stateForm.property('value'),
        country: countryDropdown.property('value'),
        shape: shapeDropdown.property('value')
    };

    // ACTIVE FILTERS ARRAY
    // Set initial values
    var filters = [];
    // Build array for active filters
    for (var [key, value] of Object.entries(allInput)) {
        if (value !== "") {
            filters.push({'key': key, 'value': value});
        }
    }

    console.log("Active filters: ");  // DEBUG MSG
    console.log(filters);  // DEBUG MSG
    
    // Check input (empty-filter)
    if (filters.length === 0) {
        // Render error message
        renderMsg("Please enter a search criteria");
    } else {

        // GET RESULTS FROM SEARCH CRITERIA
        var results = completeData.filter((row) => filters.every((filter) => row[filter.key] === filter.value));
        
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
