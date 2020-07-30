import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

// pass country into countryarticles

const CountryArticles = (props) => {
  // country articles page: 
  const API_KEY = process.env.NEWS_API_KEY

  // process.env.NEWS_KEY
  const [articles, setArticles] = useState([])
  // const [country, setCountry] = useState(props.match.params.country)

  const country = props.match.params.country

  // console.log('PROPS:', props.match.params.country)

  //  inside onclick, sets the flag_image value  countryEmojiMap[country]
  function handleSubmit(item) {
    const countryEmojiMap = {
      america: '🇺🇸',
      uk: '🇬🇧',
      russia: '🇷🇺',
      egypt: '🇪🇬',
      china: '🇨🇳',
      'united arab emirates': '🇦🇪',
      brazil: '🇧🇷',
      'united kingdom': '🇬🇧',
      mexico: '🇲🇽',
      ukraine: '🇺🇦',
      japan: '🇯🇵',
      nigeria: '🇳🇬',
      canada: '🇨🇦',
      ghana: '🇬🇭',
      india: '🇮🇳',
      argentina: '🇦🇷',
      malyaysia: '🇲🇾',
      sweden: '🇸🇪',
      'New zealand': '🇳🇿',
      kazakhsta: '🇰🇿'
    }
    const newItem = { ...item, flag_image: countryEmojiMap[country] }
    delete newItem['author']
    delete newItem['description']
    delete newItem['source']
    // console.log(newItem)
    const token = localStorage.getItem('token')
    axios.post('/api/countryarticles/article', newItem
      , {
        headers: { Authorization: `Bearer ${token}` }
      }

    ).then((res) => props.history.push(`/singlearticle/${res.data.id}`))
  }


  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?q=${country}&language=en&apiKey=${API_KEY}`)
      .then(axiosResp => {
        setArticles(axiosResp.data.articles)
      })
  }, [country])

  return <>
    <section className="country-articles-container">
      <div className="article-container">
        {articles.map((item, index) => {
          return <div key={index} className="article-card">
            <h3>{item.title}</h3>
            <h2>{item.flag_image}</h2>
            <a href={item.url} target='_blank' rel='noreferrer'>
              <img src={item.urlToImage} />
            </a>
            <small>published at: {moment(item.publishedAt).calendar()}</small>
            <p>{item.content}</p>
            <button onClick={(event) => {
              event.preventDefault()
              handleSubmit(item)
            }}>READ</button>
          </div>
        })}
      </div>
    </section>
  </>

  // button for each article; post


  // copy the country name
  // dictionary of country name and flags
  // make country -> flag (to later add the field to article model)
  // render the flag on the page
  // Save the information in fields tha  are the same name as our api model
  // post the relevant information to the backend route
  // The information would be a single article only
  // '/api/countryarticles/article'

  // Also for the page to change to the SingleArticle Page
  // And get the single article on that page

}

export default CountryArticles