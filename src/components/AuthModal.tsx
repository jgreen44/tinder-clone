import React, { Dispatch, SetStateAction, useState } from 'react';

interface IProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const AuthModal = ({ setShowModal }: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error] = useState('');

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const isSignUp = true;
  return (
    <div className={'auth-modal'}>
      <div className={'close-icon'} onClick={handleClick}>
        ⓧ
      </div>
      <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie
        Policy.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type={'email'}
          id={'email'}
          name={'email'}
          placeholder={'email'}
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type={'password'}
          id={'password'}
          name={'password'}
          placeholder={'password'}
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type={'password'}
          id={'checkPassword'}
          name={'checkPassword'}
          placeholder={'confirm password'}
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <input className={'secondary-button'} type={'submit'} />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};
