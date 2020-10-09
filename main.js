/**
 * MAIN_SERVER
 * 정보보호 19-4기 
 * 박재용 <scorpion@dgu.ac.kr>
*/


//모듈을 추출합니다.
var dateFormat = require('dateformat');
var socketio = require('socket.io');
var now = function() { return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"); }
var sites = require('./sites');
var http = require('http');
var config = require('./config');
var app = require('./front');
var shodan = require('./terminalNodes/shodan');
var httpget = require('./terminalNodes/httpget');
var server = http.createServer(app);
//var shodan = require('./shodan');


//웹서버를 실행합니다.
server.listen(config.PORT,function(){
	console.log("server is running at "+config.PORT )
	console.log()
	
	
	
	//shodan().then(function(vuln){console.log(now()+" : "+ vuln[0].ip_str)})
	httpget().then(function(status){console.log(now()+" : "+ status[0].statusCode)})
	
		
	
});


//http 요청에 대한 응답
server.on('request',function(code){
	console.log('HI')
})


var test = function(){
	server.close();
	console.log("server is closed now")
}

//소켓 서버를 생성 및 실행합니다.
var io = socketio.listen(server);
io.sockets.on('connection',function(socket){

	//// 최초  프레임 생성을 위해 sites 의 내용을 클라이언트로 전송합니다.
	socket.on('frame',function(data){
		console.log("client send data :",data);
		socket.emit('kiso',sites);		
	})
	//// http request 신호를 받으면 해당 모듈의 결과값을 클라이언트에 전송합니다.
	socket.on('web',function(data){
		console.log("client send data :",data);
		
		httpget().then(function(status){socket.emit('webinfo',status);
									   console.log('server : web info is sent')})
		})
	//// shodan request 신호를 받으면 해당 모듈의 결과값을 클라이언트에 전송합니다.
	socket.on('shodan',function(index){
		console.log('shodan info is needed (from client to server): ',index);
		shodan(index).then(res=>{socket.emit('shodaninfo',res)});
		console.log('server : shodan info is sent')})
})
		

