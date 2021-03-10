import React from "react";
import { Route, Switch } from "react-router-dom";

import Cadastro from "./pages/Cadastro";
import Monitoramento from "./pages/Monitoramento";
import Home from "./pages/Home";

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Monitoramento" exact component={Monitoramento} />
      <Route path="/cadastro_paciente" exact component={Cadastro} />
    </Switch>
  );
}
