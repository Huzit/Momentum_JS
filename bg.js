const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber)
{
    const image = new Image();
    image.src = `C:/work/JS/images/${imgNumber + 1}.jpg` //imgNumber값이 될 수 있는건 0, 1, 2, 3 이기 때문에 +1해서 맞춰준다.
    image.classList.add("bgImage") //bgImage를 object로 반환해준다.
    body.appendChild(image)
    
}

function getRandom()
{
    const number = Math.floor(Math.random() * IMG_NUMBER); //0 ~ 4 사이의 난수를 내림

    return number;
}

function init()
{
     const randomNumber = getRandom();
     paintImage(randomNumber);
}

init();