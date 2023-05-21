import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Function to handle sending a message
  const sendMessage = async () => {
    if (input.trim() === '') return;
    // Add the user's message to the conversation
    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');

    try {
      // Make the API request
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            ...updatedMessages,
            { role: 'system', content: 'hey there whats your favourite colour' },
          ],
          max_tokens: 50,
          temperature: 0.6,
          n: 1,
          stop: '\n',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        }
      );

      // Add the AI's response to the conversation
      const assistantMessage = response.data.choices[0].message.content;
      setMessages([...updatedMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.log('Failed to send message:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === 'user' ? (
              <p>User: {message.content}</p>
            ) : (
              <p>Assistant: {message.content}</p>
            )}
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
