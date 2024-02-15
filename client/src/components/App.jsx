import UseLocalStorage from "../hooks/useLocalStorage"
import Login from "./login"

function App() {
  const [id, setId] = UseLocalStorage('id')

  return (
    <div>
      <h1>{id}</h1>
      <Login handleLogin={setId} />
    </div>
  )
}

export default App
