import React from 'react';
import CardComponent from './reusable/Card';
import ProfileList from './ProfileList';
import HigherOrderComponet from './hoc/HigherOrderComponent';

let Home = () => {
  return (
    <>
      <CardComponent title='' functionality={'addData'} />
      <br />
      <ProfileList />
    </>
  );
};

Home = HigherOrderComponet(Home);

export default Home;
