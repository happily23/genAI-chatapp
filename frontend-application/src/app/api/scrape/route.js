import { NextResponse } from "next/server";
import axios from "axios";
import weaviate from "weaviate-client";

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080", // Update if using a remote Weaviate instance
});

export async function POST(req) {
  try {
    const { url } = await req.json();
    const { data } = await axios.get(url);
    const content = data.replace(/<[^>]*>?/gm, ""); // Remove HTML tags

    await client.data.creator()
      .withClassName("Document")
      .withProperties({ text: content })
      .do();

    return NextResponse.json({ message: "Scraping & storage successful" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to scrape" }, { status: 500 });
  }
}
