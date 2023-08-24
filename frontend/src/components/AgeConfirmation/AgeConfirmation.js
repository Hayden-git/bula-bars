
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import App from '../../App';

export default function AgeConfirmation() {

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
      
      if (data.loggedIn) {
        console.log('You are logged in. BULA')
      } else {
        Swal.fire({
          title: 'Are you 18 or older?',
          text: 'You must be 18 years or older to access this website.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (!result.isConfirmed) {
            // Redirect to Google if user doesn't confirm their age
            window.location.href = 'https://r.mtdv.me/vsjJJc0woh';
          }
        });
      }

      console.log(data)
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

    return <App />; // Render main App component after age confirmation
}
