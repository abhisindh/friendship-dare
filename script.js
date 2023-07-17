import { getMode } from "./query.js";
import { createQuizHandler } from "./create.js";
import { answerQuizHandler } from "./answer.js";
import { viewAnswerHandler } from "./view.js";



export const nextButton = document.getElementById("next-btn")
export const answerButtons = document.getElementById("answer-buttons")
export const questionElement = document.getElementById("question")
export const headingElement = document.getElementById("heading");
export const containerElement = document.getElementById("container")

export let globals = {
    landing_page : true,
    name : "", 
    totalQuestions : 100,
    question_numbers : [], 
    mode : getMode(),
    shown : [],
    answered : [],
    answer_list : [],
    current_question_no : 0,
    questions : [],
    score : 0
};






if (globals.mode == "create"){
    createQuizHandler();
}else if (globals.mode == "answer"){
    answerQuizHandler();
}else if (globals.mode == "view"){
    viewAnswerHandler();
}