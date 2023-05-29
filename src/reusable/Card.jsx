import React, { useState } from 'react';
import { Card, Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap';
import { TiUserAdd } from 'react-icons/ti';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProfile, editProfile, deleteProfile } from '../store/ProfileListSlice';
import { useAlert } from 'react-alert';

function CardComponent({ title, functionality, profileData }) {
  const [modalStatus, setModalStatus] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const profileList = useSelector((state) => state.profile.profiles);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setModalStatus(false);
  };

  const submitData = (data, e) => {
    if (data.id) {
      dispatch(editProfile(data));
      setModalStatus(false);
      alert.success('Record updated');
    } else {
      const filteredProfiles = profileList.filter((item) => item.email === data.email);
      if (filteredProfiles.length) {
        setEmailError(filteredProfiles.length && true);
      } else {
        data.id = new Date().getTime();
        dispatch(addProfile(data));
        setModalStatus(false);
        alert.success('New record created');
      }
    }

    e.target.reset();
  };

  // For editing a profile
  const editProfileData = (profileData) => {
    setEmailError(false);
    reset(profileData);
    setModalStatus(true);
  };

  // For deleting a profile
  const deleteProfileData = (profileData) => {
    setEmailError(false);
    window.confirm('Are you sure ?') && dispatch(deleteProfile(profileData));
  };

  return (
    <>
      {functionality === 'addData' ? (
        <Row className='justify-content-center'>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                {functionality === 'addData' && (
                  <IconContext.Provider value={{ color: '#007bff', size: '55px' }}>
                    {' '}
                    <div>
                      <TiUserAdd
                        style={{ size: '55px' }}
                        onClick={() => {
                          reset({ name: '', email: '', gender: '' });
                          setModalStatus(true);
                        }}
                      />
                    </div>
                  </IconContext.Provider>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Col md={4}>
          <Card className={'border-secondary mb-5'} style={{ borderRadius: 0 }}>
            <Card.Header
              className={profileData.gender === 'Male' ? 'bg-secondary' : 'bg-dark'}
              style={{ borderRadius: 0 }}
            >
              <Card.Title className='text-white'>{profileData.name.toUpperCase()}</Card.Title>
            </Card.Header>
            <Card.Body className='pb-0'>
              <Row className='justify-content-center'>
                <Col lg={2} md={4} sm={10}>
                  <IconContext.Provider value={{ color: '#007bff', size: '75px' }}>
                    {profileData.gender === 'Male' ? (
                      <FcBusinessman />
                    ) : (
                      <FcBusinesswoman style={{ size: '55px' }} />
                    )}
                  </IconContext.Provider>
                </Col>

                <Col lg={10} md={8} sm={10}>
                  <a href={('email:', profileData.email)}> {profileData.email} </a> <br></br>
                  <a href={('tel:', profileData.mobile)}> {profileData.mobile} </a>
                </Col>
              </Row>

              <Row className='justify-content-center mt-2'>
                <Col
                  md={6}
                  onClick={() => {
                    editProfileData(profileData);
                  }}
                  className='bg-warning p-2 pe-auto'
                  style={{ cursor: 'pointer' }}
                >
                  Edit Profile
                </Col>
                <Col
                  md={6}
                  className='bg-danger p-2 text-white pe-auto'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    deleteProfileData(profileData);
                  }}
                >
                  Delete Profile
                </Col>
              </Row>
            </Card.Body>

            {/* </Card.Footer> */}
          </Card>
        </Col>
      )}
      <Modal show={modalStatus} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {emailError ? (
            <Alert variant='danger'> Entered email exists. Try with another email </Alert>
          ) : (
            ''
          )}
          <Form onSubmit={handleSubmit(submitData)}>
            {/* Name */}
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Name'
                {...register('name', { required: 'Please enter your first name.' })}
              />
              {errors.name && errors.name.type === 'required' && (
                <p className='text-danger'> Name is required </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Enter email'
                {...register('email', {
                  required: 'Please enter your first name.',
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
              />

              {errors.email && errors.email.type === 'required' && (
                <p className='text-danger'>Email is required.</p>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <p className='text-danger'>Email is not valid.</p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Mobile'
                {...register('mobile', {
                  required: 'Enter Mobile Number',
                  pattern: /^[789]\d{9}$/,
                })}
              />
              {errors.mobile && errors.mobile.type === 'required' && (
                <p className='text-danger'> Mobile number is required </p>
              )}

              {errors.mobile && errors.mobile.type === 'pattern' && (
                <p className='text-danger'> Enter a valid mobile number </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Select
                {...register('gender', { required: 'Select valid option' })}
                defaultValue={''}
              >
                <option disabled value=''>
                  Gender{' '}
                </option>
                {['Male', 'Female'].map((item, index) => (
                  <option key={index} value={item}>
                    {' '}
                    {item}{' '}
                  </option>
                ))}
              </Form.Select>
              {errors.gender && errors.gender.type === 'required' && (
                <p className='text-danger'> Select one option </p>
              )}
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardComponent;
