import React from 'react'
import { Link } from 'react-router-dom'
import 'bulma'

const NavBar = () => {

  return <>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/">
          <a className="navbar-item">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZ8ZnY3ZKYhxS85b2ATGeeToxHWkECvpALnQ&usqp=CAU" width="90" height="90" /> */}
          FLAG</a>
        </Link>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">

          <Link to="/">
            <a className="navbar-item">
              Home
            </a>
          </Link>
          <Link to="/userpage">
            <a className="navbar-item">
            Profile
            </a>
          </Link>
          <Link to="/feed">
            <a className="navbar-item">
            Feed
            </a>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/register">
                <a className="button is-dark">
                  <strong>Sign up</strong>
                </a>
              </Link>
              <Link to="/login">
                <a className="button is-light">
                Log in
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </>

}

export default NavBar