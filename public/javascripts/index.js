document.addEventListener('DOMContentLoaded', () => {
  const socket = require('socket.io-client')()
  const ChatUI = require('./chatUI')
  const myChat = new ChatUI(socket)
  socket.on('nameResult', (result) => {
    let msg
    if (result.success) {
      msg = `Name changed to ${result.name}.`
    } else {
      msg = result.message
    }
    myChat.addMsg(msg)
  })
