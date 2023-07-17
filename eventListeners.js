import { nextButton, globals } from "./script.js";
import { getNameHandler, showQuestion } from "./utils.js";



nextButton.addEventListener("click", ()=>{
    if (globals.landing_page){
        getNameHandler();
    }
    showQuestion();
})