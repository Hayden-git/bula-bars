import React from 'react'

import { Button } from '@material-tailwind/react';

export default function Contact() {
  return (
    
    <div className="container my-10 mt-10 mx-auto md:px-6">
      {/*  Section: Design Block  */}
        <section className="mb-32">
            {/* Image cred: https://t3.ftcdn.net/jpg/04/56/01/02/360_F_456010263_F6tHQQocWNuuGJqLZxT8tlu6BXADR9Cf.jpg */}
            <div className="relative h-[320px] rounded-lg overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://t3.ftcdn.net/jpg/04/56/01/02/360_F_456010263_F6tHQQocWNuuGJqLZxT8tlu6BXADR9Cf.jpg')]">
            </div>

            <div className="container px-6 md:px-12">
                <div
                    className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,0%,0.8)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[20px]">
                    <div className="flex flex-wrap">
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                            <form>
                                {/* NAME */}
                                <div className="relative mb-6 text-lg" data-te-input-wrapper-init>
                                    <input type="text"
                                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                      id="name" placeholder="Name" />
                                    <label
                                      className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                      for="name">Name
                                    </label>
                                </div>

                                {/* EMAIL */}
                                <div className="relative mb-6" data-te-input-wrapper-init>
                                  <input type="email"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="email" placeholder="Email address" />
                                  <label
                                    className="pointer-events-none cursor-pointer absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                    for="email">Email address
                                  </label>
                                </div>

                                {/* MESSAGE */}
                                <div className="relative mb-6" data-te-input-wrapper-init>
                                  <textarea
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="message" rows="3" placeholder="Your message"></textarea>
                                  <label for="message"
                                    className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Message</label>
                                </div>

                                {/* SEND button */}
                                <Button type="button" data-te-ripple-init data-te-ripple-color="light"
                                  className="mb-6 inline-block w-full rounded bg-primary bg-indigo-500 px-6 pt-2.5 pb-2 text-base font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0">
                                  Send
                                </Button>
                            </form>
                        </div>

                        


                        <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                            <div className="flex flex-wrap">
                                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-3/7">
                                    <div className="flex items-start">
                                                                                
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23" stroke-width="2"
                                                    stroke="currentColor" className="h-6 w-6 text-indigo-300">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold text-2xl dark:text-indigo-50">
                                              Hayden Garry
                                            </p>
                                            <p className="text-indigo-500 text-2xl dark:text-indigo-50">
                                              hayden.garry99@gmail.com@example.com
                                            </p>
                                            <p className="text-indigo-500 text-2xl dark:text-indigo-50">
                                              +1 619-733-1409
                                            </p>

                                            <div className="pt-5 flex items-center text text-indigo-500 text-2xl dark:text-indigo-50">
                                                <ion-icon name="logo-linkedin"></ion-icon>
                                                <a href="https://www.linkedin.com/in/hayden-garry" target="_blank" rel="noopener noreferrer" className="pl-2 hover:underline">
                                                    Follow me on LinkedIn!
                                                </a>
                                            </div>

                                            <div className="pt-5 flex items-center text-indigo-500 text-2xl dark:text-indigo-50">
                                                <ion-icon name="logo-github"></ion-icon>
                                                <a href="https://github.com/Hayden-git/capstone-project" target="_blank" rel="noopener noreferrer" className="pl-2 hover:underline">
                                                    Check this project out on GitHub!
                                                </a>
                                            </div>
                                            
                                            <div className="pt-5">
                                                <p className="text-xl text-indigo-200 dark:text-indigo-200">
                                                  Hey there! I'm Hayden, a passionate software developer with a love for creating functional websites. This is my capstone project for my software engineering bootcamp.
                                                </p>
                                            </div>

                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    {/* Section: Design Block */}
    </div>
    )
}
// Based on a contact page template: https://tailwind-elements.com/docs/standard/designblocks/contact/