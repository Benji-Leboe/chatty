import React, { Component } from 'react';

function Navbar ({ userCount }) {

  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="user-count">Users online: { userCount }</p>
    </nav>
  )
}

export default Navbar;