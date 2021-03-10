const { roomsMessages } = require("../database/roomsMessages");

module.exports = {
  async index(request, response) {
    const room = request.headers.room;

    const roomMessages = await roomsMessages.find((item) => item.room === room);

    if (!roomMessages) {
      return response.status(404).json({
        error: "not found",
      });
    }

    return response.status(200).json({ messages: roomMessages.messages });
  },
};
