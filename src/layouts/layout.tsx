import React from 'react'

const auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <header className="bg-zinc-800 text-white p-4">Aplikasi Pribadi</header>
      <main className="p-4 flex-1">{children}</main>
      <footer className="bg-zinc-800 text-white p-4">Footer</footer>
    </div>
  )
}

export default auth
