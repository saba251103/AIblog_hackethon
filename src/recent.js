import React, { useState } from "react";
import { Box, Button, Card, CardContent, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";

const API_KEY = ""; // Replace with your actual API key

const RecentArticles = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    if (!query.trim()) return; // Prevent empty searches
    setLoading(true);

    try {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          query: query,
          search_depth: "basic",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setArticles(data.results || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#E3F2FD", display: "flex", justifyContent: "center", alignItems: "center", p: 3 }}>
      <Paper elevation={5} sx={{ maxWidth: 800, width: "100%", p: 4, bgcolor: "white", borderRadius: 4 }}>
        <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
          Search for Articles
        </Typography>

        {/* Search Input */}
        <Box display="flex" gap={2} mb={3}>
          <TextField 
            fullWidth 
            variant="outlined" 
            label="Enter topic..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={fetchArticles}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Search"}
          </Button>
        </Box>

        {/* Display Articles */}
        {loading ? (
          <Typography textAlign="center">Loading articles...</Typography>
        ) : articles.length > 0 ? (
          <Grid container spacing={2}>
            {articles.map((article, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ bgcolor: "#E3F2FD", borderRadius: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                        {article.title}
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center">No articles found. Try another search.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RecentArticles;
