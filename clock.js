const clockContainer = document.querySelector(".js-clock"), //querySelector는 document에서 인치하는 문서내 첫 번째 Element를 반환한다. 콤마를 붙인건 클래스를 의미함
  clockTitle = clockContainer.querySelector("h1"); //html 에서 div 태그로 그룹화 되있기 때문에 js-clock클래스에서 h1 Element를 불러와야 한다

  //자바스크립트에서 외부 참조를 할 경우 (html, css,..etc) ""큰 따옴표를 붙여줘야 한다
  //반면 내부 value일경우 그냥 써주면 된다

  //시간을 보여주는 함수
function getTime()
{
    const date = new Date(); //Date객체를 생성
    const minute = date.getMinutes(); 
    const hours = date.getHours();
    const second = date.getSeconds();

    //시간, 분, 초를 가져와서 포맷에 맞게 h1 Element의 text에 할당한다.
    //할당문이 경우에따라 복잡하게 바뀌니 주의깊게 봐야됨
  
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minute < 10 ? `0${minute}` : minute} : ${second < 10 ? `0${second}` : second}`
}

function init()
{
    getTime();
    setInterval(getTime, 1000); //android 할 때도 써봤었지만 반복실행시켜주는 함수다 첫 번째 인수는 반복실행할 함수, 두번째는 밀리초단위 주기이다
}

init();
//알아야 할것!! 기능별로 세분화 하자. 뭉탱이로 만들면 나중에 귀찮아진다. 분할 할 수 있을 떄 하자