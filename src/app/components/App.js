import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

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
        <Sider  trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
              <Link to="/"></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="area-chart" />
              <span>Maps</span>
              <Link to="/about"></Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>Account</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", paddingLeft: 20 }}>
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
