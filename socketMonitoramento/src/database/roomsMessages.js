const { v4: uuidv4 } = require("uuid");
const roomsMessages = [];

async function addMessage(message) {
  const roomMessage = await roomsMessages.find(
    (item) => item.room === message.room
  );

  if (!roomMessage) {
    /*     console.log("não message");
     */
    createRoom(message);
    return;
  }

  const index = await roomsMessages.findIndex(
    (item) => item.room === message.room
  );

  await roomsMessages[index].messages.push({ ...message, id: uuidv4() });

  /* console.log(roomMessage); */

  return;
}

async function createRoom(message) {
  const data = {
    room: message.room,
    messages: [{ ...message, id: uuidv4() }],
  };
  await roomsMessages.push(data);
}

module.exports = {
  addMessage,
  roomsMessages,
};
