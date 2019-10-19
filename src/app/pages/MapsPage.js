import React, { Component } from "react";
import { Button, Icon } from "antd";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import axios from "axios";

class MapsPage extends Component {
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
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      tags: [],
      users: [],
      selectedPerson: null
    };
  }

  async componentDidMount() {
    try {
      await this.getTags();
      await this.getUsers();
    } catch (e) {
      console.log(e);
    }
  }

  getTags = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/tag`);
    this.setState({ tags: res.data.tags });
  };

  getUsers = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
    this.setState({ users: res.data.users });
  };

  _onViewportChange = viewport => this.setState({ viewport });

  _onStyleChange = mapStyle => this.setState({ mapStyle });

  render() {
    const { viewport, mapStyle, users, tags } = this.state;

    return (
      <div>
        <div>
          {tags.map(tag => (
            <Button key={tag}>{tag}</Button>
          ))}
        </div>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="500px"
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
          <Marker
            latitude={12.972442}
            longitude={77.580643}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <Button onClick={(e)=>{
              e.preventDefault()
              this.setState({
                selectedPerson : null
              })
            }}>
              <Icon
                type="environment"
                theme="filled"
                style={{ fontSize: "24px", color: "purple" }}
              />
            </Button>
          </Marker>
          {/* {selectedPerson ? (Popup)} */}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapsPage;
