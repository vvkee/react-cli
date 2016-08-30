import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { Router, browserHistory, Redirect } from 'react-router'

import routes from './routes'

function init () {
    render(
        <div>
            <Router history={browserHistory} routes={routes} />
        </div>,
        document.getElementById('app')
    )
}
export { init }
