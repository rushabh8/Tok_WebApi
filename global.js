import io from 'socket.io-client';
 const socket = io('http://192.168.0.1:3000')

var count = 0, flagCount = 0
const interval = {
    timer: 0
}

var socketObject = {}

// function socketConnection() {
//     socket.on('connect', () => {
//         //console.log("socket connected");
//         socket.emit('pong')
//     })
// }

function initUser(id, name) {
    socket.emit('initChat', {
        "userId": id,
        "userName": name
    })
}

function timerCount(time) {
    count = time
}

function flagShip(params) {
    flagCount = params
}

function resize(type, data) {
    let maxLength_Q = 250, maxLength_A = 30
    if(type === 'q'){
        data
    }
}

export { initUser, socket, timerCount, count, interval, flagShip, flagCount, socketObject };
