import { Chat } from './Chat';
import { ChatInput } from './ChatInput';
import axios from 'axios';
import { useState, useEffect } from 'react';

type ChatDisplayProps = {
  user: {
    user_id: string;
    first_name: string;
    url: string;
  };
  clickedUser: {
    user_id: string;
    first_name: string;
    url: string;
  };
};

interface IFormattedMessage {
  name: string;
  img: string;
  message: { first_name: string; img: string; message: string };
  timestamp: string;
}

export const ChatDisplay = ({ user, clickedUser }: ChatDisplayProps) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState<IFormattedMessage[]>([]);
  const [clickedUsersMessages, setClickedUsersMessages] = useState<IFormattedMessage[]>([]);

  const getUsersMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages', {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUsersMessages(response.data);
    } catch (err) {
      throw new Error(`Error encountered ChatDisplay: ${err}`);
    }
  };

  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages', {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUsersMessages(response.data);
    } catch (err) {
      throw new Error(`Error encountered getClickedUsersMessages: ${err}`);
    }
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, []);

  const messages: IFormattedMessage[] = [];

  usersMessages?.forEach((message: IFormattedMessage) => {
    const formattedMessage = {} as IFormattedMessage;
    formattedMessage['name'] = user?.first_name;
    formattedMessage['img'] = user?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message: IFormattedMessage) => {
    const formattedMessage = {} as IFormattedMessage;
    formattedMessage['name'] = clickedUser?.first_name;
    formattedMessage['img'] = clickedUser?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </>
  );
};
