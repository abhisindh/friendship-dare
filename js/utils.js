import { answer_showQuestion } from "./answer.js";
import { create_showQuestion } from "./create.js";
import { nextButton, answerButtons, questionElement, globals} from "./script.js";

export function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

export function createNameInput(){
    questionElement.innerHTML = "Enter your Name";
    const input = document.createElement("input");
    input.setAttribute("id", "name_input");
    input.setAttribute("type", "text")
    input.classList.add("btn");
    answerButtons.appendChild(input);
    nextButton.style.display = "block"
}

export function getNameHandler(){
    console.log(globals.landing_page);
    globals.landing_page = false
    globals.name = document.getElementById("name_input").value;
    console.log(globals.name);
}

export function showQuestion(){
    if (globals.mode == "create"){
        create_showQuestion();
    }else if (globals.mode == "answer"){
        answer_showQuestion();
    }else if (globals.mode == "view"){
        view_showQuestion();
    }
}


export function encodeIntList(list) {
    console.log(list);
    var encodedString = encodeURIComponent(list.join(','));
    return encodedString;
  }
  
export function decodeIntList(encodedString) {
    var decodedString = decodeURIComponent(encodedString);
    var list = decodedString.split(',').map(Number);
    return list;
  }
  

export function updateURLWithQueries(newQueries) {
    var url = new URL(window.location.href);
    url.search = ''; // Remove existing queries
    
    // Add new queries
    for (var key in newQueries) {
      if (newQueries.hasOwnProperty(key)) {
        url.searchParams.set(key, newQueries[key]);
      }
    }
    return url.toString();
  }