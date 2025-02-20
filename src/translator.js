
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

const LanguageTranslator = () => {
  const [language, setLanguage] = useState("en");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleLanguageChange = async (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    if (!text.trim()) return; // Don't translate empty input

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${selectedLanguage}&dt=t&q=${encodeURIComponent(text)}`
      );
      const data = await response.json();
      setTranslatedText(data[0][0][0]); // Extract translated text
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Translation failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "90%",
          maxWidth: "1200px",
          padding: 4,
          borderRadius: 4,
          backgroundColor: "#ffffff",
        }}
      >
        {/* Heading */}
        <Typography variant="h4" align="center" gutterBottom>
          🇮🇳 Indian Language Translator
        </Typography>

        {/* Content Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            mt: 4,
          }}
        >
          {/* Your Text Section */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Your Text
            </Typography>
            <TextField
              multiline
              rows={10}
              variant="outlined"
              fullWidth
              placeholder="Type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Translated Text Section */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Translation
            </Typography>
            <Box
              sx={{
                height: "100%",
                minHeight: "150px",
                padding: 2,
                backgroundColor: "#e8f5e9",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography align="center">
                {translatedText || "Your translation will appear here..."}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Language Selector */}
        <Box sx={{ display: "flex", justifyContent: "left", mt: 8 }}> {/* Increased mt from 4 to 8 */}
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel id="language-select-label">Language</InputLabel>
    <Select
      labelId="language-select-label"
      value={language}
      onChange={handleLanguageChange}
    >
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
</Box>

      </Paper>
    </Box>
  );
};

export default LanguageTranslator;