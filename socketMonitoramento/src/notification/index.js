var admin = require("firebase-admin");

var serviceAccount = require("../pushnotification-75505-firebase-adminsdk-1v33n-602071f417.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pushnotification-75505.firebaseio.com",
});

const doctores = require("../database/doctors");
const { Cadastros } = require("../database/db");

var options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

async function pushNotification(
  pacient,
  sensor,
  status,
  typeNotification = "status",
  messege_to,
  message,
  message_from
) {
  if (typeNotification === "status") {
    var { fcmTokem, CRM } = await Cadastros.find(
      (item) => item.cpf === pacient.cpf
    );

    var doctor = await doctores.find((item) => item.CRM === CRM);

    var payload = {
      notification: {
        title: "HomeCare cuidando de Você",
        body: `${sensor}: ${pacient.name} está com a classificação de risco ${status}`,
        type: "Monitoring",
      },
    };
    if (fcmTokem && fcmTokem !== "") {
      // console.log("pacinete", fcmTokem);
      sendNotification(fcmTokem, payload);
    }
    if (doctor.fcmTokem !== "") {
      // console.log("doctor", doctor.fcmTokem);
      var payload = {
        notification: {
          title: `Paciente com a classificação de risco ${status}!`,
          body: `${sensor}: ${pacient.name}`,
        },
      };

      sendNotification(doctor.fcmTokem, payload);
    }
  } else if (typeNotification === "message") {
    if (messege_to.length === 11) {
      var { fcmTokem } = await Cadastros.find(
        (item) => item.cpf === messege_to
      );
      var payload = {
        notification: {
          title: "Neurologista lhe mandou uma messagem",
          body: `${message}`,
        },
      };
      if (fcmTokem && fcmTokem !== "") {
        sendNotification(fcmTokem, payload);
      }
    } else {
      var { name } = await Cadastros.find((item) => item.cpf === message_from);

      var { fcmTokem } = await doctores.find((item) => item.CRM === messege_to);

      var payload = {
        notification: {
          title: `Módulo Cuidador Messagem`,
          body: `Paciente ${name} \n message: ${message}`,
        },
      };
      if (fcmTokem && fcmTokem !== "") {
        sendNotification(fcmTokem, payload);
      }
    }
  }
}

function sendNotification(fcmTokem, payload) {
  admin
    .messaging()
    .sendToDevice(fcmTokem, payload, options)
    .then(function (response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
}
module.exports = { pushNotification };
