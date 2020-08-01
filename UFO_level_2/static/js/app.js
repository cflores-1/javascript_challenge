// First, create variable to gather data from data.js
var tableData = data;

//Table References, note it needs to be in "tbody" format
var tbody = d3.select("tbody");

function buildTable(data) {
  //Clearing any existing data by using ("")
  tbody.html("");

  //Create loop so that it can loop through each object in the data. Also need to append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row("tr") to "tbody"
    var row = tbody.append("tr");

    // Loop through each field in the dataRow and add each value as a table cell "td"
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      cell.text(val);
    });
  });
}

// Filters
var filters = {};

function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  var changedElement = d3.select(this).select("input");
  var elementValue = changedElement.property("value");
  var filterId = changedElement.attr("id");

  // If a filter value was entered then add that filterId and value to the filters list. Else, clear that filter
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {
  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all filters and keep any data that matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // Rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
