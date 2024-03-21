import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [count, setCount] = useState<number>(0)
  const sendRequestToBackend = async () => {
    try {
      const response = await fetch("/api/get-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          count: count
        })
      });

      if(response.status === 200) {
        const data = await response.json();
        setCount(count + 1)
        console.log("Data received from server: ", data); 
      } else {
        console.error("Failed to load response from backend")
      }
    } catch (error) {
      console.error("Error loading applications: ", error);
    }
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={sendRequestToBackend}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
