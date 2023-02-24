import React from 'react';

import { ChatDisplay, ChatHeader, MatchesDisplay } from './index';

export const ChatContainer = () => {
  return (
    <div className={'chat-container'}>
      <ChatHeader />
      <div>
        <button className={'option'}>Matches</button>
        <button className={'option'}>Chat</button>
      </div>
      <MatchesDisplay />
      <ChatDisplay />
      <h1>Chat Container</h1>
    </div>
  );
};
