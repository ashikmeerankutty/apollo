import React, { Component } from "react";
import {
  Row,
  Col,
  Modal,
  Empty,
  Button,
  Card,
  Tag,
  Input,
} from "antd";
import axios from "axios";
import styled from "styled-components";
const { CheckableTag } = Tag;

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
      confirmLoading: false,
      tagName: "",
      tags: [],
      users: [],
      userName: "",
      userId: "",
      address: "",
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

  showTagsModal = () => {
    this.setState({
      isTagsModalVisible: true
    });
  };

  handleTagsOk = async e => {
    this.setState({
      confirmLoading: true
    });
    try {
      const data = {
        tag: this.state.tagName
      };
      console.log(data);
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/tag`, data);
      if (res.status === 200) {
        this.setState({
          confirmLoading: false,
          isTagsModalVisible: false
        });
      }
    } catch (e) {
      this.setState({
        confirmLoading: false,
        isTagsModalVisible: false
      });
    }
  };

  handleUsersOk = async () => {
    this.setState({
      confirmLoading: true
    });
    try {
      const data = {
        name: this.state.userName,
        id: this.state.userId,
        tags: this.state.userTags,
        address: this.state.address
      };
      console.log(data);
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/user`, data);
      if (res.status === 200) {
        this.setState({
          confirmLoading: false,
          isUsersModalVisible: false,
          userName: "",
          userId: "",
          userTags: []
        });
      }
    } catch (e) {
      this.setState({
        confirmLoading: false,
        isUsersModalVisible: false,
        userName: "",
        userId: "",
        userTags: []
      });
    }
  };

  handleTagsCancel = e => {
    this.setState({
      isTagsModalVisible: false
    });
  };

  handleUsersCancel = e => {
    this.setState({
      isUsersModalVisible: false,
      userName: "",
      userId: "",
      userTags: []
    });
  };

  showUsersModal = () => {
    this.setState({
      isUsersModalVisible: true
    });
  };

  // handle tags

  handleTagsNameChange = e => {
    this.setState({ tagName: e.target.value });
  };

  deleteTag = async tag => {
    try {
      const data = {
        tag: tag.tag
      };
      console.log(data);
      let res = await axios.delete(`${process.env.REACT_APP_API_URL}/tag`, data);
      if (res.status === 200) {
        await this.getTags();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // handle users

  handleUserNameChange = e => {
    this.setState({ userName: e.target.value });
  };

  handleUserAddressChange = e => {
    this.setState({ address: e.target.value });
  };

  handleUserIDChange = e => {
    this.setState({ userId: e.target.value });
  };

  handleUserTagsChange = (tag, checked) => {
    const { userTags } = this.state;
    const nextSelectedTags = checked
      ? [...userTags, tag]
      : userTags.filter(t => t !== tag);
    this.setState({ userTags: nextSelectedTags });
  };

  deleteUser = async id => {
    try {
      const data = {
        id: id
      };
      console.log(data);
      let res = await axios.delete(`${process.env.REACT_APP_API_URL}/user`, data);
      if (res.status === 200) {
        await this.getUsers();
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <StyledHome>
        <Row className="tags__cont">
          <Col span={8}>
            <h3>Tags</h3>
          </Col>
          <Col span={8} offset={8}>
            <Button type="primary" onClick={this.showTagsModal}>
              Add Tags
            </Button>
          </Col>
        </Row>
        <div className="tags__holder">
          {this.state.tags.length === 0 ? (
            <Empty />
          ) : (
            this.state.tags.map(tag => (
              <Tag key={tag} closable onClose={() => this.deleteTag({ tag })}>
                {tag}
              </Tag>
            ))
          )}
        </div>
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
          {this.state.users.length === 0 ? (
            <Empty />
          ) : (
            this.state.users.map(user => (
              <Col key={user.id} span={6} title="Tag">
                <Card title={user.name}>
                  <Row>
                    <Col>
                      <h4>Address</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>{user.address}</p>
                    </Col>
                  </Row>
                  <h4>Tags</h4>
                  <div>
                    {user.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <Button
                    style={{ marginTop: 20 }}
                    type="danger"
                    onClick={() => {
                      this.deleteUser(user.id);
                    }}
                  >
                    Delete
                  </Button>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <Modal
          title="Add Tags"
          onOk={this.handleTagsOk}
          onCancel={this.handleTagsCancel}
          visible={this.state.isTagsModalVisible}
          confirmLoading={this.state.confirmLoading}
        >
          <Input
            type="text"
            placeholder="Tag Name"
            onChange={this.handleTagsNameChange}
          ></Input>
        </Modal>

        <Modal
          title="Add Users"
          onOk={this.handleUsersOk}
          onCancel={this.handleUsersCancel}
          visible={this.state.isUsersModalVisible}
          confirmLoading={this.state.confirmLoading}
        >
          <Input
            style={{ marginBottom: 10 }}
            type="text"
            placeholder="User Name"
            onChange={this.handleUserNameChange}
          />
          <Input
            style={{ marginBottom: 10 }}
            type="text"
            placeholder="User ID"
            onChange={this.handleUserIDChange}
          />
          <Input
            style={{ marginBottom: 10 }}
            type="text"
            placeholder="Address"
            onChange={this.handleUserAddressChange}
          />
          {this.state.tags.map(tag => (
            <CheckableTag
              key={tag}
              checked={this.state.userTags.indexOf(tag) > -1}
              onChange={checked => this.handleUserTagsChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </Modal>
      </StyledHome>
    );
  }
}

export default HomePage;
