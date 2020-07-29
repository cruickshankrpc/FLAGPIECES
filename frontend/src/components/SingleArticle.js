import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
// import { Link } from 'react-router-dom'

const SingleArticle = (props) => {

  const id = props.match.params.id

  const [articles, setArticles] = useState({})

  // for comments:
  const [comment, setComment] = useState('')

  const [colourAngry, setAngry] = useState('pink')
  const [colourHappy, setHappy] = useState('pink')
  const [colourFunny, setFunny] = useState('pink')
  const [colourSurprised, setSurprised] = useState('pink')
  const [colourSad, setSad] = useState('pink')

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
      name: 'suprised'
    }
    setReaction(surprisedReaction)
  }

  function handleSubmit5() {
    const sadReaction = {
      image: '😲',
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
        // console.log('AXIOSRESP.DATA:', axiosResp.data)
      })
  }, [])

  return <>
    <section className="single-article-container">
      <div className="single-article-card">
        <h3>{articles.title}</h3>
        <h2>{articles.flag_image}</h2>
        <a href={articles.url} target='_blank' rel='noreferrer'> {articles.url} </a>
        <img src={articles.urlToImage} />
        <p>{moment(articles.publishedAt).calendar()}</p>
        <p>{articles.content}</p>

        <div className="single-article-buttons">
          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit1()
            setAngry('lime')
          }} style={{ background: `${colourAngry}` }}><big>😠</big></button>

          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit2()
            setHappy('lime')
          }} style={{ background: `${colourHappy}` }}> <big>😊</big></button>

          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit3()
            setFunny('lime')
          }} style={{ background: `${colourFunny}` }}><big>😂</big></button>

          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit4()
            setSurprised('lime')
          }} style={{ background: `${colourSurprised}` }}><big>😲</big></button>

          <button onClick={(event) => {
            event.preventDefault()
            handleSubmit5()
            setSad('lime')
          }} style={{ background: `${colourSad}` }}><big>😓</big></button>
        </div>

        <div>
          <h2>COMMENTS:</h2>
          {articles.comments && articles.comments.map(comment => {
            return <div className="media-content" key={comment.id}>
              <div className="content">
                <p>{comment.content}</p>
                <p>{moment(comment.created_at).calendar()}</p>
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
                onChange={(event) => setComment(event.target.value)}
                value={comment}
              >
                {comment}
              </textarea>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <button onClick={handleComment} className="button is-info">Submit</button>
              </div>
            </div>
          </nav>
        </div>


      </div>
    </section>
  </>
}

export default SingleArticle

