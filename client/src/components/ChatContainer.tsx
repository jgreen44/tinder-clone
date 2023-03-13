import React, { useState } from 'react';

import { ChatDisplay, ChatHeader, MatchesDisplay } from './index';

export const ChatContainer = ({ user }: any) => {
  const [clickedUser, setClickedUser] = useState<any>();
  return (
    <div className={'chat-container'}>
      <ChatHeader user={user} />
      <div>
        <button className={'option'} onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className={'option'} disabled={!clickedUser}>
          Chat
        </button>
      </div>
      {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
      <h1>Chat Container</h1>
    </div>
  );
};
