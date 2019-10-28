
const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');


const GREETING_LS = "currentStorage";
const SHOWING_CN = "showing";

function saveName(t){
    localStorage.setItem(GREETING_LS,t)
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = input.value;
    paintText(currentValue)
    saveName(currentValue)
    console.log(currentValue)
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintText(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `안녕? ${text}`;
}

function loadName(){
    // localstorage 에서 값 가져오기
    const currentUser = localStorage.getItem(GREETING_LS);
    if(currentUser === null){
        // localstorage 에서 값이 없을 때 인풋 박스 출현
        askForName();
    }else{
        paintText(currentUser);
    }
}

function init(){
    loadName();
}

init();