import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'



const SingleArticle = (props) => {
  useEffect(() => {
    axios.get(`/api/singlearticle/${props.match.params.id}`)
      .then(axiosResp => {
        console.log(axiosResp.data)
      })
  }, [])
  return <h1>SingleArticle</h1>
}
export default SingleArticle

