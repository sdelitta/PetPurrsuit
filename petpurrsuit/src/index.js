import React from 'react'
import ReactDOM from 'react-dom/client'
import './CSS/index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { InputProvider } from './components/InputState'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <InputProvider>
        <App />
      </InputProvider>
    </BrowserRouter>
  </React.StrictMode>
)