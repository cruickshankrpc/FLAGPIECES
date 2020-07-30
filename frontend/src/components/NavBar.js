import React from 'react'
import { Link } from 'react-router-dom'
import 'bulma'

const NavBar = () => {

  const [isActive, setisActive] = React.useState(false)


  return <>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/">
          <a className="navbar-item">
            <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/triangular-flag-on-post_1f6a9.png" width="30" height="80" />
          </a>
        </Link>

        <a
          onClick={() => {
            setisActive(!isActive)
          }}

          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu" aria-expanded="false"
          data-target="navbarBasicExample">


          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
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