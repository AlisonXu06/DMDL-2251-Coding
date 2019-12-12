var w = document.getElementById("weather");

function searchWeather() {
	var input = document.getElementById('cid')
	let cityName = input.value;
	if (cityName == "") {
		cityName = "New York";
	}

	function ajax(options) {
		var getWeather = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
		var str = "";
		for (var key in options.data) {
			str += "&" + key + "=" + options.data[key];
		}
		str = str.slice(1)
		if (options.type == "get") {
			var url = options.url + "?" + str;
			getWeather.open("get", url);
			getWeather.send();
		} else if (options.type == "post") {
			getWeather.open("post", options.url);
			getWeather.setRequestHeader("content-type", "application/x-www-form-urlencoded");
			getWeather.send(str)
		}
		getWeather.onreadystatechange = function() {
			if (getWeather.readyState == 4 && getWeather.status == 200) {
				var d = getWeather.responseText;
				options.success && options.success(d)
			} else if (getWeather.status != 200) {
				options.error && options.error(getWeather.status);
			}
		}
	}
	ajax({
		type: "get",
		url: "https://api.openweathermap.org/data/2.5/weather",
		data: {
			"q": cityName,
			"appid": "b6d6796fa74769ae11927b9d50d2446c"
		},
		success: function(data) {
			data = JSON.parse(data)
			fillHtml(data);
		}
	});
}


function fillHtml(weather) {
	w.innerHTML = "";
	var city = document.createElement('h3');
	city.innerHTML = "City: " + weather.name;
	var country = document.createElement('h3');
	country.innerHTML = "Country: " + weather.sys.country;
	var tem = document.createElement('h3');
	tem.innerHTML = "Tempeerature: " + weather.main.temp + "°F" + " Tempeerature_max: " + weather.main.temp_max +
		" Tempeerature_min: " + weather.main.temp_min;
	var wind = document.createElement("h3");
	wind.innerHTML = "Wind(" + "speed: " + weather.wind.speed + " deg: " + weather.wind.deg + ")";
	w.appendChild(city);
	w.appendChild(country);
	w.appendChild(tem);
	w.appendChild(wind);
	for (var i = 0; i < weather.weather.length; i++) {
		var weather_des = document.createElement('h3');
		weather_des.innerHTML = "Weather: " + weather.weather[i].description;
		//if you don't want to show the picture ,delete the following from this comment
		var img = document.createElement("img");
		if (weather.weather[i].main == "Clouds") {
			img.src = "img/yun.gif";
		} else if (weather.weather[i].main == "Clear") {
			img.src = "img/qing.gif";
		} else if (weather.weather[i].main == "Rain") {
			img.src = "img/yu.gif";
		} else {
			img.src = "img/yin.gif";
		}
		//if you don't want to show the picture ,delete the above comment
		w.appendChild(weather_des);
		w.appendChild(img); //if you don't want to show the picture ,and you also need delete this;
	}
}
