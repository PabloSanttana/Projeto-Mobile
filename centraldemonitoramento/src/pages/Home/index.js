import React from "react";
import { Link } from "react-router-dom";

import Image from "../../assets/illustration.png";

export default function Home() {
  return (
    <div>
      <section className="row mt-3 ml-1 mr-1">
        <div className="col-md-5 w-100">
          <div className="d-flex  justify-content-center h-100 w-100 flex-column">
            <h1 style={{ width: "90%" }} className="font-weight-bold">
              Centro de monitoramento virtual de saúde feito para você.
            </h1>
            <p
              style={{ width: "90%", fontSize: 16 }}
              className="text-secondary mt-2"
            >
              MonitoringCenter oferece assistência médica progressiva e
              acessível, no celular e online para todos.
            </p>
            <Link
              to="/cadastro_paciente"
              style={{ width: 200, backgroundColor: "#458FF6" }}
              className="mt-3 btn text-white"
            >
              Acessar
            </Link>
          </div>
        </div>
        <div className="col-md-7 w-100">
          <figure>
            <img className="w-100" style={{ width: "100%" }} src={Image} />
          </figure>
        </div>
      </section>
    </div>
  );
}
