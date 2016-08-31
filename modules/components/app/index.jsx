import React, { Component, PropTypes } from 'react'

import Header from '../header'
class App extends Component {
    render () {
        const { header, main } = this.props
        return (
            <div>
                <div className="header">
                    {header}
                </div>
                <div className="main">
                    {main}
                </div>
            </div>
        )
    }
}

export default App
