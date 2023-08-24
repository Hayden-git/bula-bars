
import React, { useEffect, useState } from 'react';

import {
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

import Swal from 'sweetalert2';

export default function ResultsList() {
  const [kavaBars, setKavaBars] = useState([]);
  const [likedBars, setLikedBars] = useState([]);
  const [expandedKavaBar, setExpandedKavaBar] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);;
  const [reviewText, setReviewText] = useState('');

  const [userId, setUserId] = useState(null);

  const [isEditingReview, setIsEditingReview] = useState(false); // New state for editing mode
  const [selectedReview, setSelectedReview] = useState(null);

  // For pagination
  const [currentKavaBarIndex, setCurrentKavaBarIndex] = useState(0);

  const fetchBarData = () => {
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
    // console.log(...likedBars)
  }
};

const handleSubmitReview = (event, kavaBarId, reviewText, userId) => {
  event.preventDefault();

  // Check if user is logged in
  if (!isLoggedIn) {
    // Show login alert if not logged it
    handleLoginAlert();
    return;
  }

  fetch('http://localhost:4001/api/new-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: JSON.stringify({
      kavaBarId,
      reviewText,
      userId,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    // Update the UI or fetch new data as needed
    // Maybe updatedFetchBarData()???
    fetchBarData();
    // console.log(data)
  })
  .catch((error) => {
    console.error(error);
  });
};

const handleLoginAlert = () => {
  Swal.fire({
    title: 'Please log in to leave a review',
    icon: 'warning',
    footer: "<a style='text-decoration-line: underline;' href='/login'>Log in here</a>",
  });
};

const handleEditReviewClick = (review) => {
  setReviewText(review.review_text); // Set the review text to edit
  setSelectedReview(review); // Set the selected review for editing
  setIsEditingReview(true); // Activate editing mode
};

const handleEditReviewSubmit = (event, reviewId) => {
  event.preventDefault();

  // Check if user is logged in
  if (!isLoggedIn) {
    // Show login alert if not logged in
    handleLoginAlert();
    return;
  }

  // Submit the edited review
  fetch(`http://localhost:4001/api/edit-review/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      kavaBarId: kavaBars[currentKavaBarIndex].id,
      reviewText,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the UI or fetch new data as needed
      // Maybe updatedFetchBarData()???
      fetchBarData();
      setIsEditingReview(false); // Exit editing mode
      setReviewText(''); // Reset review text
      // console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};


const handleDeleteReview = (review) => {
  // Show a confirmation dialog before letting the user delete the review
  Swal.fire({
    title: 'Delete Review',
    text: 'Are you sure you want to delete this review?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Send a DELETE request to the server
      fetch(`http://localhost:4001/api/delete-review/${review.id}`, {
        method: 'DELETE',
        credentials: 'include', // Include credentials for the session
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Review deleted successfully') {
            // Refresh the UI or fetch new data as needed
            fetchBarData();
          } else {
            Swal.fire('Error', 'Failed to delete the review', 'error');
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire('Error', 'An error occurred while deleting the review', 'error');
        });
    }
  });
};

useEffect(() => {
  // Check if the user is logged in
  fetch('http://localhost:4001/login', {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      setIsLoggedIn(data.loggedIn); // Update login status
      setUserId(data.userId); // Set the user's ID
    })
    .catch((error) => {
      console.error(error);
    });

  fetchBarData(); // Fetch kava bar data when the component mounts
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
              </Typography>
            </CardBody>

            {/* Expand and like options + user reviews*/}
            <span>
              <CardFooter className='flex items-center pt-0 text-red-500 cursor-pointer transition-opacity duration-300'>
                <div className='mr-3'>
                  <Button 
                    onClick={() =>
                      setExpandedReviews(
                        expandedReviews === kavaBars[currentKavaBarIndex].id
                          ? null
                          : kavaBars[currentKavaBarIndex].id
                      )
                    }
                  >
                    {expandedReviews === kavaBars[currentKavaBarIndex].id
                      ? 'Close'
                      : 'Read Reviews'}
                  </Button>
                </div>
                
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
                      : 'Learn More'}
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

          {/* Reviews */}
          {expandedReviews === kavaBars[currentKavaBarIndex].id && (
            <div className='mt-3 bg-white p-2 shadow-md max-h-32 overflow-y-auto transition-all duration-300'>
              {kavaBars[currentKavaBarIndex].reviews.map((review) => (
                <div key={review.id} className='mb-2 border-b pb-2'>
                  <div className='flex items-center justify-between'>
                    <p className='font-bold underline'>{`Review by: ${review.username}`}</p>
                    <div className='flex space-x-2'>
                      {isLoggedIn && userId === review.userId && (
                        <>
                          <Button
                            type='button'
                            color='orange'
                            ripple='light'
                            onClick={() => handleEditReviewClick(review)} // Handle edit click
                            className='text-2xl shadow-none bg-transparent text-indigo-700 hover:text-orange-500 duration-500'
                          >
                            <ion-icon name='pencil-outline'></ion-icon>
                          </Button>
                          <Button
                            type='button'
                            color='orange'
                            ripple='light'
                            onClick={() => handleDeleteReview(review)} // Handle delete click
                            className='text-2xl shadow-none bg-transparent text-indigo-700 hover:text-orange-500 duration-500'
                          >
                            <ion-icon name='trash-outline'></ion-icon>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <p>{review.review_text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Edit Review form */}
          {isEditingReview && selectedReview && (
            <form onSubmit={(event) => handleEditReviewSubmit(event, selectedReview.id)}>
              <textarea
                placeholder='Edit your review here...'
                rows='3'
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                className='w-full resize-none rounded-md p-2'
              />

              <span className='font-bold text-5xl cursor-pointer flex items-center ml-6 text-indigo-700 hover:text-orange-500 duration-500'>
                <Button type='submit' color='orange' ripple='light' size='sm'>
                  Save Changes
                </Button>
              </span>
            </form>
          )}

          {/* Submit Review form */}
          {!isEditingReview && (
            <form onSubmit={(event) => handleSubmitReview(event, kavaBars[currentKavaBarIndex].id, reviewText, userId)}>
              <textarea
                placeholder='Write your review here...'
                rows='3'
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                className='w-full resize-none rounded-md p-2'
              />

              <span className='font-bold text-5xl cursor-pointer flex items-center ml-6 mt-2 text-indigo-700 hover:text-orange-500 duration-500'>
                <Button type='submit' color='orange' ripple='light' size='sm'>
                  Submit Review
                </Button>
              </span>
            </form>
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
