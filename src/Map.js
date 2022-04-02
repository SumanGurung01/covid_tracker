import React , {useEffect} from "react";
import { MapContainer , TileLayer , Marker, Popup } from "react-leaflet";
import "./Map.css";
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: require("./location.png"),
  iconSize:[35,35],
  iconAnchor: [17,45],
  popupAnchor: [1,-45]
})

function Map({ center, zoom , countries}) {
  console.log(countries)
  return (  
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {
          countries.map(country => (
            <Marker
            position={[country.countryInfo.lat,country.countryInfo.long]} 
            icon={markerIcon}
            >
                <Popup className="map__popup">
                    <div className="popup">
                        <h1 align="center">{country.country}</h1>
                        
                        <img src={country.countryInfo.flag} className="map__image"></img><br></br>
                          Today Cases : {country.todayCases}<br></br>
                          Today Recovered : {country.todayRecovered}<br></br>
                          Today Death : {country.todayDeaths}
                    </div>
                </Popup>
            </Marker>
          ))
        }

       
      </MapContainer>
    </div>
  );
}

export default Map;
