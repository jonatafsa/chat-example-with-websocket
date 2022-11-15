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
  const ws = Websocket

  useEffect(() => {
    setToken(Cookies.get("token") as string || "")
    ws.onopen = (data) => {
      console.log(data)
    }
  }, [])

  ws.onmessage = (event: MessageEvent) => {
    setMessages(JSON.parse(event.data))
    setTimeout(() => endScroll(), 100)
  }

  function sendMessage(e: any) {
    const data = {
      token: Cookies.get("token"),
      username: Cookies.get("username"),
      color: Cookies.get("color"),
      message
    }
    ws.send(JSON.stringify(data))
    e.target.value = ""
  }

  function endScroll() {
    const messages = document.querySelector(".messages")

    messages!.scrollTo({
      top: messages!.scrollHeight + 200,
      behavior: "smooth",
    })
  }

  function generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;

  }

  function handleLogin() {

    const data = { user }
    console.log(data)

    fetch("https://server-websocket.azurewebsites.net/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        Cookies.set("token", response.token)
        Cookies.set("username", response.user)
        Cookies.set("color", generateColor())
        setToken(response.token)
      })


  }

  return (
    <div className="container">
      <h1>Xablau meu consagrado!!</h1>

      {!token ? (
        <div className="signin">
          <h1>Chat com WebSocket</h1>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
        </div>
      ) : (
        <div className="chat">
          <div className="messages">

            {messages.map(message => (
              message.token === Cookies.get("token") ? (
                <div className="message user">
                  <p className="message-content">{message.message}</p>
                </div>
              ) : (
                <div className="message">
                  <span style={{ color: message.color }}>{message.username}:</span>
                  <p className="message-content">{message.message}</p>
                </div>
              )
            ))}

            {/* <div className="message">
            <span>Username:</span>
            <p className="message-content">Olá, tudo bem?</p>
          </div>
          <div className="message">
            <span>Username:</span>
            <p className="message-content">Tudo sim e você?</p>
          </div> */}
          </div>

          <div className="input">
            <input
              type="text"
              placeholder="Digite uma mensagem"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button type="button" onClick={sendMessage}>Enviar</button>
          </div>
        </div >
      )}


    </div>
  )
}

export default App
