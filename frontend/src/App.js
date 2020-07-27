import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  // country articles page: 

  // const API_KEY = process.env.NEWS_KEY

  // const [search, setSearch] = useState('')

  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=iceland&language=en&apiKey=59129570db024a9aaaeb6c5af565d124')
      .then(axiosResp => {
        setArticles(axiosResp.data)
        console.log(axiosResp.data)
      })
  }, [])


  // console.log(data)
  console.log('articles:', articles.articles)
  
  return <div>
    {articles.map((article, index) => {
      return <div key={index} className="articles-container">
        <h1>{article.source.title} Hello</h1>
      </div>
    })}
  </div>
}

export default App