import React, { useState } from 'react';

import { Nav } from '../components';
import { AuthModal } from '../components/AuthModal';

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const authToken = false;
  const handleClick = () => {
    console.log('clicked');
    setShowModal(true);
  };

  return (
    <div className={'overlay'}>
      <Nav minimal={false} authToken={authToken} setShowModal={setShowModal} showModal={showModal} />
      <div className={'home'}>
        <h1 style={{ color: 'white' }}>Swipe Right &#174;</h1>
        <button className={'primary-button'} onClick={handleClick}>
          {authToken ? 'Log Out' : 'Create Account'}
        </button>

        {showModal && <AuthModal setShowModal={setShowModal} />}
      </div>
    </div>
  );
};
