import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {Col, Container, Row } from 'react-bootstrap';

const PageNotFound = () => (
  <Wrapper>
    <Container className="mt-5">
      <Row>
        <Col xs={12} lg={12}>
          <p className="messageBox__error text-center">404</p>
        </Col>
        <Col xs={12} lg={12}>
          <p className="messageBox__message text-center">Contenido no encontrado</p>
        </Col>
        <Col xs={12} lg={12}>
          <p className="messageBox__details text-center">Algo salió mal, pero no te preocupes.</p>
        </Col>
        <Col xs={3} lg={3} className="offset-3 offset-sm-4 offset-lg-5">
          <NavLink exact to="/" className="inactive"><button className="messageBox__button" type="button">Volver a la pagina de inicio</button></NavLink>
        </Col>
      </Row>
    </Container>
  </Wrapper>
)

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;


    .messageBox {
    
        &__error {
            margin: 0;
            color: #0489B1;
            font-size: 100px;
        }

        &__message {
            margin: 0;
            color: #0489B1;
            font-size: 35px;
        }

        &__details {
            margin: 0;
            color: #0489B1;
            font-size: 20px;
        }

        &__button {
            background-color: white;
            color: #0489B1;
            font-size: 15px;
            border: 2px solid #0489B1;
            margin-top: 30px;
            transition-duration: 0.4s;
            cursor: pointer;
            width: 175px;
            height: 40px;
        }

        &__button:hover {
            background-color: #0489B1;
            color: #FFFFFF;
        }
    }
`

export default PageNotFound
