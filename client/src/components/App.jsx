import UseLocalStorage from "../hooks/useLocalStorage"
import Dashboard from "./Dashboard"
import Login from "./login"

function App() {
  const [id, setId] = UseLocalStorage('id')

  return (
    <div>
      {id ? <Dashboard id={id} setLogin={setId} /> : <Login handleLogin={setId} />}
    </div>
  )
}

export default App
