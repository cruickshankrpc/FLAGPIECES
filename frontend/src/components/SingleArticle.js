import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'



const SingleArticle = (props) => {

  const [articles, setArticles] = useState({})

  useEffect(() => {
    axios.get(`/api/singlearticle/${props.match.params.id}`)
      .then(axiosResp => {
        setArticles(axiosResp.data)
        console.log('AXIOSRESP.DATA:', axiosResp.data)
      })
  }, [])

  return <section className="single-article-container">
    <div className="single-article-card">
      <h3>{articles.title}</h3>
      <h3>{articles.flag_image}</h3>
      <a href={articles.url} target='_blank' rel='noreferrer'> {articles.url} </a>
      <img src={articles.urlToImage} />
      <p>{articles.publishedAt}</p>
      <p>{articles.content}</p>
      {/* <button onClick={(event) => {
        event.preventDefault()
        handleSubmit(item)
      }}>READ</button> */}
    </div>
  </section>
}

export default SingleArticle

