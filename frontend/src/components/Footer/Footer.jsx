
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className='bg-gray-200 py-4'>
        <div className='container mx-auto text-center'>
        <ul className='flex justify-center space-x-4'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
          <p className='text-gray-600 text-sm'>
            © {new Date().getFullYear()} Bula Bars. All rights reserved.
          </p>
          <p className='text-gray-600 text-sm'>The statements made regarding these products have not been evaluated by the Food and Drug Administration.</p>
        </div>
      </footer>
    </>
  );
}
