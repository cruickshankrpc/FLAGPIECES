import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Login from './components/Login'
import CountryArticles from './components/CountryArticles'
import SingleArticle from './components/SingleArticle'

const App = () => {

  return <HashRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/countryarticles" component={CountryArticles} />
      <Route path="/singlearticle" component={SingleArticle} />
    </Switch>
  </HashRouter>


}

export default App 
