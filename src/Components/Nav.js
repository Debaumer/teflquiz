import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import {Transition} from 'react-transition-group';


const Nav = props => {
  console.log(props.showNavBar);
  const duration = 300;

  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateX(0px)',
  }

  const transitionStyles = {
    entering:{ transform: 'translateX(0px)'},
    entered: { transform: 'translateX(0px)'},
    exiting: { transform: 'translateX(0px)'},
    exited:  { transform: 'translateX(-115px)'},
  };

  return (
    <Transition
      in={props.showNavBar}
      timeout={duration}
    >
      {state => (
        <nav
          id="navbar"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
          >
          {props.validAuth ? <a onClick={e => props.onLogout(e)} className="navLink" href="/">Logout</a> : <Link to="/auth" className="navLink">Login</Link> }
          <Link to="/about" className="navLink">About</Link>
          {
            props.validAuth ?
            <>
            <Link to="/homework" className="navLink">Homework</Link>
            <Link to="/exercises" className="navLink">Exercises</Link>
            <Link to="/reading" className="navLink">Reading</Link>
            </>
            : null
          }
          <button
            id="drawerToggle"
            onClick={props.toggleNavBar}
          >
            <span id="drawerToggleArrow">{props.showNavBar ? '>' : '<'}</span>
          </button>
      </nav>)}
    </Transition>
  )
}

export default Nav;
