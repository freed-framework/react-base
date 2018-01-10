/**
 * @file App.js
 * @author denglingbo
 *
 * 此处调用 framework 的 App.js
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Layout } from 'antd';
import { receiveUser } from './actions/user';
import AuthLayout from './views/layout/AuthLayout';
import LoginLayout from './views/login/LoginLayout';
import { findCodeByPath } from './routes/util';
import './style/common.scss';

/**
 * 通过code找id
 * @param {string} code
 * @param {Object} data
 *
 * @return {Number} id > 0
 */
const findIdByCode = (code, data) => {
    if (!data || !code) {
        return -1;
    }
    return data.find(value => {
        if (value.subMenu.length > 0) {
            return value.submenu.find(subMenu => (subMenu.code === code));
        }
        return -1;
    });
}

/**
 * Fix path
 * @param location
 */
const pathListener = (location, history) => {
    try {
        const expr = /(.+)\/$/.exec(location.pathname);
        if (expr) {
            history.replace(expr[1]);
        }

        if (location.hash === '#/') {
            history.replace(location.pathname);
        }
    } catch (ex) {
        // Do nothing
    }
}

@connect(
    () => ({}),
    dispatch => bindActionCreators({ receiveUser }, dispatch)
)
class App extends PureComponent {
    componentWillMount() {
        // 此处 user 从后端数据返回, 此处进行 dispatch
        const { user, history, location } = this.props;

        if (user != null) {
            this.props.receiveUser(user);
        }

        // 监听当前的地址变换
        this.unlisten = history.listen(loc => pathListener(loc, history));

        // 如果当前 pathname 为 login，则跳转到到 index
        if (user && location.pathname === '/login') {
            history.replace('/');
        }
    }

    /**
     * 拉取用户权限
     */
    componentDidMount() {
        const { history } = this.props;
        this.unrights = history.listen(() => this.getRights());
        this.getRights();
    }

    componentWillUnmount() {
        this.unlisten();
        this.unrights();
    }

    /**
     * 统一获取用户权限
     */
    getRights() {
        const { pathname } = this.props.location;
        const { initData } = this.props;
        const code = findCodeByPath(`/${pathname.split('/')[1]}`);
        if (code && initData && initData.menus && initData.menus.menu) {
            const id = findIdByCode(code, initData.menus.menu);
            if (id > 0) this.props.fetchRightsAction(id);
        }
    }

    render() {
        const { user } = this.props;

        return (
            <Layout>
                {user ?
                    <AuthLayout /> :
                    <LoginLayout />
                }
            </Layout>
        );
    }
}

App.propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    location: PropTypes.objectOf(PropTypes.any),
    history: PropTypes.objectOf(PropTypes.any),
    initData: PropTypes.objectOf(PropTypes.any),
    fetchRightsAction: PropTypes.func,
    receiveUser: PropTypes.func
}

export default withRouter(App);
