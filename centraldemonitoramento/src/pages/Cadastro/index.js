import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

export default function Home() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [CRM, setCRM] = useState("");
  const [idade, setIdade] = useState("");

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  };

  function handleTonavigate(e) {
    e.preventDefault();
    if (name === "" || cpf === "") return;

    const newCPF = cpf.replace(".", "").replace(".", "").replace("-", "");

    const data = {
      name,
      cpf: newCPF,
      CRM,
      idade,
    };

    history.push(`Monitoramento`, { data });
  }

  return (
    <main className="Homecontainer">
      <h1 className="home_title">Cadastro Paciente</h1>
      <form onSubmit={handleTonavigate}>
        <div className="form-group">
          <label>Nome Paciente</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col-8">
            <div className="form-group">
              <label>CPF Paciente</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.target.value))}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label>Idade</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                maxLength="3"
                value={idade}
                onChange={(e) => setIdade(e.target.value.replace(/\D/gim, ""))}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>CRM médico</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            maxLength="7"
            value={CRM}
            onChange={(e) => setCRM(e.target.value)}
          />
        </div>
        <button type="submit" className="btn button">
          Submit
        </button>
      </form>
    </main>
  );
}
