
import React, { useState, useRef, useEffect } from 'react';
import { Job, ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { SendIcon } from './icons/SendIcon';
import { JobCard } from './JobCard';

interface ChatbotProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ jobs, onViewDetails }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { text, jobIds } = await getChatbotResponse(input, jobs);
      const matchedJobs = jobs.filter(job => jobIds.includes(job.id));
      const botMessage: ChatMessage = { sender: 'bot', text, jobs: matchedJobs };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Ocorreu um erro. Por favor, tente novamente.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-full max-w-md z-40">
      <div className="bg-white rounded-lg shadow-2xl flex flex-col h-[60vh]">
        <header className="bg-primary text-white p-4 rounded-t-lg flex items-center">
          <SparklesIcon className="w-6 h-6 mr-2" />
          <h2 className="font-bold text-lg">Busca Inteligente de Vagas</h2>
        </header>

        <div className="flex-1 p-4 overflow-y-auto bg-background">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    <p>Precisa de ajuda para encontrar uma vaga?</p>
                    <p className="text-sm mt-2">Ex: "vagas de TI remotas com horário flexível"</p>
                </div>
            )}
            <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-background-secondary text-text-main'}`}>
                            <p>{msg.text}</p>
                            {msg.sender === 'bot' && msg.jobs && msg.jobs.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {msg.jobs.map(job => (
                                       <div key={job.id} className="bg-white p-2 rounded-md shadow-sm border border-gray-200">
                                            <p className="font-bold text-primary">{job.title}</p>
                                            <p className="text-sm text-gray-700">{job.company}</p>
                                            <button onClick={() => onViewDetails(job)} className="text-sm text-primary font-semibold mt-1">Ver detalhes</button>
                                       </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-background-secondary text-text-main rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                 )}
                <div ref={messagesEndRef} />
            </div>
        </div>

        <div className="p-4 border-t bg-white rounded-b-lg">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua busca aqui..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
              aria-label="Mensagem para o chatbot"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="ml-3 bg-primary text-white p-2 rounded-full hover:bg-opacity-90 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Enviar mensagem"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
