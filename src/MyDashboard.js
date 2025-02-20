import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Container
} from '@mui/material';
import {
  Menu as MenuIcon,
  Timer as TimerIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MyCalendar from './Calender';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const MyDashboard = () => {
  const [open, setOpen] = useState(true);
  const [pomodoroData, setPomodoroData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [articles, setArticles] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Mock data
    setPomodoroData([
      { date: 'Mon', completed: 4 },
      { date: 'Tue', completed: 6 },
      { date: 'Wed', completed: 3 },
      { date: 'Thu', completed: 8 },
      { date: 'Fri', completed: 5 }
    ]);

    setCommentsData([
      { name: 'Technical', value: 30 },
      { name: 'Questions', value: 25 },
      { name: 'Feedback', value: 20 },
      { name: 'Discussion', value: 25 }
    ]);

    setArticles(12);
  }, []);

  const menuItems = [
    { text: 'Pomodoro', icon: <TimerIcon />, path: '/Pomodoro' },
    { text: 'Issues', icon: <AssignmentIcon />, path: '/Comment' },
    { text: 'Home', icon: <HomeIcon />, path: '/Welcome' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/Dashboard' },
    { text: 'Previous Blogs', icon: <BookIcon />, path: '/PreviousBlogs' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Productivity Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
        open={open}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 1 }}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Box sx={{ minHeight: 64 }} />
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4 }}>
            Welcome back
          </Typography>

          <Card sx={{ mb: 4 }}>
            <CardHeader title="Calendar" />
            <CardContent>
              <MyCalendar />
            </CardContent>
          </Card>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="Pomodoro Progress" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={pomodoroData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="completed" stroke="#1976d2" strokeWidth={2} dot={{ fill: '#1976d2' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="Comments Overview" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={commentsData} cx="50%" cy="50%" outerRadius={80} fill="#1976d2" dataKey="value" label />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="Articles Completed" />
                <CardContent>
                  <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h2" color="primary">
                      {articles}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Total Articles
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default MyDashboard;