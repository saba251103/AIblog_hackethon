import React, { useState } from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Box } from "@mui/material";

const blogs = [
  {
    title: "The Future of AI in Web Development",
    description: "Exploring how AI is shaping modern web applications, from chatbots to predictive UX design."
  },
  {
    title: "Understanding React State Management",
    description: "An in-depth guide to handling state efficiently using Context API, Redux, and React Query."
  },
  {
    title: "Top 10 UI/UX Trends in 2025",
    description: "A look at emerging design trends that will dominate web and app development in the coming years."
  },
  {
    title: "Building Scalable Web Apps with Firebase",
    description: "Learn how Firebase helps in authentication, database management, and cloud functions."
  },
  {
    title: "The Future of AI in Web Development",
    description: "Exploring how AI is shaping modern web, from chatbots to predictive UX design."
  },
  {
    title: "Optimizing Performance in React Apps",
    description: "Tips and techniques to speed up rendering, improve lazy loading, and optimize API calls."
  }
];

const PreviousBlogs = () => {
  const [showBlogs, setShowBlogs] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, pb: 5, backgroundColor: "#f5faff", borderRadius: 3, textAlign: "center" }}>
      {/* Page Heading */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mt: 3 }}>
        Previous Blogs
      </Typography>

      {/* Show Blogs Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setShowBlogs(!showBlogs)} 
        sx={{ mb: 3, textTransform: "none", fontWeight: "bold" }}
      >
       Show Blogs
      </Button>

      {/* Blog Grid - Only displayed if showBlogs is true */}
      {showBlogs && (
        <Box sx={{ transition: "0.5s ease-in-out", opacity: showBlogs ? 1 : 0 }}>
          <Grid container spacing={4} justifyContent="center">
            {blogs.map((blog, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default PreviousBlogs;
