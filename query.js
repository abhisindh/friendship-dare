

const myKeyValues = window.location.search;
console.log("Keys & Values : ", myKeyValues);

const urlParams = new URLSearchParams(myKeyValues);



export function getMode() {
    return urlParams.get('mode');  
}

export function getAnswered(){
    return urlParams.get('answered');
}

export function getAnswerList(){
    return urlParams.get('answer_list')
}

export function getCreator(){
    return urlParams.get("creator")
}

export function getFriend(){
    return urlParams.get("friend");
}

export function getCorrectAnswers(){
    return urlParams.get("correct_answer")
}