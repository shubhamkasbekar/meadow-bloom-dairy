
import React from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')
if (root) {
  React.createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
