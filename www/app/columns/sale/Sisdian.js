import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

export default class Sisdian extends Component {
  render() {
    return (
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>汽车销售</Breadcrumb.Item>
              <Breadcrumb.Item>4s店选车</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <h1>我是4s店列表</h1>
            </Content>
          </Layout>
    )
  }
}
