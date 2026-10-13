import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/pixelify-sans'
import '@fontsource/silkscreen/400.css'
import '@fontsource/silkscreen/700.css'
import '@fontsource-variable/geist-mono'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
