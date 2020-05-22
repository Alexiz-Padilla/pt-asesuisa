import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { store } from './store/store'

const PublicRoute = ({ component: Component, exact, ...props }) => {
  const { path } = props;

  return (
    <Route
      {...props}
      exact
      render={props => (
        store.getState().appReducer.logged && path === "/login" ? <Redirect to="/panel/personal-informations" /> : <Component {...props} />
      )}
    />
  )
}

export default PublicRoute