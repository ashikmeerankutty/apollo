import React, { Component } from "react";
import { Row, Col, Avatar } from "antd";
import styled from "styled-components";
import axios from "axios";

const StyledAccount = styled.div`
  background: #fff;
  min-height: 50vh;
  margin: 24px 100px;
  padding: 24px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      college: {
        longitude: 77.6727,
        latitude: 12.8458,
        address: "PESU, Electronic City Campus"
      },
      user: null,
      eta: ""
    };
  }

  async componentDidMount() {
    await this.getUsers();
    await this.getETA();
  }

  getUsers = async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
    this.setState({ user: res.data.users[0] });
  };

  getETA = async () => {
    const data = {
      current_longitude: this.state.college.longitude,
      current_latitude: this.state.college.latitude,
      destination_longitude: this.state.user.longitude,
      destination_latitude: this.state.user.latitude
    };
    let res = await axios.post(`${process.env.REACT_APP_API_URL}/eta`, data);
    console.log(res);
    this.setState({ eta: res.data.eta });
  };


  render() {
    const { user, eta, college } = this.state;
    return (
      <StyledAccount>
        {user && (
          <div>
            <Row>
              <Col offset={1} span={23}>
                <h2>Account</h2>
              </Col>
            </Row>
            <Row>
              <Col span={7} offset={1}>
                <h3>{user.name}</h3>
                <p>{user.address}</p>
              </Col>
              <Col span={4} offset={10}>
                <Avatar size={150} icon="user" />
              </Col>
            </Row>
            <Row>
              <Row>
                <Col offset={1} span={12}>
                  <h3>Status</h3>
                  <p>
                    ETA from <strong>{college.address}</strong> to{" "}
                    <strong>{user.address}</strong> is{" "}
                    <strong> {(eta / 60).toFixed(2)} minutes </strong>
                  </p>
                </Col>
              </Row>
            </Row>
          </div>
        )}
      </StyledAccount>
    );
  }
}

export default AccountPage;
