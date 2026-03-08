const issuesContainer = document.getElementById("issuesContainer");
const loadSpinner = document.getElementById("loadingSpinner");
const issueCount = document.getElementById("issueCount");

let allIssues = [];

// loading functions

function showLoading(){
loadSpinner.classList.remove("hidden");
issuesContainer.innerHTML="";
}

function hideLoading(){
loadSpinner.classList.add("hidden");
}

// load all issues

async function loadIssues(){

showLoading();

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const data = await res.json();

allIssues = data.data;

hideLoading();

displayIssues(allIssues);

}