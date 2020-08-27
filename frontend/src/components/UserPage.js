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

      <h1>YOUR READ ARTICLES:</h1>

      <section className="user-articles-container">
        <div>
          {userArticles.map((item, index) => {
            return <div key={index} className="article-card">
              <h3>{item.title}</h3>
              <h2>{item.flag_image}</h2>
              <a href={item.url} target='_blank' rel='noreferrer'>
                <img src={item.urlToImage} />
              </a>
              <small>published:{moment(item.publishedAt).calendar()}</small>

              <p>{item.content}</p>
              <a href={item.url} target='_blank' rel='noreferrer'>
                <button>READ</button>
              </a>
              <div className='reactions'>
                {item.reactions.map((reaction, index) => {
                  return <div key={index}>
                    <p>{reaction.image}</p>
                  </div>
                })}
              </div>
              <div className="comments-container">
                
                <div className="comment-box">
                  {item.comments.map(comment => {
                    return <div className="media-content" key={comment.id}>
                      <h2>COMMENTS:</h2>
                      <div className="comment-content">
                        <p>{comment.content}</p>
                        <small>{moment(comment.content.created_at).calendar()}</small>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          })}

        </div>
      </section>
    </section>
  </>




}

export default UserPage 

