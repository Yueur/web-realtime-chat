var listening_port = 3000;

// --------------------
// 1. Functions to handle actions
var number_clients=0;
function display_number_clients(){
	console.log('Number of users:'+number_clients);
}

function send_all(msg, name='down-message'){
	io.emit(name, msg);
}

function send_to(socket, msg, name='down-message'){
	socket.emit(name, msg);
}

function handleMessage(id_user, msg){
	var tmp="User "+id_user+' sent : '+msg;
	console.log(tmp);
	send_all(tmp);
}

function handleConnect(socket){
	var id=number_clients;
	number_clients++;
	
	console.log('A user connected');
	display_number_clients();
	
	send_all("User "+id+" logged-in");
	
	return id;
}

function handleDisconnect(socket, id){
	number_clients--;
	console.log('a user disconnected');
	display_number_clients();
	send_all("User "+id+" logged-out");
}

// --------------------
// 2. NodeJS server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: '172.21.0.3', port: 6379 }));

// Need to do all this in 1 function
app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});

app.get('/index.html', function(req,res){
	res.sendFile(__dirname+'/index.html');
});

app.get('/index.css', function(req,res){
	res.sendFile(__dirname+'/index.css');
});
// --------------------

io.on('connection', function (socket){
	var id=handleConnect(socket);
	
	socket.on('up-message', function(msg){
		handleMessage(id, msg);
	});
	
	socket.on('disconnect', function(){
		handleDisconnect(socket, id);
	});
});

// Start server
http.listen(listening_port, function(){
	console.log('listening on *:'+listening_port);
});

