import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { FaUserAlt , FaLock} from 'react-icons/fa';

import {
  Login,
} from '../../actions/appAction';

import { Col, Form,Image, Alert, Button } from 'react-bootstrap';
import { Formik } from 'formik'

import Swal from 'sweetalert2'
import * as yup from 'yup';


const schema = yup.object({
  email: yup.string().required("*Por favor proporcione una dirección de correo electrónico.").email("*Debe ser una dirección de correo electrónico válida."),
  password: yup.string().required("*Por favor proporcione una contraseña."),
});

class LoginWindow extends Component {

  state = {
      loading: false,
      validated: false,
      setValidated: false,
      error: { 
        show: false,
        message: '',
      }, 
      setShow: false,
    };

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  validateUserEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleSubmit = async (values) => {
    this.setState({ loading: true });
    
      const email = values.email;
      const password = values.password;

      const isAValidEmail = this.validateUserEmail(email);
      if (isAValidEmail) {
          const resp = await this.props.dispatchLogin({
            user_email: email,
            user_password: password,
          });
          if (resp.success) {
            this.props.history.push('/panel/personal-informations');
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'INICIO DE SESIÓN EXITOSO',
              showConfirmButton: false,
              timer: 1000
            })
          } else {
            const { type, message, unknown } = resp;
            if (type) {
              if (type === 'email') {
                const data = {
                  error: {
                    show: true,
                    message,
                  },
                };
                this.setErrorMessage(data);
              }
              if (type === 'password') {
                const data = {
                  error: {
                    show: true,
                    message,
                  },
                };
                this.setErrorMessage(data);
              }
              if (type === 'user') {
                const data = {
                  error: {
                    show: true,
                    message,
                  },
                };
                this.setErrorMessage(data);
              }
            }
            if (unknown && !type) {
              const data = {
                error: {
                  show: true,
                  message,
                },
              };
              this.setErrorMessage(data);
            }
          }
      } else {
        this.setState({
            loading: false,
            error: {
              show: true,
              message: 'Please enter a valid email address',
            },
          });
      }
  }

  setErrorMessage = (data) => {
    this.setState({
      loading: false,
      error: data.error,
    });
  }

  closeAlert = () => {
    this.setState({ 
      setShow : false , 
      error: { 
        show: false,
        message: '',
      }, 
    })
  }

  getAlert = ()=> {
    const { error } = this.state;
    if(error.show){
      return (
        <Alert key='error' variant='danger' onClose={() => this.closeAlert()} dismissible style={{width: '100%', borderRadius: '0px'}}>
          {error.message}
        </Alert>
      )
    }
    return (null)
  }

  render() {
    return (
      <Wrapper>
        <Formik
          onSubmit={
            (values) => {
              this.handleSubmit(values)
            }
          }
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
              <Form noValidate className="login-form" onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group >
                    <Col lg={12}>
                      <Image
                        src="assets/img/asesuisa.png"
                        className="mx-auto d-block"
                        alt="Logo"
                        thumbnail
                        style={{backgroundColor: 'transparent', border: 'none'}}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Col lg={12}>
                      {this.getAlert()}
                    </Col>
                  </Form.Group>
                  <Col lg={12}>
                    <Form.Group controlId="formGroupUser">
                      <div className="icon-inside-item-form">
                        <FaUserAlt style={{ color: 'rgb(0, 60, 100, 0.8)'}}/>
                      </div>
                      <Form.Control
                        type="text"
                        name="email"
                        className="form-item"
                        style={{ borderRadius: '0px' }}
                        placeholder="Enter Email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="mt-2">
                    <Form.Group controlId="formGroupFirst">
                      <div className="icon-inside-item-form">
                        <FaLock style={{ color: 'rgb(0, 60, 100, 0.8)'}}/>
                      </div>
                      <Form.Control
                        type="password"
                        name="password"
                        className="form-item"
                        style={{ borderRadius: '0px' }}
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={12} className="text-center">
                      <Button
                        type="submit"
                        variant="primary"  
                        className="mb-1"
                        disabled={!isValid}
                        style={{ borderRadius: '0px',background: 'rgba(0, 60, 100, 0.8)', backgroundColor: 'rgba(0, 60, 100, 0.8)', border: 'none', outline: 'none' }}
                        >INICIAR SESIÓN</Button>
                    </Col>
                </Form.Row>
              </Form>
            )}
        </Formik>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  max-width: 375px;
  min-width: 300px;
  background-color: rgba(225, 225, 225, 0.7);
  border: 1px;
  border-color: #FFFFFF;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  position: absolute;
  top: 10%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);  
  transition-property: background-color;
  transition-duration: .6s;
  transition-timing-function: linear;
  
  .icon-inside-item-form{
    position: absolute;
    left: 20px;
    top: 5px;
    z-index: 9999;
  }

  .form-item{
    padding-left: 40px;
    padding-right: 10px;
  }

  &:hover{
    transition-property: background-color;
    transition-duration: .6s;
    transition-timing-function: linear;      
    background-color: rgba(225, 225, 225, 0.9);
    }
   .login-form {
    margin: auto;
    margin-top: 50px;

    &__submit-buttom {
      width: 100%;
    }

    &__forgot-buttom {
      float: right;
      }
  }
`

const mapStateToProps = store => ({
});

const mapDispatchToProps = {
  dispatchLogin: Login,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginWindow));
