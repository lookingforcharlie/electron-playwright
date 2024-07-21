import { ipcRenderer } from 'electron'
import React, { useState } from 'react'

const PasswordComponent: React.FC = () => {
  const [password, setPassword] = useState<string>('')
  const [hashedPassword, setHashedPassword] = useState<string>('')

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const requestPasswordHash = async () => {
    try {
      const hashed = await ipcRenderer.invoke('hash-password', password)
      setHashedPassword(hashed)
    } catch (error) {
      console.error('Error hashing password:', error)
    }
  }

  return (
    <div className='flex-col gap-4 p-4 bg-gray-100 rounded-md shadow-md'>
      <input
        type='password'
        value={password}
        onChange={handlePasswordChange}
        className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Enter password'
      />
      <button
        onClick={requestPasswordHash}
        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        Hash Password
      </button>
      <div>
        {hashedPassword && (
          <p className='mt-2 text-green-600 font-semibold'>
            Hashed Password: {hashedPassword}
          </p>
        )}
      </div>
    </div>
  )
}

export default PasswordComponent
