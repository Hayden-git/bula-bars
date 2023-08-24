
import React from 'react';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import MapPage from './components/MapPage/MapPage';
import Login from './components/LoginRegister/Login'; 
import Register from './components/LoginRegister/Register'; 
import About from './components/AboutPage/About';
import Contact from './components/ContactPage/Contact';

const App = () => {
  return (
    <Router>
      <div className='bg-slate-100'>

        <div className='relative min-h-screen'>
            <NavBar />
            <Routes>
              <Route path='/' element={<MapPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />

            </Routes>
            <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;

