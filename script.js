let candidates = JSON.parse(localStorage.getItem('election_candidates')) || {
"Monesh":{votes:0,image:""},
"Rajesh":{votes:0,image:""},
"Gnan":{votes:0,image:""}
};

let voters = JSON.parse(localStorage.getItem('election_voters')) || [];
let showResultsToVoters = false;

const MID="23b81a05hw";
const MPASS="shankarifamily";

let activeVoter=null;
// -------- VIEW CONTROL --------

function showView(id){
document.getElementById("loginSection").classList.add("hidden");
document.getElementById("managerDash").classList.add("hidden");
document.getElementById("voterDash").classList.add("hidden");

document.getElementById(id).classList.remove("hidden");
}


// -------- LOGIN --------

function handleLogin(){

const id=document.getElementById("loginID").value;
const pass=document.getElementById("loginPass").value;

if(id===MID && pass===MPASS){

loadManager();

}else{

const voter=voters.find(v=>v.id===id && v.pass===pass);

if(voter){
activeVoter=voter;
loadVoter();
}else{
alert("Invalid Login");
}

}

}


// -------- MANAGER DASHBOARD --------

function loadManager(){
showView("managerDash");
renderManagerCandidates();
}


function renderManagerCandidates(){

const box=document.getElementById("managerResults");
box.innerHTML="";

Object.keys(candidates).forEach(name=>{

const div=document.createElement("div");
div.className="card";

div.innerHTML=`
<div class="name-txt">${name}</div>
<div>${candidates[name].votes} Votes</div>
`;

box.appendChild(div);

});

}


// -------- ADD CANDIDATE --------

function addCandidate(){

const name=document.getElementById("newCandName").value;

if(!name) return;

candidates[name]={votes:0};

saveData();
renderManagerCandidates();

document.getElementById("newCandName").value="";

}


// -------- VOTER DASHBOARD --------

function loadVoter(){

showView("voterDash");

const ballot=document.getElementById("voterBallot");

ballot.innerHTML="";

Object.keys(candidates).forEach(name=>{

const div=document.createElement("div");

div.className="card";

div.innerHTML=`
<div class="name-txt">${name}</div>
<button onclick="castVote('${name}')">Vote</button>
`;

ballot.appendChild(div);

});

}


// -------- CAST VOTE --------

function castVote(name){

candidates[name].votes++;

saveData();

document.getElementById("votedSuccess").classList.remove("hidden");

}


// -------- EMAIL LINK --------

function registerAndSendLink(){

const email=document.getElementById("vEmail").value;
const id=document.getElementById("vID").value;
const pass=document.getElementById("vPass").value;
const url=document.getElementById("siteUrl").value;

if(!email || !id || !pass || !url){
alert("Fill all fields");
return;
}

voters.push({id,pass,email});

saveData();

const subject=encodeURIComponent("Voting Access");

const body=encodeURIComponent(
`Click to vote:

${url}

Voter ID: ${id}
Password: ${pass}`
);

const outlookLink=
`https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;

window.open(outlookLink);

}


// -------- RESULTS TOGGLE --------

function toggleResultsVisibility(){

showResultsToVoters=!showResultsToVoters;

const btn=document.getElementById("toggleResultsBtn");

btn.innerText=showResultsToVoters
?"Results Visible: ON"
:"Show Results to Voters: OFF";

}


// -------- RESET --------

function resetElection(){

if(confirm("Delete all election data?")){

localStorage.clear();
location.reload();

}

}


// -------- SAVE --------

function saveData(){

localStorage.setItem("election_candidates",JSON.stringify(candidates));
localStorage.setItem("election_voters",JSON.stringify(voters));

}


// -------- LOGOUT --------

function logout(){

location.reload();

}
function updateLiveLinks(){

const url=document.getElementById("siteUrl").value;

document.getElementById("previewLink").href=url;

document.getElementById("voterHelpLink").href=url;

}
window.onload=function(){

showView("loginSection");

};