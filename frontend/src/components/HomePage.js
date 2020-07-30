import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { useLocation } from 'react-router-dom'
import MapGL, { Marker, Popup } from 'react-map-gl'

const mapData = [
  {
    id: '1',
    name: 'russia',
    lat: 60,
    lon: 100,
    flag: '🇷🇺'
  },
  {
    id: '2',
    name: 'egypt',
    lat: 27,
    lon: 30,
    flag: '🇪🇬'
  },
  {
    id: '3',
    name: 'china',
    lat: 35,
    lon: 105,
    flag: '🇨🇳'
  },
  {
    id: '4',
    name: 'united arab emirates',
    lat: 24,
    lon: 54,
    flag: '🇦🇪'
  },
  {
    id: '5',
    name: 'brazil',
    lat: -10,
    lon: -55,
    flag: '🇧🇷'
  },
  {
    id: '6',
    name: 'united kingdom',
    lat: 54,
    lon: -2,
    flag: '🇬🇧'
  },
  {
    id: '7',
    name: 'america',
    lat: 38,
    lon: -97,
    flag: '🇺🇸'
  },


  {
    id: '8',
    name: 'mexico',
    lat: 3.25,
    lon: 73,
    flag: '🇲🇽'
  },



  {
    id: '9',
    name: 'ukraine',
    lat: 49,
    lon: 32,
    flag: '🇺🇦'
  },


  {
    id: '10',
    name: 'japan',
    lat: 36,
    lon: 138,
    flag: '🇯🇵'
  },



  {
    id: '11',
    name: 'nigeria',
    lat: 16,
    lon: 8,
    flag: '🇳🇬'
  },


  {
    id: '12',
    name: 'canada',
    lat: 60,
    lon: -95,
    flag: '🇨🇦'
  },

  {
    id: '13',
    name: 'ghana',
    lat: 8,
    lon: -2,
    flag: '🇬🇭'
  },

  {
    id: '14',
    name: 'india',
    lat: 20,
    lon: 77,
    flag: '🇮🇳'
  },

  {
    id: '15',
    name: 'argentina',
    lat: -34,
    lon: -64,
    flag: '🇦🇷 '
  },

  {
    id: '16',
    name: 'malaysia',
    lat: 2.5,
    lon: 112.5,
    flag: '🇲🇾'
  },

  {
    id: '17',
    name: 'sweden',
    lat: 62,
    lon: 15,
    flag: '🇸🇪'
  },

  {
    id: '18',
    name: 'New zealand',
    lat: -42,
    lon: 174,
    flag: '🇳🇿'
  },

  {
    id: '19',
    name: 'kazakhsta',
    lat: 48,
    lon: 64,
    flag: '🇰🇿'
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
    zoom: 1,
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

    <section
      id="map-container">
      <div className="homepage-title">
        <h1> Flag Pieces </h1>
      </div>

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
            className="pop-up"
          >
            <Link to={`/countryarticles/${selectedCountry.name}`}>

              <div className="pop-out-country">

                <h3>{selectedCountry.name}</h3>
                <h4>{selectedCountry.flag}</h4>

                {/* <img

                  src={selectedCountry.media[0].url}
                  alt='campground' */}

                {/* /> */}

              </div>

            </Link>

          </Popup>
        ) : null}

      </MapGL >

    </section>
  )
}

export default HomePage 