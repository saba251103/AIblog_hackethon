// CommentTracker.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Alert,
  IconButton,
  Stack,
  Card,
  CardContent,
  FormGroup,
} from '@mui/material';
import {
  Message as MessageIcon,
  BugReport as BugIcon,
  Error as IssueIcon,
  Image as ImageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  AddPhotoAlternate as AddPhotoIcon,
} from '@mui/icons-material';

const CommentTracker = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    type: 'comment',
    message: '',
    hasImageIssue: false,
    image: null,
    timestamp: '',
  });
  const [notification, setNotification] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewComment({ ...newComment, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.message) {
      setNotification('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setComments(
        comments.map((comment) =>
          comment.id === editingId
            ? {
                ...newComment,
                id: editingId,
                timestamp: new Date().toLocaleString() + ' (edited)',
              }
            : comment
        )
      );
      setEditingId(null);
      setNotification('Comment updated!');
    } else {
      const commentToAdd = {
        ...newComment,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, commentToAdd]);
      setNotification(`New ${commentToAdd.type} added!`);
    }

    setNewComment({
      name: '',
      type: 'comment',
      message: '',
      hasImageIssue: false,
      image: null,
      timestamp: '',
    });
    setTimeout(() => setNotification(''), 3000);
  };

  const handleEdit = (comment) => {
    setNewComment({
      name: comment.name,
      type: comment.type,
      message: comment.message,
      hasImageIssue: comment.hasImageIssue,
      image: comment.image,
    });
    setEditingId(comment.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(comments.filter((comment) => comment.id !== id));
      setNotification('Comment deleted!');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const getIcon = (type, hasImageIssue) => {
    if (hasImageIssue) return <ImageIcon color="warning" />;
    switch (type) {
      case 'issue':
        return <IssueIcon color="error" />;
      case 'bug':
        return <BugIcon color="warning" />;
      default:
        return <MessageIcon color="primary" />;
    }
  };

  const filteredAndSortedComments = comments
    .filter((comment) => {
      const matchesSearch =
        comment.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || comment.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
    });

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Collaboration Tracker
      </Typography>

      {notification && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {notification}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Your Name"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({ ...newComment, name: e.target.value })
              }
            />

            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newComment.type}
                  label="Type"
                  onChange={(e) =>
                    setNewComment({ ...newComment, type: e.target.value })
                  }
                >
                  <MenuItem value="comment">Comment</MenuItem>
                  <MenuItem value="issue">Issue</MenuItem>
                  <MenuItem value="bug">Bug</MenuItem>
                </Select>
              </FormControl>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newComment.hasImageIssue}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          hasImageIssue: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Image Problem"
                />
              </FormGroup>
            </Stack>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Your message"
              value={newComment.message}
              onChange={(e) =>
                setNewComment({ ...newComment, message: e.target.value })
              }
            />

            <Box>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AddPhotoIcon />}
                >
                  Upload Image
                </Button>
              </label>
              {newComment.image && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={newComment.image}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                  <Button
                    color="error"
                    onClick={() =>
                      setNewComment({ ...newComment, image: null })
                    }
                    sx={{ mt: 1 }}
                  >
                    Remove Image
                  </Button>
                </Box>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              {editingId ? 'Update' : 'Submit'}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            placeholder="Search comments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
          />

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterType}
              label="Filter"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="comment">Comments</MenuItem>
              <MenuItem value="issue">Issues</MenuItem>
              <MenuItem value="bug">Bugs</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={() =>
              setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
            }
          >
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </Button>
        </Stack>
      </Box>

      <Stack spacing={2}>
        {filteredAndSortedComments.map((comment) => (
          <Card key={comment.id}>
            <CardContent>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {getIcon(comment.type, comment.hasImageIssue)}
                  <Typography variant="subtitle1" fontWeight="bold">
                    {comment.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {comment.timestamp}
                  </Typography>
                </Stack>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(comment)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(comment.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {comment.message}
              </Typography>
              {comment.image && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={comment.image}
                    alt="Issue screenshot"
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default CommentTracker;