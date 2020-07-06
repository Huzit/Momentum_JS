const weather = document.querySelector(".js-weather");

const API_KEY = '69f117e8b58caea06ee8c9a22520f10a';
const COORDS = 'coords';

function getWeather(lat, lon)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(reponse) //then은 함수 호출이지만 기본적으로 fetch가 끝나고 함수가 호출될 수 있도록 하는 역활을 한다.
    {
        return reponse.json();
    })
    .then(function(json)
    {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}'C  ${place}`
    });
}

function saveCoords(coords)
{
    localStorage.setItem(COORDS, JSON.stringify(coords))
}
function handleGeoSuccess(position)
{
    const latitude = position.coords.latitude; //위도를 불러옴
    const longitude = position.coords.longitude; //경도를 불러옴
    const coordsOj = {
        latitude,  //latitude : latitude, 이게 기본 포맷이지만 키와 벨류가 같으면 latitide로 적어도 된다.
        longitude
    };
    saveCoords(coordsOj);
    getWeather(latitude, longitude);
}

function handleGeoError(position)
{
    console.log('Cant access geo location');
}
function askForCoords() //좌표를 요청하는 함수
{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError) // 첫 번째 인수는 성공했을 때, 두번 째는 실패했을 때
}

function loadCoords()
{
    const loadedCords = localStorage.getItem(COORDS)

    if(loadedCords === null)
    {
        askForCoords();
    }else
    {
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init()
{
    loadCoords();
}
init();