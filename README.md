GenAI RAG Chat Application
Next.js | Google Gemini | Vector Database | Web Scraping

Overview
This project is a Retrieval-Augmented Generation (RAG) chat application that allows users to:
✅ Input URLs to scrape content.
✅ Convert the extracted text into vector embeddings.
✅ Store embeddings in a vector database (Pinecone).
✅ Use Google Gemini API to generate intelligent responses based on retrieved content.
✅ Interact with a chatbot in a modern web interface.

Tech Stack
Frontend:
Next.js 15 (React-based framework)
Tailwind CSS (for UI styling)
Backend:
Next.js API routes (server-side logic)
Cheerio (for web scraping)
Google Gemini API (for AI-powered responses)
Pinecone(for vector embedding storage)
How to Use
1️⃣ Enter one or more URLs in the input field.
2️⃣ Click Scrape to extract meaningful content.
3️⃣ The system processes and stores embeddings in a vector database.
4️⃣ Start chatting—the AI will retrieve relevant content and generate intelligent responses.Installation & Setup
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/happily23/rag-chat.git
cd rag-chat
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env.local file in the root directory and add:

ini
Copy
Edit
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_VECTOR_DB_URL=your_vector_database_url
4️⃣ Run the Application Locally
bash
Copy
Edit
npm run dev
Your app will be available at: http://localhost:3000

How to Use
1️⃣ Enter one or more URLs in the input field.
2️⃣ Click Scrape to extract meaningful content.
3️⃣ The system processes and stores embeddings in a vector database.
4️⃣ Start chatting—the AI will retrieve relevant content and generate intelligent responses.

Features & Improvements
Current Features:
✔️ Web scraping for content extraction.
✔️ Vector embeddings and storage.
✔️ RAG-based chatbot using Google Gemini API.
✔️ Modern Next.js UI with a chat interface.
