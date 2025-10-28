// FIX: Implement functional component using Gemini API.
import React from 'react';
import { GoogleGenAI } from '@google/genai';

// Note: API key is managed by the environment and is not part of this component.
// Assume process.env.API_KEY is available.

const ContractGenerator: React.FC = () => {
  const [prompt, setPrompt] = React.useState('');
  const [contract, setContract] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const generateContract = async () => {
    if (!prompt) {
      setError('Please provide a mission objective.');
      return;
    }
    setError('');
    setLoading(true);
    setContract('');

    try {
      // FIX: Initialize GoogleGenAI with named apiKey parameter
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      // FIX: Use ai.models.generateContent instead of deprecated methods
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // Basic text task model
        contents: `Generate a short, cryptic, single-paragraph "contract" for a secret society mission based on this objective: "${prompt}". The tone should be similar to The Basement's rules. Do not use the words "contract", "objective", or "mission". The response should be text only, no markdown.`,
        config: {
          systemInstruction: 'You are the enigmatic leader of a secret society, issuing directives in a cryptic, minimalist style.',
        }
      });

      // FIX: Correctly extract text from the response
      const text = response.text;
      setContract(text);
    } catch (e) {
      console.error(e);
      setError('Failed to generate directive. The signal is weak.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black border border-[#FF69B4]/20 rounded-lg p-6">
      <h2 className="text-3xl font-normal uppercase tracking-[0.1em] text-center mb-6 text-glow" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        New Directive
      </h2>
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the mission objective..."
          className="w-full h-24 bg-black/50 border border-[#F8C7E8]/20 rounded-md p-2 font-mono text-[#F8C7E8] focus:outline-none focus:border-[#FF69B4] transition-colors"
          disabled={loading}
        />
        <button
          onClick={generateContract}
          disabled={loading}
          className="w-full bg-[#F8C7E8]/10 border border-[#F8C7E8] text-[#F8C7E8] py-2 rounded-md uppercase tracking-widest font-bold hover:bg-[#F8C7E8] hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Transmitting...' : 'Generate'}
        </button>
        {error && <p className="text-red-500 font-mono text-sm text-center">{error}</p>}
        {contract && (
          <div className="mt-4 p-4 bg-black/50 border border-[#F8C7E8]/10 rounded-md">
            <h3 className="text-xl font-bold text-[#F8C7E8] uppercase tracking-wider mb-2">Directive Received</h3>
            <p className="text-[#F8C7E8]/90 font-mono whitespace-pre-wrap">{contract}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractGenerator;