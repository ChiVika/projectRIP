import React, { useState, useEffect } from 'react';
import './RoomChat.css'; // Импортируйте стили

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatSocket, setChatSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(
      'ws://' + window.location.host.replace('5173', '8000') + '/ws/chat/room/'
    );

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    socket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
      setIsConnected(false);
    };

    setChatSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (isConnected && messageInput.trim()) {
      chatSocket.send(JSON.stringify({ message: messageInput }));
      setMessageInput('');
    }
  };

  return (
    <div className="chat-container">
      <h1>Общий чат</h1>
      <textarea id="chat-log" cols="100" rows="20" value={messages.join('\n')} readOnly></textarea>
      <br />
      <input id="chat-message-input" type="text" size="100" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
      <br />
      <button id="chat-message-submit" onClick={handleSendMessage} disabled={!isConnected}>
        Отправить
      </button>
    </div>
  );
}

export default ChatRoom;
