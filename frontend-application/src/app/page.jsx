"use client";

import { useState } from "react";
import { ChakraProvider, Box, Button, Input, Text, VStack, Heading } from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
    const [url, setUrl] = useState("");
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    async function handleScrape() {
        try {
            await axios.post("http://localhost:5000/scrape", { url });
            alert("Content scraped successfully!");
        } catch (error) {
            alert("Failed to scrape URL.");
        }
    }

    async function handleChat() {
        try {
            const res = await axios.post("http://localhost:5000/chat", { query });
            setResponse(res.data.response);
        } catch (error) {
            alert("Failed to fetch response.");
        }
    }

    return (
        <ChakraProvider>
            <VStack spacing={4} p={5}>
                <Heading>RAG Chat Application</Heading>

                <Input placeholder="Enter URL to scrape" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button colorScheme="blue" onClick={handleScrape}>Scrape Content</Button>

                <Input placeholder="Ask a question..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button colorScheme="green" onClick={handleChat}>Ask</Button>

                <Box p={4} border="1px solid gray" borderRadius="md" w="full">
                    <Text fontWeight="bold">Bot Response:</Text>
                    <Text>{response}</Text>
                </Box>
            </VStack>
        </ChakraProvider>
    );
}
