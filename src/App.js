import React from 'react';
import Navbar from './Navbar';
import List from './List';

class App extends React.Component {
  state = {
    viewList: false
  };

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

  toggleList(event) {
    this.state.viewList
      ? this.setState({ viewList: false })
      : this.setState({ viewList: true });

    console.log(this.state.viewList);
  }

  render() {
    return (
      <div className="container">
        <Navbar toggleList={this.toggleList.bind(this)} />
        {this.state.viewList && <List />}
        <div id="map" />
      </div>
    );
  }
}

export default App;
