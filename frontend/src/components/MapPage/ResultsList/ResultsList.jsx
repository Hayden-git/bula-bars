
import React, { useEffect, useState } from 'react';

import {
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

export default function ResultsList() {
  const [kavaBars, setKavaBars] = useState([]);
  const [likedBars, setLikedBars] = useState([]);
  const [expandedKavaBar, setExpandedKavaBar] = useState(null);
  // For pagination
  const [currentKavaBarIndex, setCurrentKavaBarIndex] = useState(0);

  const fetchData = () => {
    fetch('http://localhost:4001/api/bula-bars/locations')
      .then((response) => response.json())
      .then((data) => {
        setKavaBars(data);
      })
      .catch((error) => {
        console.error('Error fetching kava bar data:', error);
      });
  };

  const toggleLike = (kavaBarId) => {
    if (likedBars.includes(kavaBarId)) {
      setLikedBars(likedBars.filter((id) => id !== kavaBarId));
    } else {
      setLikedBars([...likedBars, kavaBarId]);
    }
  };

  // Fetch kava bar data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='object-cover'>
      {kavaBars.length > 0 && (
        <div className='flex-wrap -mx-2 gap-1'>
          <div
            key={kavaBars[currentKavaBarIndex].id}
            className='bg-white p-4 shadow-md'
          >
            {/* Display kava bar image */}
            <CardHeader
              className={`relative h-56 mt-1 md:my-1 transition-all duration-500 ease-ins 
              ${
                likedBars.includes(kavaBars[currentKavaBarIndex].id)
                  ? 'liked'
                  : ''
              }`}
            >
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img
                src='https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
                alt='a picture of the kava bar'
                className='w-full h-full object-cover'
              />
            </CardHeader>

            {/* Display kava bar details */}
            <CardBody>
              <Typography variant='h5' color="inherit" className='mb-2'>
                {kavaBars[currentKavaBarIndex].bar_name}
              </Typography>
              <Typography>
                Address: {kavaBars[currentKavaBarIndex].address}
                <br />
                Ratings: {kavaBars[currentKavaBarIndex].ratings}
              </Typography>
            </CardBody>

            {/* Expand and like options */}
            <span>
              <CardFooter className='flex items-center pt-0 text-red-500 cursor-pointer transition-opacity duration-300'>
                <Button
                  onClick={() =>
                    setExpandedKavaBar(
                      expandedKavaBar === kavaBars[currentKavaBarIndex].id
                        ? null
                        : kavaBars[currentKavaBarIndex].id
                    )
                  }
                >
                  {expandedKavaBar === kavaBars[currentKavaBarIndex].id
                    ? 'Close'
                    : 'Read More'}
                </Button>

                <div className='ml-3 font-bold text-3xl cursor-pointer'>
                  <ion-icon
                    name={
                      likedBars.includes(kavaBars[currentKavaBarIndex].id)
                        ? 'heart'
                        : 'heart-outline'
                    }
                    onClick={() =>
                      toggleLike(kavaBars[currentKavaBarIndex].id)
                    }
                  ></ion-icon>
                </div>
              </CardFooter>
              
              {/* Expanded kava bar details */}
              {expandedKavaBar === kavaBars[currentKavaBarIndex].id && (
                <div className='mt-3 bg-white p-2 shadow-md max-h-32 overflow-y-auto transition-all duration-300'>
                  {kavaBars[currentKavaBarIndex].about_bar}
                </div>
              )}

              {/* Navigation buttons */}
              <div className='flex justify-center mt-4 space-x-3'>
                <Button
                  onClick={() =>
                    setCurrentKavaBarIndex(
                      // Calculate the index of the prev kava bar, wrapping around to the end
                      (currentKavaBarIndex - 1 + kavaBars.length) % kavaBars.length
                    )
                  }
                >
                  {/* Unicode character for left arrow */}
                  &#8592; Previous
                </Button>
                <Button
                  onClick={() =>
                    setCurrentKavaBarIndex(
                      // Calculate the index of the next kava bar, wrapping around to the start
                      (currentKavaBarIndex + 1) % kavaBars.length
                    )
                  }
                >
                  {/* Unicode character for right arrow */}
                  Next &#8594;
                </Button>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
