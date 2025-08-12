import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={1}
        className="flex-1 p-3 rounded-lg resize-none border" placeholder="Type a message" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
    </form>
  );
}
