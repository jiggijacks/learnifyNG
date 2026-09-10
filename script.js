const headerSearch = document.querySelector("#header-search");

if(headerSearch){

headerSearch.addEventListener("submit", event => {

event.preventDefault();

const input = document.querySelector("#header-search-input");

const search = input.value.trim();

if(!search){
return;
}

currentQuestion = search;

localStorage.setItem(
"learnifyngGoldQuestion",
currentQuestion
);

const questionInput = document.querySelector("#question");

if(questionInput){
questionInput.value = currentQuestion;
}

updateContext();

go("intelligence");

});

}
