import Chat from './chat.js';

function ChatUI(socket) {
  this.chat = new Chat(socket);
}
