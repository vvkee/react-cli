import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './header.less'

class Header extends Component {
    render () {
        return (
            <header className="header">
                <Link to="/">
                    <span>webapp</span>
                </Link>
                <Link to="/wechat">
                    <span>wechat</span>
                </Link>
            </header>
        )
    }
}

export default Header
