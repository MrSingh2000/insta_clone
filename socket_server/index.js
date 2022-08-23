const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const port = process.env.PORT || 5000;
const cors = require('cors')

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hi socket.io');
})

let users = new Map();

io.on("connection", socket => {
    console.log("User Connected");
    socket.on("disconnect", (reason) => {
        console.log("user disconnet");
        // users = users.filter((item) => {
        //     return item !== socket.id;
        // })
    });

    socket.on("new-user-joined", data => {
        users.set(data, socket.id);
        console.log("new user joined ", data);
        console.log("users: ", users);
    })

    socket.on("private message send", ({ username, message, from }) => {
        let to = users.get(username);
        if (!to) {
            socket.to(to).emit("user offline", { username });
        }
        else {
            socket.to(to).emit("private message recieve", { message, from });
        }
        console.log(users, message, username, to);
    })
})

httpServer.listen(port, () => {
    console.log("Socket server listening on Port: ", port)
});