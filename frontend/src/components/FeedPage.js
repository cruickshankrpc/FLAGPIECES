import React, { useEffect } from 'react'
import axios from 'axios'

const FeedPage = () => {

  useEffect(() => {
    axios.get('/api/articles')
      .then(axiosResp => {
        setArticles(axiosResp.data.articles)
      })
  }, [])

  return <h1>Hallo</h1>

}

export default FeedPage