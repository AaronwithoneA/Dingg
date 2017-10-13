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

      this.handleClientDisconnection(socket)
    })
  }
}

export default chatServer;
