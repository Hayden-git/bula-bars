
import React from 'react'

export default function About() {
  return (

    <div className="container my-5 mx-auto md:px-2">
        {/* Section: Design Block */}
        <section className="mb-10">
            <div className="flex flex-wrap items-center">
                {/* IMAGES */}
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-5/12">
                  <div className="flex lg:py-12 mr-4">
                      {/* Image cred: https://www.wineenthusiast.com/wp-content/uploads/2023/05/Kava.jpg */}
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img src="https://www.wineenthusiast.com/wp-content/uploads/2023/05/Kava.jpg"
                      className="z-[10] w-full rounded-lg shadow-lg dark:shadow-black/50 lg:ml-[50px]" alt="image" />
                  </div>
                  <br />
                  <div className="flex lg:py-12 mr-4">
                    {/* Image cred: https://cms.mountainside.com/wp-content/uploads/2023/07/kratom-tea.jpg */}
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img src="https://cms.mountainside.com/wp-content/uploads/2023/07/kratom-tea.jpg"
                      className="z-[10] w-full rounded-lg shadow-lg dark:shadow-black/50 lg:ml-[50px]" alt="image" />
                  </div>
                </div>

                {/* Landing Page - text */}
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                    <div
                        className="flex h-full items-center rounded-lg bg-yellow-600 p-6 text-center text-white lg:pl-12 lg:text-left">
                        <div className="lg:pl-12">
                            <h2 className="mb-4 text-3xl font-bold">What is a kava bar?</h2>
                            <p className="mb-4 pb-2 lg:pb-0">
                            Kratom and kava bars have emerged as a unique alternative, offering a refreshing departure from traditional bar culture. These venues provide a down-to-earth environment where patrons can unwind, socialize, work, or simply relax. Unlike noisy and alcohol-centric bars, kratom and kava bars offer an alternative space for individuals seeking a calming atmosphere. They also serve as a haven for remote workers who enjoy a cafe environment or those looking to enjoy the company of friends. All while sipping on herbal teas that promote relaxation and mental clarity.
                            </p>

                            <div className="mx-auto mb-8 flex flex-col md:flex-row md:justify-around xl:justify-start">
                                <p className="mx-auto mb-4 flex items-center md:mx-0 md:mb-2 lg:mb-0 xl:mr-20">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" className="mr-2 h-5 w-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Great ambiance!
                                </p>

                                <p className="mx-auto mb-4 flex items-center md:mx-0 md:mb-2 lg:mb-0 xl:mr-20">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" className="mr-2 h-5 w-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Relaxing environment!
                                </p>

                                <p className="mx-auto mb-2 flex items-center md:mx-0 lg:mb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" className="mr-2 h-5 w-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Healthy tea!
                                </p>
                            </div>

                            <p>
                            <h2 className="mb-4 text-3xl font-bold">What is Kava?</h2>
                                Kava, on the other hand, originates from the Pacific islands, where it has been a staple of traditional ceremonies and gatherings for generations. The roots of the Piper methysticum plant are used to create a beverage that induces relaxation and tranquility without impairing cognitive function. Kava's active compounds, known as kavalactones, interact with neurotransmitters in the brain, promoting a sense of calm and reducing anxiety. The kava experience is characterized by its ability to ease stress while maintaining mental clarity.
                            <br />
                            
                            <br />
                            <h2 className="mb-4 text-3xl font-bold">What is Kratom?</h2>
                                Kratom, derived from the leaves of the Mitragyna speciosa tree, has gained attention for its potential to offer pain relief, boost mood, and aid in managing opioid withdrawal symptoms. The active compounds, mitragynine and 7-hydroxymitragynine, interact with opioid receptors in the brain, resulting in pain alleviation and mood enhancement. Kratom's effects are dose-dependent, with low doses inducing increased energy and focus, and higher doses leading to relaxation and sedation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Section: Design Block */}
    </div>
  )
}
// Based on landing page template: https://tailwind-elements.com/docs/standard/designblocks/content/