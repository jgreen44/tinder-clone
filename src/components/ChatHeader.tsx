import React from 'react';

export const ChatHeader = () => {
  return (
    <div className={'chat-container-header'}>
      <div className={'profile'}>
        <div className={'img-container'}>
          <img src={''} />
        </div>
        <i className={'log-out-icon'}>⇦</i>
      </div>
    </div>
  );
};
