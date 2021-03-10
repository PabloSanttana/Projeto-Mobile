const express = require("express");
const cors = require("cors");
const app = express();
const socketio = require("socket.io");
const server = require("http").createServer(app);
const io = socketio(server);

const { pushNotification } = require("./notification");

const router = require("./routes");
app.use(cors());
app.use(express.json());
app.use(router);

const {
  addPaciente,
  removePaciente,
  getPaciente,
  getPacientesInRoom,
  updatePaciente,
} = require("./database/db");

const { addMessage } = require("./database/roomsMessages");

const {
  addNotificationDoctor,
  addNotificationPatient,
} = require("./database/notifications");

io.on("connection", (socket) => {
  console.log("Socket ON");

  socket.on("join", async ({ name, cpf, CRM, idade }, callback) => {
    // console.log("id", socket.id);

    //  console.log(name, cpf, CRM);

    await addPaciente({
      id: socket.id,
      name,
      cpf,
      CRM,
      idade,
    });

    /*  if (error) return callback(error); */

    /* socket.emit("message", {
        user: "admin",
        text: `${user.name}, Seja bem Vindo na sala ${user.room}`,
      });
      socket.broadcast
        .to(user.room)
        .emit("message", {
          user: "admin",
          text: `${user.name}, Entrou no grupo`,
        }); */
    socket.join(cpf);
    callback();
  });

  socket.on("BPM", async (info, callback) => {
    // console.log("BPM", info);
    const paciente = await getPaciente(socket.id);
    if (info.Status === "Severa" || info.Status === "Moderada") {
      pushNotification(paciente, "Frequência cardíaca", info.Status);
      await addNotificationDoctor(
        paciente.CRM,
        "status",
        paciente.cpf,
        paciente.name
      );
      await addNotificationPatient(paciente.cpf, "status");
    }
    await updatePaciente(socket.id, info.Status, "BPM", info.valor);
    io.to(paciente.cpf).emit("BPM", {
      ...info,
      name: paciente.name,
      cpf: paciente.cpf,
      CRM: paciente.CRM,
    });
    callback();
  });
  socket.on("PA", async (info, callback) => {
    const paciente = await getPaciente(socket.id);

    if (info.Status === "Severa" || info.Status === "Moderada") {
      pushNotification(paciente, "Pressão arterial", info.Status);
      await addNotificationDoctor(
        paciente.CRM,
        "status",
        paciente.cpf,
        paciente.name
      );
      await addNotificationPatient(paciente.cpf, "status");
    }
    await updatePaciente(socket.id, info.Status, "PA", info.valor);
    io.to(paciente.cpf).emit("PA", {
      ...info,
      name: paciente.name,
      cpf: paciente.cpf,
      CRM: paciente.CRM,
    });
    callback();
  });
  socket.on("SaO2", async (info, callback) => {
    const paciente = await getPaciente(socket.id);

    if (info.Status === "Severa" || info.Status === "Moderada") {
      pushNotification(paciente, "Saturação de oxigênio", info.Status);
      await addNotificationDoctor(
        paciente.CRM,
        "status",
        paciente.cpf,
        paciente.name
      );
      await addNotificationPatient(paciente.cpf, "status");
    }
    await updatePaciente(socket.id, info.Status, "SaO2", info.valor);
    io.to(paciente.cpf).emit("SaO2", {
      ...info,
      name: paciente.name,
      cpf: paciente.cpf,
      CRM: paciente.CRM,
    });
    callback();
  });

  socket.on("sendMessage", async (messages, callback) => {
    await addMessage(messages);
    const paciente = await getPacientesInRoom(messages.room);
    if (messages.to.length === 11) {
      await addNotificationPatient(paciente.cpf, "message");
    } else {
      await addNotificationDoctor(
        paciente.CRM,
        "message",
        paciente.cpf,
        paciente.name
      );
    }

    pushNotification(
      "",
      "",
      "",
      "message",
      messages.to,
      messages.message,
      messages.from
    );
    io.to(messages.room).emit("message", {
      message: messages.message,
      from: messages.from,
      to: messages.to,
      room: messages.room,
    });
    callback();
  });

  socket.on("pingConnetion", async (response, callback) => {
    callback();
  });

  socket.on("disconnect", () => {
    console.log("Socket OFF");
    const user = removePaciente(socket.id);

    /*  if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} saiu da sala`,
      });
    }  */
  });
});

server.listen(3333, () => console.log("Servidor ON"));
