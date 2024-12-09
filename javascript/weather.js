window.onload = function () {
    const apiKey = 'API_KEY'; // OpenWeather API Key: d61cf8c8ecd789a76e43059164c2e3d3
    const weatherLocation = document.getElementById('weather-location');
    const weatherDescription = document.getElementById('weather-description');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherWidget = document.getElementById('weather-widget');
    const weatherOnBtn = document.getElementById('weather-on-btn');
    const weatherOffBtn = document.getElementById('weather-off-btn');


// 날씨 창 토글 기능
    weatherOnBtn.addEventListener('click', () => {
        weatherWidget.classList.toggle('hidden');
    });
    weatherOffBtn.addEventListener('click', () => {
        weatherWidget.classList.toggle('hidden');
    });


// 사용자의 위치 정보를 가져옵니다.
    navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords;
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${apiKey}`;

        try {
            const response = await fetch(weatherApiUrl);
            const data = await response.json();

            // 날씨 정보를 페이지에 업데이트
            weatherLocation.textContent = `${data.name}, ${data.sys.country}`;
            weatherDescription.textContent = `${data.weather[0].description}`;
            weatherTemp.textContent = `현재 온도: ${data.main.temp}°C`;
        } catch (error) {
            weatherDescription.textContent = '날씨 정보를 불러오는 데 실패했습니다.';
        }
    }, () => {
        weatherDescription.textContent = '위치 권한이 필요합니다.';
    });
}