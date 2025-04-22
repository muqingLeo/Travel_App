import axios from 'axios';

// Configuration for different AI providers
const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  XPROVIDER: 'xprovider' // Grok or other providers
};

// Initialize with default provider
let currentProvider = AI_PROVIDERS.OPENAI;

// Set API keys securely in environment variables in a real app
// These would typically be accessed through a backend service
// For development, you can use .env files with React
const API_KEYS = {
  [AI_PROVIDERS.OPENAI]: process.env.REACT_APP_OPENAI_API_KEY,
  [AI_PROVIDERS.ANTHROPIC]: process.env.REACT_APP_ANTHROPIC_API_KEY,
  [AI_PROVIDERS.XPROVIDER]: process.env.REACT_APP_XPROVIDER_API_KEY
};

// Base URLs for each provider
const API_ENDPOINTS = {
  [AI_PROVIDERS.OPENAI]: 'https://api.openai.com/v1/chat/completions',
  [AI_PROVIDERS.ANTHROPIC]: 'https://api.anthropic.com/v1/messages',
  [AI_PROVIDERS.XPROVIDER]: 'https://api.xprovider.com/v1/chat' // Replace with actual endpoint
};

// Function to change AI provider
export const setAIProvider = (provider) => {
  if (Object.values(AI_PROVIDERS).includes(provider)) {
    currentProvider = provider;
    return true;
  }
  return false;
};

// Get current AI provider
export const getAIProvider = () => currentProvider;

// Get available AI providers
export const getAvailableProviders = () => Object.values(AI_PROVIDERS);

// Build prompt with travel context
const buildTravelPrompt = (message, userContext = {}) => {
  let systemPrompt = "You are an expert travel assistant helping users plan trips, find destinations, and provide travel advice. ";
  
  // Add user preferences if available
  if (userContext.preferences) {
    const { language, currency } = userContext.preferences;
    systemPrompt += `Respond in ${language || 'English'} and use ${currency || 'USD'} for prices when applicable. `;
  }
  
  // Add travel-specific instructions
  systemPrompt += "Provide concise, practical travel advice with specific details like costs, best times to visit, and local tips. When recommending destinations or activities, consider seasonality and traveler preferences.";
  
  return systemPrompt;
};

// Call OpenAI API
const callOpenAI = async (message, userContext = {}) => {
  try {
    const systemPrompt = buildTravelPrompt(message, userContext);
    
    const response = await axios.post(
      API_ENDPOINTS[AI_PROVIDERS.OPENAI],
      {
        model: 'gpt-4o', // Use appropriate model (gpt-4o or other model)
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEYS[AI_PROVIDERS.OPENAI]}`
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get response from OpenAI');
  }
};

// Call Anthropic Claude API
const callAnthropic = async (message, userContext = {}) => {
  try {
    const systemPrompt = buildTravelPrompt(message, userContext);
    
    const response = await axios.post(
      API_ENDPOINTS[AI_PROVIDERS.ANTHROPIC],
      {
        model: 'claude-3-haiku-20240307', // or claude-3-opus/sonnet based on needs
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEYS[AI_PROVIDERS.ANTHROPIC],
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    return response.data.content[0].text;
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw new Error('Failed to get response from Claude');
  }
};

// Call XProvider API (e.g., Grok)
const callXProvider = async (message, userContext = {}) => {
  // Implement based on the provider's API documentation
  // This is a placeholder
  try {
    const response = await axios.post(
      API_ENDPOINTS[AI_PROVIDERS.XPROVIDER],
      {
        // Structure payload according to provider's API
        prompt: message,
        // Additional parameters
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEYS[AI_PROVIDERS.XPROVIDER]}`
        }
      }
    );
    
    return response.data.response; // Adjust based on actual response structure
  } catch (error) {
    console.error('XProvider API error:', error);
    throw new Error('Failed to get response from XProvider');
  }
};

// Main function to get AI response
export const getAIResponse = async (message, userContext = {}) => {
  try {
    switch (currentProvider) {
      case AI_PROVIDERS.OPENAI:
        return await callOpenAI(message, userContext);
      case AI_PROVIDERS.ANTHROPIC:
        return await callAnthropic(message, userContext);
      case AI_PROVIDERS.XPROVIDER:
        return await callXProvider(message, userContext);
      default:
        return await callOpenAI(message, userContext); // Default to OpenAI
    }
  } catch (error) {
    console.error('AI service error:', error);
    // Return a friendly error message to the user
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};

// Function to analyze message content and enhance with structured data
export const analyzeMessageContent = async (message) => {
  try {
    // This would typically call a specialized endpoint or use structured outputs
    // from AI providers to extract entities, intents, and structured data
    
    // For demonstration, we'll use a simple pattern matching approach
    const lowerMessage = message.toLowerCase();
    
    // Check for different types of travel queries
    if (lowerMessage.includes('itinerary') || lowerMessage.includes('plan')) {
      return { type: 'itinerary', destination: extractDestination(message) };
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('accommodation') || lowerMessage.includes('stay')) {
      return { type: 'accommodation', destination: extractDestination(message) };
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('temperature') || lowerMessage.includes('climate')) {
      return { type: 'weather', destination: extractDestination(message) };
    }
    
    // Default to general query
    return { type: 'general', destination: extractDestination(message) };
  } catch (error) {
    console.error('Analysis error:', error);
    return { type: 'general' };
  }
};

// Simple helper to extract destination from message
const extractDestination = (message) => {
  // This is a very basic implementation
  // In a real app, you would use entity extraction provided by NLP services
  const commonDestinations = [
    'tokyo', 'japan', 'paris', 'france', 'new york', 'london', 
    'bali', 'italy', 'rome', 'thailand', 'bangkok', 'barcelona', 
    'spain', 'australia', 'sydney', 'greece', 'santorini'
  ];
  
  const lowerMessage = message.toLowerCase();
  
  for (const destination of commonDestinations) {
    if (lowerMessage.includes(destination)) {
      return destination;
    }
  }
  
  return null;
};

export default {
  getAIResponse,
  setAIProvider,
  getAIProvider,
  getAvailableProviders,
  analyzeMessageContent,
  AI_PROVIDERS
};