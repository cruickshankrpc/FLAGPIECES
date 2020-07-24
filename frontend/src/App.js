import React from 'react'
import axios from axios 

const App = () => {
  return <h1>Hello World</h1>

  const articles = (() => {
    axios.get(`https://newsapi.org/v2/everything?q=  ${country} & ${  API_KEY  }`)

  })

}
  
export default App