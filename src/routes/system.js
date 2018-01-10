/**
 * @file system.js
 * @author taoqiyu
 *
 * 系统管理路由配置
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from 'freed-spa/src/bundle';

/* eslint-disable */
import Home from 'bundle-loader?lazy!../views/home/App';
import Book from 'bundle-loader?lazy!../views/book/App';
import BookDetail from 'bundle-loader?lazy!../views/book/Detail';
/* eslint-enable */

const route = {
    key: 'system',
    iconType: 'lock',
    routes: [
        // 用户管理
        {
            path: '/users',
            parent: 'system',
            key: 'users',
            component: () => (
                <Switch>
                    <Route
                        path="/users"
                        exact
                        render={() => <Bundle load={Book}>{(App) => <App />}</Bundle>}
                    />
                    <Route
                        path="/users/detail/:id"
                        render={() => <Bundle load={BookDetail}>{(App) => <App />}</Bundle>}
                    />
                </Switch>
            )
        }
    ]
};

export default route;
