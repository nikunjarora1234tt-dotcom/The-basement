// FIX: Implement functional component using Gemini API for chat.
import React, { useState, useRef, useEffect } from 'react';
// FIX: Import `Content` type for chat history.
import { GoogleGenAI, Chat, Content } from '@google/genai';
import { INITIAL_CHAT_HISTORY } from '../constants';
import { Message } from '../types';

interface ChatroomsProps {
  onCrash: (messages: string[]) => void;
}

const Chatrooms: React.FC<ChatroomsProps> = ({ onCrash }) => {
  const [activeChannel, setActiveChannel] = useState<string>(Object.keys(INITIAL_CHAT_HISTORY)[0]);
  const [chats, setChats] = useState<Record<string, Message[]>>(INITIAL_CHAT_HISTORY);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // FIX: Store chat sessions in a ref to persist them across re-renders.
  const chatSessionsRef = useRef<Record<string, Chat>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const aiRef = useRef<GoogleGenAI | null>(null);
  useEffect(() => {
      // FIX: Initialize GoogleGenAI with named apiKey parameter.
      aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  }, []);

  useEffect(() => {
    // FIX: Initialize chat session for the active channel if it doesn't exist.
    // This preserves conversation history when switching between channels.
    if (aiRef.current && !chatSessionsRef.current[activeChannel]) {
        const history: Content[] = INITIAL_CHAT_HISTORY[activeChannel].map(m => ({
            role: m.sender,
            parts: [{ text: m.text }],
        }));
        
        // FIX: Use ai.chats.create to start a new stateful chat session.
        chatSessionsRef.current[activeChannel] = aiRef.current.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are a member of a secret, underground club. Your personality is cynical, philosophical, and detached, similar to characters from Fight Club. Respond to messages in a short, punchy, and thought-provoking way. Don't be overly helpful. You are talking to other members in a private, encrypted chat room.`,
            },
            history: history,
        });
    }
  }, [activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChannel]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const forbiddenPattern = /fight\s*club|fc/i;
    if (forbiddenPattern.test(userInput)) {
      onCrash(['YOU BROKE THE FIRST RULE.', 'YOU BROKE THE SECOND RULE.']);
      return;
    }

    const userMessage: Message = { sender: 'user', text: userInput };
    setChats(prev => ({
      ...prev,
      [activeChannel]: [...prev[activeChannel], userMessage],
    }));
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      const chatSession = chatSessionsRef.current[activeChannel];
      if (!chatSession) {
        throw new Error("Chat session not initialized.");
      }
      
      // FIX: Use chat.sendMessage with a string argument for conversation.
      const response = await chatSession.sendMessage({ message: currentInput });

      // FIX: Correctly extract text from the response.
      const modelResponseText = response.text;
      const modelMessage: Message = { sender: 'model', text: modelResponseText };

      setChats(prev => ({
        ...prev,
        [activeChannel]: [...prev[activeChannel], modelMessage],
      }));
    } catch (error) {
      console.error('Failed to get response from Gemini:', error);
      const errorMessage: Message = { sender: 'model', text: '...the signal is lost.' };
      setChats(prev => ({
        ...prev,
        [activeChannel]: [...prev[activeChannel], errorMessage],
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  const channelNames: Record<string, string> = {
    'remaining-men': 'Remaining Men',
    'survivors-group': 'Survivors Group',
    'bitch-tits': 'Bitch Tits',
  };

  return (
    <div className="bg-black border border-[#FF69B4]/20 rounded-lg p-6 flex flex-col h-[600px]">
      <h2 className="text-3xl font-normal uppercase tracking-[0.1em] text-center mb-4" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        Encrypted Comms
      </h2>
      <div className="flex border-b border-[#F8C7E8]/20 mb-4">
        {Object.keys(INITIAL_CHAT_HISTORY).map((channel) => (
          <button
            key={channel}
            onClick={() => setActiveChannel(channel)}
            className={`px-4 py-2 font-mono text-sm uppercase transition-colors ${
              activeChannel === channel
                ? 'text-[#F8C7E8] border-b-2 border-[#F8C7E8]'
                : 'text-[#F8C7E8]/60 hover:text-[#F8C7E8]'
            }`}
          >
            #{channelNames[channel]}
          </button>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
        {chats[activeChannel]?.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg font-mono text-sm ${
                msg.sender === 'user'
                  ? 'bg-[#F8C7E8]/10 text-[#F8C7E8]'
                  : 'bg-black/50 border border-[#F8C7E8]/10 text-[#F8C7E8]/90'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-[80%] p-3 rounded-lg font-mono text-sm bg-black/50 border border-[#F8C7E8]/10 text-[#F8C7E8]/90">
               <span className="animate-pulse">...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="You are not your username..."
          className="flex-grow bg-black/50 border border-[#F8C7E8]/20 rounded-md p-2 font-mono text-[#F8C7E8] focus:outline-none focus:border-[#FF69B4] transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#F8C7E8]/10 border border-[#F8C7E8] text-[#F8C7E8] px-4 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-[#F8C7E8] hover:text-black transition-colors duration-300 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatrooms;