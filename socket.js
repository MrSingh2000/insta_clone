const httpServer = require("http").createServer();
const port = process.env.PORT || 8080;
const cors = require('cors')

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

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
            socket.to(to).emit("user offline", {username});
        }
        else{
            socket.to(to).emit("private message recieve", {message, from});
        }
        console.log(users, message, username, to);
    })
})

httpServer.listen(port, () => {
    console.log("Socket server listening on Port: ", port)
});