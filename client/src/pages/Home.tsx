import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import { Nav } from '../components';
import { AuthModal } from '../components/AuthModal';

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies<string>(['user']);

  const authToken = cookies.AuthToken;
  const handleClick = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId);
      removeCookie('AuthToken', cookies.AuthToken);
      window.location.reload();
    }
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className={'overlay'}>
      <Nav
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className={'home'}>
        <h1 className={'primary-title'}>Swipe Right &#174;</h1>
        <button className={'primary-button'} onClick={handleClick}>
          {authToken ? 'Log Out' : 'Create Account'}
        </button>

        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />}
      </div>
    </div>
  );
};
