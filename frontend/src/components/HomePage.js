import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import CountryArticles from './CountryArticles'



const HomePage = () => {


  return <div>
    <h1>Home</h1>

    <Link to='/countryarticles/america'>
      <button>AMERICA</button>
    </Link>


    <button>UK</button>
    <button>FRANCE</button>
    <button>SPAIN</button>
  </div>





}

export default HomePage 