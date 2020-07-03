const form = document.querySelector(".js-form"), //form 을 from이라고 적은 사람 대가리 박으시오
    input = form.querySelector("input");
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";
    
function saveName(text)
{
    localStorage.setItem(USER_LS, text)
}

function handleSubmit(event)
{
    event.preventDefault(); //해당 이벤트의 기본동작을 막는다.
    const currentValue = input.value; //

    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName()
{
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text)
{ //이 부분은 input element에 적용되는 부분
    form.classList.remove(SHOWING_CN); //form을 숨긴다.
    greeting.classList.add(SHOWING_CN); //classList에 SHOWING_CN을 해줘야 화면에 나온다.
    //classList가 무슨기능을 하는 놈인지를 자세히 알아보자
    greeting.innerText = `Hello ${text}`; //.js-greetings 의 text를 변경
}

function loadName()
{
    const currentUser = localStorage.getItem(USER_LS); //localStorage에서 USER_LS를 가져옴
    if(currentUser === null){   
        askForName();
    } else{
        paintGreeting(currentUser);
    }
}

function init()
{
    loadName();
}

init();