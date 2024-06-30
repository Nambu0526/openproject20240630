import { RelayServer } from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";

var channel;
var num;

var audio1 = document.getElementById("audio1");
var audio2 = document.getElementById("audio2");
var audio3 = document.getElementById("audio3");
var audio4 = document.getElementById("audio4");

onload = async function () {
  // webSocketリレーの初期化
  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("otsuka");
  messageDiv.innerText = "web socketリレーサービスに接続しました";
  channel.onmessage = getMessage;
};
//button0:応援 button1:高評価 button3:刺激を与える
function getMessage(msg) {
  // ボタンがおされた時に起動
  if (msg.data == "button0") {
    num = Math.round(Math.random());
    if (num == 0) {
      messageDiv.style.color = "green";
      messageDiv.innerText = "その調子その調子!";
      audio1.play();
    } else {
      messageDiv.style.color = "green";
      messageDiv.innerText = "頑張れー！";
      audio2.play();
    }
  }
  if (msg.data == "button1") {
    num = Math.round(Math.random());
    if (num == 0) {
      messageDiv.style.color = "green";
      messageDiv.innerText = "おおぉ～";
      audio3.play();
    } else {
      messageDiv.style.color = "green";
      messageDiv.innerText = "グッド！";
      audio4.play();
    }
  }
  if (msg.data == "button2") {
    messageDiv.style.color = "red";
    messageDiv.innerText = "刺激を与えています";

    channel.send("button2");
  }
}
