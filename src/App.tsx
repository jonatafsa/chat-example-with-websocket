import { useEffect, useState } from 'react'
import Websocket from './services/Websocket'
import Cookies from 'js-cookie'
import './styles/global.scss'

interface MessagesProps {
  token: string
  username: string
  message: string
  color: string
}

function App() {

  const [user, setUser] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<MessagesProps[]>([])
  const [token, setToken] = useState("")

  const Websocket = new WebSocket("ws://server-websocket.azurewebsites.net/");

  Websocket.onopen = () => {
    console.log("Connected to websocket");
  };

  Websocket.onmessage = (event) => {
    console.log(event.data);
  };


  return (
    <div className="container">
      <h1>Xablau meu consagrado!!</h1>
    </div>
  )
}

export default App
