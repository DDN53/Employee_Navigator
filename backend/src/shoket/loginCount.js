const { Server } = require("socket.io");

function initializeSocket(httpServer, options) {
  const io = new Server(httpServer, options);

  let loginCount = 0;
  const connectedUsers = new Map();

  const updateLoginCount = () => {
    io.emit("updateLoginCount", { count: loginCount });
  };

  const updateConnectedUsers = () => {
    io.emit("updateConnectedUsers", {
      connectedUsers: [...connectedUsers.values()],
    });
  };

  io.on("connection", (socket) => {
    const userId = socket.id;
    connectedUsers.set(socket.id, userId);

    loginCount++;
    updateLoginCount();
    updateConnectedUsers();

    socket.on("disconnect", () => {
      loginCount--;
      updateLoginCount();
      connectedUsers.delete(socket.id);
      updateConnectedUsers();
    });
  });

 

  return io;
}

module.exports = { initializeSocket };
