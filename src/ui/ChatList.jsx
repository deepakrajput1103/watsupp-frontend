import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ChatList({ convs, selected }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <div className="space-y-2">
        {convs.map(c => (
          <Link key={c._id} to={`/chat/${c._id}`}>
            <div className={`p-3 rounded-lg hover:bg-white flex justify-between ${selected === c._id ? 'bg-white' : ''}`}>
              <div>
                <div className="font-medium">{c.name || c._id}</div>
                <div className="text-sm text-gray-500 truncate w-64">{c.lastMessage}</div>
              </div>
              <div className="text-xs text-gray-400">{c.lastTime ? dayjs(c.lastTime).format('HH:mm') : ''}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
