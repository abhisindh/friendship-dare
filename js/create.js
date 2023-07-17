import { resetState, createNameInput, encodeIntList, decodeIntList, updateURLWithQueries} from "./utils.js";
import { answerButtons, globals, nextButton, questionElement } from "./script.js";
import { ALL_QUESTIONS } from "./questions.js";

export function createQuizHandler(){
    resetState();
    console.log(ALL_QUESTIONS.length);
    createNameInput();

}

function getRandom(){
        var randomNumber = (Math.floor(Math.random() * 100) + 1)%globals.totalQuestions;
        while (globals.shown.includes(randomNumber) && globals.shown.length < 10){
            randomNumber = (Math.floor(Math.random() * 100) + 1)%globals.totalQuestions;
        }
        globals.shown.push(randomNumber);
        return randomNumber;
}

export function create_showQuestion(){

    if (globals.answered.length<10 && globals.shown.length < ALL_QUESTIONS.length){
        showQuestion();
    }else{
        showShareLink();
        nextButton.style.display = "none";
    }
}

function showQuestion(){
    resetState();
    let q_no = getRandom()
    let currentQuestion = ALL_QUESTIONS[q_no];
    let shownNo = globals.shown.length;
    let answeredNo = globals.answered.length;

    globals.current_question_no = q_no;
    questionElement.innerHTML = (answeredNo+1) + "/ 10 . "+currentQuestion.question;
    console.log(globals.shown);
    console.log(globals.answered);
    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        button.dataset.no = answer.no;
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
    })
    nextButton.style.display = "block"
}

function selectAnswer(e){
    const selectButton = e.target;
    globals.answer_list.push(parseInt(selectButton.dataset.no));
    globals.answered.push(globals.current_question_no);
    console.log(globals.answered);
    console.log(globals.answer_list);
    selectButton.classList.add("neutral");
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    })
    nextButton.style.display = "block";

}

function showShareLink(){
    resetState();
    questionElement.innerHTML = "share the below links with your friends";
    var link = document.createElement('textarea');
    link.readOnly = true
    link.classList.add('btn')
    link.rows = 4;
    let answered_hash = encodeIntList(globals.answered);
    let answer_list_hash = encodeIntList(globals.answer_list);
    var newQueries = {
        mode : "answer",
        answered : answered_hash,
        answer_list : answer_list_hash,
        creator : globals.name
    }
            
    link.innerHTML = updateURLWithQueries(newQueries);
    console.log(decodeIntList(answered_hash));
    console.log(decodeIntList(answer_list_hash));

    answerButtons.appendChild(link);
}

