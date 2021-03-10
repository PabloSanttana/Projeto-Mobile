import { BrowserRouter, Link } from "react-router-dom";

import Routes from "./routes";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-light bg-light  mt-3">
          <Link
            className="navbar-brand"
            style={{ fontSize: 25, color: "#132028" }}
            to="/"
          >
            MonitoringCenter
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div style={{ width: "100%" }}></div>
          <div
            className="collapse navbar-collapse w-25"
            id="navbarTogglerDemo02"
            style={{ fontSize: 20 }}
          >
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 w-25">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cadastro_paciente">
                  Cadastro
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes />
      </div>
    </BrowserRouter>
  );
}
