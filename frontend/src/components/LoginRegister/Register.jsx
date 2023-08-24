
import React, { useState } from 'react';

import Swal from 'sweetalert2';

export default function Register() {
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [emailReg, setEmailReg] = useState('');

    const createAccount = async (event) => {
        const url = 'http://localhost:4001/register';
        const data = {
            username: usernameReg,
            email: emailReg,
            password: passwordReg,
        };
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response)

            Swal.fire({
                title: 'Registered Successfully',
                icon: 'success',
                text: 'Account created successfully! Please log in :)',
                footer: "<a style='text-decoration-line: underline;' href='/login'>Click here to log in!</a>"
            });
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error creating account:', error);
        });

        event.preventDefault();

    }

  return (
    <div>
        <section className='bg-indigo-50'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className='font-bold text-5xl cursor-pointer flex items-center font-[Island] text-indigo-700 hover:text-orange-500 duration-500'>
                    <span className='text-5xl text-indigo-700 hover:text-orange-500 duration-500 mr-1 pb-4'>
                        <a href='/'>
                            <ion-icon name='cafe-outline'></ion-icon>
                            Bula Bars!
                        </a>
                    </span>
                    
                </div>

                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-700 dark:border-slate-700'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                            Create an Account
                        </h1>

                        <form onSubmit={createAccount} className='space-y-4 md:space-y-6'>
                            <div>
                                <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your Username</label>
                                <input 
                                    type='text' 
                                    onChange={(e) => {
                                        setUsernameReg(e.target.value)
                                    }} 
                                    name='username' 
                                    id='username' 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                    placeholder='bula123' 
                                    required='' 
                                />
                            </div>


                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
                                <input 
                                    type='email' 
                                    onChange={(e) => {
                                        setEmailReg(e.target.value)
                                    }}
                                    name='email' 
                                    id='email' 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                    placeholder='name@company.com' 
                                    required='' 
                                />
                            </div>

                            <div>
                                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                                <input 
                                    type='password'
                                    onChange={(e) => {
                                        setPasswordReg(e.target.value)
                                    }} 
                                    name='password' 
                                    id='password' 
                                    placeholder='••••••••' 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                    required='' 
                                />
                            </div>


                            <button     
                                type='submit' 
                                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:underline dark:text-primary-500'>
                                    Create Account
                            </button>
                            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                Already have an account? <a href='/login' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Log in.</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
// Based on login page Tailwind template: https://flowbite.com/blocks/marketing/login/
