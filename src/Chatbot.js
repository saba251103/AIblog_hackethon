import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { TextField, Button, Box, Typography, Paper, CircularProgress, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('what is ai');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput('');

      try {
        setLoading(true);
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAyXlJz_rNoQeXTz9xygbc_jHLB8f6qutw',
          {
            contents: [
              {
                parts: [
                  {
                    text: input
                  }
                ]
              }
            ]
          }
        );
        const botResponse = response.data.candidates[0].content.parts[0].text;
        setLoading(false);
        setMessages([...newMessages, { text: botResponse, user: false }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setLoading(false);
        setMessages([...newMessages, { text: 'Error: Could not get response from AI', user: false }]);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'linear-gradient(to right, #6dd5ed, #2193b0)',
        p: 4,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, color: 'black', fontWeight: 'bold' }}>
        AI ChatBot <ChatBubbleOutlineIcon fontSize="large" />
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 500,
          height: '70%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
          overflow: 'hidden',
        }}
      >
        {/* Chat Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            bgcolor: '#f9f9f9',
            borderRadius: 2,
            mb: 2,
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: msg.user ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  p: 2,
                  bgcolor: msg.user ? '#1976d2' : '#e0e0e0',
                  color: msg.user ? 'white' : 'black',
                  borderRadius: 2,
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </Box>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>

        {/* Input Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #ddd',
            pt: 2,
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            startIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ChatBot;
