import React from 'react';

type FormattedMessageType = {
  message: {
    first_name: string;
    img: string;
    message: string;
  };
  timestamp: string;
};
interface ChatProps {
  descendingOrderMessages: FormattedMessageType[] | undefined;
}

export const Chat = ({ descendingOrderMessages }: ChatProps) => {
  return (
    <>
      <div className={'chat-display'}>
        {descendingOrderMessages?.map(({ message }: FormattedMessageType, _idx: number) => (
          <div key={_idx}>
            <div className={'chat-container-header'}>
              <div className={'img-container'}>
                <img src={message.img} alt={message.first_name + ' profile'} />
              </div>
              <p>{message.first_name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};
