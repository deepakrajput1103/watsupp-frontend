import React from 'react';
import dayjs from 'dayjs';

export default function MessageBubble({ msg }) {
  const isMe = msg.direction === 'out' || msg.from === 'me';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-lg max-w-[70%] shadow`}
        style={{
          backgroundColor: isMe ? '#d9fdd3' : '#ffffff', // WhatsApp colors
          color: '#111',
          borderRadius: '8px',
          borderTopLeftRadius: isMe ? '8px' : '0',
          borderTopRightRadius: isMe ? '0' : '8px'
        }}
      >
        <div className="text-sm">{msg.text}</div>
        <div
          className="text-xs mt-1 flex justify-end items-center gap-1"
          style={{ color: isMe ? '#667781' : '#8696a0' }}
        >
          <div>{dayjs(msg.timestamp).format('HH:mm')}</div>
          {isMe && (
            <div>
              {msg.status === 'read'
                ? '✔✔'
                : msg.status === 'delivered'
                ? '✔✔'
                : '✔'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
