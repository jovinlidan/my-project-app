import React, { useEffect, useState, Fragment } from "react";
import { database } from "./../../../services/FirebaseService";
import Loading from "./../../../components/Loading";
import Select from "./../../../components/Select";
import { getWeatherInfo, getIconByAPI } from "./../../../services/WeatherAPI";
import "./Weather.css";

const Weather = () => {
  const [isCityListLoaded, setIsCityListLoaded] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [cityData, setCityData] = useState();

  useEffect(() => {
    getAPI().then((res) => {
      mapAPI(res);
    });
  }, []);

  async function getAPI() {
    let snapshot = await database.ref("/citylist/id").once("value");
    return snapshot.val();
  }
  // const mapCity = async (data) => {
  //   const getIDCityFromFiltered = await Promise.all(
  //     data.map(async (city) => {
  //       return {
  //         _id: city.name,
  //         name: city.name,
  //       };
  //     })
  //   );
  //   return getIDCityFromFiltered;
  // };
  const mapAPI = (data) => {
    setCityList(data);
    setIsCityListLoaded(true);
  };
  const changeDataThatReturnFromAPI = (data) => {
    setCityData(data);
  };
  const handleCityChange = (e, city) => {
    if (city) {
      const { value } = city;
      setCurrentCity(value);
      getWeatherInfo(value, changeDataThatReturnFromAPI);
    }
  };

  return (
    <div className="weather-container">
      {!isCityListLoaded ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="weather-select">
            <p>INDONESIA WEATHER</p>

            <Select
              options={cityList}
              label={"City"}
              onChange={handleCityChange}
              name="city"
              classes="city-select"
            />
          </div>
          <hr className="weather-line-break" />
          <hr className="weather-line-break" />

          {!currentCity ? (
            <div className="select-city-first">Select Your City First...</div>
          ) : (
            <div className="weather-display">
              <div className="weather-info">
                <div className="kota">{cityData?.name}</div>
                <div
                  className="icon"
                  style={{
                    backgroundImage: `url(${getIconByAPI(
                      cityData?.weather[0].icon
                    )})`,
                  }}
                ></div>
                <div className="status">{cityData?.weather[0].main}</div>
              </div>
              <div className="weather-info">
                <div className="celcius">
                  {(cityData?.main.temp - 273)?.toPrecision(4)}°C
                </div>
                <hr className="break" />
                <div className="kelvin">{cityData?.main.temp}</div>
              </div>
              <div className="weather-info">
                <div className="wind-label"> WIND SPEED </div>
                <div className="speed">{cityData?.wind.speed}</div>
                <hr className="break" />
                <div className="degree">{cityData?.wind.deg}</div>
                <div className="wind-label">WIND DEGREE</div>
              </div>
              <div className="weather-info">
                <div className="wind-label"> HUMIDITY </div>
                <div className="speed">{cityData?.main.humidity}</div>
                <hr className="break" />
                <div className="degree">{cityData?.main.pressure}</div>
                <div className="wind-label">PRESSURE</div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Weather;
