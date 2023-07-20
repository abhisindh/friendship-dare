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
    }
}


// export function encodeIntList(list) {
//     console.log(list);
//     var encodedString = encodeURIComponent(list.join(','));
//     return encodedString;
//   }
  
// export function decodeIntList(encodedString) {
//     var decodedString = decodeURIComponent(encodedString);
//     var list = decodedString.split(',').map(Number);
//     return list;
//   }
  
export function encodeIntList(intList, multiple = 0){
  let code = ''
  let index = 1
  intList.forEach(element => {
      code += encodeInt(element+(index*multiple));
      index += 1;
  });
  return code
}

function encodeInt(integer){
  const order = ['1', 'A', 'a', 'B', 'b', 'C', 'c', '2', 'D', 'd', 'E', 'e', 'F', 'f', 'G', '3', 'g', 'H', 'h', 'I', 'i', 'J', '4', 'j', 'K', 'k', 'L', 'l', 'M', 'm', '5', 'N', 'n', 'O', 'o', 'P', 'p', '6', 'Q', 'q', 'R', 'r', 'S', 's', 'T', '7', 't', 'U', 'u', 'V', 'v', 'W', '8', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', '9']

  if (integer > 60){
      return '-'+encodeInt(integer-60)
  }
  return order[integer]
}




export function decodeIntList(string, multiple = 0){
  const order = ['1', 'A', 'a', 'B', 'b', 'C', 'c', '2', 'D', 'd', 'E', 'e', 'F', 'f', 'G', '3', 'g', 'H', 'h', 'I', 'i', 'J', '4', 'j', 'K', 'k', 'L', 'l', 'M', 'm', '5', 'N', 'n', 'O', 'o', 'P', 'p', '6', 'Q', 'q', 'R', 'r', 'S', 's', 'T', '7', 't', 'U', 'u', 'V', 'v', 'W', '8', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', '9']

  let list = []
  let index = 1
  let offset =0
  for (var char of string){
      if (char == '-'){
          offset += 60
      }
      else{
          list.push(order.indexOf(char) + offset - (multiple*index))
          index += 1
          offset = 0
      }
  }
  return list
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