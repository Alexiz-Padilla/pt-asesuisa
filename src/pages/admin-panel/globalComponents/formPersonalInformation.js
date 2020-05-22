import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Col, Container, Form, Button, ButtonGroup } from 'react-bootstrap';
import { postPersonalInformation, updatePersonalInformation } from '../../../actions/personalAction';
import { Formik } from 'formik'
import Swal from 'sweetalert2'
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import {verifycationDUI, verifycationNIT} from '../../../helpers/verifyCredentials';
import {verifyAgeAutomatic} from '../../../helpers/verifyAge';
import moment  from 'moment';

import "react-datepicker/dist/react-datepicker.css";

const genders = [{
    value: '5ec7b279cd15535fe4e60165',
    label: 'Masculino',
  }, {
    value: '5ec7b29ccd15535fe4e60166',
    label: 'Femenino',
  }];

const schema = yup.object({
  pi_first_name: yup.string().required("*Tu primer nombre es requerido."),
  pi_second_name: yup.string().required("*Tu segundo nombre es requerido."),
  pi_first_surname: yup.string().required("*Tu primer apellido es requerido."),
  pi_second_surname: yup.string().required("*Tu segundo apellido es requerido."),  
  pi_married_lastname: yup.string(),
  pi_DUI: yup.string().when('pi_birthdate', {
    is: (pi_birthdate) => {
      return verifyAgeAutomatic(moment(pi_birthdate).format('YYYY-MM-DD')) > 18;
    },
    then: yup.string()
      .required('*El DUI es requerido')
      .test(
        'pi_DUI',
        'Tu DUI no es valido',
        (dui) => {
          return verifycationDUI(dui);
        },
      )
  }),
  pi_NIT: yup.string()
  .when('pi_birthdate', {
    is: (pi_birthdate) => {
      return verifyAgeAutomatic(moment(pi_birthdate).format('YYYY-MM-DD')) > 18;
    },
    then: yup.string()
      .required('*El NIT es requerido')
      .test(
        'pi_NIT',
        'Tu NIT no es valido',
        (nit) => {
          return verifycationNIT(nit);
        },
      ),
  }),
  pi_birthdate:yup.string().required("*Tu fecha de nacimiento es requerida."),
  pi_phone: yup.string().required("*Tu numero telefonico es requerido.").matches(/^[0-9]{4}-[0-9]{4}$/, {message: "Intruduce un numero de telefono valido.", excludeEmptyString: false}),
  pi_address: yup.string().required("*Tu direccion es requerida."),
  pi_email: yup.string().required("*Tu correo eectronico es requerido.").email("*Ingresar una direccion de correo electronico valida."),
  pi_gender: yup.string().required("*Selecciona tu genero.")
});


