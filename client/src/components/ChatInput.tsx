import React, { useState } from 'react';

export const ChatInput = () => {
  const [textArea, setTexArea] = useState('');
  return (
    <div className={'chat-input'}>
      <textarea value={textArea} onChange={e => setTexArea(e.target.value)} />
      <button className={'secondary-button'}>Submit</button>
    </div>
  );
};
