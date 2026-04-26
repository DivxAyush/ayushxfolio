import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Gemini API client safely inside the route handler
export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured.' }, { status: 500 });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);

    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Set up the context for the AI
    const systemPrompt = `You are the AI assistant for Ayush Kumar, a talented Frontend/Full Stack Engineer. 
Your goal is to answer questions from visitors visiting his portfolio website.
Ayush specializes in building immersive, high-performance web experiences using React, Next.js, Three.js, Node.js, Tailwind CSS, and Framer Motion. 
He is currently open to new full-time roles and freelance opportunities.
Always be professional, concise, slightly technical but friendly, and use an Apple/Unix terminal vibe occasionally if it fits. 
Keep your answers brief (1-3 sentences max) since they are displayed in a small terminal window.
Do not use markdown formatting like bold/italics unless necessary, keep it plain text mostly.
If asked about his location, he is based in India.
If you don't know the answer, say "I don't have that information, but you can reach out to Ayush directly."`;

    // Use Gemini 1.5 Flash (the recommended fast model)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: systemPrompt 
    });

    // Format previous history for Gemini
    const formattedHistory = history ? history.map(msg => ({
      role: msg.type === 'q' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })) : [];

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 150, // Keep responses short
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ answer: responseText });
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
