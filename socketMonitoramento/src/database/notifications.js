const notificationDoctors = [];
const notificationPatients = [];

async function addNotificationPatient(cpf, type) {
  const notifications = await notificationPatients.find(
    (item) => item.cpf === cpf
  );

  if (!notifications) {
    let countMessage = type === "message" ? 1 : 0;
    let countStatusChange = type === "status" ? 1 : 0;
    const data = {
      cpf,
      countMessage,
      statusChange: countStatusChange,
    };
    await notificationPatients.push(data);
    return;
  }
  let countMessage = type === "message" ? 1 : 0;
  let countStatusChange = type === "status" ? 1 : 0;

  const index = notificationPatients.findIndex((item) => item.cpf === cpf);
  notificationPatients[index].countMessage =
    notificationPatients[index].countMessage + countMessage;
  notificationPatients[index].statusChange =
    notificationPatients[index].statusChange + countStatusChange;

  return;
}

/// medicos

async function addNotificationDoctor(CRM, type, cpf, name) {
  const notifications = await notificationDoctors.find(
    (item) => item.CRM === CRM
  );

  if (!notifications) {
    let countMessage = type === "message" ? 1 : 0;
    let countStatusChange = type === "status" ? 1 : 0;
    const data = {
      CRM,
      data: [
        {
          cpf,
          name,
          countMessage,
          StatusChange: countStatusChange,
        },
      ],
    };
    await notificationDoctors.push(data);
    return;
  }

  const patient = await notifications.data.find((item) => item.cpf === cpf);

  if (!patient) {
    let countMessage = type === "message" ? 1 : 0;
    let countStatusChange = type === "status" ? 1 : 0;

    const data = {
      cpf,
      name,
      countMessage,
      StatusChange: countStatusChange,
    };

    await notifications.data.push(data);
    return;
  }
  let countMessage = type === "message" ? 1 : 0;
  let countStatusChange = type === "status" ? 1 : 0;

  const index = notifications.data.findIndex((item) => item.cpf === cpf);

  notifications.data[index].countMessage = patient.countMessage + countMessage;
  notifications.data[index].StatusChange =
    patient.StatusChange + countStatusChange;

  return;
}

module.exports = {
  notificationDoctors,
  notificationPatients,
  addNotificationDoctor,
  addNotificationPatient,
};
