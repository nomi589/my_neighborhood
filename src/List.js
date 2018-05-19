import React from 'react';

class List extends React.Component {
  state = {
    query: ''
  };

  updateQuery(value) {
    this.setState({ query: value });
    this.props.updateLocations(value);
  }

  componentWillUnmount() {
    this.props.updateLocations('');
  }

  render() {
    return (
      <section className="list">
        <section className="query-form">
          <input
            type="text"
            onChange={event => this.updateQuery(event.target.value)}
            placeholder="Type here to filter locations below..."
            value={this.state.query}
          />
        </section>
        <ul>
          {this.props.locations.map((place, index) => {
            return (
              <li
                key={index}
                tabIndex="0"
                role="link"
                onClick={() => this.props.locationClickHandler(place.position)}
              >
                {place.name}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default List;
