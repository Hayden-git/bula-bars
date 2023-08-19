
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './mapStyles.css';

export default function KavaBarMap() {
    const [kavaBars, setKavaBars] = useState([]);
    const defaultCenter = [27.489320, -82.543040]; // Default center (Bradenton, Florida)
    const defaultZoom = 14; // Default zoom level
    const scrollWheelZoom = false;
  
    useEffect(() => {
      // Fetches Kava Bar data from backend
      fetch('http://localhost:4001/api/bula-bars/locations')
        .then((response) => response.json())
        .then((data) => {
          setKavaBars(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []); 

  return (
    <div>   
      <MapContainer style={{'height': '100vh'}} center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={scrollWheelZoom}>
        {/* Map Tiles */}
        <TileLayer 
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> 

        {/* Map Pins for Kava Bars */}
        {kavaBars.map((kavaBar) => (
            <Marker key={kavaBar.id} position={[kavaBar.latitude, kavaBar.longitude]}>
                <Popup>
                    <ul>
                        <li key={kavaBar.id}>
                            <b>{kavaBar.bar_name}</b><br />
                            Address: {kavaBar.address}<br />
                            Ratings: {kavaBar.ratings}<br />
                        </li>
                    </ul>
                </Popup>
            </Marker>
        ))}

      </MapContainer>
    </div>
  )
}

