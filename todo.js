const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"); //목록을 만드는 ul tag의 class이다
    const TODOS_LS = 'toDos'; // 비유하면 User

    let toDos = []; //해야할 일의 array



function deleteTodo(event)
{
    const btn = event.target; //이벤트의 타겟을 가져오게 되면 해당 오브젝트를 가져온다. View의 요소
    const li = btn.parentNode; //오브젝트의 부모노드를 가져옴
    toDoList.removeChild(li);
    const cleanTODos = toDos.filter(function filterFn(toDo){ //filter메소드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환 
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanTODos; //배열을 다시 최신화
    saveToDos()
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //setItem은 Map형 
}

function paintTodo(text)
{
    const li = document.createElement("li");    //li 태그는 list의 약자로 목록을 만들어주는 html태그, html서 얻어와도 되지만 JS에서 createElement를 이용하면 직접 선언할 수 있다.
    const delBtn = document.createElement("button"); //buton Element 생성
    const span = document.createElement("span") //inline에서 내용을 출력해준다.
    const newId = toDos.length+1;

    delBtn.innerText = "❌" //만약 이모지가 안될경우 charset문제
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;

    li.appendChild(delBtn); //li list에 button span을 추가
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li); //list에 추가 => 그 결과 버튼, 내용이 들어가 있는 object를 element로 가진 리스트가 생성된다

    const toDoObj = { //local Storage에 저장하기 위해 생성
        text: text, //입력받은 text를 object.text에 넣어준다.
        id: newId
    };
    
    toDos.push(toDoObj); //toDos Array에 toDoObj Object를 넣어준다
    saveToDos(); //이렇게 할 경우 브라우저의 localStorage에선 [object Object] 로 저장이 된다. 그 이유는 local stroage에는, 자바스크립트의 data를 저장할 수가 없기 때문
                //그래서 인수를 보낼 때 String로 만들어 줘야함
}

function handleSubmit(event) //이벤트를 받아주는 함수
{
    event.preventDefault();  //이벤트가 자동으로 종료되는걸 막아주는 역활
    const currentValue = toDoInput.value;  //현재 form에 입력된 값을 currentValue에 저장
    paintTodo(currentValue); 
    toDoInput.value = "";
}

function loadToDos()
{
    const loadToDos = localStorage.getItem(TODOS_LS); //로컬에서 TODOS_LS키를 가진 value값을 가져온다.
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos); //JSON으로 String -> object 과정을 거친다.
        parsedToDos.forEach(function(toDo)
        {
            paintTodo(toDo.text);
        })
    }
}

function init()
{
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit) //이벤트를 발생시키는 이벤트 리스너를 생성
}

init();