const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const db = require("./config/mongoDBCoenact");
const route = require('./routes/userRoute')
const AuthRoute = require('./routes/authRoute')
const cors = require("cors");
const  cookieParser = require('cookie-parser')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.json());
app.use(cors());
app.use(cookieParser())


//mid

app.get("/", (req, res) => {
  res.send("/api/todos");
});


app.use('/api', route)
app.use('/api',  AuthRoute)

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle Socket.IO events here

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3311;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
