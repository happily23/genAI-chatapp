import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

console.log("Pinecone API Key:", process.env.PINECONE_API_KEY ? "Loaded" : "Undefined");
console.log("Pinecone Environment:", process.env.PINECONE_ENV ? "Loaded" : "Undefined");

const client = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = client.index("rag-chat"); // Ensure index is defined

export async function storeEmbeddings(id, embeddings) {
  try {
    await index.upsert([{ id, values: embeddings }]);
    console.log(`✅ Embeddings stored for ID: ${id}`);
  } catch (error) {
    console.error("❌ Error storing embeddings:", error);
  }
}

export async function retrieveRelevantContent(queryVector) {
  try {
    const response = await index.query({
      vector: queryVector,
      topK: 5,
      includeMetadata: true,
    });

    console.log("✅ Retrieved relevant content:", response.matches.length, "matches found");
    return response.matches;
  } catch (error) {
    console.error("❌ Error retrieving content:", error);
    return [];
  }
}
