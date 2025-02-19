import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Send, Loader2, ThumbsUp, Flag, 
  UserCircle2 
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

const ThreadMessage = ({ message, responses, isQuestion = false }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 10));

  return (
    <div className="mb-8">
      {/* Main Question/Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg ${
          isQuestion 
            ? 'bg-green-900/40 ring-1 ring-green-800/50' 
            : 'bg-green-800/20 ring-1 ring-green-700/50'
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-green-800/50 flex items-center justify-center">
              <UserCircle2 className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <h3 className="font-medium text-green-200">{message.author}</h3>
              {!isQuestion && (
                <span className="ml-2 text-sm text-green-400">
                  • {message.village} • {message.experience} years farming experience
                </span>
              )}
            </div>
            <p className="text-green-100 mb-3">{message.content}</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setLiked(!liked);
                  setLikeCount(prev => liked ? prev - 1 : prev + 1);
                }}
                className={`flex items-center space-x-1 text-sm ${
                  liked ? 'text-green-400' : 'text-green-500'
                } hover:text-green-400 transition-colors`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{likeCount}</span>
              </button>
              <button
                onClick={() => toast.info('This feature is coming soon!')}
                className="flex items-center space-x-1 text-sm text-green-500 hover:text-red-400 transition-colors"
              >
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Thread Line and Responses */}
      {responses && responses.length > 0 && (
        <div className="relative ml-5 mt-2 pl-8 border-l-2 border-green-800/50">
          {responses.map((response, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4 relative"
            >
              <div className="absolute -left-8 top-4 w-6 h-px bg-green-800/50" />
              <div className="bg-green-800/20 p-4 rounded-lg ring-1 ring-green-700/50">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-800/50 flex items-center justify-center">
                      <UserCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium text-green-200">{response.author}</h3>
                      <span className="ml-2 text-sm text-green-400">
                        • {response.village} • {response.experience} years farming experience
                      </span>
                    </div>
                    <p className="text-green-100">{response.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const generateRandomFarmerName = () => {
  const firstNames = [
    'Rajesh', 'Suresh', 'Ramesh', 'Mahesh', 'Prakash', 
    'Dinesh', 'Bharat', 'Kishan', 'Arjun', 'Gopal'
  ];
  const lastNames = [
    'Patel', 'Singh', 'Yadav', 'Kumar', 'Sharma',
    'Verma', 'Gupta', 'Patil', 'Reddy', 'Choudhary'
  ];
  const villages = [
    'Pratappur', 'Ganeshganj', 'Ramgarh', 'Krishnanagar', 'Bhimpur',
    'Sultanpur', 'Madhavpur', 'Sitapur', 'Gopalnagar', 'Devgarh'
  ];

  return {
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    village: villages[Math.floor(Math.random() * villages.length)],
    experience: Math.floor(Math.random() * 30) + 5 // 5 to 35 years
  };
};

const Forum = () => {
  const [query, setQuery] = useState('');
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (userQuery) => {
    try {
      const farmer1 = generateRandomFarmerName();
      const farmer2 = generateRandomFarmerName();

      const prompt = `You are simulating responses from two different Indian farmers to this farming-related question. 
      Format the response as JSON with two responses from farmers with these profiles:
      
      Farmer 1: ${farmer1.name} from ${farmer1.village} with ${farmer1.experience} years of experience
      Farmer 2: ${farmer2.name} from ${farmer2.village} with ${farmer2.experience} years of experience

      Make their responses authentic, including local context, traditional knowledge, and practical experience.
      Each response should be 2-3 sentences in english.

      Question: "${userQuery}"

      Response format:
      {
        "responses": [
          {
            "author": "${farmer1.name}",
            "village": "${farmer1.village}",
            "experience": ${farmer1.experience},
            "content": "farmer's response here"
          },
          {
            "author": "${farmer2.name}",
            "village": "${farmer2.village}",
            "experience": ${farmer2.experience},
            "content": "farmer's response here"
          }
        ]
      }`;

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=AIzaSyD7Gv1Nefuo5TipsBrHYvjwuIaKkh2WbtY',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.8,
              maxOutputTokens: 1024
            }
          })
        }
      );

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const responseText = data.candidates[0]?.content?.parts[0]?.text || '';
      
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      const jsonStr = responseText.slice(jsonStart, jsonEnd);
      return JSON.parse(jsonStr).responses;

    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to generate responses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setIsLoading(true);
    try {
      const userMessage = {
        author: 'You',
        content: query
      };

      const responses = await generateResponse(query);
      setThreads(prev => [...prev, { question: userMessage, responses }]);
      setQuery('');
      
      toast.success('Farmers have responded to your question!');
    } catch (error) {
      toast.error('Failed to get responses. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-2 bg-green-900/50 rounded-full mb-4 ring-1 ring-green-800/50"
          >
            <MessageCircle className="w-6 h-6 text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-green-100 mb-2">Farmers' Forum</h1>
          <p className="text-green-200">Share your farming queries and get advice from experienced farmers</p>
        </div>

        {/* Question Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-900/40 rounded-lg shadow-md p-4 mb-8 ring-1 ring-green-800/50"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your farming related question here..."
              className="w-full px-4 py-3 rounded-lg bg-green-800/20 border border-green-800/50 text-green-100 placeholder-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 bg-green-600 text-green-100 px-6 py-2 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>Post Question</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Threads */}
        <div className="space-y-6">
          {threads.map((thread, index) => (
            <ThreadMessage 
              key={index}
              message={thread.question}
              responses={thread.responses}
              isQuestion={true}
            />
          ))}
          
          {threads.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-green-500 opacity-50" />
              <p className="text-green-400">No discussions yet. Start a conversation by asking a question!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
