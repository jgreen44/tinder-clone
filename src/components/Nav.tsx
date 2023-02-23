import React, { Dispatch, SetStateAction } from 'react';

import colorLogo from '../assets/color-logo-tinder.png';
import whiteLogo from '../assets/tinder_logo_white.png';

interface IProps {
  minimal: boolean;
  authToken: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}
export const Nav = ({ minimal, authToken, showModal, setShowModal, setIsSignUp }: IProps) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };
  return (
    <nav>
      <div className={'logo-container'}>
        <img className={'logo'} src={minimal ? colorLogo : whiteLogo} alt={'logo'} />
      </div>
      {!authToken && !minimal && (
        <button className={'nav-button'} onClick={handleClick} disabled={showModal}>
          Log In
        </button>
      )}
    </nav>
  );
};
