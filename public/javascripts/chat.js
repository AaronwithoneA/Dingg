function Chat (socket) {
  this.socket = socket
}

Chat.prototype.sendMessage = function (room, msg) {
  this.socket.emit('message', {text: msg, room})
}
