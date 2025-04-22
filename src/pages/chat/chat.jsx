import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Typography, 
  Input, 
  Button, 
  Avatar, 
  Card, 
  Spin, 
  Select, 
  Tag, 
  Divider,
  Empty,
  List,
  Tooltip,
  Skeleton,
  message,
  Radio
} from 'antd';
import {
  SendOutlined,
  UserOutlined,
  RobotOutlined,
  TranslationOutlined,
  AudioOutlined,
  PictureOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  PushpinOutlined,
  LoadingOutlined,
  EnvironmentOutlined,
  SettingOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import aiService from '../../services/aiService';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
  margin-bottom: 8px;
  
  ${(props) => props.isUser ? `
    align-self: flex-end;
    background-color: #1890ff;
    color: white;
    border-top-right-radius: 2px;
  ` : `
    align-self: flex-start;
    background-color: white;
    border-top-left-radius: 2px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  `}
  
  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

const ChatInputContainer = styled.div`
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #e8e8e8;
`;

const SuggestionTag = styled(Tag)`
  cursor: pointer;
  margin-bottom: 8px;
  padding: 6px 10px;
  border-radius: 16px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const QuickReplyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const RecSuggestion = styled(Card)`
  margin-top: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  
  .ant-card-head {
    background-color: #f0f7ff;
    min-height: 40px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .ant-card-head-title {
    padding: 8px 0;
  }
`;

// AI Settings Panel
const SettingsPanel = styled(Card)`
  margin-top: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

// Mock data for languages
const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: 'Chinese' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'ja', label: 'Japanese' },
  { value: 'de', label: 'German' }
];

// AI provider options
const aiProviders = [
  { label: 'ChatGPT (OpenAI)', value: 'openai' },
  { label: 'Claude (Anthropic)', value: 'anthropic' },
  { label: 'Grok', value: 'xprovider' }
];

