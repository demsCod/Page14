import React from 'react'
import '../../App.css'
import LogSignButton from './LogSignButton'

function Header() {
  return (
    <header className='Header'>
      <h1 className='Header-title'>ScrollBook</h1>
      <LogSignButton />
    </header>
  )
}

export default Header