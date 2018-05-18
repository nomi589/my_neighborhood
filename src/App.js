import React from 'react';
import Navbar from './Navbar';
import List from './List';
import Map from './Map';

const placesOfInterest = [
  {
    name: 'Sheesh Mahal',
    position: {
      lat: 31.590029,
      lng: 74.313102
    }
  },
  {
    name: 'Shrine of Baba Ghulam',
    position: {
      lat: 31.591354,
      lng: 74.315859
    }
  },
  {
    name: 'Badshahi Mosque',
    position: {
      lat: 31.588334,
      lng: 74.310753
    }
  },
  {
    name: 'Lahore Fort',
    position: {
      lat: 31.588151,
      lng: 74.315109
    }
  },
  {
    name: 'Haveli Maharani Jindan',
    position: {
      lat: 31.589239,
      lng: 74.313714
    }
  }
];

class App extends React.Component {
  state = {
    viewList: false
  };

  componentDidMount() {
    this.initializeMap();
  }

  initializeMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 31.588185, lng: 74.312794 },
      zoom: 16
    });

    this.placeMarkers(placesOfInterest, map);
    this.setState({ map });
  }

  clearCurrentMarkers() {
    if (this.state.markers) {
      this.state.markers.forEach(marker => {
        marker.setMap(null);
      });
    }
  }

  placeMarkers(locations, map = this.state.map) {
    let markers = [];

    this.clearCurrentMarkers();

    locations.forEach(location => {
      markers.push(
        new window.google.maps.Marker({
          position: location.position,
          map: map
        })
      );
    });

    this.setState({ markers });
  }

  toggleList(event) {
    this.state.viewList
      ? this.setState({ viewList: false })
      : this.setState({ viewList: true });
  }

  render() {
    return (
      <div className="container">
        <Navbar toggleList={this.toggleList.bind(this)} />
        {this.state.viewList && <List locations={placesOfInterest} />}
        <Map />
      </div>
    );
  }
}

export default App;
