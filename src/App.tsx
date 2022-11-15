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
  // const ws = Websocket


  return (
    <div className="container">
      <h1>Xablau meu consagrado!!</h1>
    </div>
  )
}

export default App
