const weather = document.querySelector(".js-weahter");
const API_KEY ="1e265723ef839a97dd49e95b6bf04b29";
// https://home.openweathermap.org/api_keys
const COORDS = "coords";

// get info from api
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        //console.log(response.json())
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} & ${place}`
    });
}
// localstorate 저장
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
//3
function handleGeoSuccess(position){
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    const coordsObj = {
        longitude : longitude,
        latitude : latitude,
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}

function handleGeoError(){
    console.log("Can not access GEO")
}
//2
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

//1
function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        //getweather
        const parseCoords = JSON.parse(loadedCords);
        console.log(parseCoords)
        getWeather(parseCoords.latitude,parseCoords.longitude)
    }
}

function init(){
    loadCoords();
}

init();