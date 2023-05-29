import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CardComponent from './reusable/Card';

const ProfileList = () => {
  const profileList = useSelector((state) => state.profile?.profiles);

  return (
    <>
      {!(profileList && profileList.length) ? (
        <Row className='justify-content-center'>
          <Col md={6}>
            <Alert variant='warning'> No Records Found... </Alert>
          </Col>
        </Row>
      ) : (
        <>
          <Row className='justify-content-center'>
            {profileList.map((item, index) => (
              <CardComponent
                key={index}
                title={''}
                profileData={item}
                functionality={'displayData'}
              ></CardComponent>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default ProfileList;
