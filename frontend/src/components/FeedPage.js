import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const FeedPage = () => {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get('/api/feed')
      .then(axiosResp => {
        setArticles(axiosResp.data)
        console.log('resp:', axiosResp.data)
      })
  }, [])

  return <>
    <section className="feed-container">
      {articles.map((item, index) => {
        return <div key={index} className="article-card">
          <h3>{item.title}</h3>
          <h2>{item.flag_image}</h2>
          <a href={item.url} target='_blank' rel='noreferrer'> {articles.url} </a>
          <img src={item.urlToImage} />
          <p>{moment(item.publishedAt).calendar()}</p>
          <p>{item.content}</p>
        </div>
      })}
    </section>
  </>

}

export default FeedPage