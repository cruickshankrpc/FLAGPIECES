import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import './style.scss'

import HomePage from './components/HomePage'
// import NavBar from './components/NavBar'
import Register from './components/Register'
import Login from './components/Login'
import CountryArticles from './components/CountryArticles'
import SingleArticle from './components/SingleArticle'
import UserPage from './components/UserPage'
import FeedPage from './components/FeedPage'

const App = () => {

  return <HashRouter>
    {/* <NavBar /> */}
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/countryarticles/:country" component={CountryArticles} />
      <Route path="/singlearticle/:id" component={SingleArticle} />
      <Route path="/userpage" component={UserPage} />
      <Route path="/feed" component={FeedPage} />
    </Switch>
  </HashRouter>


}

export default App 
