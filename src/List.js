import React from 'react';

class List extends React.Component {
  render() {
    return (
      <section className="list">
        <ul>
          {this.props.locations.map((place, index) => {
            return <li key={index}>{place.name}</li>;
          })}
        </ul>
      </section>
    );
  }
}

export default List;
