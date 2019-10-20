import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { bold } from "ansi-colors";

const { Header, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Layout>
        <div className="logo" />
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <h1
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: 24,
                color: "white"
              }}
            >
              {this.state.collapsed ? "A" : "Appolo"}
            </h1>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
              <Link to="/"></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="area-chart" />
              <span>Maps</span>
              <Link to="/maps"></Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>Account</span>
              <Link to="/account"></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", fontWeight:bold, paddingLeft: 20 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "100vh"
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
