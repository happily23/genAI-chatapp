import { NextResponse } from "next/server";
import weaviate from "weaviate-client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

export async function POST(req) {
  try {
    const { query } = await req.json();

    // Retrieve relevant context from Weaviate
    const result = await client.graphql.get()
      .withClassName("Document")
      .withFields("text")
      .withNearText({ concepts: [query] })
      .withLimit(1)
      .do();
    
    const context = result.data.Get.Document[0]?.text || "No relevant data found.";

    // Query Gemini API with context
    const chat = await genAI.getChatSession();
    const response = await chat.sendMessage(`Context: ${context}\nQuestion: ${query}`);
    
    return NextResponse.json({ response: response.text() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chat response" }, { status: 500 });
  }
}
