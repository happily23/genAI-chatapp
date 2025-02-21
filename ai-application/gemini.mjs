import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

console.log("Google Gemini API Key:", process.env.GOOGLE_GEMINI_API_KEY ? "Loaded" : "Undefined");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function getEmbedding(text) {
    const model = genAI.getGenerativeModel({ model: "embedding-001" });

    try {
        const response = await model.embedContent({
            content: {
                role: "user",
                parts: [{ text }]
            }
        });

        const embedding = response.embedding.values;
        console.log("Embedding Dimension:", embedding.length);
        return embedding;
    } catch (error) {
        console.error("❌ Error fetching embedding:", error);
    }
}

// Test the function
getEmbedding("Hello, world!");
