import React,{Component} from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import { Navbar,Nav} from 'react-bootstrap';
import { LogOutAction } from '../actions/appAction';
import { LinkContainer } from 'react-router-bootstrap'

class NavbarPage extends Component {
  componentWillMount(){

  }

  validationPathLogin = () => {
    const { location } = this.props;
    const { pathname } = location;

    return pathname === "/login" ;
  }

  logOut = () => {
    const { logOut } = this.props;
    logOut();
  }

  renderNavigationBar(){
    const { location } = this.props;

    if(!this.validationPathLogin()){
        return (
        <Navbar variant="dark" expand="lg" style={{backgroundColor: 'rgb(0, 60, 100)', background: 'rgb(0, 60, 100)'}}
        >
          <Navbar.Brand>
            <Link to="/panel/personal-informations">
              <img
                  src="/assets/img/asesuisa.png"
                  width="140"
                  height="65"
                  className="d-inline-block align-top mb-1 ml-5"
                  alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" activeKey={location.pathname}>
              <LinkContainer exact to="/panel/personal-informations">
                <Nav.Link >PERSONAL INFORMATION</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ml-auto" activeKey={location.pathname}>
              <LinkContainer exact to="login">
                <Nav.Link onClick={() => this.logOut()}>LOG OUT</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )
    }
    return (null); 
  }

  render() {
      return (
         this.renderNavigationBar()
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logOut() {
    dispatch(LogOutAction());
  },
});

export default connect(null, mapDispatchToProps)(withRouter(NavbarPage));
