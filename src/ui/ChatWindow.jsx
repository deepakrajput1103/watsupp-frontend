import React, { useEffect, useState, useRef } from 'react';
import { api } from '../api';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ wa_id }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (wa_id) fetchMessages(wa_id);
  }, [wa_id]);

  async function fetchMessages(id) {
    try {
      const { data } = await api.get(`/conversations/${id}/messages`);
      setMessages(data.msgs || []);
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  }

  function scrollToBottom() {
    setTimeout(
      () => scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
      50
    );
  }

  async function handleSend(text) {
    if (!wa_id || !text) return;
    const optimistic = {
      msg_id: 'local_' + Date.now(),
      wa_id,
      from: 'me',
      text,
      direction: 'out',
      status: 'sent',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimistic]);
    scrollToBottom();
    try {
      await api.post('/messages/send', { wa_id, name: wa_id, message: text });
    } catch (err) {
      console.error(err);
    }
  }

  if (!wa_id) return <div className="p-6">Select a chat to start</div>;

  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="p-4 border-b bg-green-600 text-white">
        <div className="font-semibold">{wa_id}</div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-auto p-4 space-y-3"
        style={{ backgroundColor: '#ece5dd' }} // WhatsApp background
      >
        {messages.map(m => (
          <MessageBubble key={m.msg_id || Math.random()} msg={m} />
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t bg-white">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
