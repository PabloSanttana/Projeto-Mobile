const { Cadastros } = require("../database/db");
const { notificationPatients } = require("../database/notifications");

module.exports = {
  async patientStatus(request, response) {
    const { id } = request.params;

    const paciente = await Cadastros.find((item) => item.id === id);

    if (!paciente) {
      return response.status(404).json({
        error: "Not found",
      });
    }

    return response.status(200).json({
      BPM: paciente.BPM,
      PA: paciente.PA,
      SaO2: paciente.SaO2,
    });
  },
  async notificationPatient(request, response) {
    const cpf = request.headers.cpf;

    const notification = notificationPatients.find((item) => item.cpf === cpf);

    if (!notification) {
      return response.status(404).json({
        error: "not found",
      });
    }

    response.status(200).json(notification);
  },
  async clearNotification(request, response) {
    const cpf = request.headers.cpf;

    const index = await notificationPatients.findIndex(
      (item) => item.cpf === cpf
    );

    if (index === -1) {
      return response.status(404).json({
        error: "not found",
      });
    }

    (notificationPatients[index].countMessage = 0),
      (notificationPatients[index].statusChange = 0);

    response.status(200).json(notificationPatients[index]);
  },
};
