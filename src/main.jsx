import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'aos/dist/aos.css'
import App from './App.jsx'

const storedTheme = localStorage.getItem('isDarkMode');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const shouldUseDark = storedTheme !== null ? storedTheme === 'true' : prefersDark;

if (shouldUseDark) {
  document.documentElement.classList.add('dark');
  document.documentElement.style.colorScheme = 'dark';
} else {
  document.documentElement.classList.remove('dark');
  document.documentElement.style.colorScheme = 'light';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
