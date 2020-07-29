import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'



const SingleArticle = (props) => {

  const [articles, setArticles] = useState({})

  const [colourAngry, setAngry] = useState('pink')
  const [colourHappy, setHappy] = useState('pink')
  const [colourFunny, setFunny] = useState('pink')
  const [colourSurprised, setSurprised] = useState('pink')
  const [colourSad, setSad] = useState('pink')

  // When  the state of a reaction changes call a useEffect

  const [reaction, setReaction] = useState({
    image: '',
    name: ''
  }
  )

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


  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.post(`/api/singlearticle/${props.match.params.id}/reaction`, reaction
      , {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    console.log(reaction)
    // .then((res) => props.history.push(`/singlearticle/${res.data.id}`))
  }, [reaction])

  useEffect(() => {
    axios.get(`/api/singlearticle/${props.match.params.id}`)
      .then(axiosResp => {
        setArticles(axiosResp.data)
        // console.log('AXIOSRESP.DATA:', axiosResp.data)
      })
  }, [])

  return <section className="single-article-container">
    <div className="single-article-card">
      <h3>{articles.title}</h3>
      <h2>{articles.flag_image}</h2>
      <a href={articles.url} target='_blank' rel='noreferrer'> {articles.url} </a>
      <img src={articles.urlToImage} />
      <p>{articles.publishedAt}</p>
      <p>{articles.content}</p>


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
  </section>
}

export default SingleArticle

