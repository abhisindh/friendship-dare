import { resetState, decodeIntList, createNameInput, encodeIntList, updateURLWithQueries} from "./utils.js";
import { answerButtons, globals, nextButton, questionElement, headingElement } from "./script.js";
import { getAnswered, getAnswerList, getCreator } from "./query.js";
import { ALL_QUESTIONS } from "./questions.js";

// http://127.0.0.1:5500/?mode=answer&answered=81%252C31%252C94%252C89%252C6%252C19%252C83%252C82%252C33%252C15&answer_list=1%252C2%252C2%252C0%252C2%252C1%252C1%252C2%252C2%252C3&creator=abhisindh

export function answerQuizHandler(){
    resetState();
    let answered = decodeIntList(getAnswered());
    let answer_list = decodeIntList(getAnswerList());
    let creator = getCreator();
    console.log(answered);
    console.log(answer_list);
    createNameInput();
    let questions = [];
    for (let i=0; i<answered.length; i++){
        let question = ALL_QUESTIONS[answered[i]];
        question.answers[answer_list[i]].correct = true;
        question.id = i;
        questions.push(question);
    }
    globals.questions = questions;
    headingElement.innerHTML = "Friendship dare by " + creator;
}

export function answer_showQuestion(){
    if (globals.current_question_no < globals.questions.length){
        showQuestion();
    }else{
        showShareLink();
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = globals.questions[globals.current_question_no];
    let questionNo = globals.current_question_no+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.no = answer.no;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function selectAnswer(e){
    globals.current_question_no++;
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    globals.answer_list.push(parseInt(selectedBtn.dataset.no));
    if (isCorrect){
        selectedBtn.classList.add("correct");
        globals.score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
    console.log(globals);
}

function showShareLink(){
    resetState();
    questionElement.innerHTML = `You scored ${globals.score} out of ${globals.questions.length}. Share or go to the below link to view your answers`;
    var link = document.createElement('textarea');
    link.readOnly = true
    link.classList.add('btn')
    link.rows = 4;
    let answer_list_hash = encodeIntList(globals.answer_list);
    var newQueries = {
        mode : "view",
        answered : getAnswered(),
        answer_list : answer_list_hash,
        correct_answer : getAnswerList(),
        creator : getCreator(),
        friend : globals.name
    }
            
    link.innerHTML = updateURLWithQueries(newQueries);
    console.log(decodeIntList(newQueries.answered));
    console.log(decodeIntList(newQueries.answer_list));
    console.log(decodeIntList(newQueries.correct_answer));

    answerButtons.appendChild(link);
}