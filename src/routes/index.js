/**
 * @file routes.js
 * @author denglingbo
 *
 * App 所有的路由配置
 */
import React from 'react';
import { Route } from 'react-router-dom';
import Bundle from 'freed-spa/src/bundle';

/* eslint-disable */
import Home from 'bundle-loader?lazy!../views/home/App';
import system from './system';
/* eslint-enable */

/**
 * 路由配置
 * 目前后端提供 导航名，此处由 key 进行 map 对应
 * @type {[*]}
 *
 * key 用于和后端的 code 做对应关系
 * 后端提供 code, id, name
 * 前端 使用 key 从后端数据中拿相应的数据进行展示
 */
const routes = [
    system
];

export default routes;
