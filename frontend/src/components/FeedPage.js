import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'





// function handleSort(event) {
//   console.log(filterReactions)
//   console.log(event.target.value)
//   const data = filterReviews.filter()
//   if (event.target.value === 'angry') {
//     const angry = data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
//     setFilterReaction(angry)
//   } if (event.target.value === 'most-recent') {
//     const recent = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
//     setFilterReaction(recent)
//   } if (event.target.value === 'lowToHigh') {
//     const low = data.sort((a, b) => a.rating - b.rating)
//     setFilterReaction(low)
//   } if (event.target.value === 'highToLow') {
//     const high = data.sort((a, b) => b.rating - a.rating)
//     setFilterReaction(high)
//   }
// }




const FeedPage = () => {

  const [articles, setArticles] = useState([])
  // const [reaction, setReaction] = useState([])

  const reaction = 'sad'

  const newArticles = articles.filter((article) => {
    return article.reactions.map((item, index) => {
      return item.name
    })
      .includes(reaction)
  })
  console.log('NEWARTICLE:', newArticles)

  // function handleSort() {
  //   console.log('THIS IS A TEST')

  // }

  // var menu = document.getElementById('change_reaction')
  // menu.addEventListener('change', reactionChange)

  // function reactionChange() {
  //   if (menu.value === 'angry') {
  //     alert(1)
  //   } else if (menu.value === 'happy') {
  //     alert(2)
  //   } else if (menu.value === 'surprised') {
  //     alert(3)
  //   } else if (menu.value === 'surprised') {
  //     alert(4)
  //   } else if (menu.value === 'surprised') {
  //     alert(5)
  //   }
  // }

  useEffect(() => {
    axios.get('/api/feed')
      .then(axiosResp => {
        setArticles(axiosResp.data)
        // setFilterReactions()
        console.log('RESPONSE:', axiosResp.data)
      })
  }, [])


  return <>
    <section className="feed-container">

      <nav className="feed-sort">

        <select className="feed-select-bar"
        // onChange={handleSort}
        // id="change_reaction"
        >

          <option value="" selected disabled hidden>  Filter Reaction 😠 😊 😲 😓 😂  </option>
          <option value="angry" className="reviewsPageOption">😠</option>
          <option value="happy" className="reviewsPageOption">😊</option>
          <option value="surprised" className="reviewsPageOption">😲</option>
          <option value="sad" className="reviewsPageOption">😓</option>
          <option value="funny" className="reviewsPageOption">😂</option>
        </select>
      </nav>

      <div className="feed-article-container">
        {newArticles.map((item, index) => {
          return <div key={index} className="article-card">
            <h3>{item.title}</h3>
            <h2>{item.flag_image}</h2>
            <a href={item.url} target='_blank' rel='noreferrer'> {articles.url} </a>
            <img src={item.urlToImage} />
            <p>{moment(item.publishedAt).calendar()}</p>
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
  </>

}

export default FeedPage