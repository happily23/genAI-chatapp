import axios from "axios";
import * as cheerio from "cheerio";
import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "dotenv";
import { pipeline } from "@xenova/transformers"; // Free alternative to sentence-transformers

config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const indexName = "rag-chat-index";

// Embedding function
async function encodeText(text) {
  try {
    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    const output = await extractor(text, { pooling: "mean", normalize: true });

    console.log("✅ Raw Embeddings Output:", output);

    if (!output || !output.data) {
      throw new Error("Failed to generate embeddings");
    }

    // Ensure it's a flat array
    const embeddingArray = Array.isArray(output.data)
      ? output.data.flat()
      : Object.values(output.data).flat();

    console.log("✅ Embeddings Generated:", embeddingArray.length);
    return embeddingArray;
  } catch (error) {
    console.error("🚨 Embedding Error:", error.message);
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { url } = req.body;
    console.log(`🔍 Scraping content from: ${url}`);

    const response = await axios.get(url);

    if (!response.data) {
      throw new Error("Failed to fetch the page. Response data is empty.");
    }

    console.log("🔍 Response Data:", response.data?.substring(0, 500));

    const $ = cheerio.load(response.data);

    const paragraphs = $("p")
      .map((_, el) => $(el).text().trim())
      .get();
    let extractedText = paragraphs.join(" ");

    if (!extractedText.trim()) {
      return res.status(400).json({ message: "No readable text found." });
    }

    // Remove unnecessary text (cleaning extracted content)
    extractedText = extractedText.replace(/[^a-zA-Z0-9.,!? ]/g, " ");

    console.log(
      "✅ Extracted Text (Cleaned):",
      extractedText.substring(0, 500)
    );

    // Convert text to embeddings
    const textEmbedding = await encodeText(extractedText);

    // Validate embedding output
    if (!Array.isArray(textEmbedding) || textEmbedding.length === 0) {
      throw new Error("Embedding generation failed.");
    }

    console.log("✅ Embedding Length:", textEmbedding.length);

    const index = pinecone.Index(indexName);
    await index.upsert([
      { id: url, values: textEmbedding, metadata: { text: extractedText } },
    ]);

    console.log("✅ Stored in Pinecone:", url);
    return res
      .status(200)
      .json({ message: "Content scraped and stored successfully", url });
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
