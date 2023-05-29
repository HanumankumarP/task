import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { TiUserAdd } from 'react-icons/ti';
import HigherOrderComponet from './hoc/HigherOrderComponent';
let Instructions = () => {
  return (
    <ListGroup as='ol' numbered>
      <ListGroup.Item as='li'>
        Click on the add Profile icon{' '}
        <TiUserAdd className='text-danger' style={{ fontSize: '20px' }} />
        from home page to create a new profile
      </ListGroup.Item>
      <ListGroup.Item as='li'>
        Fill the form with valid information and click on submit button to save the data
      </ListGroup.Item>
      <ListGroup.Item as='li'>
        After clicking submit button, a profile will be created with given data
      </ListGroup.Item>
      <ListGroup.Item as='li'>
        We can Modify a profile by clicking edit profile button
      </ListGroup.Item>
      <ListGroup.Item as='li'>
        We can Delete a profile by clicking edit profile button
      </ListGroup.Item>
      <ListGroup.Item className='text-danger'>
        {' '}
        Note : The record with redundency of email, won &apos;t be allowed
      </ListGroup.Item>
    </ListGroup>
  );
};

Instructions = HigherOrderComponet(Instructions);
export default Instructions;
