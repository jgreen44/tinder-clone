import React, { useState } from 'react';

import { Nav } from '../components';
import { AuthModal } from '../components/AuthModal';

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const authToken = false;
  const handleClick = () => {
    console.log('clicked');
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className={'overlay'}>
      <Nav
        minimal={false}
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className={'home'}>
        <h1 style={{ color: 'white' }}>Swipe Right &#174;</h1>
        <button className={'primary-button'} onClick={handleClick}>
          {authToken ? 'Log Out' : 'Create Account'}
        </button>

        {showModal && <AuthModal setShowModal={setShowModal} setIsSignUp={setIsSignUp} isSignUp={isSignUp} />}
      </div>
    </div>
  );
};
