import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ConnectedUsers = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const handleUserUpdate = (data) => {
      setUserCount(data.connectedUsers.length);
    };

    socket.on("updateConnectedUsers", handleUserUpdate);

    return () => {
      socket.off("updateConnectedUsers", handleUserUpdate);
    };
  }, []);

  return (
    <div className="italic font-bold">
      <h1>Connected Users: {userCount}</h1>
    </div>
  );
};

export default ConnectedUsers;
