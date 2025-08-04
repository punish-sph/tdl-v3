import React, { useState } from 'react'
import Card from '@/components/atoms/Card'
import Title from '@/components/atoms/Title'
import Button from '@/components/atoms/Button'
import InputField from '@/components/atoms/InputField'
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    setError('')
    
    // Simulasi proses login
    setTimeout(() => {
      const validUsername = 'thrain'
      const validPassword = 'rahasia123'

      if (username === validUsername && password === validPassword) {
        setIsLoggedIn(true)
      } else {
        setError('Username atau password salah.')
      }
      setIsLoading(false)
    }, 1000)
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-purple-900 via-zinc-800 to-zinc-950 p-4">
        <div
          className="w-full max-w-md"
        >
          <Card className="text-center p-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <Title text="Berhasil Masuk!" size="2xl" align="center" className="mb-2" />
            <p className="text-gray-600 mb-6">Selamat datang kembali, {username}!</p>
            <Button 
              variant="success" 
              theme="dark"
              onClick={() => setIsLoggedIn(false)}
            >
              Keluar
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-purple-900 via-zinc-800 to-zinc-950 p-4">
      <div
        className="w-full max-w-md"
      >
        <Card className="p-8" border={false}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <Title text="Selamat Datang" size="2xl" className="mb-2" />
            <p className="text-gray-600">Silakan masuk untuk melanjutkan</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-500 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200 bg-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200 bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ingat saya
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-lime-600 hover:text-lime-500">
                Lupa password?
              </a>
            </div>

            <Button
              onClick={handleLogin}
              isLoading={isLoading}
              loadingText="Memeriksa..."
              variant="success"
              theme="dark"
              size="lg"
              className="w-full"
              disabled={isLoading}
              animation="lift"
            >
              Masuk
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Belum punya akun?{' '}
              <a href="#" className="font-medium text-lime-600 hover:text-lime-500">
                Daftar sekarang
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}