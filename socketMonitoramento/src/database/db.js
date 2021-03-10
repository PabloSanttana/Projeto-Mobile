const Cadastros = [];

function addPaciente({ id, name, cpf, CRM, idade }) {
  const existingUser = Cadastros.find((Cadastro) => Cadastro.cpf === cpf);

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const paciente = {
    id,
    name,
    cpf,
    CRM,
    idade,
    BPM: {
      valor: "",
      status: "Baixa",
    },
    SaO2: {
      valor: "",
      status: "Baixa",
    },
    PA: {
      valor: "",
      status: "Baixa",
    },
  };
  Cadastros.push(paciente);
  return { paciente };
}
function removePaciente(id) {
  const index = Cadastros.findIndex((Cadastro) => Cadastro.id === id);

  if (index !== -1) {
    return Cadastros.splice(index, 1)[0];
  }
}
function getPaciente(id) {
  return Cadastros.find((Cadastro) => Cadastro.id === id);
}
function getPacientesInRoom(cpf) {
  return Cadastros.find((Cadastro) => Cadastro.cpf === cpf);
}
function updatePaciente(id, status, title, value) {
  let index = Cadastros.findIndex((item) => item.id === id);

  if (title === "BPM") {
    Cadastros[index].BPM.status = status;
    Cadastros[index].BPM.valor = value;
  } else if (title === "SaO2") {
    Cadastros[index].SaO2.status = status;
    Cadastros[index].SaO2.valor = value;
  } else {
    Cadastros[index].PA.status = status;
    Cadastros[index].PA.valor = value;
  }
}

module.exports = {
  addPaciente,
  removePaciente,
  getPaciente,
  getPacientesInRoom,
  updatePaciente,
  Cadastros,
};
