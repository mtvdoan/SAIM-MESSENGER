// import io from 'socket.io-client';
// const messages = document.getElementById('messages');
// const msgForm = document.getElementById('msgForm');

// io.on('message', data => {
//     console.log(data)
//     appendMessages(data)
// })
// io.on('output-messages', data => {
//     console.log(data)
//     if (data.length) {
//         data.forEach(message => {
//             appendMessages(message.msg)
//         });
//     } 
// })

// msgForm.addEventListener('submit', e => {
//     e.preventDefault()
//     socket.emit('chatmessage', msgForm.msg.value)
//     console.log('submit from msgfrom', msgForm.msg.value)
//     msgForm.msg.value = '';


// })

// function appendMessages(message) {
//     const html = `<div>${message}</div>`
//     messages.innerHTML += html
// }