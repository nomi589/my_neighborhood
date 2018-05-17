import React from 'react';

const placesOfInterest = [
  {
    name: 'Sheesh Mahal',
    lat: 31.590029,
    lng: 74.313102
  },
  {
    name: 'Shrine of Baba Ghulam',
    lat: 31.591354,
    lng: 74.315859
  },
  {
    name: 'Badshahi Mosque',
    lat: 31.588334,
    lng: 74.310753
  },
  {
    name: 'Lahore Fort',
    lat: 31.588151,
    lng: 74.315109
  },
  {
    name: 'Haveli Maharani Jindan',
    lat: 31.589239,
    lng: 74.313714
  }
];

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
