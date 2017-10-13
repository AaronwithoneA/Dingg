const io = require('socket.io');


const nickNames = {}
let namesUsed = []
const currentRoom = {}

let chat
let guests = 1

const chatServer = {
  listen(server) {
    chat = io(sever);

    chat.on('connection', (socket) => {
      guestNumber = this.assignGuestName(
        socket, guests, nickNames, namesUsed
      )
      this.handleMessageBroadcast(socket, nickNames)
      this.handleRoomJoining(socket)
      socket.on('rooms', () => {
        let rooms = []
        for (let s in chat.sockets.sockets) {
          rooms = rooms.concat(this.listRooms(chat.sockets.sockets[s]))
        }
        rooms = Array.from(new Set(rooms))
        socket.emit('rooms', rooms)
      })
    })
  },
  assignGuestName (socket, guests, nickNames, namesUsed) {
    const name = `Guest_${guests}`
    nickNames[socket.id] = name
    socket.emit('nameResult', {
      success: true,
      name
    })
    namesUsed.push(name)
    return guests + 1
  },
  handleMessageBroadcast (socket) {
    socket.on('message', (message) => {
      socket.broadcast.to(message.room).emit('message', {
        text: `${nickNames[socket.id]}: ${message.text}`
      })
    })
  },
  joinRoom (socket, room) {
    socket.join(room)
    currentRoom[socket.id] = room
    socket.emit('joinResult', {room})
    socket.broadcast.to(room).emit('message', {
      text: `${nickNames[socket.id]} has joined ${room}.`
    })

    chat.of('/').in(`${room}`).clients((err, sockets) => {
      if (err) return console.error(err)
      const usersInRoom = sockets.map(sId => nickNames[sId]).join(', ')
      const usersInRoomSummary = `Users currently in ${room}: ${usersInRoom}`
      socket.emit('message', {text: usersInRoomSummary})
    })
  },
  handleRoomJoining (socket) {
    socket.on('join', (room) => {
      socket.leave(currentRoom[socket.id])
      this.joinRoom(socket, room.newRoom)
    })
  },
}

export default chatServer;
