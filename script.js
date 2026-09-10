const records={
optionA:["Option A","Strongest sample evidence across the decision area.","12 demo signals","Verified demo","High"],
optionB:["Option B","Positive online reputation with some unresolved conflicts.","9 demo signals","Partially verified","Medium"],
optionC:["Option C","Lower cost signal but weaker evidence and more uncertainty.","6 demo signals","Needs verification","Low"]
};
let choice=localStorage.getItem("learnifyngGoldChoice")||"Option A";
let currentQuestion=localStorage.getItem("learnifyngGoldQuestion")||"Which option is the safest and most reliable for me?";

function go(route){
const home=document.querySelector("#home"),mvp=document.querySelector("#mvp");
if(route==="home"){home.hidden=false;mvp.hidden=true}else{
home.hidden=true;mvp.hidden=false;
document.querySelectorAll(".view").forEach(v=>v.style.display="none");
const view=document.querySelector("#"+route+"-view");
if(!view)return go("home");
view.style.display="block";
}
history.replaceState(null,"",route==="home"?"#home":"#"+route);window.scrollTo(0,0);
}
function renderRecords(){
document.querySelector("#record-list").innerHTML=Object.entries(records).map(([id,r])=>`<article class="record-card"><div class="record-top"><span class="demo-pill">DEMO INTELLIGENCE</span><span class="confidence">${r[4]} confidence</span></div><h3>${r[0]}</h3><p class="record-summary">${r[1]}</p><div class="record-meta"><span><b>Claim</b>${r[1]}</span><span><b>Signals</b>${r[2]}</span><span><b>Verification</b>${r[3]}</span><span><b>Freshness</b>September 2026 demo</span></div><button class="outline-dark" data-trust="${id}">Why should I trust this? →</button></article>`).join("");
}
function renderTrust(id="optionA"){
const r=records[id]||records.optionA,score=r[4]==="High"?78:r[4]==="Medium"?67:51;
document.querySelector("#trust-detail").innerHTML=`<div class="detail-claim"><span class="demo-pill">DEMO SCORE</span><h2>${r[0]} Trust Score: ${score}/100</h2><p>${r[1]} This is illustrative prototype intelligence, not a real world claim.</p></div><div class="layer"><span>FACT</span><p>Illustrative signals have been collected for this prototype.</p></div><div class="layer"><span>EVIDENCE</span><p>${r[2]} across sample online, review and human intelligence categories. No real investigation was performed.</p></div><div class="layer"><span>VERIFICATION</span><p>Status: ${r[3]}. A production system would cross check independent sources and human field reports.</p></div><div class="layer"><span>REALITY GAP</span><p>The score is intended to show the difference between promotional promise, online sentiment and verified real world experience.</p></div><div class="layer analysis"><span>AI ANALYSIS</span><p>Trust is based on the strength, freshness and agreement of evidence rather than on positive mentions alone.</p></div>`;
}
function renderComparison(){
const rows=[["Evidence strength","Strong","Moderate","Limited"],["Verification","Confirmed demo","Partial demo","Needs verification"],["Freshness","Current demo","Current demo","Current demo"],["Reality gap","Low demo","Medium demo","High demo"],["Trust Score","78/100","67/100","51/100"],["Best fit","Reliability","Balanced use","Budget first"]];
document.querySelector("#comparison-table").innerHTML=rows.map(r=>`<tr><th>${r[0]}</th>${r.slice(1).map(x=>`<td>${x}</td>`).join("")}</tr>`).join("");
}
function updateContext(){["question-context","advisory-question","decision-question"].forEach(id=>{const el=document.querySelector("#"+id);if(el)el.textContent=currentQuestion})}
function updateDecision(){
document.querySelectorAll("[data-option]").forEach(btn=>btn.classList.toggle("selected",btn.dataset.option===choice));
document.querySelector("#selected-option").textContent=choice+" selected";
document.querySelector("#decision-title").textContent=choice+" is the selected demo fit.";
document.querySelector("#decision-copy").textContent="This prototype decision weighs illustrative evidence, verification, advisory context and stated tradeoffs. A production recommendation would use live intelligence.";
localStorage.setItem("learnifyngGoldChoice",choice);
}
function restoreSaved(){const saved=localStorage.getItem("learnifyngGoldDecision");if(saved)document.querySelector("#saved-status").textContent="Demo decision saved for "+saved+". No real investigation was created."}
document.addEventListener("click",event=>{
let el=event.target.closest("[data-route]");if(el){event.preventDefault();go(el.dataset.route);return}
el=event.target.closest("[data-trust]");if(el){renderTrust(el.dataset.trust);go("trust");return}
el=event.target.closest("[data-option]");if(el){choice=el.dataset.option;updateDecision();return}
if(event.target.id==="save-decision"){localStorage.setItem("learnifyngGoldDecision",choice);document.querySelector("#saved-status").textContent="Demo decision saved for "+choice+". No real investigation was created."}
});
function init(){
document.querySelector("#question-form").addEventListener("submit",event=>{event.preventDefault();const value=document.querySelector("#question").value.trim();if(value)currentQuestion=value;localStorage.setItem("learnifyngGoldQuestion",currentQuestion);updateContext();go("intelligence")});
renderRecords();renderTrust();renderComparison();updateContext();updateDecision();restoreSaved();
document.querySelector("#question").value=currentQuestion;go(location.hash.slice(1)||"home");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
