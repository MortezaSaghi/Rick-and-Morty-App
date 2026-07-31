// Application entry point: mounts <App /> into #root (see index.html) and
// loads the global stylesheet (theme tokens, resets, shared utility classes).
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
