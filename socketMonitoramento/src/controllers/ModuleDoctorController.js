const { Cadastros } = require("../database/db");
const { notificationDoctors } = require("../database/notifications");

module.exports = {
  async indexPatient(request, response) {
    const { CRM } = request.query;

    const mypaciente = [];

    if (Cadastros.length === 0) {
      return response.status(404).json({
        error: "Paciente não encontrado",
      });
    }

    for (let index = 0; index < Cadastros.length; index++) {
      if (Cadastros[index].CRM === CRM) {
        mypaciente.push(Cadastros[index]);
      }
    }

    return response.status(200).json(mypaciente);
  },
  async patientClassification(request, response) {
    const { CRM, BPM, SaO2, PA } = request.query;
    const mypaciente = [];

    if (Cadastros.length === 0) {
      return response.status(404).json({
        error: "Paciente não encontrado",
      });
    }

    Cadastros.map((item) => {
      if (item.CRM === CRM) {
        mypaciente.push(item);
      }
    });

    if (mypaciente.length === 0) {
      return response.status(404).json({
        error: "Paciente não encontrado",
      });
    }

    if (BPM === "true") {
      function compare(a, b) {
        if (a.BPM.status < b.BPM.status) {
          return -1;
        }
        if (a.BPM.status > b.BPM.status) {
          return 1;
        }
        return 0;
      }
    } else if (SaO2 === "true") {
      function compare(a, b) {
        if (a.SaO2.status < b.SaO2.status) {
          return -1;
        }
        if (a.SaO2.status > b.SaO2.status) {
          return 1;
        }
        return 0;
      }
    } else if (PA === "true") {
      function compare(a, b) {
        if (a.PA.status < b.PA.status) {
          return -1;
        }
        if (a.PA.status > b.PA.status) {
          return 1;
        }
        return 0;
      }
    }

    let sortt = mypaciente.sort(compare).reverse();

    return response.status(200).json(sortt);
  },
  async notificationsNumbers(request, response) {
    const crm = request.headers.crm;

    const notification = notificationDoctors.find((item) => item.CRM === crm);

    if (!notification) {
      return response.status(404).json({
        error: "not found",
      });
    }

    response.status(200).json({ notifications: notification.data.length });
  },
  async indexNotifications(request, response) {
    const crm = request.headers.crm;

    const notification = notificationDoctors.find((item) => item.CRM === crm);

    if (!notification) {
      return response.status(404).json({
        error: "not found",
      });
    }

    response.status(200).json(notification);
  },
  async clearNotifications(request, response) {
    const crm = request.headers.crm;

    const index = notificationDoctors.findIndex((item) => item.CRM === crm);

    if (index === -1) {
      return response.status(404).json({
        error: "not found",
      });
    }
    notificationDoctors[index].data = [];

    response.status(200).json(notificationDoctors[index]);
  },
};
