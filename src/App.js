import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import MaterialIcon, { colorPalette } from "material-icons-react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api_key = "a0fece3723cc8c62773181c17df81be7";

  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=" +
    api_key +
    "&units=metric";

  let temp_url =
    "https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1";

  useEffect(() => {
    axios(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (error) console.log(error);

  if (!loading) {
    console.log(data);

    let sunrise = new Date(data.sys.sunrise);
    console.log(data.timezone);
    console.log(sunrise.getHours(), sunrise.getMinutes());

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-card">
            <Row>
              <Col>
                <h1 style={{ fontWeight: 500 }}>
                  {data.name}, {data.sys.country}
                </h1>
                <h5 style={{ fontWeight: 400 }}>
                  {data.weather[0].description.replace(/^\w/, (c) =>
                    c.toUpperCase()
                  )}
                </h5>
                <h1 style={{ fontSize: 64 }}>{parseInt(data.main.temp)} °C</h1>
                <h5 style={{ fontWeight: 400 }}>
                  Feels like {parseInt(data.main.feels_like)} °C
                </h5>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <img
                  height="140px"
                  className="App-mainIcon"
                  src={
                    "https://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@2x.png"
                  }
                />
              </Col>
            </Row>
            <Row className="App-grid" style={{ margin: "8vh 0 0 0" }}>
              <Col>
                <Row style={{ marginTop: 8 }}>
                  <Col className="App-smallCard">
                    <MaterialIcon icon="expand_less" size={100} invert />
                    <h4 style={{ fontWeight: 300 }}>
                      High: {parseInt(data.main.temp_max)} °C
                    </h4>
                  </Col>
                  <Col className="App-smallCard">
                    <MaterialIcon icon="expand_more" size={100} invert />
                    <h4 style={{ fontWeight: 300 }}>
                      Low: {parseInt(data.main.temp_min)} °C
                    </h4>
                  </Col>
                </Row>
                <Row style={{ marginTop: 8 }}>
                  <Col className="App-smallCard">
                    <MaterialIcon icon="air" size={100} invert />
                    <h4 style={{ fontWeight: 300 }}>
                      Wind: {data.wind.speed} m/s
                    </h4>
                  </Col>
                  <Col className="App-smallCard">
                    <MaterialIcon icon="water" size={100} invert />
                    <h4 style={{ fontWeight: 300 }}>
                      Humidity: {data.main.humidity}%
                    </h4>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* </div> */}
          </div>
        </header>
      </div>
    );
  } else
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Row>
              <Col>
                <h1>Loading...</h1>
              </Col>
            </Row>
          </div>
        </header>
      </div>
    );
}

export default App;

const styles = {
  card: {
    backgroundColor: "#eee",
    borderRadius: 30,
    margin: 10,
  },
};
