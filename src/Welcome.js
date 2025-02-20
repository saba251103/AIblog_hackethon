import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { BookOpen, Target, PenTool, FileText, Image, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 8, backgroundImage: 'url(https://source.unsplash.com/1600x900/?workspace,night)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        {/* Welcome Section */}
        <Box textAlign="center" mb={12} sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.85)', borderRadius: 4, boxShadow: 3 }}>
          <Box sx={{ display: 'inline-block', p: 4, borderRadius: '50%', bgcolor: '#6b46c1', mb: 3 }}>
            <FileText size={32} color="#fff" />
          </Box>
          <Typography variant="h2" color="text.primary" gutterBottom>
            Welcome to BlogAI
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="sm" mx="auto">
            Choose your path to create engaging blog content
          </Typography>
        </Box>

        {/* Feature Cards - Horizontal Layout */}
        <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', pb: 6 }}>
          {[ 
            { icon: BookOpen, title: 'Topic Discovery', description: "Setup your blog's direction with AI-powered topic suggestions and trending analysis.", color: '#6b46c1', path: '/recent' },
            { icon: Target, title: 'Research Assistant', description: 'Get instant access to verified facts, statistics, and reliable sources.', color: '#3182ce', path: '/Research_chat' },
            { icon: PenTool, title: 'AI Writer', description: 'Generate engaging content with AI assistance and real-time suggestions.', color: '#38a169', path: '/AIBlogCreator' },
            { icon: Globe, title: 'Translation', description: 'Translate your content into multiple languages with one click.', color: '#319795', path: '/LanguageTranslator' },
          ].map((feature, index) => (
            <Card 
              key={index} 
              sx={{ flex: '0 0 auto', width: 380, bgcolor: 'rgba(255, 255, 255, 0.9)', boxShadow: 3, borderRadius: 3, transition: 'transform 0.3s', ':hover': { transform: 'scale(1.05)' } }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', bgcolor: feature.color + '20', mb: 2 }}>
                  <feature.icon size={28} color={feature.color} />
                </Box>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  {feature.description}
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ bgcolor: feature.color, ':hover': { bgcolor: feature.color } }} 
                  fullWidth 
                  onClick={() => handleNavigation(feature.path)}
                >
                  Explore {feature.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Quick Start */}
        <Box textAlign="center" mt={8}>
          <Button variant="text" color="primary" onClick={() => handleNavigation('/Dashboard')}>
            Skip to Dashboard →
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;