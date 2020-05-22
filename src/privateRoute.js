import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import _ from 'lodash'

import { store } from './store/store'

const PrivateRoute = ({ component: Component, adminOnly, ...props }) => {
  const name = _.get(store.getState(), 'appReducer.loginCredentials.user.user_role.role_name')
  return (
    <Route
      {...props}
      render={props => (
        store.getState().appReducer.logged
        && (
          (!adminOnly && (name.toLowerCase() === 'client')) || (name.toLowerCase() === 'administrator')
        )
          ? <Component {...props} /> : <Redirect to="/login" />
      )}
    />
  )
}

export default PrivateRoute