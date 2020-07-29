import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { useLocation } from 'react-router-dom'
import MapGL, { Marker, Popup } from 'react-map-gl'

const mapData = [
  {
    id: '1',
    name: 'Test 1',
    lat: 51.5372906,
    lon: -0.1502052
  },
  {
    id: '2',
    name: 'Test 2',
    lat: 51.5081924,
    lon: -0.0919571
  },
  {
    id: '3',
    name: 'Test 3',
    lat: 51.4979346,
    lon: -0.1377158
  },
  {
    id: '4',
    name: 'Test 4',
    lat: 51.4968186,
    lon: -0.138232
  },
  {
    id: '5',
    name: 'Test 5',
    lat: 51.5139949,
    lon: -0.077889
  },
  {
    id: '6',
    name: 'Test 6',
    lat: 51.5599645,
    lon: -0.0806053
  },
  {
    id: '7',
    name: 'america',
    lat: 51.5600537,
    lon: -0.1484565,
    flag: '🇺🇸'
  }
]

const HomePage = () => {

  const [countryData, updateCountryData] = useState(mapData)

  // ! BUTTON
  const [selectedCountry, setSelectedCountry] = useState(null)

  // ! Initial map view
  const [viewPort, setViewPort] = useState({

    // altitude: 1.5,
    // bearing: 0,
    height: '80vh',
    width: '85vw',
    zoom: 2,
    // maxPitch: 60,
    // maxZoom: 24,
    // minZoom: 0,
    // pitch: 0,
    latitude: 54,
    longitude: -2
  })

  // ! BUTTON CONTROLS
  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedCountry(null)
      }
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])

  // ! Within opening tag of the MapGL
  return (

    <section id="map-container">
      <MapGL
        mapboxApiAccessToken={'pk.eyJ1IjoiemNoYWJlayIsImEiOiJja2NhcDAwdWMxd3h6MzFsbXQzMXVobDh2In0.RIvofanub0AhjJm3Om2_HQ'}

        // pass in every property from my viewPort object; changes when viewport changes
        {...viewPort}
        mapStyle='mapbox://styles/zchabek/ckcbqjm986dug1kpuzi036e6q'
        onViewportChange={(viewPort) => setViewPort(viewPort)}
      >


        {/* Take each country , and return a marker */}
        {countryData.map(country => {

          // ! Within opening tag of the marker
          return <Marker
            key={country.id}
            latitude={country.lat}
            longitude={country.lon}
          >

            <button className="markerButton" onClick={() => setSelectedCountry(country)}>🌐 <div>{country.name}</div> </button>

          </Marker>
        })}



        {selectedCountry ? (

          // ! Within opening tag of the popup
          <Popup

            closeOnClick={false}
            latitude={selectedCountry.lat}
            longitude={selectedCountry.lon}
            onClose={() => setSelectedCountry(null)}
          >
            <Link to={`/countryarticles/${selectedCountry.name}`}>

              <div className="popoutCountry">

                <h3>{selectedCountry.name}</h3>
                <h3>{selectedCountry.flag}</h3>

                {/* <img

                  src={selectedCountry.media[0].url}
                  alt='campground' */}

                {/* /> */}

              </div>

            </Link>

          </Popup>
        ) : null}

      </MapGL >



      {/* // return <div>
  //   <h1>Home</h1>

  //   <Link to='/countryarticles/america'>
  //     <button>AMERICA</button>
  //   </Link>


  //   <button>UK</button>
  //   <button>FRANCE</button>
  //   <button>SPAIN</button>
  // </div> */}

    </section>
  )
}

export default HomePage 