import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

const Nav = props => {
  return (
    <nav className="navbar">
        <div className="navLink">{props.validAuth ? <a onClick={e => props.onLogout(e)} href="/">Logout</a> : <Link to="/auth">Login</Link> }</div>
        <div className="navLink"><Link to="/about">About</Link></div>
        {
          props.validAuth ?
          <>
          <div className="navLink"><Link to="/homework">Homework</Link></div>
          <div className="navLink"><Link to="/exercises">Exercises</Link></div>
          <div className="navLink"><Link to="/reading">Reading</Link></div>
          </>
          : null
        }
    </nav>
  )
}

export default Nav;
