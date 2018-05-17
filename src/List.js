import React from 'react';

class List extends React.Component {
  render() {
    return (
      <section className="list">
        <ul>{[<li>Place # 1</li>, <li>Place # 2</li>]}</ul>
      </section>
    );
  }
}

export default List;
