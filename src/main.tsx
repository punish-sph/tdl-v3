import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from '@/pages/auth/login'

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <Login />
</React.StrictMode>,
)

window.ipcRenderer.on('main-process-message', (_event, message) => {
console.log(message)
})
