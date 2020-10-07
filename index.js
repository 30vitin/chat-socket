const path = require('path');
const express = require('express');
const app = express();
var users = [];



//settings
app.set('port',process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname,'public')));


//start server
const server = app.listen(app.get('port'),() => {
	console.log('server on port',app.get('port'));
});
//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);


io.on('connection',(socket) => {
	console.log('User connection',socket.id);

     socket.on("user_connected", function (username) {
		users[username] = socket.id;
		io.emit("user_connected", username);
	});

	socket.on('chat:message',(data) =>{
		console.log(data);
		//io.sockets.emit('chat:message',data);
	    var socketId = users[data.receiver];
	    console.log("enviar a "+socketId);
        io.to(socketId).emit("chat:message", data);

	});



})


