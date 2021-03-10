const doctores = require("../database/doctors");
const { Cadastros } = require("../database/db");

module.exports = {
  async authModuleDoctor(request, response) {
    const { password, CRM, fcmToken } = request.body;

    const doctor = doctores.find(
      (item) => item.CRM === CRM && item.password === password
    );

    let index = doctores.findIndex((item) => item.CRM === CRM);

    doctores[index].fcmTokem = `${fcmToken}`;

    return response.status(200).json(doctor);
  },

  async authModuleCaregiver(request, response) {
    const { cpf, CRM, fcmToken } = request.body;
    console.log(cpf, CRM, fcmToken);
    const paciente = await Cadastros.find(
      (item) => item.CRM === CRM && item.cpf === cpf
    );

    if (!paciente) {
      return response.status(404).json({
        error: "CPF ou CRM invalidos",
      });
    }
    const doctore = await doctores.find((item) => item.CRM === CRM);

    let index = await Cadastros.findIndex((item) => item.cpf === cpf);

    Cadastros[index].fcmTokem = fcmToken;

    return response.status(200).json({ ...paciente, nameMedico: doctore.name });
  },

  async LogoutModuleDoctor(request, response) {
    const { CRM } = request.body;

    const doctor = await doctores.find((item) => item.CRM === CRM);

    if (!doctor) {
      return response.status(404).json({
        error: "not found",
      });
    }

    let index = await doctores.findIndex((item) => item.CRM === CRM);

    doctores[index].fcmTokem = "";

    return response.status(200);
  },
  async LogoutModuleCaregiver(request, response) {
    const { cpf } = request.body;

    const paciente = await Cadastros.find((item) => item.cpf === cpf);

    if (!paciente) {
      return response.status(404).json({
        error: "Not found",
      });
    }

    let index = await Cadastros.findIndex((item) => item.cpf === cpf);

    Cadastros[index].fcmTokem = "";

    return response.status(200);
  },
};
