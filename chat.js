var express = require("express");
var dust = require("dustjs-linkedin");
var cons = require("consolidate");
var http = require("http"); //LIBRERIA INTERNA
var socketio = require("socket.io");

var app = express();
var servidor = http.createServer(app);
if(process.env.OPENSHIFT_NODEJS_PORT){
	servidor.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
}else{
	servidor.listen(8021);
}


//---- configuracion de carpetas estaticas ----
app.use("/css", express.static(__dirname + "/css"));
app.use("/javascript", express.static(__dirname + "/javascript"));

// ----- CONFIGURACION DEL SISTEMA DE TEMPLATES -----
app.engine("dust", cons.dust);
app.set("views", __dirname + "/vistas");
app.set("view engine", "dust");

console.log("servidor web listo");

app.get("/", function(req, res){
	
	res.render("cliente");
	
});

//HABILITAMOS EL WEB SOCKET EN EL SERVIDOR
var io = socketio.listen(servidor);

//LA VARIABLE SOCKET REPRESENTA AL USUARIO QUE SE CONECTO
io.sockets.on("connection", function(socket){
	
	//on = CUANDO OCURRA UN EVENTO
	//EL PRIMER ARGUMENTO ES EL NOMBRE DEL EVENTO
	//EL SEGUNDO ARGUMENTO ES LA FUNCION QUE SE EJECUTA AL
	//PRODUCIRSE ESE EVENTO
	socket.on("mensaje_al_servidor", function(datosCliente){
		
		//io.sockest = TODOS LOS USUARIOS CONECTADOS
		//emit = "PRODUCE UN EVENTO QUE PUEDE ESCUCHAR ELCLIENTE"
		//O EL SERVIDOR
		io.sockets.emit("mensaje_al_cliente", datosCliente);
		
	});
	
});


























