// First, create variable to pull data from data.js
var tableData = data;

// Need to get table references
const tbody = d3.select("tbody");

//create function for table data
function buildTable(data) {

    //clear existing data
    tbody.html("");

    //loop through data and append row + cells for each value in row
    data.forEach((dataRow) => {
        //append row to the table
        const row = tbody.append("tr");

        //Loop through each field in the dataRow and add each value as a table cell
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
                cell.text(val);
            }  
        );
    });
}

function handleClick() {
  // Grab the datetime value from the filter, need to use the same syntax with #infront
  const date = d3.select("#datetime").property("value");
  let filteredData = tableData;

  // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  }

  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
}

// An event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);