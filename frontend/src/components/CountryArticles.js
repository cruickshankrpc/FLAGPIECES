import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

const CountryArticles = () => {
  // country articles page: 
  // const API_KEY = process.env.NEWS_KEY
  const [articles, setArticles] = useState([])
  // const [country, setCountry] = useState('america')

  const country = 'america'

  // const flags = {
  //   'america': '🇺🇸'
    // United Arab Emirates
    //  Argentina
    // Austria
  // }


  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?q=${country}&language=en&apiKey=59129570db024a9aaaeb6c5af565d124`)
      .then(axiosResp => {
        setArticles(axiosResp.data.articles)
      })
  }, [])

  return <section className="country-articles-container">
    <div className="article-card">
      {articles.map((item, index) => {
        return <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.source.name}</p>
          <p>{item.author}</p>
          <a href={item.url} target='_blank' rel='noreferrer'> {item.url} </a>
          <img src={item.urlToImage} />
          <p>{item.publishedAt}</p>
          <p>{item.content}</p>
          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit(item)
          }}>READ</button>
        </div>
      })}
    </div>
  </section>

  //  inside onclick 
  function handleSubmit(item) {
    event.preventDefault()
    // grabs flags from our flag obj
    // const obj = {
    //   'flag': flags[country]
    // }
    // const token = localStorage.getItem('token')
    axios.post('/api/countryarticles/article', item
    // , {
    //   headers: { Authorization: `Bearer ${token}` }
    // }
    )
  }



  // button for each article; post


  // copy the country name
  // dictionary of country name and flags
  // make country -> flag (to later add the field to article model)
  // render the flag on the page
  // Save the information in fields tha  are the same name as our api model
  // post the relevant information to the backend route
  // The information would be a single article only
  // '/api/countryarticles/article'

  // Also for the page to change to the SingleArticle Page
  // And get the single article on that page

}

export default CountryArticles