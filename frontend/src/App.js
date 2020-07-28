import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  // country articles page: 

  // const API_KEY = process.env.NEWS_KEY

  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=iceland&language=en&apiKey=59129570db024a9aaaeb6c5af565d124')
      .then(axiosResp => {
        setArticles(axiosResp.data.articles)
      })
  }, [])

  // return <div> <h1> test </h1>

  return <div>

    {articles.map((item, index) => {
      return <div key={index} className="articles-container">
        <p>{item.source.name}</p>
        <p>{item.author}</p>
        <p>{item.title}</p>
        <p>{item.description}</p>
        <a href={item.url} target='_blank' rel='noreferrer'> {item.url} </a>
        <img src={item.urlToImage} />
        <p>{item.publishedAt}</p>
        <p>{item.content}</p>
      </div>
    })}

  </div>

}

export default App