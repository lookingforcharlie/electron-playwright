import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <div className='h-full w-32 bg-zinc-400 fixed'>
      <nav className='flex flex-col items-start py-4'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            'px-4 py-2 text-sm text-gray-700 hover:bg-gray-200' +
            (isActive ? ' bg-zinc-600 text-white' : '')
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            'px-4 py-2 text-sm text-gray-700 hover:bg-gray-200' +
            (isActive ? ' bg-zinc-600 text-white' : '')
          }
        >
          About
        </NavLink>
        <NavLink
          to='/services'
          className={({ isActive }) =>
            'px-4 py-2 text-sm text-gray-700 hover:bg-gray-200' +
            (isActive ? ' bg-zinc-600 text-white' : '')
          }
        >
          Services
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            'px-4 py-2 text-sm text-gray-700 hover:bg-gray-200' +
            (isActive ? ' bg-zinc-600 text-white' : '')
          }
        >
          Contact
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar
