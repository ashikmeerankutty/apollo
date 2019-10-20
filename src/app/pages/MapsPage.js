import React, { Component } from "react";
import { Button, Icon, Row, Col, Tag, Input, Modal } from "antd";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import axios from "axios";
const { CheckableTag } = Tag;

const data = {
  routes: [
    { route: 1, geocode: { longitude: 77.700572, latitude: 12.861486 } },
    { route: 1, geocode: { longitude: 77.717875, latitude: 12.898849 } },
    { route: 2, geocode: { longitude: 77.610995, latitude: 12.97 } },
    { route: 2, geocode: { longitude: 77.6774, latitude: 12.892025 } },
    { route: 2, geocode: { longitude: 77.683376, latitude: 12.883959 } },
    { route: 2, geocode: { longitude: 77.623708, latitude: 12.938937 } },
    { route: 3, geocode: { longitude: 77.660475, latitude: 12.852426 } },
    { route: 3, geocode: { longitude: 77.581853, latitude: 12.890971 } },
    { route: 3, geocode: { longitude: 77.56029, latitude: 12.97021 } },
    { route: 3, geocode: { longitude: 77.56029, latitude: 12.97021 } },
    { route: 3, geocode: { longitude: 77.593123, latitude: 12.919038 } },
    { route: 4, geocode: { longitude: 77.659441, latitude: 12.840956 } },
    { route: 4, geocode: { longitude: 77.619258, latitude: 12.780224 } },
    { route: 5, geocode: { longitude: 77.713096, latitude: 12.796388 } },
    { route: 5, geocode: { longitude: 77.771219, latitude: 12.782565 } },
    { route: 6, geocode: { longitude: 77.700572, latitude: 12.861486 } },
    { route: 6, geocode: { longitude: 77.717875, latitude: 12.898849 } }
  ]
};

class MapsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 12.972442,
        longitude: 77.580643,
        zoom: 15.5,
        bearing: 0,
        pitch: 0,
      },
      roads: [],
      longitude: 77.6727,
      latitude:  12.8458,
      address: "PESU, Electronic City Campus",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      tags: [],
      users: [],
      selectedPerson: null,
      userTags: [],
      routes: data.routes,
      isModalVisible: false,
      colors: [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
        "#FF1A66",
        "#E6331A",
        "#33FFCC",
        "#66994D",
        "#B366CC",
        "#4D8000",
        "#B33300",
        "#CC80CC",
        "#66664D",
        "#991AFF",
        "#E666FF",
        "#4DB3FF",
        "#1AB399",
        "#E666B3",
        "#33991A",
        "#CC9999",
        "#B3B31A",
        "#00E680",
        "#4D8066",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#9900B3",
        "#E64D66",
        "#4DB380",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF"
      ]
    };
  }

  async componentDidMount() {
    try {
      await this.getTags();
      await this.getUsers();
      await this.fetchRoads();
    } catch (e) {
      console.log(e);
    }
  }

  getTags = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/tag`);
    this.setState({ tags: res.data.tags, userTags: res.data.tags });
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
  };

  fetchRoutes = async tags => {
    const data = {
      tags
    };
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate`,
        data
      );
      console.log(res.data.routes)
      // this.setState({routes:})
    } catch (e) {
      console.log(e);
    }
  };

  fetchRoads = () => {
    const arr = [];
    data.routes.map(async route => {
      let res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${route.geocode.latitude}&lon=${route.geocode.longitude}&highway=roads&zoom=16`
      );
      const data = {
        id: route.route,
        data: res.data
      };
      arr.push(data);
    });
    this.setState({ roads: arr });
  };

  // async componentDidUpdate() {
  //   if (this.state.routes.length === 0) {
  //     await this.fetchRoads();
  //   }
  // }

  // generateMarkers = () => {
  //   data.routes.map(async route => {
  //     try {
  //       // let res = await axios.get(
  //       //   // `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${route.geocode.latitude}&lon=${route.geocode.longitude}&highway=roads`
  //       // );
  //       // console.log(res)
  //       return (
  //         <Marker
  //           key={route.geocode.latitude + "route.route"}
  //           latitude={route.geocode.latitude}
  //           longitude={route.geocode.longitude}
  //           offsetLeft={-20}
  //           offsetTop={-10}
  //         >
  //           <button
  //             className="marker-btn"
  //             onClick={e => {
  //               e.preventDefault();
  //               console.log("...");
  //               this.setState({
  //                 selectedPerson: null
  //               });
  //             }}
  //           >
  //             <Icon
  //               type="environment"
  //               theme="filled"
  //               style={{
  //                 fontSize: "24px",
  //                 color: this.state.colors[route.route]
  //               }}
  //             />
  //           </button>
  //         </Marker>
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   });
  // };

  showModal = () => {
    this.setState({
      isModalVisible: true
    });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  handleOk = async () => {
    this.setState({
      confirmLoading: true
    });
    try {
      const data = {
        address: this.state.address,
        longitude: parseFloat(this.state.longitude),
        latitude: parseFloat(this.state.latitude),
        tags: this.state.userTags
      };
      console.log(data);
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate`,
        data
      );
      if (res.status === 200 || res.status === 204) {
        this.setState({
          confirmLoading: false,
          isModalVisible: false,
          userTags: []
        });
      }
    } catch (e) {
      this.setState({
        confirmLoading: false,
        isModalVisible: false,
        userTags: []
      });
    }
  };

  handleAddressChange = e => {
    this.setState({ address: e.target.value });
  };
  handleLatitudeChange = e => {
    this.setState({ latitude: e.target.value });
  };
  handleLongitudeChange = e => {
    this.setState({ longitude: e.target.value });
  };

  render() {
    const { viewport, mapStyle, users, tags, routes, colors } = this.state;

    return (
      <div>
        <Row style={{ background: "#fff", paddingLeft: 20, paddingBottom: 20 }}>
          <Col span={12} style={{ marginTop: 5 }}>
            {tags.map(tag => (
              <CheckableTag
                style={{ border: "1px solid" }}
                key={tag}
                checked={this.state.userTags.indexOf(tag) > -1}
                onChange={checked => this.handleUserTagsChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </Col>
          <Col span={1}>
            <Button type="primary" onClick={this.showModal}>
              Filter
            </Button>
          </Col>
        </Row>
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
          {this.state.roads.length > 0 &&  
            this.state.roads.map((road,index) => (
              <Marker
                key={index}
                latitude={parseFloat(road.data.lat)}
                longitude={parseFloat(road.data.lon)}
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
                    type="smile"
                    theme="filled"
                    style={{
                      fontSize: "24px",
                      color: this.state.colors[road.id+4]
                    }}
                  />
                </button>
              </Marker>
            ))}
        </ReactMapGL>
        <Modal
          title="Filter results"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={this.state.isModalVisible}
          confirmLoading={this.state.confirmLoading}
        >
          <Input
            style={{ marginBottom: 10 }}
            type="text"
            placeholder="Address"
            value={this.state.address}
            onChange={this.handleAddressChange}
          />
          <Input
            style={{ marginBottom: 10 }}
            type="text"
            placeholder="Latitude"
            value={this.state.latitude}
            onChange={this.handleLatitudeChange}
          />
          <Input
            style={{ marginBottom: 10 }}
            type="text"
            placeholder="Longitude"
            value={this.state.longitude}
            onChange={this.handleLongitudeChange}
          />
        </Modal>
      </div>
    );
  }
}

export default MapsPage;
