

const myKeyValues = window.location.search;
console.log("Keys & Values : ", myKeyValues);

const urlParams = new URLSearchParams(myKeyValues);



export function getMode() {
    return urlParams.get('mode');  
}

export function getAnswered(){
    return urlParams.get('a'); //a => answered
}

export function getAnswerList(){
    return urlParams.get('b') //b => answer_list
}

export function getCorrectAnswers(){
    return urlParams.get("c") //c => correct_answer

}

export function getCreator(){
    return urlParams.get("creator") 
}


export function getFriend(){
    return urlParams.get("friend");
}

