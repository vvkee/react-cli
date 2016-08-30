import React from 'react'
import {
    Route,
    IndexRoute,
    IndexRedirect
} from 'react-router'

import App from '../components/app'

import Header from '../components/header'
import WebappExample from './pages/webapp/example'
import WechatExample from './pages/wechat/example'

const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to='/webapp' />
        <Route path="/webapp" components={{header: Header, main: WebappExample}} />
        <Route path="/wechat" components={{header: Header, main: WechatExample}} />
    </Route>
)
export default routes
