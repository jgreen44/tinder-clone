import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface IProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isSignUp: boolean;
}

export const AuthModal = ({ setShowModal, isSignUp }: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookies, remove] = useCookies();

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError('Passwords need to match');
        return;
      }
      const response = await axios.post(`http://localhost:5000/${isSignUp ? 'signup' : 'login'}`, { email, password });
      setCookies('AuthToken', response.data.token);
      setCookies('UserId', response.data.userId);

      const success = response.status === 201;

      if (success && isSignUp) navigate('/onboarding');
      if (success && !isSignUp) navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      throw new Error(`Error encountered AuthModal: ${err}`);
    }
  };

  return (
    <div className={'auth-modal'}>
      <div className={'close-icon'} onClick={handleClick}>
        ⓧ
      </div>
      <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
      <p>
        By clicking Submit, you agree to our terms. Learn how we process your data in our Privacy and Cookie Policy.
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
        {isSignUp && (
          <input
            type={'password'}
            id={'checkPassword'}
            name={'checkPassword'}
            placeholder={'confirm password'}
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        )}
        <input className={'secondary-button'} type={'submit'} />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};
