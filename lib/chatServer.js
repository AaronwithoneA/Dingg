const io = require('socket.io');


const nickNames = {}
let namesUsed = []
const currentRoom = {}

let chat
let guests = 1
