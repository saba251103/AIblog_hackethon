import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Paper,
  ThemeProvider,
  createTheme,
  Grid,
  Chip,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LanguageIcon from "@mui/icons-material/Language";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import VideocamIcon from "@mui/icons-material/Videocam";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const theme = createTheme({
  palette: {
    primary: { main: "#5d48e2" },
    secondary: { main: "#f06292" },
    background: { default: "#f9f7ff" },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #5d48e2 0%, #7258ff 100%)",
  color: "#fff",
  fontWeight: 600,
  padding: "12px 32px",
  borderRadius: 30,
  "&:hover": { boxShadow: "0 8px 25px rgba(93, 72, 226, 0.5)" },
}));

const LanguageTranslator = ({ language, setLanguage }) => (
  <FormControl fullWidth variant="outlined">
    <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <MenuItem value="en">English (अंग्रेज़ी)</MenuItem>
      <MenuItem value="hi">Hindi (हिन्दी)</MenuItem>
      <MenuItem value="mr">Marathi (मराठी)</MenuItem>
      <MenuItem value="ta">Tamil (தமிழ்)</MenuItem>
      <MenuItem value="te">Telugu (తెలుగు)</MenuItem>
      <MenuItem value="bn">Bengali (বাংলা)</MenuItem>
      <MenuItem value="gu">Gujarati (ગુજરાતી)</MenuItem>
      <MenuItem value="kn">Kannada (ಕನ್ನಡ)</MenuItem>
      <MenuItem value="ml">Malayalam (മലയാളം)</MenuItem>
      <MenuItem value="pa">Punjabi (ਪੰਜਾਬੀ)</MenuItem>
      <MenuItem value="ur">Urdu (اردو)</MenuItem>
      <MenuItem value="or">Odia (ଓଡ଼ିଆ)</MenuItem>
      <MenuItem value="as">Assamese (অসমীয়া)</MenuItem>
    </Select>
  </FormControl>
);

export default function AIBlogCreator() {
  const [blogTitle, setBlogTitle] = useState("");
  const [language, setLanguage] = useState("en");
  const [contentType, setContentType] = useState("text");
  const [loading, setLoading] = useState(false);
  const [blogContent, setBlogContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [publishing, setPublishing] = useState(false); // New state for publishing
  const handleGenerateBlog = async () => {
    if (!blogTitle) {
      alert("Please enter a blog title");
      return;
    }

    setLoading(true);
    setBlogContent("");
    setVideoUrl("");

    try {
      const response = await fetch("http://172.20.10.5:5000/generate_blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: blogTitle, language, blog_type: contentType }),
      });

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        setBlogContent(data.blog);
        setVideoUrl(data.video_url);
      }
    } catch (error) {
      alert("Failed to generate blog. Please try again.");
    }

    setLoading(false);
  };

  const exportAsPDF = () => {
    const input = document.getElementById("blog-content");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("generated-blog.pdf");
    });
  };

  const handleListenBlog = () => {
    if (!blogContent) return;

    const synth = window.speechSynthesis;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(blogContent);
    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    synth.speak(utterance);
  };

  const handlePublishToTelegram = async () => {
    if (!blogContent) {
      alert("No blog content to publish.");
      return;
    }

    setPublishing(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/publish_telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: blogTitle, content: blogContent }),
      });

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        alert("Blog published to Telegram successfully!");
      }
    } catch (error) {
      alert("Failed to publish to Telegram. Please try again.");
    }

    setPublishing(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", py: 8, backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" color="primary" gutterBottom>
            <AutoAwesomeIcon fontSize="large" /> AI Blog Creator
          </Typography>
          <StyledPaper elevation={3}>
            <FormField>
              <Chip icon={<TextFieldsIcon />} label="Blog Topic" color="primary" />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your blog topic"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </FormField>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormField>
                  <Chip icon={<LanguageIcon />} label="Language" color="primary" />
                  <LanguageTranslator language={language} setLanguage={setLanguage} />
                </FormField>
              </Grid>

              <Grid item xs={6}>
                <FormField>
                  <Chip icon={<VideocamIcon />} label="Content Type" color="primary" />
                  <FormControl fullWidth variant="outlined">
                    <Select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="video">Video</MenuItem>
                    </Select>
                  </FormControl>
                </FormField>
              </Grid>
            </Grid>

            <GradientButton fullWidth onClick={handleGenerateBlog} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Generate Blog"}
            </GradientButton>

            {blogContent && (
              <>
                <Box id="blog-content">
                  <ReactQuill theme="snow" value={blogContent} onChange={setBlogContent} />
                </Box>
                <GradientButton fullWidth onClick={exportAsPDF} sx={{ mt: 2 }}>
                  Export as PDF
                </GradientButton>
                <GradientButton fullWidth onClick={handleListenBlog} sx={{ mt: 2 }}>
                  <VolumeUpIcon /> {isSpeaking ? "Stop Listening" : "Listen to Blog"}
                </GradientButton>
                <GradientButton fullWidth  sx={{ mt: 2 }} disabled={publishing}>
                  {publishing ? <CircularProgress size={24} /> : "Publish to Telegram"}
                </GradientButton>
              </>
            )}

            {videoUrl && <video controls width="100%" src={videoUrl} />}
          </StyledPaper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}