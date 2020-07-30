import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
// import 'bulma'
// import { Link } from 'react-router-dom'

const SingleArticle = (props) => {

  const id = props.match.params.id

  const [articles, setArticles] = useState({})

  // for comments:
  const [comment, setComment] = useState('')

  const [colourAngry, setAngry] = useState('lightgrey')
  const [colourHappy, setHappy] = useState('lightgrey')
  const [colourFunny, setFunny] = useState('lightgrey')
  const [colourSurprised, setSurprised] = useState('lightgrey')
  const [colourSad, setSad] = useState('lightgrey')

  // for comments:
  function handleComment() {
    const token = localStorage.getItem('token')
    axios.post(`api/singlearticle/${id}/comments`, { content: comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setComment('')
        location.reload()
        console.log(comment)
      })
  }


  // When the state of a reaction changes call a useEffect

  const [reaction, setReaction] = useState({
    image: '',
    name: ''
  })

  function handleSubmit1() {
    const angryReaction = {
      image: '😠',
      name: 'angry'
    }
    setReaction(angryReaction)
  }

  function handleSubmit2() {
    const happyReaction = {
      image: '😊',
      name: 'happy'
    }
    setReaction(happyReaction)
  }

  function handleSubmit3() {
    const funnyReaction = {
      image: '😂',
      name: 'funny'
    }
    setReaction(funnyReaction)
  }

  function handleSubmit4() {
    const surprisedReaction = {
      image: '😲',
      name: 'surprised'
    }
    setReaction(surprisedReaction)
  }

  function handleSubmit5() {
    const sadReaction = {
      image: '😓',
      name: 'sad'
    }
    setReaction(sadReaction)
  }

  // POSTS REACTION TO DB
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.post(`/api/singlearticle/${id}/reaction`, reaction
      , {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    console.log(reaction)
  }, [reaction])

  // GETS ARTICLE BY ID
  useEffect(() => {
    axios.get(`/api/singlearticle/${id}`)
      .then(axiosResp => {
        setArticles(axiosResp.data)
        console.log('AXIOSRESP.DATA:', axiosResp.data)
      })
  }, [])

  return <>
    <section className="single-article-container">
      <div className="article-container">
        <div className="article-card">
          <h3>{articles.title}</h3>
          <h2>{articles.flag_image}</h2>
          <a href={articles.url} target='_blank' rel='noreferrer'>
            <img src={articles.urlToImage} />
          </a>
          <small>published at: {moment(articles.publishedAt).calendar()}</small>

          <p>{articles.content}</p>
        </div>

        <div className="single-article-buttons">
          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit1()
            setAngry('pink')
          }} style={{ background: `${colourAngry}` }}><big>😠</big></button>

          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit2()
            setHappy('pink')
          }} style={{ background: `${colourHappy}` }}> <big>😊</big></button>

          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit3()
            setFunny('pink')
          }} style={{ background: `${colourFunny}` }}><big>😂</big></button>

          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit4()
            setSurprised('pink')
          }} style={{ background: `${colourSurprised}` }}><big>😲</big></button>

          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit5()
            setSad('pink')
          }} style={{ background: `${colourSad}` }}><big>😓</big></button>
        </div>

        <h2>COMMENTS:</h2>
        <div className="comment-box">
          {articles.comments && articles.comments.map(comment => {
            return <div className="media-content" key={comment.id}>
              <div className="comment-content">
                <p>{comment.content}</p>
                <small>{moment(comment.created_at).calendar()}</small>
              </div>
            </div>
          })}
        </div>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Add a comment..."
                type="text"
                onChange={(event) => setComment(event.target.value)}
                value={comment}
              >
                {comment}
              </textarea>
            </p>
          </div>
          <button onClick={handleComment}>Submit</button>
        </div>
      </div>
    </section>
  </>
}

export default SingleArticle

