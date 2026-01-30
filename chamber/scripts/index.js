const apiKey = "005fcccc397ff271f4f0bd03a6579098";
const lat = -1.9548321057580769;
const lon = 30.064960907483062;

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function loadWeather() {
  const response = await fetch(weatherURL);
  const data = await response.json();

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  document.getElementById("current-weather").innerHTML = `
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    <p><strong>${data.main.temp.toFixed(1)} °C</strong></p>
    <p>${data.weather[0].description}</p>
    <p>High: ${data.main.temp_max.toFixed(1)} °C</p>
    <p>Low: ${data.main.temp_min.toFixed(1)} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Sunrise: ${sunrise}</p>
    <p>Sunset: ${sunset}</p>
  `;
}

async function loadForecast() {
  const response = await fetch(forecastURL);
  const data = await response.json();

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  daily.forEach(day => {
    const date = new Date(day.dt_txt);
    forecastDiv.innerHTML += `
      <p><strong>${date.toLocaleDateString("en-US", { weekday: "long" })}:</strong>
      ${day.main.temp.toFixed(1)} °C</p>
    `;
  });
}

loadWeather();
loadForecast();


async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const members = await response.json();

  const qualified = members.filter(
    m => m.level === "Gold" || m.level === "Silver"
  );

  qualified.sort(() => Math.random() - 0.5);
  const selected = qualified.slice(0, 3);

  const container = document.getElementById("spotlight-cards");
  container.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("div");
    card.className = "business-card";

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.tagline}</p>
      <img src="images/${member.image}" alt="${member.name}">
      <p><strong>PHONE:</strong> ${member.phone}</p>
      <p><strong>ADDRESS:</strong> ${member.address}</p>
      <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
    `;

    container.appendChild(card);
  });
}

loadSpotlights();

  