import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Trackers</Link>
    <Link to="/add">Add</Link>
    <Link to="/stats">Stats</Link>
  </header>
);

export default Header;
