import { useState } from "react"
import UseLocalStorage from "../hooks/useLocalStorage"
import Dashboard from "./Dashboard"
import Login from "./login"
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

function App() {
  const [id, setId] = UseLocalStorage('id')
  const [userName, setUserName] = UseLocalStorage('userName')

  const handleLogin = (data) => {
    const [id, userName] = data
    setId(id)
    setUserName(userName)
  }

  return (
    <div>
      {id ? <Dashboard setLogin={setId} setUserName={setUserName} socket={socket} userName={userName} /> : <Login handleLogin={handleLogin} />}
    </div>
  )
}

export default App
