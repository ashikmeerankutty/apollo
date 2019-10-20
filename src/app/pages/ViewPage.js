import React, { Component } from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";

const viewState = {
  latitude: 12.972442,
  longitude: 77.580643,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 12.972442,
        longitude: 77.580643,
        zoom: 15.5,
        bearing: 0,
        pitch: 0
      },
      mapStyle: "mapbox://styles/mapbox/streets-v11"
    };
  }
  componentDidMount() {
    const coordinates = this.props.location.state.routes[1];
    console.log(coordinates);
    const map = this.reactMap.getMap();
    map.on("load", function() {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [77.678157, 12.8917317],
                [77.7175497248303, 12.8977412477265],
                [77.7003903807771, 12.859687465195]
              ]
            }
          }
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#888",
          "line-width": 8
        }
      });
    });
  }
  render() {
    const { viewport, mapStyle } = this.state;
    return (
      <ReactMapGL
        ref={reactMap => (this.reactMap = reactMap)}
        {...viewport}
        width="100%"
        height="90vh"
        mapStyle={mapStyle}
        onViewportChange={viewport => {
          this.setState({ viewport });
        }}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_KEY}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
    );
  }
}

export default ViewPage;
