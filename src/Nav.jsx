import React, { Component } from 'react';

function Navbar (props) {

  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="user-count">Users online: {props.userCount}</p>
    </nav>
  )
}

export default Navbar;