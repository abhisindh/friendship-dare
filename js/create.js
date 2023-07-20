import { resetState, createNameInput, encodeIntList, decodeIntList, updateURLWithQueries} from "./utils.js";
import { answerButtons, globals, headingElement, nextButton, questionElement } from "./script.js";
import { ALL_QUESTIONS } from "./questions.js";

export function createQuizHandler(){
    resetState();
    console.log(ALL_QUESTIONS.length);
    createNameInput();
    headingElement.innerHTML = "Create Your Friendship Dare"

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
        console.log(answer);

        const image = document.createElement("img"); // Create an <img> element
        image.classList.add("option-image")
        image.src = answer.image_link; // Set the image source URL
        image.alt = "Answer Image"; // Add an alt attribute for accessibility
        answerButtons.appendChild(image); // Append the image to the answerButtons container


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
    link.classList.add('sharelink')
    link.rows = 4;
    let answered_hash = encodeIntList(globals.answered);
    let answer_list_hash = encodeIntList(globals.answer_list, 5);
    var newQueries = {
        mode : "answer",
        a : answered_hash,
        b : answer_list_hash,
        creator : globals.name
    }
            
    link.innerHTML = updateURLWithQueries(newQueries);
    console.log(decodeIntList(answered_hash));
    console.log(decodeIntList(answer_list_hash, 5));

    answerButtons.appendChild(link);

    var copyButton = document.createElement('button');
    copyButton.classList.add('c-btn')
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.onclick = function () {
        navigator.clipboard.writeText(updateURLWithQueries(newQueries))
            .then(() => alert('Copied to clipboard!'))
            .catch((error) => console.error('Failed to copy:', error));
    };
    answerButtons.appendChild(copyButton);
}

