const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const cookieParser = require("cookie-parser");
const redisClient = require("./config/redis")

const {newUser, removeUser} = require("./util/user")

dotenv.config();

const app = express();

const server = http.createServer(app)
const viewRoutes = require("./routes/views")
const apiRoutes = require("./routes/api/user")

db.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1)
    }

    console.log("Connected to MySQL database...")
})

app.use(cookieParser("secret"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", viewRoutes)
app.use("/api", apiRoutes)

const io = socketIO(server);

io.on("connection", (socket) => {
    socket.on('user-connected', (user, roomId=null) => {
        if(roomId){
            /**redisClient.get(roomId, (err, reply) => {
                if(err) throw err

                if(reply){
                    let room = JSON.parse(reply)

                    if(room.gameStarted){
                        socket.emit("error", "The room is full")
                        return;
                    }

                    if(room.password && (!password || room.password !== password)){
                        socket.emit("error", "To join the room you need the correct password");
                        return;
                    }

                    socket.join(roomId);
                    newUser(socket.id, user, roomId);

                    if(room.players[0].username === user.username){
                        return;
                    }

                    if(room.players[1] === null){
                        room.players[1] = user;
                    }

                    room.gameStarted = true;
                    redisClient.set(roomId, JSON.stringify(room));
                    socket.to(roomId).emit("game-started", user)

                    redisClient.get('roomIndices', (err, reply) => {
                        if(err) throw err

                        if(reply){
                            let roomIndices = JSON.parse(reply);

                            redisClient.get('rooms', (err, reply) => {
                                if(reply){
                                    let rooms = JSON.parse(reply);

                                    rooms[roomIndices[roomId]] = room;

                                    redisClient.set('rooms', JSON.stringify(rooms))
                                }
                            })
                        }
                    })
                }else{
                    socket.emit("error", "The room does not exist")
                }
            })*/
        }else{
            newUser(socket.id, user);
        }
    })

    socket.on('send-total-rooms-and-users', () => {
        redisClient.get('total-users', (err, reply) => {
            if(err) throw err;

            let totalUsers = 0;
            let totalRooms = 0;
            let numberOfRooms = [0, 0, 0, 0];

            if(reply){
                totalUsers = parseInt(reply);
            }

            redisClient.get('total-rooms', (err, reply) => {
                if(err) throw err;

                if(reply){
                    totalRooms = parseInt(reply);
                }

                redisClient.get('number-of-rooms', (err, reply) => {
                    if(err) throw err;
    
                    if(reply){
                        numberOfRooms = JSON.parse(reply);
                    }
    
                    socket.emit('receive-number-of-rooms-and-users', numberOfRooms, totalRooms, totalUsers);
                })
            })
        })
    })

    socket.on("disconnect", () => {
        let socketId = socket.id;

        redisClient.get(socketId, (err, reply) => {
            if(err) throw err;

            if(reply){
                let user = JSON.parse(reply);

                if(user.room){
                    /**redisClient.get(user.room, (err, reply) => {
                        if(err) throw err;

                        if(reply){
                            let room = JSON.parse(reply);

                            if(!room.gameFinished){
                                io.to(user.room).emit("error", "The other player left the game")
                            }
                        }
                    })

                    removeRoom(user.room, user.user_rank)*/
                }
            }
        })

        removeUser(socketId);
    })

    socket.on("send-message", (message, user, roomId=null) => {
        if(roomId){
            socket.to(roomId).emit("receive-message", message, user);
        }else{
            socket.broadcast.emit("receive-message", message, user, true);
        }
    })
}) 

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));