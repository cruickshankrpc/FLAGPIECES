import React, { useState, useEffect } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import axios from 'axios'
import CountryArticles from './CountryArticles'

const HomePage = () => {

  return <HashRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route exact path="/countryarticles" component={CountryArticles} />
      
    </Switch>
  </HashRouter>



}

export default HomePage 