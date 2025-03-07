import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SubdomainProvider } from './context/ContextApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <SubdomainProvider>
    <App />
  </SubdomainProvider>
  </StrictMode>
)
