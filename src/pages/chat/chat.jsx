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
  message
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
  LoadingOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

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

// Mock data for languages
const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: 'Chinese' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'ja', label: 'Japanese' },
  { value: 'de', label: 'German' }
];

// Main Chat Component
const Chat = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
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
    
    // Simulate AI response delay
    setTimeout(async () => {
      try {
        // In a real app, you would call your backend API here
        // to process the message and get a response from the AI
        
        // Simulate different types of responses based on user input
        let aiResponse;
        
        if (text.toLowerCase().includes('itinerary') || text.toLowerCase().includes('plan')) {
          // Itinerary recommendation
          aiResponse = {
            id: `msg-${Date.now()}-ai`,
            text: "Based on your interests and the season, I'd recommend the following itinerary:",
            sender: 'assistant',
            timestamp: new Date(),
            attachment: {
              type: 'itinerary',
              data: {
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
              }
            }
          };
        } else if (text.toLowerCase().includes('hotel') || text.toLowerCase().includes('stay') || text.toLowerCase().includes('accommodation')) {
          // Hotel recommendation
          aiResponse = {
            id: `msg-${Date.now()}-ai`,
            text: "I found some highly-rated accommodations that might suit your preferences:",
            sender: 'assistant',
            timestamp: new Date(),
            attachment: {
              type: 'accommodation',
              data: [
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
              ]
            }
          };
        } else if (text.toLowerCase().includes('weather') || text.toLowerCase().includes('temperature') || text.toLowerCase().includes('season')) {
          // Weather information
          aiResponse = {
            id: `msg-${Date.now()}-ai`,
            text: "Here's the current and forecast weather information:",
            sender: 'assistant',
            timestamp: new Date(),
            attachment: {
              type: 'weather',
              data: {
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
              }
            }
          };
        } else {
          // Regular text response
          aiResponse = {
            id: `msg-${Date.now()}-ai`,
            text: generateResponse(text),
            sender: 'assistant',
            timestamp: new Date(),
          };
          
          // Add follow-up suggestions after some replies
          if (Math.random() > 0.5) {
            setSuggestions([
              "Tell me about local customs",
              "What should I pack?",
              "Any safety tips for this area?"
            ]);
          } else {
            setSuggestions([]);
          }
        }
        
        // Add AI response to messages
        setMessages(prev => [...prev, aiResponse]);
        
      } catch (error) {
        console.error('Error sending message:', error);
        message.error('Failed to send message. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  // Generate a simple response based on input text (for demo)
  const generateResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      return "Hello there! How can I assist with your travel plans today?";
    } else if (lowerText.includes('thank')) {
      return "You're very welcome! Is there anything else I can help you with?";
    } else if (lowerText.includes('bali')) {
      return "Bali is a beautiful destination! The best time to visit is during the dry season (April to October). Would you like specific recommendations for places to stay, eat, or activities?";
    } else if (lowerText.includes('budget') || lowerText.includes('cost') || lowerText.includes('expensive')) {
      return "Planning a budget depends on your travel style. For budget travelers, I recommend $50-100 per day, mid-range would be $100-200, and luxury travelers should budget $200+ per day. This includes accommodation, food, activities, and local transportation. Would you like me to break down costs for a specific destination?";
    } else if (lowerText.includes('food') || lowerText.includes('eat') || lowerText.includes('restaurant')) {
      return "Food is one of the best parts of travel! To find authentic local cuisine, I recommend exploring places where locals eat, visiting markets, and trying street food (where safe). Would you like restaurant recommendations for a specific destination?";
    } else {
      return "Thanks for your question! I'd be happy to help you with information about destinations, accommodation recommendations, itinerary planning, local customs, or any other travel-related questions you might have.";
    }
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
        
        <Select
          value={language}
          onChange={setLanguage}
          style={{ width: 120 }}
          options={languages}
          dropdownMatchSelectWidth={false}
          suffixIcon={<GlobalOutlined />}
        />
      </ChatHeader>
      
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