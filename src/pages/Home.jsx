import React, { useEffect, useState } from 'react';
import ChatList from '../ui/ChatList';
import ChatWindow from '../ui/ChatWindow';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Home() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const { wa_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (wa_id) setSelected(wa_id);
  }, [wa_id]);

  async function fetchConversations() {
    try {
      const { data } = await api.get('/conversations');
      const convs = data.convs || [];
      setConversations(convs);
      if (!wa_id && convs.length) navigate(`/chat/${convs[0]._id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-full md:max-w-md border-r">
        <ChatList convs={conversations} selected={selected} />
      </div>
      <div className="flex-1">
        <ChatWindow wa_id={selected} />
      </div>
    </div>
  );
}
