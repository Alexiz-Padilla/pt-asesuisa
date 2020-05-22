import React,{Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import LoginWindow from './LoginWindow';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
        <Background>
          <LoginWindow />
        </Background>
        )
  }
}

const Background = styled.div`
    background-image: url('../assets/img/bg-login.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: all;
    min-height: 100%;
    display: flex;
`;

const mapStateToProps = store => ({
})

export default connect(mapStateToProps)(withRouter(Login));