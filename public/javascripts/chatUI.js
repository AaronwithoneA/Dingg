import Chat from './chat.js';

function ChatUI(socket) {
  this.chat = new Chat(socket);
  this.input = document.querySelector('input')
  this.form = document.querySelector('form')
  this.msgList = document.querySelector('ul#msg-list')
  this.roomList = document.querySelector('ul#room-list')
  this.room = document.querySelector('#room')
  this.submitHandler();
}

ChatUI.prototype.getInput = function () {
  return this.input.value
}

ChatUI.prototype.sendMsg = function (room) {
  this.chat.sendMessage(room, this.getInput())
}

ChatUI.prototype.submitHandler = function () {
  this.form.addEventListener('submit', (e) => {
    e.preventDefault()
    this.processUserInput()
    this.input.value = ''
  })
}

ChatUI.prototype.addMsg = function (msg) {
  const newMessage = document.createElement('li')
  newMessage.textContent = msg
  this.msgList.appendChild(newMessage)
}

export default ChatUI;
