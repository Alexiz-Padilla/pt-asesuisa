import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import NavigationBar from './globalComponents/navbar'

import LoginPageContainer from './pages/login/Login'
import PersonalInformationsPageContainer from './pages/admin-panel/pInformation/List'
import PersonalInformationPageContainer from './pages/admin-panel/pInformation/Form'
import PageNotFoundContainer from './pages/error404/pageNotFound'

import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Wrapper>
    <header>
      <NavigationBar />
    </header>
    <Switch>
      <PublicRoute path="/login" component={LoginPageContainer} />
      <PrivateRoute path="/panel/personal-informations" adminOnly component={PersonalInformationsPageContainer} /> 
      <PrivateRoute exact path="/panel/personal-information" adminOnly component={PersonalInformationPageContainer} />
      <PrivateRoute path="/panel/personal-information/:id?" adminOnly component={PersonalInformationPageContainer} />
      <Route component={PageNotFoundContainer} /> 
    </Switch>
  </Wrapper>
);


const Wrapper = styled.div`

`

export default App
