import { decodeIntList, resetState,  } from "./utils.js";
import {  containerElement, headingElement } from "./script.js";
import { getAnswerList, getAnswered, getCorrectAnswers, getCreator, getFriend,  } from "./query.js";
import { ALL_QUESTIONS } from "./questions.js";


//http://127.0.0.1:5500/?mode=view&answered=29%252C78%252C9%252C7%252C76%252C70%252C5%252C50%252C63%252C89&answer_list=0%252C0%252C3%252C3%252C3%252C3%252C3%252C3%252C3%252C3&correct_answer=0%252C2%252C3%252C0%252C3%252C3%252C1%252C2%252C3%252C3&creator=a&friend=b
export function viewAnswerHandler(){
    let answered = decodeIntList(getAnswered());
    let answer_list = decodeIntList(getAnswerList(), 5);
    let correct_answers = decodeIntList(getCorrectAnswers(), 5);
    let creator = getCreator();
    let friend = getFriend();
    resetState();
    console.log(answered);
    console.log(answer_list);
    console.log(correct_answers);
    console.log(creator);
    console.log(friend);
    headingElement.innerHTML = `Dare by ${creator}, answered by ${friend}`
    for (let i=0; i< answered.length; i++){
        containerElement.appendChild(createQuestionElement(answered[i], correct_answers[i], answer_list[i], i+1))
    }

}

function createQuestionElement(questionNo, correct_option, chosen_option, count) {
    // Create the question element
    var questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.textContent = count + ':'+ ALL_QUESTIONS[questionNo].question;
  
    // Create the options
    var options = ALL_QUESTIONS[questionNo].answers;
    for (var i = 0; i < options.length; i++) {
      var optionElement = document.createElement('div');
      optionElement.className = 'option';
      optionElement.textContent = options[i].text;
  
      // Add the "correct" class to the correct option
      if (i === correct_option) {
        optionElement.classList.add('correct');
      }
  
      // Add the "wrong" class to the chosen option if it is incorrect
      if (i === chosen_option && chosen_option !== correct_option) {
        optionElement.classList.add('incorrect');
      }
  
      // Append the option to the question element
      questionElement.appendChild(optionElement);
    }
    questionElement.classList.add("btn")
    // Return the question element
    return questionElement;
  }