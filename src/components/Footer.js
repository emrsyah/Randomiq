import React from 'react'
import logofooter from '../assets/randomiq-logo-bottom.svg'

function Footer() {
  return (
    <footer className="bg-black px-16 py-7 flex justify-between items-center">
        <img src={logofooter} alt="" />
        <div className='flex gap-8'>
            <a href="https://twitter.com/emrsyahh" target="_blank" rel='noreferrer' className='font-semibold text-white'>twitter</a>
            <a href="https://github.com/emrsyah"  target="_blank" rel='noreferrer' className='font-semibold text-white'>github</a>
        </div>
    </footer>
  )
}

export default Footer