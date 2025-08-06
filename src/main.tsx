import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from '@/pages/auth/login'

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <div className='font-mono font-semibold tracking-tight'>
        <Login />
    </div>
</React.StrictMode>,
)

window.ipcRenderer.on('main-process-message', (_event, message) => {
console.log(message)
})
