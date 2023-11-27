const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  arrowBack = wrapper.querySelector("header i");

const apiKey = "8f14591505a570390540249cbe0754bb";    //This is my personal api from openweathermap.
let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support geolocation api");
  }
});

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function fetchData() {
  infoTxt.innerText = "Getting Weather Details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Something went wrong, API Error";
      infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} is not a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    if (id == 800) {
      wIcon.src =
        "https://drive.google.com/uc?export=view&id=13TlzPFrICsSEB3llo6PWuywWpoL6ywxb";
    } else if (id >= 200 && id <= 232) {
      wIcon.src =
        "https://drive.google.com/uc?export=view&id=13eqt-OgtVphxXYpIHd9Q7QOBNocK0Onq";
    } else if (id >= 600 && id <= 622) {
      wIcon.src =
        "https://drive.google.com/uc?export=view&id=13Z9FbAC1FJ-ptr55vUWUufLBCrhgjbF1";
    } else if (id >= 701 && id <= 781) {
      wIcon.src =
        "https://drive.google.com/uc?export=view&id=13YVPMlryJ3168jk-VR_zfTvVBL6Xeaqs";
    } else if (id >= 801 && id <= 804) {
      wIcon.src =
        "https://drive.google.com/uc?export=view&id=13TVP9iuZz8A9cf3OtJCgTmeS9AtJ-B3R";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src =
        "https://drive.google.com/uc?export=view&id=13YoLrgIqfw6UHTu0x4yqTRLIyCbT1O6e";
    }

    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(
      feels_like
    );
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});