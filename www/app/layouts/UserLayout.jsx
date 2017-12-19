import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import styles from '../styles/UserLayout.less';
class UserLayout extends React.Component {
  constructor(props){
    super()
  }
    static childContextTypes ={
      location: PropTypes.object,
}
  
  getChildContext() {
    const { location } = this.props;
    return { location };
  }
  getPageTitle() {
    const { getRouteData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - Ant Design Pro`;
      }
    });
    return title;
  }
  render() {
    const { getRouteData } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className="container">
          <div className="top">
            <div className="headero">
              <Link to="/">
                <img alt="" className="logoo"/>
                <span className="title">好快省</span>
              </Link>
            </div>
            <div className="desc">解放您的双手</div>
          </div>
          {
            getRouteData('UserLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(
  state => ({
    login: state.login,
  })
)(UserLayout);
