const { request, response } = require("express");
const express = require("express");
const router = express.Router();

const doctores = require("./database/doctors");
const { Cadastros } = require("./database/db");
const { roomsMessages } = require("./database/roomsMessages");
const {
  notificationDoctors,
  notificationPatients,
} = require("./database/notifications");

router.get("/", (request, response) => {
  response.send("Server is up and rnning");
});

router.post("/login", async (request, response) => {
  const { password, CRM, fcmToken } = request.body;

  const doctor = doctores.find(
    (item) => item.CRM === CRM && item.password === password
  );

  let index = doctores.findIndex((item) => item.CRM === CRM);

  doctores[index].fcmTokem = `${fcmToken}`;

  return response.status(200).json(doctor);
});
router.post("/login/paciente", async (request, response) => {
  const { cpf, CRM, fcmToken } = request.body;

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
});
router.get("/paciente/status/:id", async (request, response) => {
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
});
router.get("/meuspaciente", async (request, response) => {
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
});

router.get("/meuspaciente/classificacao", async (request, response) => {
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
});
router.get("/room/messages", async (request, response) => {
  const room = request.headers.room;

  const roomMessages = await roomsMessages.find((item) => item.room === room);

  if (!roomMessages) {
    return response.status(404).json({
      error: "not found",
    });
  }

  return response.status(200).json({ messages: roomMessages.messages });
});

router.get("/notificacao/paciente", async (request, response) => {
  const cpf = request.headers.cpf;

  const notification = notificationPatients.find((item) => item.cpf === cpf);

  if (!notification) {
    return response.status(404).json({
      error: "not found",
    });
  }

  response.status(200).json(notification);
});

router.get("/notificacao/medico/count", async (request, response) => {
  const crm = request.headers.crm;

  const notification = notificationDoctors.find((item) => item.CRM === crm);

  if (!notification) {
    return response.status(404).json({
      error: "not found",
    });
  }

  response.status(200).json({ notifications: notification.data.length });
});

router.get("/notificacao/medico", async (request, response) => {
  const crm = request.headers.crm;

  const notification = notificationDoctors.find((item) => item.CRM === crm);

  if (!notification) {
    return response.status(404).json({
      error: "not found",
    });
  }

  response.status(200).json(notification);
});

router.post("/notificacao/paciente/clear", async (request, response) => {
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
});

router.post("/notificacao/medico/clear", async (request, response) => {
  const crm = request.headers.crm;

  const index = notificationDoctors.findIndex((item) => item.CRM === crm);

  if (index === -1) {
    return response.status(404).json({
      error: "not found",
    });
  }
  notificationDoctors[index].data = [];

  response.status(200).json(notificationDoctors[index]);
});

// Logout

router.post("/logout/medico", async (request, response) => {
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
});

router.post("/logout/paciente", async (request, response) => {
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
});

module.exports = router;