// Main Chat Component
const Chat = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [aiProvider, setAiProvider] = useState(aiService.AI_PROVIDERS.OPENAI);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  
  // Sample suggestions
  const sampleSuggestions = [
    "What activities do you recommend in Tokyo for a family?",
    "I want a 7-day itinerary for exploring Italy",
    "What's the best time to visit Bali?",
    "How much should I budget for a week in Paris?",
    "Can you suggest local restaurants in Barcelona?",
    "What should I pack for a trip to New Zealand in winter?"
  ];

  // Initial welcome message
  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        const welcomeMessages = [
          {
            id: `msg-${Date.now()}-1`,
            text: user ? `Hello ${user.name}! I'm your AI Travel Assistant. How can I help with your travel plans today?` : 
                        "Hello! I'm your AI Travel Assistant. How can I help with your travel plans today?",
            sender: 'assistant',
            timestamp: new Date(),
          },
          {
            id: `msg-${Date.now()}-2`,
            text: "I can help you plan itineraries, provide destination information, suggest activities, and more. Ask me anything!",
            sender: 'assistant',
            timestamp: new Date(Date.now() + 1000),
          }
        ];
        
        setMessages(welcomeMessages);
        setSuggestions(sampleSuggestions.sort(() => 0.5 - Math.random()).slice(0, 3));
        setInitialLoad(false);
      }, 500);
    }
  }, [initialLoad, user]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message function
  const sendMessage = async (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}-user`,
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setSuggestions([]);
    
    try {
      // First, analyze the content to determine if we need to fetch structured data
      const analysis = await aiService.analyzeMessageContent(text);
      
      // Get the AI response
      const userContext = user?.preferences ? { preferences: user.preferences } : {};
      const aiResponseText = await aiService.getAIResponse(text, userContext);
      
      // Create base AI response
      let aiResponse = {
        id: `msg-${Date.now()}-ai`,
        text: aiResponseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      // If the message has a specific type, add appropriate attachments
      // In a real implementation, this would use structured outputs from the AI model
      // or separate API calls to get the structured data
      if (analysis.type === 'itinerary' && analysis.destination) {
        // In a real app, you would use the AI's response to generate this data
        // or make API calls to fetch real itineraries based on the user's query
        aiResponse.attachment = createItineraryAttachment(analysis.destination);
      } else if (analysis.type === 'accommodation' && analysis.destination) {
        aiResponse.attachment = createAccommodationAttachment(analysis.destination);
      } else if (analysis.type === 'weather' && analysis.destination) {
        aiResponse.attachment = createWeatherAttachment(analysis.destination);
      }
      
      // Add AI response to messages
      setMessages(prev => [...prev, aiResponse]);
      
      // Sometimes add follow-up suggestions based on the query
      if (Math.random() > 0.5) {
        setSuggestions(getFollowUpSuggestions(text, analysis));
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      message.error('Failed to get a response. Please try again.');
      
      // Add an error message
      setMessages(prev => [
        ...prev, 
        {
          id: `msg-${Date.now()}-error`,
          text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
          sender: 'assistant',
          timestamp: new Date(),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper functions for structured attachments
  // In a real app, these would be based on actual data from APIs
  
  const createItineraryAttachment = (destination) => {
    const destinations = {
      'tokyo': {
        title: '3-Day Tokyo Exploration',
        days: [
          {
            day: 1,
            activities: [
              { time: '9:00 AM', activity: 'Visit Senso-ji Temple', note: 'Historical Buddhist temple' },
              { time: '12:00 PM', activity: 'Lunch in Asakusa', note: 'Try local ramen' },
              { time: '2:00 PM', activity: 'Tokyo Skytree', note: 'Observation deck for city views' },
              { time: '6:00 PM', activity: 'Dinner in Shibuya', note: 'Experience the famous crossing' }
            ]
          },
          {
            day: 2,
            activities: [
              { time: '10:00 AM', activity: 'Meiji Shrine', note: 'Peaceful shrine in the city' },
              { time: '1:00 PM', activity: 'Harajuku Exploration', note: 'Unique fashion district' },
              { time: '4:00 PM', activity: 'Shinjuku Gyoen Park', note: 'Beautiful gardens' },
              { time: '7:00 PM', activity: 'Izakaya experience', note: 'Traditional Japanese pub' }
            ]
          },
          {
            day: 3,
            activities: [
              { time: '9:00 AM', activity: 'Tokyo Fish Market', note: 'Fresh seafood and local culture' },
              { time: '12:00 PM', activity: 'Sushi-making class', note: 'Learn from local chefs' },
              { time: '3:00 PM', activity: 'Akihabara', note: 'Electronics and anime district' },
              { time: '6:00 PM', activity: 'Robot Restaurant', note: 'Unique entertainment experience' }
            ]
          }
        ]
      },
      'paris': {
        title: '3-Day Paris Exploration',
        days: [
          {
            day: 1,
            activities: [
              { time: '9:00 AM', activity: 'Eiffel Tower', note: 'Go early to avoid crowds' },
              { time: '12:00 PM', activity: 'Lunch in Saint-Germain', note: 'Try a classic French bistro' },
              { time: '2:00 PM', activity: 'Louvre Museum', note: 'Home to the Mona Lisa' },
              { time: '7:00 PM', activity: 'Seine River Cruise', note: 'Beautiful views at sunset' }
            ]
          },
          {
            day: 2,
            activities: [
              { time: '10:00 AM', activity: 'Montmartre & Sacré-Cœur', note: 'Bohemian district with great views' },
              { time: '1:00 PM', activity: 'Lunch at Moulin de la Galette', note: 'Historic windmill restaurant' },
              { time: '3:00 PM', activity: 'Musée d\'Orsay', note: 'Impressionist masterpieces' },
              { time: '7:00 PM', activity: 'Le Marais district', note: 'Trendy shops and restaurants' }
            ]
          },
          {
            day: 3,
            activities: [
              { time: '9:00 AM', activity: 'Notre-Dame Cathedral', note: 'Gothic masterpiece' },
              { time: '11:00 AM', activity: 'Luxembourg Gardens', note: 'Beautiful park with historic palace' },
              { time: '2:00 PM', activity: 'Centre Pompidou', note: 'Modern and contemporary art' },
              { time: '7:00 PM', activity: 'Farewell dinner in Latin Quarter', note: 'Lively historic area' }
            ]
          }
        ]
      }
    };
    
    // Default if no matching destination
    const defaultItinerary = {
      title: '3-Day Custom Exploration',
      days: [
        {
          day: 1,
          activities: [
            { time: 'Morning', activity: 'Explore main attractions', note: 'Visit key landmarks' },
            { time: 'Afternoon', activity: 'Cultural experience', note: 'Museums or historical sites' },
            { time: 'Evening', activity: 'Local dining', note: 'Try authentic cuisine' }
          ]
        },
        {
          day: 2,
          activities: [
            { time: 'Morning', activity: 'Outdoor activities', note: 'Parks or nature' },
            { time: 'Afternoon', activity: 'Shopping & markets', note: 'Local goods and souvenirs' },
            { time: 'Evening', activity: 'Entertainment', note: 'Shows or nightlife' }
          ]
        },
        {
          day: 3,
          activities: [
            { time: 'Morning', activity: 'Off the beaten path', note: 'Hidden gems' },
            { time: 'Afternoon', activity: 'Relaxation', note: 'Spa or leisurely activities' },
            { time: 'Evening', activity: 'Farewell experience', note: 'Special dinner or event' }
          ]
        }
      ]
    };
    
    return {
      type: 'itinerary',
      data: destinations[destination] || defaultItinerary
    };
  };
  
  const createAccommodationAttachment = (destination) => {
    const accommodations = {
      'tokyo': [
        {
          name: 'Grand Hyatt Tokyo',
          location: 'Roppongi, Tokyo',
          price: '$$$',
          rating: 4.7,
          features: ['Spa', 'Pool', 'Multiple restaurants', 'Near attractions'],
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945'
        },
        {
          name: 'Citadines Shinjuku',
          location: 'Shinjuku, Tokyo',
          price: '$$',
          rating: 4.5,
          features: ['Apartment-style', 'Kitchenette', 'Laundry facilities', 'Close to transit'],
          image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39'
        },
        {
          name: 'UNPLAN Kagurazaka',
          location: 'Kagurazaka, Tokyo',
          price: '$',
          rating: 4.8,
          features: ['Hostel', 'Social atmosphere', 'Breakfast included', 'Great for solo travelers'],
          image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427'
        }
      ],
      'paris': [
        {
          name: 'Hôtel Plaza Athénée',
          location: 'Avenue Montaigne, 8th Arr.',
          price: '$$$',
          rating: 4.9,
          features: ['Luxury', 'Michelin star restaurant', 'Spa', 'Eiffel Tower views'],
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'
        },
        {
          name: 'Le Pavillon de la Reine',
          location: 'Le Marais, 3rd Arr.',
          price: '$$',
          rating: 4.7,
          features: ['Boutique', 'Historic building', 'Spa', 'Central location'],
          image: 'https://images.unsplash.com/photo-1551632436-cbf726cbfb7c'
        },
        {
          name: 'Generator Paris',
          location: 'Canal Saint-Martin, 10th Arr.',
          price: '$',
          rating: 4.3,
          features: ['Hostel', 'Modern design', 'Bar/lounge', 'Budget-friendly'],
          image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0'
        }
      ]
    };
    
    // Default accommodations if no matching destination
    const defaultAccommodations = [
      {
        name: 'Luxury Hotel Option',
        location: 'City Center',
        price: '$$$',
        rating: 4.8,
        features: ['5-star service', 'Fine dining', 'Spa facilities', 'Premium location'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'
      },
      {
        name: 'Mid-Range Boutique',
        location: 'Popular District',
        price: '$$',
        rating: 4.5,
        features: ['Unique design', 'Great value', 'Local character', 'Helpful staff'],
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
      },
      {
        name: 'Budget-Friendly Stay',
        location: 'Convenient Area',
        price: '$',
        rating: 4.2,
        features: ['Affordable', 'Clean rooms', 'Basic amenities', 'Good location'],
        image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7'
      }
    ];
    
    return {
      type: 'accommodation',
      data: accommodations[destination] || defaultAccommodations
    };
  };
  
  const createWeatherAttachment = (destination) => {
    const weatherData = {
      'tokyo': {
        location: 'Tokyo, Japan',
        current: {
          temp: 22,
          condition: 'Partly Cloudy',
          humidity: 65,
          wind: '8 km/h'
        },
        forecast: [
          { day: 'Tomorrow', high: 24, low: 18, condition: 'Sunny' },
          { day: 'Wednesday', high: 26, low: 19, condition: 'Clear' },
          { day: 'Thursday', high: 23, low: 17, condition: 'Light Rain' },
          { day: 'Friday', high: 21, low: 16, condition: 'Cloudy' },
          { day: 'Saturday', high: 22, low: 17, condition: 'Partly Cloudy' }
        ],
        advice: "Spring is a beautiful time to visit Tokyo. Cherry blossoms typically bloom in late March to early April. Pack layers as temperatures can vary throughout the day."
      },
      'paris': {
        location: 'Paris, France',
        current: {
          temp: 18,
          condition: 'Clear',
          humidity: 55,
          wind: '10 km/h'
        },
        forecast: [
          { day: 'Tomorrow', high: 20, low: 12, condition: 'Sunny' },
          { day: 'Wednesday', high: 22, low: 13, condition: 'Partly Cloudy' },
          { day: 'Thursday', high: 19, low: 11, condition: 'Light Rain' },
          { day: 'Friday', high: 17, low: 10, condition: 'Showers' },
          { day: 'Saturday', high: 18, low: 11, condition: 'Partly Cloudy' }
        ],
        advice: "Paris in spring offers mild temperatures and fewer crowds than summer. The city's gardens and parks are beautiful this time of year. Be prepared for occasional rain showers and pack a light jacket."
      }
    };
    
    // Default weather if no matching destination
    const defaultWeather = {
      location: 'Your Destination',
      current: {
        temp: 20,
        condition: 'Variable',
        humidity: 60,
        wind: '10 km/h'
      },
      forecast: [
        { day: 'Tomorrow', high: 22, low: 15, condition: 'Partly Cloudy' },
        { day: 'Day 3', high: 23, low: 16, condition: 'Mostly Sunny' },
        { day: 'Day 4', high: 21, low: 14, condition: 'Chance of Rain' },
        { day: 'Day 5', high: 20, low: 13, condition: 'Variable' },
        { day: 'Day 6', high: 21, low: 14, condition: 'Partly Cloudy' }
      ],
      advice: "Weather can vary, so check the forecast closer to your trip. Pack versatile clothing and be prepared for both sunny and rainy conditions."
    };
    
    return {
      type: 'weather',
      data: weatherData[destination] || defaultWeather
    };
  };
  
  // Generate follow-up suggestions based on the query
  const getFollowUpSuggestions = (text, analysis) => {
    const lowerText = text.toLowerCase();
    
    // Destination-specific suggestions
    if (analysis.destination === 'tokyo' || lowerText.includes('japan')) {
      return [
        "What local dishes should I try in Tokyo?",
        "Best time to see cherry blossoms in Japan?",
        "How to use the Tokyo subway system?"
      ];
    } else if (analysis.destination === 'paris' || lowerText.includes('france')) {
      return [
        "What are the must-see museums in Paris?",
        "Tips for visiting the Eiffel Tower",
        "Day trips from Paris"
      ];
    }
    
    // Query type suggestions
    if (analysis.type === 'itinerary') {
      return [
        "Can you adjust this for a family with kids?",
        "How much should I budget for this itinerary?",
        "Add more cultural activities to this plan"
      ];
    } else if (analysis.type === 'accommodation') {
      return [
        "Show me more budget options",
        "What areas are best for nightlife?",
        "Are these options close to public transportation?"
      ];
    } else if (analysis.type === 'weather') {
      return [
        "What should I pack for this weather?",
        "Best indoor activities for rainy days",
        "When is the best season to visit?"
      ];
    }
    
    // Default suggestions
    return [
      "Tell me about local customs",
      "What should I pack?",
      "Any safety tips for travelers?"
    ];
  };

  // Render Attachments based on type
  const renderAttachment = (attachment) => {
    if (!attachment) return null;
    
    switch (attachment.type) {
      case 'itinerary':
        return (
          <Card
            title={attachment.data.title}
            style={{ marginTop: 12, width: '100%' }}
          >
            {attachment.data.days.map((day) => (
              <div key={day.day} style={{ marginBottom: 16 }}>
                <Text strong>Day {day.day}</Text>
                <List
                  size="small"
                  dataSource={day.activities}
                  renderItem={(item) => (
                    <List.Item>
                      <Text>{item.time}</Text>: <Text strong>{item.activity}</Text>
                      {item.note && <Text type="secondary"> - {item.note}</Text>}
                    </List.Item>
                  )}
                />
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <Button type="primary">Save Itinerary</Button>
              <Button style={{ marginLeft: 8 }}>Modify</Button>
            </div>
          </Card>
        );
        
      case 'accommodation':
        return (
          <List
            style={{ marginTop: 12, width: '100%' }}
            grid={{ gutter: 16, column: 1 }}
            dataSource={attachment.data}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  cover={<img alt={item.name} src={item.image} style={{ height: 150, objectFit: 'cover' }} />}
                >
                  <Card.Meta
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                      </div>
                    }
                    description={
                      <>
                        <div><EnvironmentOutlined /> {item.location}</div>
                        <div>Rating: {item.rating}/5</div>
                        <div style={{ marginTop: 8 }}>
                          {item.features.map((feature, index) => (
                            <Tag key={index}>{feature}</Tag>
                          ))}
                        </div>
                      </>
                    }
                  />
                  <div style={{ marginTop: 12 }}>
                    <Button type="primary" size="small">View Details</Button>
                    <Button size="small" style={{ marginLeft: 8 }}>Book Now</Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        );
        
      case 'weather':
        return (
          <Card
            title={`Weather for ${attachment.data.location}`}
            style={{ marginTop: 12, width: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <Text strong style={{ fontSize: 24 }}>{attachment.data.current.temp}°C</Text>
                <div>{attachment.data.current.condition}</div>
              </div>
              <div>
                <div>Humidity: {attachment.data.current.humidity}%</div>
                <div>Wind: {attachment.data.current.wind}</div>
              </div>
            </div>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {attachment.data.forecast.map((day, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div>{day.day}</div>
                  <div>{day.high}° / {day.low}°</div>
                  <div>{day.condition}</div>
                </div>
              ))}
            </div>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <Paragraph>
              <InfoCircleOutlined /> Advice: {attachment.data.advice}
            </Paragraph>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            icon={<RobotOutlined />}
            style={{ backgroundColor: '#1890ff', marginRight: 12 }}
            size={40}
          />
          <div>
            <Title level={4} style={{ margin: 0 }}>{t('chat.title')}</Title>
            <Text type="secondary">AI-powered with real-time translation</Text>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: 120 }}
            options={languages}
            dropdownMatchSelectWidth={false}
            suffixIcon={<GlobalOutlined />}
          />
          <Tooltip title="AI Settings">
            <Button 
              type="text" 
              icon={<SettingOutlined />} 
              onClick={() => setShowSettings(!showSettings)}
            />
          </Tooltip>
        </div>
      </ChatHeader>
      
      {showSettings && (
        <SettingsPanel>
          <Card.Meta
            title="AI Model Settings"
            description="Choose which AI model powers your travel assistant"
          />
          <div style={{ marginTop: 16 }}>
            <Radio.Group 
              value={aiProvider} 
              onChange={(e) => {
                setAiProvider(e.target.value);
                aiService.setAIProvider(e.target.value);
                message.success(`Switched to ${aiProviders.find(p => p.value === e.target.value).label}`);
              }}
            >
              {aiProviders.map(provider => (
                <Radio key={provider.value} value={provider.value}>
                  {provider.label}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </SettingsPanel>
      )}
      
      <MessagesContainer>
        {messages.length === 0 ? (
          <Empty 
            description="No messages yet. Start a conversation!" 
            style={{ margin: 'auto' }}
          />
        ) : (
          messages.map((msg) => (
            <div key={msg.id}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: 8,
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                {msg.sender !== 'user' && (
                  <Avatar
                    icon={<RobotOutlined />}
                    style={{ 
                      backgroundColor: '#1890ff', 
                      marginRight: 8
                    }}
                    size="small"
                  />
                )}
                
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                
                {msg.sender === 'user' && (
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ 
                      backgroundColor: '#f56a00', 
                      marginLeft: 8
                    }}
                    size="small"
                  />
                )}
              </div>
              
              <MessageBubble isUser={msg.sender === 'user'}>
                <div>{msg.text}</div>
                {msg.attachment && renderAttachment(msg.attachment)}
                
                {msg.sender === 'assistant' && (
                  <div style={{ marginTop: 8, textAlign: 'right' }}>
                    <Tooltip title="Translate message">
                      <Button 
                        type="text" 
                        icon={<TranslationOutlined />} 
                        size="small"
                        onClick={() => message.info('Translation feature would be implemented here')}
                      />
                    </Tooltip>
                    
                    <Tooltip title="Save to trip notes">
                      <Button 
                        type="text" 
                        icon={<PushpinOutlined />} 
                        size="small"
                        onClick={() => message.success('Saved to trip notes')}
                      />
                    </Tooltip>
                  </div>
                )}
              </MessageBubble>
            </div>
          ))
        )}
        
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <QuickReplyContainer>
            {suggestions.map((suggestion, index) => (
              <SuggestionTag 
                key={index} 
                color="blue"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </SuggestionTag>
            ))}
          </QuickReplyContainer>
        )}
        
        {loading && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar
              icon={<RobotOutlined />}
              style={{ backgroundColor: '#1890ff' }}
              size="small"
            />
            <Spin 
              indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} 
              size="small"
            />
            <Text type="secondary" style={{ fontSize: 12 }}>Typing...</Text>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <ChatInputContainer>
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <Button 
            type="text" 
            icon={<AudioOutlined />} 
            title="Voice input"
            onClick={() => message.info('Voice input feature would be implemented here')}
          />
          <Button 
            type="text" 
            icon={<PictureOutlined />} 
            title="Upload image"
            onClick={() => message.info('Image upload feature would be implemented here')}
          />
          <Button 
            type="text" 
            icon={<FileTextOutlined />} 
            title="Upload file"
            onClick={() => message.info('File upload feature would be implemented here')}
          />
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <TextArea
            placeholder={t('chat.placeholder')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 4 }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={() => sendMessage()}
            disabled={loading || !inputValue.trim()}
          />
        </div>
        
        <Text type="secondary" style={{ fontSize: 12, marginTop: 8 }}>
          Press Enter to send, Shift+Enter for a new line
        </Text>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chat;