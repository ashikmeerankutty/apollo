import React, { Component } from "react";
import { Button, Icon, Row, Col, Tag } from "antd";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import axios from "axios";
const { CheckableTag } = Tag;


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
      selectedPerson: null,
      userTags: []
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

  handleUserTagsChange = async (tag, checked) => {
    const { userTags } = this.state;
    const nextSelectedTags = checked
      ? [...userTags, tag]
      : userTags.filter(t => t !== tag);
    this.setState({ userTags: nextSelectedTags });
    try {
      await this.fetchRoutes(nextSelectedTags);
    } catch (e) {
      console.log(e);
    }
  };

  fetchRoutes = async (tags) => {
    const data = {
        tags
    }
    console.log(data)
    try {
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/generate`,data);
      console.log(res);
    }
    catch(e){
      console.log(e)
    }
  };

  render() {
    const { viewport, mapStyle, users, tags } = this.state;

    return (
      <div>
        <div
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            paddingBottom: 20
          }}
        >
          {tags.map(tag => (
            <CheckableTag
              key={tag}
              checked={this.state.userTags.indexOf(tag) > -1}
              onChange={checked => this.handleUserTagsChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </div>
        <ReactMapGL
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
          <Marker
            latitude={12.972442}
            longitude={77.580643}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                console.log("...");
                this.setState({
                  selectedPerson: null
                });
              }}
            >
              <Icon
                type="environment"
                theme="filled"
                style={{ fontSize: "24px", color: "purple" }}
              />
            </button>
          </Marker>
          {/* {selectedPerson ? (Popup)} */}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapsPage;
