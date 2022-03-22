import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
    const [countries, setCountries] = useState([]);
    const [keyword, setKeyword] = useState("");
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setCountries(response.data);
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <div>
            <p>
                find countries{" "}
                <input
                    onChange={(e) =>
                        setKeyword(e.target.value)
                    }
                    value={keyword}
                    placeholder="Country"
                />
            </p>
            <Searching
                keyword={keyword}
                countries={countries}
                setKeyword={setKeyword}
            />
        </div>
    );
}

const Searching = ({ keyword, countries, setKeyword }) => {
    let res = [];
    if (countries.length == 0 || keyword.length == 0) {
        return <div></div>;
    }
    countries.forEach((country) => {
        const name = country.name.common;
        if (
            name
                .toLowerCase()
                .includes(keyword.toLowerCase())
        ) {
            res.push(country);
        }
    });
    //
    return (
        <>
            {res.length > 0 ? (
                res.length == 1 ? (
                    <BasicCountry
                        country={res[0]}
                        setKeyword={setKeyword}
                    />
                ) : (
                    <ul>
                        {res.map((country) => {
                            return (
                                <li
                                    key={
                                        country.name.common
                                    }
                                >
                                    {country.name.common}
                                    <button
                                        onClick={() =>
                                            setKeyword(
                                                country.name
                                                    .common
                                            )
                                        }
                                    >
                                        show
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )
            ) : (
                <div>No result</div>
            )}
        </>
    );
};
const BasicCountry = ({ country, setKeyword }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(
                    (lang) => {
                        return <li key={lang}>{lang}</li>;
                    }
                )}
            </ul>
            <img
                src={country.flags.png}
                alt={`flag of ${country.name.common}`}
            />
            <Weather countryName={country.name.common} />
            <br />

            <button onClick={() => setKeyword("")}>
                Back
            </button>
        </div>
    );
};
const Weather = ({ countryName }) => {
    const [weather, setWeather] = useState();
    useEffect(() => {
        const params = {
            q: countryName,
            appid: process.env.REACT_APP_OPENWEATHER_KEY,
        };
        console.log(params.appid);
        axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather`,
                { params }
            )
            .then((res) => {
                setWeather(res.data);
                console.log(res.data);
            })
            .catch((e) => console.log(e));
    }, []);
    if (!weather) {
        return <div>Fetching weather...</div>;
    }
    return (
        <div>
            <h3>Weather:</h3>
            <p>
                temperature{" "}
                {(weather.main.temp - 273).toFixed(1)}{" "}
                Celcius
            </p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
            />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    );
};

export default App;
