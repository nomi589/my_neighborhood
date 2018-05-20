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

let intervalId;

/**
 * Helper functions
 */
let setPrecision = (number, precision) => {
  return parseFloat(number.toFixed(precision));
};

let findMarker = (position, listOfMarkers) => {
  return listOfMarkers.filter(marker => {
    let markerLatLng = marker.getPosition();
    return (
      position.lat === setPrecision(markerLatLng.lat(), 6) &&
      position.lng === setPrecision(markerLatLng.lng(), 6)
    );
  })[0];
};

let animateMarker = marker => {
  marker.setAnimation(window.google.maps.Animation.BOUNCE);
  setTimeout(
    () => {
      marker.setAnimation(null);
    },
    500,
    marker
  );
};

let infoWindowContent = (marker, text) => {
  let content = text ? text : 'Loading more content...';
  return `<h3>${marker.getTitle()}</h3><p>${content}</p><p>(Attribution: Wikipedia API)</p>`;
};

class App extends React.Component {
  state = {
    googleMapsLoaded: false,
    viewList: false,
    locations: placesOfInterest
  };

  componentDidMount() {
    if (this.state.googleMapsLoaded) {
      this.initializeMap();
      this.initializeInfoWindow();
    } else {
      intervalId = setInterval(this.checkGoogleMapsLoadedStatus, 1000, this);
    }
  }

  checkGoogleMapsLoadedStatus() {
    let app = arguments[0];
    if (typeof window.google === 'object') {
      clearInterval(intervalId);
      app.setState({ googleMapsLoaded: true });
      app.initializeMap();
      app.initializeInfoWindow();
    } else {
      console.log('Google maps not loaded');
    }
  }

  initializeMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 31.588563, lng: 74.308521 },
      zoom: 16
    });

    this.updateMarkers(placesOfInterest, map);
    this.setState({ map });
  }

  initializeInfoWindow() {
    let infoWindow = new window.google.maps.InfoWindow({
      content: 'Loading content...',
      maxWidth: 300
    });

    this.setState({ infoWindow });
  }

  updateLocations(query) {
    let displayedLocations;

    if (query) {
      const match = new RegExp(query, 'i');
      displayedLocations = placesOfInterest.filter(location =>
        match.test(location.name)
      );

      this.updateMarkers(displayedLocations);
      this.setState({ locations: displayedLocations });
    } else {
      this.updateMarkers(placesOfInterest);
      this.setState({ locations: placesOfInterest });
    }
  }

  clearCurrentMarkers() {
    if (this.state.markers) {
      this.state.markers.forEach(marker => {
        marker.setMap(null);
      });
    }
  }

  updateMarkers(locations, map = this.state.map) {
    let markers = [];

    this.clearCurrentMarkers();

    locations.forEach(location => {
      let marker = new window.google.maps.Marker({
        position: location.position,
        map: map,
        title: location.name
      });
      marker.addListener('click', event => {
        const position = {
          lat: setPrecision(event.latLng.lat(), 6),
          lng: setPrecision(event.latLng.lng(), 6)
        };
        this.locationClickHandler(position);
      });

      markers.push(marker);
    });

    this.setState({ markers });
  }

  updateInfoWindowContent(marker) {
    let api_request_url = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro=&explaintext=&titles=${marker.getTitle()}`;

    fetch(api_request_url)
      .then(response => response.json())
      .then(data => {
        let firstPage = data.query.pages[Object.keys(data.query.pages)[0]];
        let content = firstPage.extract
          ? firstPage.extract
          : 'No additional information could be found about this location.';

        this.setState(prevState => {
          let infoWindow = prevState.infoWindow;
          infoWindow.setContent(infoWindowContent(marker, content));
          return { infoWindow };
        });
      })
      .catch(error =>
        this.state.infoWindow.setContent(
          infoWindowContent(
            marker,
            `Couldn't fetch additional information. Are you having internet connection issues by any chance?`
          )
        )
      );
  }

  locationClickHandler(position) {
    let marker = findMarker(position, this.state.markers);

    if (marker) {
      animateMarker(marker);

      this.setState(prevState => {
        let infoWindow = prevState.infoWindow;
        infoWindow.setContent(infoWindowContent(marker));
        infoWindow.open(this.state.map, marker);

        return { infoWindow };
      });

      this.updateInfoWindowContent(marker);
    } else {
      console.log('Error: Marker not found.');
    }
  }

  toggleList(event) {
    this.state.viewList
      ? this.setState({ viewList: false })
      : this.setState({ viewList: true });
  }

  render() {
    return (
      <div className="container">
        <Navbar
          googleMapsLoaded={this.state.googleMapsLoaded}
          toggleList={this.toggleList.bind(this)}
        />
        {this.state.viewList && (
          <List
            locations={this.state.locations}
            updateLocations={this.updateLocations.bind(this)}
            locationClickHandler={this.locationClickHandler.bind(this)}
          />
        )}
        <Map googleMapsLoaded={this.state.googleMapsLoaded} />
      </div>
    );
  }
}

export default App;
