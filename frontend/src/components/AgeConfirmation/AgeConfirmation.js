
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

import App from '../../App'; 

function AgeConfirmation() {
  useEffect(() => {
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
        window.location.href = 'https://www.google.com';
      }
    });
  }, []);

  return <App />; // Render main App component after age confirmation
}

export default AgeConfirmation;
