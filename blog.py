import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from bs4 import BeautifulSoup
from dotenv import load_dotenv
load_dotenv()


# 🔹 Load API keys securely (Replace with environment variables in production)
GENAI_API_KEY = os.getenv("GENAI_API_KEY")
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")  # Replace with your actual Chat ID

# Validate API keys
if not all([GENAI_API_KEY, PEXELS_API_KEY, BOT_TOKEN, CHAT_ID]):
    raise ValueError("Missing API keys. Set GENAI_API_KEY, PEXELS_API_KEY, BOT_TOKEN, and CHAT_ID.")

# Initialize Flask app
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# Configure Gemini AI
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

@app.route('/generate_blog', methods=['POST'])
def generate_blog():
    """Generate a blog in text or video format based on user input."""
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be in JSON format"}), 400
        
        data = request.get_json()
        topic = data.get("topic")
        language = data.get("language", "English")
        blog_type = data.get("blog_type", "text")

        if not topic:
            return jsonify({"error": "Topic is required"}), 400

        # Generate blog content
        prompt = f"Write a detailed and engaging blog post on the topic: {topic}. The blog should be written in {language}. Provide a list of references and citations."
        response = model.generate_content(prompt)
        blog_content = response.text if response and hasattr(response, 'text') else "Failed to generate blog content."

        # Fetch a relevant video if the user selects "video"
        video_url = fetch_pexels_video(topic) if blog_type == "video" else ""

        return jsonify({
            "blog": blog_content,
            "video_url": video_url
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def fetch_pexels_video(topic):
    """Fetch a relevant video from Pexels API."""
    try:
        headers = {"Authorization": PEXELS_API_KEY}
        params = {"query": topic, "per_page": 1}
        response = requests.get("https://api.pexels.com/videos/search", headers=headers, params=params)

        if response.ok:
            video_data = response.json()
            return video_data["videos"][0]["video_files"][0]["link"] if video_data["videos"] else ""

    except Exception as e:
        print(f"Error fetching video: {e}")

    return ""

@app.route('/get_citations', methods=['POST'])
def get_citations():
    """Fetch references for the generated blog content using Gemini."""
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be in JSON format"}), 400
        
        data = request.get_json()
        blog_content = data.get("blog_content")

        if not blog_content:
            return jsonify({"error": "Blog content is required"}), 400

        prompt = f"Provide a list of references and citations for the following blog content:\n{blog_content}"
        response = model.generate_content(prompt)
        
        citations = response.text.split("\n") if response and hasattr(response, 'text') else ["No references found."]

        return jsonify({"citations": citations})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/publish_telegram', methods=['POST'])
def publish_telegram():
    """Send generated blog content to Telegram."""
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be in JSON format"}), 400

        data = request.get_json()
        blog_title = data.get("title", "🚀 AI-Assisted Blog Creator!")
        blog_content = data.get("content")

        if not blog_content:
            return jsonify({"error": "Blog content is required"}), 400

        # Log the incoming data for debugging
        print(f"Title: {blog_title}, Content: {blog_content[:50]}...")  # Print first 50 characters of content

        # Strip HTML tags and convert to plain text
        blog_content_plain = BeautifulSoup(blog_content, "html.parser").get_text()

        # Prepare the message
        message = f"📢 *{blog_title}*\n\n{blog_content_plain}\n\n🔗 Read more: [Your Blog](https://yourblog.com)"

        # Trim the message if it exceeds Telegram's limit
        if len(message) > 4096:
            message = message[:4096 - 20] + "\n\n[Message truncated due to length]"  # Leave space for the truncation note

        # Telegram API URL
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

        # Send the message
        response = requests.post(url, data={"chat_id": CHAT_ID, "text": message, "parse_mode": "Markdown"})

        if response.ok:
            return jsonify({"message": "Blog published to Telegram successfully!"})
        else:
            # Log the response from Telegram for debugging
            print(f"Telegram API error: {response.text}")
            return jsonify({"error": "Failed to publish to Telegram", "details": response.json()}), 500

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error for debugging
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)




