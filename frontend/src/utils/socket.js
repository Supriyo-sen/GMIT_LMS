import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:5000"); // Replace with your backend URL
    socket.emit("register", userId);
  }
  return socket;
};

export const getSocket = () => socket;
