// Remote button - receiver
// for CHIRIMEN with nodejs
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import {RelayServer} from "./RelayServer.js";

var channel;
var gpioPort0;
var gpioPort1;
var gpioPort2;


async function connect(){
	// GPIOポート0,1,2の初期化
	var gpioAccess = await requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	
    gpioPort0 = mbGpioPorts.get(6);
	await gpioPort0.export("in"); 

    gpioPort1 = mbGpioPorts.get(5);
	await gpioPort1.export("in"); 
    
    gpioPort2 = mbGpioPorts.get(4);
	await gpioPort2.export("in"); 
	
	// webSocketの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
	channel = await relay.subscribe("otsuka");
	console.log("web socketチャネルが開設されました");
	gpioPort0.onchange=button0;
    gpioPort1.onchange=button1;
    gpioPort2.onchange=button2; // ISSUE gpioのonchangeの設定
}

function button0(val){
	var msgTxt = (val.value === 1 ) ? "Low0" : "button0"; 
	console.log(msgTxt);
	channel.send(msgTxt);
}
function button1(val){
	var msgTxt = (val.value === 1 ) ? "Low1" : "button1";  
	console.log(msgTxt);
	channel.send(msgTxt);
}
function button2(val){
	var msgTxt = (val.value === 1 ) ? "Low2" : "button2";  
	console.log(msgTxt);
	channel.send(msgTxt);
}


connect();
