import React, { useEffect } from 'react'
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


// const Coffees = () => {
//   const [article, getArticleData] = useState([])

// 

//   return <section className="country-articles-container">
//     <div>
//         return <div className="article-card">
//         <h3>{title}</h3>
//         <p>{name}</p>
//         <p>{author}</p>
//         <p>{description}</p>
//         <a href={url} target='_blank' rel='noreferrer'> {url} </a>
//         <img src={urlToImage} />
//         <p>{publishedAt}</p>
//         <p>{content}</p>
//         <p>{content}</p>
//       </div>
//     </div>
//   </section>

// }
