import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

import "./styles.css";

let socket;

export default function Monitoramento({ location }) {
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [CRM, setCRM] = useState("");
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const { name, cpf, CRM, idade } = location.state.data;
    socket = io("localhost:3333");

    setName(name);
    setCPF(cpf);
    setCRM(CRM);

    socket.emit("join", { name, cpf, CRM, idade }, () => {});
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [location.state.data]);

  useEffect(() => {
    socket.on("BPM", (info) => {
      /* console.log("BPM", info); */
    });
    socket.on("PA", (info) => {
      /*  console.log("PA", info); */
    });
    socket.on("SaO2", (info) => {
      /* console.log("SaO2", info); */
    });
    /*  socket.on("message", (message) => {
      console.log(message);
    }); */
  }, []);

  const [BPM, setBPM] = useState({ valor: 90, Status: "Baixa" });
  const [PA, setPA] = useState({ valor: "90/80", Status: "Baixa" });
  const [SaO2, setSaO2] = useState({ valor: "89%", Status: "Baixa" });
  const [intervalStatu, setIntervalStatu] = useState({
    id: null,
    active: false,
  });

  const handleonSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const BPM_info = {
        valor: BPM.valor,
        Status: BPM.Status,
      };
      const SaO2_info = {
        valor: SaO2.valor,
        Status: SaO2.Status,
      };
      const PA_info = {
        valor: PA.valor,
        Status: PA.Status,
      };

      socket.emit("BPM", BPM_info, () => {});
      socket.emit("PA", PA_info, () => {});
      socket.emit("SaO2", SaO2_info, () => {});
    },
    [BPM, SaO2, PA]
  );

  const getRandomInt = useCallback((min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }, []);
  const getStatus = useCallback((label, value) => {
    if (label === "BPM") {
      if (value <= 53 || value >= 82) return "Severa";
      else if (value < 56 || value > 74) {
        return "Moderada";
      } else {
        return "Baixa";
      }
    } else if (label === "SaO2") {
      if (value <= 85) {
        return "Severa";
      } else if (value <= 90) {
        return "Moderada";
      } else {
        return "Baixa";
      }
    } else {
      if (value <= 70 || value >= 130) {
        return "Severa";
      } else if (value <= 80 || value >= 120) {
        return "Moderada";
      } else {
        return "Baixa";
      }
    }
  }, []);

  function handleRandomValues(stop = false) {
    var myVar;
    if (!stop) {
      myVar = setInterval(handleonSubmitAutomatic, timer * 1000);
      setIntervalStatu({ id: myVar, active: true });
    } else {
      /*    console.log("Stop"); */
      clearInterval(intervalStatu.id);
      setIntervalStatu({ active: false });
    }
  }

  const handleonSubmitAutomatic = useCallback(() => {
    var tmpValor = getRandomInt(50, 85);
    const BPM_info = {
      valor: tmpValor,
      Status: getStatus("BPM", tmpValor),
    };
    tmpValor = getRandomInt(80, 100);
    const SaO2_info = {
      valor: tmpValor + "%",
      Status: getStatus("SaO2", tmpValor),
    };
    tmpValor = getRandomInt(70, 140);
    const PA_info = {
      valor: tmpValor + "/80",
      Status: getStatus("PA", tmpValor),
    };
    socket.emit("BPM", BPM_info, () => {});
    socket.emit("PA", PA_info, () => {});
    socket.emit("SaO2", SaO2_info, () => {});

    setBPM(BPM_info);
    setSaO2(SaO2_info);
    setPA(PA_info);
  }, []);

  return (
    <div className="container monitoramentocontainer">
      <div className="row mb-2 text-white">
        <div className="col-md-4">
          <h5 className="mr-5">
            {" "}
            <span className="font-weight-bold">Paciente:</span> {name}
          </h5>
        </div>
        <div className="col-md-4">
          <h5>
            {" "}
            <span className="font-weight-bold">CPF:</span> {cpf}
          </h5>
        </div>
        <div className="col-md-4">
          <h5>
            {" "}
            <span className="font-weight-bold">CRM:</span> {CRM}
          </h5>
        </div>
      </div>
      <form onSubmit={handleonSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>BPM</label>
              <input
                type="text"
                className={`form-control ${
                  BPM.Status === "Severa" && "alerte-danger"
                }  ${BPM.Status === "Moderada" && "alerte-alerte"}`}
                value={BPM.valor}
                onChange={(e) =>
                  setBPM({ valor: e.target.value, Status: BPM.Status })
                }
              />
              <select
                className={`form-control mt-1 ${
                  BPM.Status === "Severa" && "alerte-danger"
                }  ${BPM.Status === "Moderada" && "alerte-alerte"}`}
                value={BPM.Status}
                onChange={(e) =>
                  setBPM({ Status: e.target.value, valor: BPM.valor })
                }
              >
                <option value="Baixa">Baixa</option>
                <option value="Moderada">Moderada</option>
                <option value="Severa">Severa</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>SaO2</label>
              <input
                type="text"
                className={`form-control ${
                  SaO2.Status === "Severa" && "alerte-danger"
                }  ${SaO2.Status === "Moderada" && "alerte-alerte"}`}
                value={SaO2.valor}
                onChange={(e) =>
                  setSaO2({ valor: e.target.value, Status: SaO2.Status })
                }
              />
              <select
                className={`form-control mt-1 ${
                  SaO2.Status === "Severa" && "alerte-danger"
                } ${SaO2.Status === "Moderada" && "alerte-alerte"} `}
                value={SaO2.Status}
                onChange={(e) =>
                  setSaO2({ Status: e.target.value, valor: SaO2.valor })
                }
              >
                <option value="Baixa">Baixa</option>
                <option value="Moderada">Moderada</option>
                <option value="Severa">Severa</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>PA</label>
              <input
                type="text"
                className={`form-control ${
                  PA.Status === "Severa" && "alerte-danger"
                } ${PA.Status === "Moderada" && "alerte-alerte"}`}
                value={PA.valor}
                onChange={(e) =>
                  setPA({ valor: e.target.value, Status: PA.Status })
                }
              />
              <select
                className={`form-control mt-1 ${
                  PA.Status === "Severa" && "alerte-danger"
                } ${PA.Status === "Moderada" && "alerte-alerte"}`}
                value={PA.Status}
                onChange={(e) =>
                  setPA({ Status: e.target.value, valor: PA.valor })
                }
              >
                <option value="Baixa">Baixa</option>
                <option value="Moderada">Moderada</option>
                <option value="Severa">Severa</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Envio automatizado em segundos</label>
              <input
                type="text"
                maxLength={4}
                className={`form-control`}
                value={timer}
                onChange={(e) => setTimer(e.target.value.replace(/\D/gim, ""))}
                disabled={intervalStatu.active}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-white"
          disabled={intervalStatu.active}
        >
          Enviar
        </button>
        <button
          type="button"
          onClick={() => handleRandomValues()}
          className="btn bg-white ml-3"
          disabled={intervalStatu.active}
        >
          Envio automatizado
        </button>
        <button
          type="button"
          onClick={() => handleRandomValues(true)}
          className="btn bg-white ml-3"
          disabled={!intervalStatu.active}
        >
          Stop
        </button>
      </form>
    </div>
  );
}
