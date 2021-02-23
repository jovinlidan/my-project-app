import axios from "axios";
const getWeatherAPIByCity = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b02f4c9c1af3f735a18c71065035c31e`;
};

export const getWeatherInfo = async (city, changeTest) => {
  await axios
    .get(getWeatherAPIByCity(city))
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      changeTest(data);
      console.log(changeTest);
    });
};
