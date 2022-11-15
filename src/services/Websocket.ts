const Websocket = new WebSocket("ws://server-websocket.azurewebsites.net/");

Websocket.onopen = () => {
  console.log("Connected to websocket");
};

Websocket.onmessage = (event) => {
  console.log(event.data);
};

export default Websocket;
