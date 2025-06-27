'use client';

import { useState } from 'react';

export default function ChatBox() {
 const [input, setInput] = useState('');
 const [messages, setMessages] = useState([]);

 const sendMessage = async () => {
  if (!input) return;

  const userMessage = { role: 'user', content: input };
  setMessages([...messages, userMessage]);
  setInput('');

  try {
   const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [...messages, userMessage] }),
   });

   if (!res.ok) {
    throw new Error('Network response was not ok');
   }

   const data = await res.json();
   const botMessage = { role: 'assistant', content: data.reply };
   setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
   console.error('Failed to fetch:', err);
   setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
  }
 };


 return (
  <div>
   <div style={{ marginBottom: '1rem' }}>
    {messages.map((msg, idx) => (
     <div key={idx}>
      <b>{msg.role === 'user' ? '🧑 You' : '🤖 Bot'}:</b> {msg.content}
     </div>
    ))}
   </div>
   <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type something..."
    style={{ padding: '0.5rem', width: '70%' }}
   />
   <button onClick={sendMessage} style={{ padding: '0.5rem' }}>Send</button>
  </div>
 );
}
