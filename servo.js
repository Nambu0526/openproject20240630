import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import PCA9685 from "@chirimen/pca9685";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/webs>
import {RelayServer} from "./RelayServer.js";

var channel;
var pca9685;

async function connect(){
    // webSocketの初期化
    var relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
    channel = await relay.subscribe("otsuka");
    console.log("web socketチャネルが開設されました");
    
    //PCA9685の初期化
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    pca9685 = new PCA9685(port, 0x40);
    await pca9685.init(0.001, 0.002, 30);
    channel.onmessage=moveServo;

}

async function moveServo(message) {
            if(message.data=="button2"){
            console.log("Servo move"); 
            for (let i = 0; i < 2; i++) {
                // サーボモータを-30度回転させる
                await pca9685.setServo(0, -30);
                console.log("-30 deg");
                await sleep(1000); // 1秒待つ
        
                // サーボモータを30度回転させる
                await pca9685.setServo(0, 30);
                console.log("0 deg");
                await sleep(1000); // 1秒待つ
            }
            await pca9685.setServo(0, 0);
            console.log("Servo stopped");
           
           }
           
        }


connect();
