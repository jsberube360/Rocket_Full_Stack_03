// GET to retrieve data on the agents from an external server
 
// variables
 
let tableData = [];
let tableBody = document.getElementById("tableBody");
 
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const rating = document.getElementById("rating");
const fee = document.getElementById("fee");
 
const region = document.getElementById("region");
const select = document.getElementById("select");
const east = document.getElementById("east");
const north = document.getElementById("north");
const south = document.getElementById("south");
const west = document.getElementById("west");
 
let firstNameSortType = "none";
let lastNameSortType = "none";
let ratingSortType = "none";
let feeSortType = "none";
let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const url = 'http://localhost:3004';
 
 
// event listeners
 
first_name.addEventListener("click", firstNameClick);
last_name.addEventListener("click", lastNameClick);
rating.addEventListener("click", ratingClick);
fee.addEventListener("click", feeClick);
region.addEventListener("change", fetchByRegion);
document.addEventListener("DOMContentLoaded", fetchData);

async function fetchData () {
    const response = await fetch (url + '/agents')
    const data = await response.json();
    if (data["agents"].length === 0) {
        tableBody.innerHTML = "";
        no_agents.textContent = "There is no available agents in the database";
        return;
    }
    tableData = data["agents"]
    updateData(tableData)
}

const createAgentRow = (agent) => {
    const row = document.createElement("tr");
    const firstNameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const regionCell = document.createElement("td");
    const ratingCell = document.createElement("td");
    const feeCell = document.createElement("td");
    firstNameCell.textContent = agent.first_name;
    lastNameCell.textContent = agent.last_name;
    ratingCell.textContent = agent.rating;
    feeCell.textContent = formatter.format(agent.fee);
    regionCell.textContent = agent.region;
    row.append(firstNameCell, lastNameCell, ratingCell, feeCell, regionCell);
    if (agent.rating === 100){
        row.style.backgroundColor = "lightgreen";
    }
    else if (agent.rating >= 90){
        row.style.backgroundColor = "lightblue";
    }
    else if (agent.rating < 90){
        row.style.backgroundColor = "plum";
    }
    return row;
}


 
// loop through each elements of the array and execute createAgentRow if the agent's rating is >= 95
function populateTable(data){
    tableBody.innerHTML = "";
    for (const d of data) {
        tableBody.appendChild(createAgentRow(d));
        no_agents.textContent = "";
    }
}
 
// changes the sort type for first name and set other sort types to none on first name header's click then update the data
 
function firstNameClick (){
    lastNameSortType = "none";
    ratingSortType = "none";
    feeSortType = "none";
    if (firstNameSortType === "asc") {
        firstNameSortType = "desc";
    }
    else {
        firstNameSortType = "asc";
    }
    updateData (tableData);
}
 
// changes the sort type for last name and set other sort types to none on last name header's click then update the data
 
function lastNameClick (){
    firstNameSortType = "none";
    ratingSortType = "none";
    feeSortType = "none";
    if (lastNameSortType === "asc") {
        lastNameSortType = "desc";
    }
    else {
        lastNameSortType = "asc";
    }
    updateData (tableData);
}

// changes the sort type for rating and set other sort types to none on rating header's click then update the data
 
function ratingClick (){
    firstNameSortType = "none";
    lastNameSortType = "none";
    feeSortType = "none";
    if (ratingSortType === "asc") {
        ratingSortType = "desc";
    }
    else {
        ratingSortType = "asc";
    }
    updateData (tableData);
}

// changes the sort type for fee and set other sort types to none on fee header's click then update the data
 
function feeClick (){
    firstNameSortType = "none";
    lastNameSortType = "none";
    ratingSortType = "none";
    if (feeSortType === "asc") {
        feeSortType = "desc";
    }
    else {
        feeSortType = "asc";
    }
    updateData (tableData);
}

 
// sort the table by first name either in alphabetical or reverse alphabetical depending of the filter type
 
