import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HigherOrderComponet(WrappedCmponent) {
  function Hoc() {
    return (
      <>
        <Navbar bg='primary' variant='dark'>
          <Container>
            <Navbar.Brand>
              {' '}
              <Link to='/' className='text-white' style={{ textDecoration: 'none' }}>
                {' '}
                Profiles Creation{' '}
              </Link>
            </Navbar.Brand>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Link to='/instructions' className='text-white' style={{ textDecoration: 'none' }}>
                  Instructions
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />
        <Container>
          <WrappedCmponent />
        </Container>
      </>
    );
  }

  return Hoc;
}
