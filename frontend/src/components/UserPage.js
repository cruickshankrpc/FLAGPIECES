import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

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

  return <>
    <section className="user-page">

      <h1>YOUR READ ARTICLES</h1>

      <section className="user-articles-container">
        <div>
          {userArticles.map((item, index) => {
            return <div key={index} className="article-card">
              <h3>{item.title}</h3>
             
              <a href={item.url} target='_blank' rel='noreferrer'>
                <img src={item.urlToImage} />
              </a>
              <small>published:{moment(item.publishedAt).calendar()}</small>
              <h2>{item.flag_image}</h2>
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
    </section>
  </>




}

export default UserPage 