![image](https://github.com/Hayden-git/capstone-project/assets/105612431/f08b3e2d-c9f0-4526-9f2c-397966198329)

Bula Bars is a fullstack web application built using the PERN stack (PostgreSQL database, Express, React, Node.js, and visual design with Tailwind CSS) that allows users to discover kratom and kava bars in their vicinity. Are you looking for a nice place to relax, do some work, or enjoy events/live music? Try a kava bar! Currently, the database is manually populated and so it is limited to kava bars around the Tampa, Florida area. 

![screenshot_of_homepage](https://github.com/Hayden-git/capstone-project/assets/105612431/8773f12e-22dd-4ae6-b0b6-ba388baafa80)


## Project Structure

This project is organized into two main folders:

- **backend:** Contains the server-side code built with Node.js, Express.js, and PostgreSQL. It handles data storage, user authentication, and API endpoints.
 - ![image](https://github.com/Hayden-git/capstone-project/assets/105612431/40124e53-3d7f-41cb-9567-3efbe0a7f479)

- **frontend:** Houses the client-side code built with React. It provides the user interface for interacting with the application.
 - ![image](https://github.com/Hayden-git/capstone-project/assets/105612431/bdf74cf8-473e-4027-9c38-029ce6a62988)

## Features

- **User Authentication:** Users can create accounts, log in, and securely authenticate themselves. User sessions are stored with persistence using cookies so that the user stays logged in across the entire website. I need to add basic features to let users log out as well.  

- **Hashed Passwords:** When users create an account, their password will be hashed in the database. This adds a fundamental level of security that, although not perfect, is vital for any web application. Making this work was one of my bigger struggles but I learned a lot!!!

- **Location-based Search:** Bula Bars utilizes geolocation to find nearby kratom and kava bars based on the user's current location. This feature is still at a minimum viable product stage but with some time spent toward improving my database, I can make this feature a helpful part of the application (as was intended for the "final product"). As mentioned below, this was achieved by leveraging an open-source JavaScript mapping library called "Leaflet JS."

- **Detailed Listings:** Each bar listing includes essential information such as name, address, contact details, business hours, user reviews, and more.

- **User Reviews and Ratings:** Logged in users can leave reviews and rate the bars they've visited, providing valuable insights for others.

- **Interactive Maps:** Leaflet JS map that lets users navigate to their chosen bar.Leaflet JS is an open source mapping library. I would like to add a search feature so that users can see all the local results on the interactive map. 

- **Responsive Design:** Using Tailwind CSS, this app is accessible for large screens and mobile devices.  

## Getting Started

### Prerequisites

Before you start, make sure you have the following software installed:

- Node.js and npm: [Node.js Downloads](https://nodejs.org/en/download/)
- PostgreSQL: [PostgreSQL Downloads](https://www.postgresql.org/download/)

### Backend Installation

1. Navigate to the `backend` folder:
   ```shell
   cd backend
2. Install backend server dependencies
    ```shell
    npm install
3. Create a PostgreSQL database and configure the connection details in config/db.js
   ```shell
   npx sequelize-cli db:migrate
4. Start the backend server ... All the endpoints are currently inside of the server.js file in the backend.
   ```shell
   node server.js

### Frontend Installation

1. Navigate to the `backend` folder:
   ```shell
   cd backend
2. Install frontend client dependencies
   ```shell
    npm install
3. Start the frontend development server. This will start up the React frontend
   ```shell
   npm start
4. The Bula Bars application should now be running locally, open your browser and navigate to local host.

## Acknowledgments
- **React.js**
- **Node.js**
- **Express.js**
- **PostgreSQL relatonal database**
- **Tailwind CSS**
- **Express sessions**
- **User persistence**
- **bcrypt password hashing**
- **Leaflet JS interactive map**

## Contact
If you have any questions, suggestions, or contributions please feel free to reach out to me at [hayden.garry99@gmail.com].

Happy exploring the world of kratom and kava bars with Bula Bars!
