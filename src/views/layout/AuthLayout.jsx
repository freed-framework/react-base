/**
 * @file Layout
 * @author denglingbo
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Layout } from 'antd';
import SiderMenu from '../../common/siderMenu/SiderMenu';
import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import Route from '../../Route';
import './layout.scss';

const { Header, Content, Sider } = Layout;

@connect(
    state => ({
        pub: state.toJS().pub,
        user: state.toJS().user.data,
    })
)
class AuthLayout extends PureComponent {
    render() {
        const { user, pub } = this.props;
        return (
            <Layout>
                <Header>Header</Header>
                {/* Layout */}
                <Layout>

                    {/* 侧边栏容器 */}
                    <Sider collapsed={pub.collapsed}>
                        <SiderMenu menu={user.menu} />
                    </Sider>

                    {/* 内容主容器 */}
                    <Content>
                        {/* 面包屑 */}
                        <Breadcrumb menu={user.menu} />

                        {/* 内容容器 */}
                        <div className="content-main">
                            <Route menu={user.menu} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

AuthLayout.propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    pub: PropTypes.objectOf(PropTypes.any),
}

export default withRouter(AuthLayout);
