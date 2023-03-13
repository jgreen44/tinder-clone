import React from 'react';
import { useCookies } from 'react-cookie';

export const ChatHeader = ({ user }: any) => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const logout = () => {
    removeCookie('UserId', cookies.UserId);
    removeCookie('AuthToken', cookies.AuthToken);
    window.location.reload();
  };
  return (
    <div className={'chat-container-header'}>
      <div className={'profile'}>
        <div className={'img-container'}>
          <img src={user.url} alt={`photo of ${user.first_name}`} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className={'log-out-icon'} onClick={logout}>
        ⇦
      </i>
    </div>
  );
};
