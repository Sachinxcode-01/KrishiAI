import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext'

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>
)