function sortByFirstName(tableData, filterType) {
    let copy = [...tableData];
    if (filterType === "asc") {
        copy.sort((a,b) => a["first_name"].localeCompare(b["first_name"]));
    }
    if (filterType === "desc") {
        copy.sort((a,b) => b["first_name"].localeCompare(a["first_name"]));
    }
    return copy;
}
 
// sort the table by last name either in alphabetical or reverse alphabetical depending of the filter type
 
function sortByLastName(tableData, filterType) {
    let copy = [...tableData];
    if (filterType === "asc") {
        copy.sort((a,b) => a["last_name"].localeCompare(b["last_name"]));
    }
    if (filterType === "desc") {
        copy.sort((a,b) => b["last_name"].localeCompare(a["last_name"]));
    }
    return copy;
}

// sort the table by rating either in ascending or descending order depending of the filter type
 
function sortByRating(tableData, filterType) {
    let copy = [...tableData];
    if (filterType === "asc") {
        copy.sort((a,b) => a["rating"] - b["rating"]);
    }
    if (filterType === "desc") {
        copy.sort((a,b) => b["rating"] - a["rating"]);
    }
    return copy;
}
 
// sort the table by fee either in ascending or descending order depending of the filter type
 
function sortByFee(tableData, filterType) {
    let copy = [...tableData];
    if (filterType === "asc") {
        copy.sort((a,b) => a["fee"] - b["fee"]);
    }
    if (filterType === "desc") {
        copy.sort((a,b) => b["fee"] - a["fee"]);
    }
    return copy;
}
// filters by region if a region is selected
 
async function fetchByRegion() {
    if (region.value === "select") {
        fetchData ()
        return
    }
    const response = await fetch (url + `/agents-by-region?region=${region.value}`)
    const data = await response.json();
    if (response.status === 404){
        noAgentsErrorMessage()
        return
    }
    console.log(data)
    tableData = data["agents"]
    updateData(tableData)
}
 
// create a message if no agents are available in the region
 
function noAgentsErrorMessage(){
    tableBody.innerHTML = "";
    no_agents.textContent = "There is no available agents in the region you selected";
}
 
// create an upward or downward arrow depending if first name is sorted alphabetically or in reverse
 
function updateFirstNameIndicator (filterType) {
    let content = "First name";
    if (filterType === "asc") {
        content = "First name ▼";
    }
    else if (filterType === "desc") {
        content = "First name ▲";
    }
    first_name.textContent = content;
}
 
// create an upward or downward arrow depending if last name is sorted alphabetically or in reverse
 
function updateLastNameIndicator (filterType) {
    let content = "Last name";
    if (filterType === "asc") {
        content = "Last name ▼";
    }
    else if (filterType === "desc") {
        content = "Last name ▲";
    }
    last_name.textContent = content;
}

// create an upward or downward arrow depending if rating is in ascending or descending order
 
function updateRatingIndicator (filterType) {
    let content = "Rating";
    if (filterType === "asc") {
        content = "Rating ▼";
    }
    else if (filterType === "desc") {
        content = "Rating ▲";
    }
    rating.textContent = content;
}

// create an upward or downward arrow depending if fee is in ascending or descending order
 
function updateFeeIndicator (filterType) {
    let content = "Fee";
    if (filterType === "asc") {
        content = "Fee ▼";
    }
    else if (filterType === "desc") {
        content = "Fee ▲";
    }
    fee.textContent = content;
}
 
// update data
async function updateData (tableData) {
    let updated =[...tableData];
    console.log(updated)
    updated = sortByFirstName(updated, firstNameSortType);
    updated = sortByLastName(updated, lastNameSortType);
    updated = sortByRating (updated, ratingSortType);
    updated = sortByFee (updated, feeSortType)
    populateTable(updated);
    updateFirstNameIndicator(firstNameSortType);
    updateLastNameIndicator(lastNameSortType);
    updateRatingIndicator(ratingSortType);
    updateFeeIndicator(feeSortType);
}