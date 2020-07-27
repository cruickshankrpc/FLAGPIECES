import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  // country articles page: 

  const API_KEY = process.env.NEWS_KEY

  const [country, setCountry] = useState([])

  const countryArticles = (() => {
    axios.get(`https://newsapi.org/v2/everything?q=${country}&${API_KEY}`)
      .then(article => {
        setCountry(article.data.results)
      })
  })

  useEffect(() => {
    countryArticles()
  }, [])

  return <h1>Hello {country}</h1>
}

export default App