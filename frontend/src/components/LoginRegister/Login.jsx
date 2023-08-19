
import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const [loginStatus, setLoginStatus] = useState('');



    const login = async (event) => {
        const url = 'http://localhost:4001/login';
        const data = {
            username: username,
            password: password,
        };
        
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            // console.log(response)
            return response.json();
        })
        .then((data) => { 

            // Logs data without showing login credentials => Object: { message: 'Login Successful' } 
            console.log(data);

            Swal.fire({
                title: `Welcome ${username}!`,
                icon: 'success',
                text: 'You are now logged in :) Bula!',
                footer: "<a style='text-decoration-line: underline;' href='/'>Click here to go back to the homepage!</a>"
            });
        })
        .catch((error) => {

            // If no user exists, bada bing bada boom
            if (error) {
                console.info('Could not find account by that username/password', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cannot find that user :(',
                    footer: "<a style='text-decoration-line: underline;' href='/register'>Click here to make an account!</a>"
                })
            }    
        });
        event.preventDefault();
    }

    // Checks for existing express-sessions user(s), logs boolean value if logged in OR not
    useEffect(() => {
        const url = 'http://localhost:4001/login';
        
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            // Logs Response object: {type: 'cors', url: 'http://localhost:4001/login', redirected: false, status: 200, ok: true, statusText: 'OK', headers: Headers(2), body: ReadableStream, bodyUsed: false }}
            console.log(response)
            return response.json();
        })
        .then((data) => {
            // Checks /login GET route for existing user sessions, logs object with boolean value => Object: { loggedIn: true/false } 
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

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
                            Sign in to your account
                        </h1>

                        <form className='space-y-4 md:space-y-6' action='#'>
                            <div>
                                <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your username</label>
                                <input 
                                    type='username' 
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                    name='username' 
                                    id='username' 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                    placeholder='bula123' 
                                    required='' 
                                />
                            </div>

                            <div>
                                <label htmlFor='password' className='block mb-2 text-sm font-medium text-slate-900 dark:text-white'>Password</label>
                                <input 
                                    type='password'
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    name='password' 
                                    id='password' 
                                    placeholder='••••••••' 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                    required='' 
                                />
                            </div>

                            <div className='flex items-center justify-between'>
                                <div className='flex items-start'>
                                    <div className='flex items-center h-5'>
                                      <input 
                                        id='remember' 
                                        aria-describedby='remember' 
                                        type='checkbox' 
                                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' 
                                        required=''
                                      />
                                    </div>
                                    <div className='ml-3 text-sm'>
                                      <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>Remember me</label>
                                    </div>
                                </div>
                                <a href='/' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>Forgot password?</a>
                            </div>

                            <button 
                                onClick={login} 
                                type='submit' 
                                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:underline dark:text-primary-500'
                                >
                                Log in
                            </button>
                            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                Don't have an account yet? <a href='/register' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
// Login page Tailwind template: https://flowbite.com/blocks/marketing/login/