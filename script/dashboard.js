
console.log("hi");
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

//display isue function is here 

function displayIssues(issues){

issuesContainer.innerHTML="";

issueCount.innerText = `${issues.length} Issues`;

issues.forEach(issue => {

const borderColor = issue.status==="open" ? "border-green-500" : "border-purple-500";

const card = document.createElement("div");

card.className=`card bg-white shadow border-t-4 ${borderColor} cursor-pointer`;

// THIS LINE MAKES THE WHOLE CARD CLICKABLE
card.onclick = () => openModal(issue.id);

//the card design is hereeeeeeeee.....
card.innerHTML = `

<div class="p-5 relative flex flex-col h-full">
  
  <div class="absolute top-4 left-4 
  ${issue.status === "open" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"} 
  rounded-full w-10 h-10 flex items-center justify-center">

  <i class="${issue.status === 'open' ? 'fa-regular fa-circle' : 'fa-regular fa-circle-check'}"></i>

</div>

  <div class="absolute top-4 right-4">
    <span class="px-4 py-1 text-xs font-bold rounded-full 
    ${issue.priority === "high" ? "bg-red-100 text-red-600" :
      issue.priority === "low" ? "bg-gray-200 text-red-600" :
      issue.priority === "medium" ? "bg-yellow-100 text-yellow-600" :
      "bg-green-100 text-green-600"}">
      ${issue.priority.toUpperCase()}
    </span>
  </div>

  <h2 
    class="text-lg font-semibold text-gray-800 mt-12 pr-16 hover:text-blue-600">

    ${issue.title}

  </h2>

  <p class="text-gray-500 text-sm mt-2 line-clamp-2">
    ${issue.description}
  </p>

  <div class="flex flex-col gap-2 mt-4">

  ${
  issue.labels?.map(label => {

  if(label.toLowerCase() === "bug"){
  return `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600 flex items-center gap-1 w-fit">
  <i class="fa-solid fa-bug"></i> BUG
  </span>`;
  }

  if(label.toLowerCase() === "help wanted"){
  return `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
  <i class="fa-solid fa-life-ring"></i> HELP WANTED
  </span>`;
  }

  if(label.toLowerCase() === "enhancement"){
  return `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600 flex items-center gap-1 w-fit">
  <i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT
  </span>`;
  }

  if(label.toLowerCase() === "documentation"){
  return `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600 flex items-center gap-1 w-fit">
  <i class="fa-brands fa-accusoft"></i> DOCUMENTATION
  </span>`;
  }

  if(label.toLowerCase() === "good first issue"){
  return `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-600 flex items-center gap-1 w-fit">
  <i class="fa-solid fa-anchor-circle-exclamation"></i> GOOD FIRST ISSUE
  </span>`;
  }

  return `<span class="badge badge-outline w-fit">${label}</span>`;

  }).join("")
  }

  </div>

  <div class="flex-grow"></div>

</div>

<div class="border-t bg-gray-50 px-5 py-3 text-sm text-gray-500 rounded-b-xl">

  <p>#${issue.id} by ${issue.author}</p>

  <p> ${new Date(issue.createdAt).toLocaleDateString()}</p>


</div>

`;

issuesContainer.appendChild(card);

});

}