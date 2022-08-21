import io from "socket.io-client";

export const socket = io(`${process.env.REACT_APP_SOCKET_HOST}`);
console.log("script has been attached!");
console.log(process.env.REACT_APP_SOCKET_HOST, process.env.REACT_APP_AUTH_TOKEN);

export const connectToSocketServer = (username) => {
    socket.emit("new-user-joined", username);
}

export const sendPrivateMessage = (username, message, from) => {
    console.log('here')
    socket.emit("private message send", {
        username, message, from
    })
}
