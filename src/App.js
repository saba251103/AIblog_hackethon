import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './Welcome';
import Signup from './signup';
import Login from './login';
import PomodoroTimer from './Pomodoro';
import CommentTracker from './Comment';
import MyCalendar from './Calender';
import Dashboard from './MyDashboard';
import RecentArticles from './recent';
import ChatBot from './Chatbot';
import LanguageTranslator from './translator';
import PreviousBlogs from './blog';
import AIBlogCreator from './aiblog';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Welcome" element={<WelcomeScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/Pomodoro" element={<PomodoroTimer />} />
        <Route path="/Comment" element={<CommentTracker />} />
        <Route path="/Calender" element={<MyCalendar />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Recent" element={<RecentArticles />} />
        <Route path="/Research_chat" element={<ChatBot />} />
        <Route path="/LanguageTranslator" element={<LanguageTranslator />} />
        <Route path="/PreviousBlogs" element={<PreviousBlogs/>} />
        <Route path="/AIBlogCreator" element={<AIBlogCreator />} />
        
      </Routes>
    </Router>
  );
};

export default App;
