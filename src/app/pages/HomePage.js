import React, { Component } from "react";
import { Row, Col, Modal, Empty, Button } from "antd";
import styled from "styled-components";
import { Input } from "antd";

const StyledHome = styled.div`
  .tags__cont {
    padding-top: 20px;
  }
  .tags__holder {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .users__cont {
    padding-top: 20px;
  }
  .users__holder {
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTagsModalVisible: false,
      isUsersModalVisible: false,
      testTags:"hello"
    };
  }

  showTagsModal = () => {
    this.setState({
      isTagsModalVisible: true
    });
  };

  handleTagsOk = e => {
    console.log(e);
    this.setState({
      isTagsModalVisible: false
    });
  };

  handleUsersOk = e => {
    this.setState({
      isUsersModalVisible: false
    });
  };

  handleTagsCancel = e => {
    this.setState({
      isTagsModalVisible: false
    });
  };

  handleUsersCancel = e => {
    this.setState({
      isUsersModalVisible: false
    });
  };

  showUsersModal = () => {
    this.setState({
      isUsersModalVisible: true
    });
  };

  render() {
    return (
      <StyledHome>
        <Row className="tags__cont" align="right">
          <Col span={8}>
            <h3>Tags</h3>
          </Col>
          <Col span={8} offset={8}>
            <Button type="primary" onClick={this.showTagsModal}>
              Add Tags
            </Button>
          </Col>
        </Row>
        <Row className="tags__holder">
          <Empty />
        </Row>
        <Row className="users__cont">
          <Col span={8}>
            <h3>Users</h3>
          </Col>
          <Col span={8} offset={8}>
            <Button type="primary" onClick={this.showUsersModal}>
              Add Users
            </Button>
          </Col>
        </Row>
        <Row className="users__holder">
          <Empty />
        </Row>

        <Modal
          title="Add Tags"
          onOk={this.handleTagsOk}
          onCancel={this.handleTagsCancel}
          visible={this.state.isTagsModalVisible}
        >
          <Input type="text" placeholder="Tag Name" onChange={this.handleChange}></Input>
        </Modal>

        <Modal
          title="Add Users"
          onOk={this.handleUsersOk}
          onCancel={this.handleUsersCancel}
          visible={this.state.isUsersModalVisible}
        >
          <p>add users ....</p>
        </Modal>
      </StyledHome>
    );
  }
}

export default HomePage;
