import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet library
import pointer from '../../assets/Pointer.png';

// Set the initial map center
const center = [30.1575, 71.5249];
const cities = [
  { name: 'Islamabad Chapter', coords: [33.6844, 73.0479] }, // Islamabad
  { name: 'Gujranwala Chapter', coords: [32.15, 74.1945] }, // Gujranwala
  { name: 'Lahore Chapter', coords: [31.5204, 74.3587] }, // Lahore
  { name: 'Multan Chapter', coords: [30.1575, 71.5249] }, // Multan
  { name: 'Bahawalpur Chapter', coords: [29.3544, 71.6911] }, // Bahawalpur
  { name: 'Peshawar Chapter', coords: [34.0151, 71.5249] }, // Peshawar
  { name: 'Quetta Chapter', coords: [30.1798, 66.9750] }, // Quetta
  { name: 'Karachi Chapter', coords: [24.8607, 67.0011] }, // Karachi
];


// Create a custom icon using the specified image
const customIcon = new L.Icon({
  iconUrl: pointer,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Your React component
const MapComponent = () => {
  return (
    <>

      <div className="map-container" style={{ position: 'relative', zIndex: 0 }}>
      <MapContainer center={center} zoom={5} style={{ width: '100%', height: '400px' }} scrollWheelZoom={false}>
        {/* Add markers dynamically using the map method */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          attribution=''
        />
        {cities.map((city, index) => (
          <CityMarker key={index} city={city} />
        ))}
      </MapContainer>
      </div>
    </>
  );
};

const CityMarker = ({ city }) => {
  const map = useMap();

  const handleMarkerClick = () => {
    map.flyTo(city.coords, 13, {
      duration: 2,
    });
  };

  return (
    <Marker position={city.coords} icon={customIcon} eventHandlers={{ click: handleMarkerClick }}>
      {/* You can add a popup or other components here for each Marker */}
      <Popup>{city.name}</Popup>
    </Marker>
  );
};

export default MapComponent;
