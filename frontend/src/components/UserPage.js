import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserPage = () => {

  const [userArticles, setUserArticles] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('/api/userpage',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(axiosResp => {
        setUserArticles(axiosResp.data.reader_articles)
        console.log('AXIOSRESP.DATA:', axiosResp.data.reader_articles)
      })
  }, [])

  return <section className="country-articles-container">
    <div className="article-card">
      <h1>YOUR READ ARTICLES</h1>
      {userArticles.map((item, index) => {
        return <div key={index} className="card">
          <h3>{item.title}</h3>
          <p>{item.flag_image}</p>
          <a href={item.url} target='_blank' rel='noreferrer'> {item.url} </a>
          <img src={item.urlToImage} />
          <p>{item.publishedAt}</p>
          <p>{item.content}</p>
          {item.reactions.map((reaction, index) => {
            return <div key={index}>
              <p>{reaction.image}</p>
            </div>
          })}
        </div>
      })}
    </div>
  </section>




}

export default UserPage 