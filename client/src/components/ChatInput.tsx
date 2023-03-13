import { useState } from 'react';
import axios from 'axios';

type ChatInputType = {
  user: { user_id: string };
  clickedUser: { user_id: string };
  getUserMessages: () => {};
  getClickedUsersMessages: () => {};
};

export const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }: ChatInputType) => {
  const [textArea, setTextArea] = useState('');
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };

    try {
      await axios.post('http://localhost:5000/message', { message });
      getUserMessages();
      getClickedUsersMessages();
      setTextArea('');
    } catch (err) {
      throw new Error(`Error encountered AddMessage Post: ${err}`);
    }
  };

  return (
    <div className="chat-input">
      <textarea value={textArea} onChange={e => setTextArea(e.target.value)} />
      <button className="secondary-button" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};