class FormikUser extends Component {
    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    handleSubmit = async (values) => {
        const { history, dispatchPostPersonalInformation, personalInformation, dispatchUpdatePersonalInformation } = this.props;

          const data = {
            pi_first_name: values.pi_first_name,
            pi_second_name: values.pi_second_name,
            pi_first_surname: values.pi_first_surname,
            pi_second_surname: values.pi_second_surname,
            pi_married_lastname: values.pi_married_lastname,
            pi_DUI: values.pi_DUI,
            pi_NIT: values.pi_NIT,
            pi_birthdate: moment(values.pi_birthdate).format('YYYY-MM-DD'),
            pi_phone: values.pi_phone,
            pi_address: values.pi_address,
            pi_email: values.pi_email,
            pi_gender: values.pi_gender,
          }

          const isAValidEmail = this.validateEmail(values.pi_email);
          if (isAValidEmail) {
              if(personalInformation){
                dispatchUpdatePersonalInformation(personalInformation._id, data).then((response)=>{
                  if (response.data.success) {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: `El registro fue actualizado exitosamente! ${response.data.fullname}`,
                      showConfirmButton: false,
                      timer: 3000
                    }).then(()=> {
                      history.push('/panel/personal-informations')
                    });
          
                  } else {
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Lo sentimos, el registro no fue actualizado, ¡creemos que tiene un error en su información!',
                      showConfirmButton: false,
                      timer: 3000
                    });
                  }
                })              
              } else {
                dispatchPostPersonalInformation(data).then((response) => {
                  if (response.data.success) {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: `El registro fue creado exitosamente! ${response.data.fullname}`,
                      showConfirmButton: false,
                      timer: 3000
                    }).then(()=> {
                      history.push('/panel/personal-informations')
                    });
          
                  } else {
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Lo sentimos, el registro no fue creado, ¡creemos que tiene un error en su información!',
                      showConfirmButton: false,
                      timer: 3000
                    });
                  }
                });
    
               
              }
          }
        
        this.setState({ setValidated: true });
    }
    
    render() {
      const { initialData } = this.props;
      return (
        <div>
          <Container className="mt-5">
            <Formik
              validationSchema={schema}
              initialValues={initialData}
              enableReinitialize={true}
              onSubmit={
                (values)=>{
                  this.handleSubmit(values);
                }
              }
            >
            {props => {
            const {
                values,
                errors,
                setFieldValue,
                handleSubmit,
                handleChange,
                isValid
            } = props; 
            return (
                    <Form noValidate onSubmit={handleSubmit}>
                        <h5 className="mb-3">
                            INFORMACIÓN PERSONAL
                        </h5>          
    
                        <Form.Row>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                <Form.Label>PRIMER NOMBRE*</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    name="pi_first_name" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar primer nombre" 
                                    value={values.pi_first_name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_first_name}
                                />          
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_first_name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group >
                                <Form.Label>SEGUNDO NOMBRE*</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="pi_second_name" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar segundo nombre" 
                                    value={values.pi_second_name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_second_name}
                                />                        
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_second_name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group >
                                <Form.Label>PRIMER APELLIDO</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="pi_first_surname" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar primer apellido" 
                                    value={values.pi_first_surname}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_first_surname}
                                />                        
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_first_surname}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group >
                                <Form.Label>SEGUNDO APELLIDO</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="pi_second_surname" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar segundo apellido" 
                                    value={values.pi_second_surname}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_second_surname}
                                />                        
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_second_surname}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group >
                                <Form.Label>APELLIDO DE CASADA</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="pi_married_lastname" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar apellido de casada" 
                                    value={values.pi_married_lastname}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_married_lastname}
                                />                        
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_married_lastname}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                              <Form.Group controlId="formGroupACD">
                                <Form.Label>FECHA DE NACIMIENTO</Form.Label>
                                <DatePicker
                                        id="pi_birthdate"
                                        className={`form-control  ${!!errors.pi_birthdate ? "is-invalid" : ""}`}
                                        selected={values.pi_birthdate}
                                        onChange={date => setFieldValue('pi_birthdate', date)}
                                        dateFormat="yyyy-MM-dd"
                                        name="pi_birthdate" 
                                        style={{ borderRadius: '0px ' }}
                                    />    
                                    <Form.Label style={{
                                            display: !!errors.pi_birthdate ? "": "none",
                                            width: '100%',
                                            marginTop: '.25rem',
                                            fontSize: '80%',
                                            color: '#dc3545',
                                        
                                    }}>{errors.pi_birthdate !== null ? errors.pi_birthdate: "" }</Form.Label>
                              </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                <Form.Label>DUI</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="pi_DUI" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar DUI" 
                                    value={values.pi_DUI}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_DUI}
                                />                        
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_DUI}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                <Form.Label>NIT</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="pi_NIT" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar NIT" 
                                    value={values.pi_NIT}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_NIT}
                                />                        
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_NIT}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col xs={12} lg={6}>
                                <Form.Group >
                                <Form.Label>TELEFONO</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    name="pi_phone" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar telefono formato 0000-0000" 
                                    value={values.pi_phone}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_phone}
                                />          
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col xs={12} lg={6}>
                                <Form.Group >
                                <Form.Label>DIRECCION</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    name="pi_address" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar telefono" 
                                    value={values.pi_address}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_address}
                                />          
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group >
                                <Form.Label>CORRREO</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    name="pi_email" 
                                    style={{ borderRadius: '0px' }}
                                    placeholder="Ingresar correo electronico" 
                                    value={values.pi_email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.pi_email}
                                />          
                                    <Form.Control.Feedback type="invalid">
                                    {errors.pi_email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                              <Form.Group controlId="formGroupRole">
                                  <Form.Label>GENERO</Form.Label>
                                  <Form.Control 
                                      name="pi_gender"
                                      value={values.pi_gender}
                                      onChange={handleChange}
                                      isInvalid={!!errors.pi_gender}
                                      as="select" 
                                      style={{borderRadius: '0', zIndex: '1'}} 
                                      >
                                          {genders.map(item => (
                                          <option key={item.value} value={item.value}>
                                              {item.label}
                                          </option>
                                          ))}
                                      </Form.Control>
                                  <Form.Control.Feedback type="invalid">
                                      {errors.pi_gender}
                                  </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                        </Form.Row>
                        <Col xs={12} className="text-center mt-5 mb-5">
                            <ButtonGroup toggle className="mb-2">
                                <Button
                                    className="btn btn-outline-success"
                                    type="submit" 
                                    disabled={!isValid}
                                    variant="outline-secondary"
                                    >
                                    GUARDAR
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Form>
                    )}
                }
            </Formik>
          </Container>
        </div>
      )
    }
    
  }

  const mapStateToProps = (state, ownProps) => 
  { 

  }

  const mapDispatchToProps = {
    dispatchPostPersonalInformation: postPersonalInformation,
    dispatchUpdatePersonalInformation: updatePersonalInformation,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormikUser));