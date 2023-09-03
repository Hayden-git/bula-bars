
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className='shadow-md w-full'>
      <div className='md:flex items-center justify-between w-full bg-orange-200 py-4 md:px-5 px-7'>
        <div className='font-bold text-5xl cursor-pointer flex items-center font-[Island] text-indigo-700 hover:text-orange-500 duration-500'>
          <span className='text-4xl text-indigo-700 hover:text-orange-500 duration-500 mr-1 pt-2'>
              <a href='/'>
                <ion-icon name='cafe-outline'></ion-icon>
                Bula Bars!
              </a>
          </span>
        </div>

        {/* Hamburger menu icon */}
        <div onClick={()=>setOpenMenu(!openMenu)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <ion-icon name={openMenu ? 'close':'menu'}></ion-icon>
        </div>


        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-orange-200 left-0 w-full md:w-auto md:pl-0 pl-8 transition-all duration-500 ease-in ${openMenu ? 'top-20 opacity-100 z-40':'top-[-490px] md:opacity-100 z-40 opacity-30 duration-500'}`}>
          <li className='md:ml-8 text-2xl md:my-0 my-4 text-indigo-800 hover:text-orange-500 duration-500'>
            <Link to='/'>Home</Link>
          </li>
          <li className='md:ml-8 text-2xl md:my-0 my-4 text-indigo-800 hover:text-orange-500 duration-500'>
            <Link to='/about'>About</Link>
          </li>
          <li className='md:ml-8 text-2xl md:my-0 my-4 pr-4 text-indigo-800 hover:text-orange-500 duration-500'>
            <Link to='/contact'>Contact</Link>
          </li>

          {/* Search Bar */}
          {/* <div className='flex justify-between md:ml-8 md:my-0 my-4 w-full transition-all duration-500 ease-in'>
            <form 
              action=''
            >
              <input 
                type='text' 
                name='search'
                placeholder='Search...'
                autoComplete='off'
                aria-label='Search...'
                className='px-3 py-3 mr-[-30px] font-semibold placeholder-gray-500 text-black rounded-2xl border-indigo ring-2 ring-indigo-500 focus:ring-indigo-500 focus:ring-2s w-full md:w-48'
              />
            </form>
          </div> */}
          
          {/* Log in / Registration Button */}
          <button className='bg-indigo-800 text-white font-[Poppins] py-2 px-10 rounded lg:ml-1 mr-4 md:ml-8 hover:bg-orange-500 duration-500'>
            <Link to='/login'>Log in / Register</Link>
          </button>

        </ul>
      </div>
    </div>
  )
}
