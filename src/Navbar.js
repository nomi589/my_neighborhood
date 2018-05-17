import React from 'react';

function Navbar(props) {
  return (
    <nav>
      <button onClick={event => props.toggleList(event)}>Filter</button>
    </nav>
  );
}

export default Navbar;
