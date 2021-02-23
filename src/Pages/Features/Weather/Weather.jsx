import React, { useEffect, useState, Fragment } from "react";
import _ from "lodash";
import { database } from "./../../../services/FirebaseService";
import Loading from "./../../../components/Loading";
import Select from "./../../../components/Select";
import { getWeatherInfo } from "./../../../services/WeatherAPI";
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
    let snapshot = await database.ref("/citylist").once("value");
    return snapshot.val();
  }
  const mapCity = async (data) => {
    const filterCityID = data.filter((city) => city.country === "ID");
    const getIDCityFromFiltered = await Promise.all(
      filterCityID.map(async (city) => {
        return {
          _id: city.name,
          name: city.name,
        };
      })
    );
    return getIDCityFromFiltered;
  };
  const mapAPI = (data) => {
    mapCity(data).then((res) => {
      res = _.sortBy(res, "name");
      res = _.uniqBy(res, (data) => data.name);
      setCityList(res);
      setIsCityListLoaded(true);
    });
  };
  const changeTest = (data) => {
    console.log(data);
    setCityData(JSON.stringify(data));
    console.log(data);
  };
  const handleCityChange = (e) => {
    const { value } = e.target;
    setCurrentCity(value);
    if (currentCity !== "ERROR") {
      getWeatherInfo(value, changeTest);
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
              onCityChange={handleCityChange}
              currentCity={currentCity}
              name="city"
              classes="city-select"
            />
          </div>
          <hr className="weather-line-break" />
          <hr className="weather-line-break" />
          <div className="weather-display"
            
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Weather;
