import Chat from './chat.js';

function ChatUI(socket) {
  this.chat = new Chat(socket);
  this.input = document.querySelector('input')
  this.form = document.querySelector('form')
  this.msgList = document.querySelector('ul#msg-list')
  this.roomList = document.querySelector('ul#room-list')
   this.room = document.querySelector('#room')
}

ChatUI.prototype.getInput = function () {
  return this.input.value
}

ChatUI.prototype.sendMsg = function (room) {
  this.chat.sendMessage(room, this.getInput())
}
