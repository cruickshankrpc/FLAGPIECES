import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'


const FeedPage = () => {

  const [articles, setArticles] = useState([])
  const [reaction, setReaction] = useState([])


  const newArticles = articles.filter((article) => {
    return article.reactions.map((item, index) => {
      return item.name
    })
      .includes(reaction)
  })
  // console.log('NEWARTICLE:', newArticles)


  function handleSort(event) {
    // console.log(event.target.value)
    if (event.target.value === 'angry') {
      setReaction('angry')
    } if (event.target.value === 'happy') {
      setReaction('happy')
    } if (event.target.value === 'funny') {
      setReaction('funny')
    } if (event.target.value === 'surprised') {
      setReaction('surprised')
    } if (event.target.value === 'sad') {
      setReaction('sad')
    }

  }

  useEffect(() => {
    axios.get('/api/feed')
      .then(axiosResp => {
        setArticles(axiosResp.data)
        // setFilterReactions()
        // console.log('RESPONSE:', axiosResp.data)
      })
  }, [])


  return <>
    <section className="feed-container">

      <nav className="feed-sort">

        <select className="feed-select-bar"
          onChange={handleSort}
        >
          {/* 😂 😊  😲 😓 😠  */}
          <option value="" defaultValue> FILTER: </option>
          <option value="funny" className="reviewsPageOption">😂</option>
          <option value="happy" className="reviewsPageOption">😊</option>
          <option value="surprised" className="reviewsPageOption">😲</option>
          <option value="sad" className="reviewsPageOption">😓</option>
          <option value="angry" className="reviewsPageOption">😠</option>
        </select>
      </nav>

      <div className="feed-article-container">
        {newArticles.map((item, index) => {
          return <div key={index} className="article-card">
            <h3>{item.title}</h3>
            <h2>{item.flag_image}</h2>
            <img src={item.urlToImage} />
            <p>{moment(item.publishedAt).calendar()}</p>
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
          </div>
        })}
      </div>
    </section>
  </>

}

export default FeedPage