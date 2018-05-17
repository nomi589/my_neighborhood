import React, { Component } from 'react';

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({
      map: this.initialMap()
    });
  }

  initialMap() {
    return new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 31.588185, lng: 74.312794 },
      zoom: 16
    });
  }

  render() {
    return <div id="map" />;
  }
}

export default App;
