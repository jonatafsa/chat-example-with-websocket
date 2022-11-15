const Websocket = new WebSocket("wss://server-websocket.azurewebsites.net/");

Websocket.onopen = () => {
  console.log("Connected to websocket");
};

Websocket.onmessage = (event) => {
  console.log(event.data);
};

export default Websocket;
