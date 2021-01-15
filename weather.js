const weather = document.querySelector(".js-weather");

const API_KEY = "e8b927b829b8754318cd8e89a6db8493"; /* https://openweathermap.org/ 에서 회원 가입 후 api key 복붙 */
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric` /* &units=metric 섭씨단위 시 사용 */
    ).then(function(response) {
        // 데이터가 완전히 받아지면(fetch 후) 응답 상태 반환
        return response.json();
    }).then(function(json){
        // 응답 상태 반환되면 실행
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) { /* 위도와 경도 */
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude /* longitude: longitude 키와 벨류명이 같을 경우 생략 가능 */
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();