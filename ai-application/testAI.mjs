import 'dotenv/config'; // Load environment variables
import { Pinecone } from "@pinecone-database/pinecone";

// Debugging: Check if API key and environment are loaded
console.log("API Key:", process.env.PINECONE_API_KEY ? "Loaded" : "Undefined");
console.log("Environment:", process.env.PINECONE_ENV ? "Loaded" : "Undefined");

// Ensure API key and environment are present before initializing Pinecone
if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ENV) {
  console.error("❌ Missing Pinecone API key or environment. Check your .env file.");
  process.exit(1);
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

async function checkIndex() {
  try {
    const indexes = await pinecone.listIndexes(); // Returns { indexes: [...] }
    console.log("Available Indexes:", indexes.indexes);

    if (!Array.isArray(indexes.indexes) || !indexes.indexes.some(index => index.name === "rag-chat")) {
      console.error("❌ Index 'rag-chat' not found. Check Pinecone Console.");
      return;
    }

    console.log("✅ Index 'rag-chat' found.");
  } catch (error) {
    console.error("❌ Error accessing index:", error);
  }
}

// Run the function
checkIndex();
