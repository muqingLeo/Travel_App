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

  // Generate a more intelligent response based on input text
  const generateResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    // Location-specific responses
    if (lowerText.includes('tokyo') || lowerText.includes('japan')) {
      if (lowerText.includes('food') || lowerText.includes('eat') || lowerText.includes('restaurant')) {
        return "Tokyo is a food paradise! I recommend trying these authentic dishes: Sushi at Tsukiji Market, Ramen in Shinjuku, and Yakitori in Omoide Yokocho. For a special experience, try a traditional kaiseki meal. Would you like specific restaurant recommendations in Tokyo?";
      } else if (lowerText.includes('stay') || lowerText.includes('hotel') || lowerText.includes('accommodation')) {
        return "For accommodation in Tokyo, I recommend staying in Shinjuku for convenient transport links and nightlife, Shibuya for shopping and youth culture, or Asakusa for a more traditional atmosphere. Hotels range from $80-300 per night, and ryokans (traditional inns) offer a unique cultural experience. Would you like me to find specific options based on your budget?";
      } else if (lowerText.includes('transport') || lowerText.includes('getting around')) {
        return "Tokyo has one of the world's best public transport systems. I recommend getting a SUICA or PASMO card for convenient travel. The subway and JR lines connect all major areas. For day trips, consider the JR Pass if you're planning to visit multiple cities. Taxis are clean and reliable but expensive. Would you like me to explain the route from the airport to your hotel?";
      } else {
        return "Tokyo is an amazing blend of ultramodern and traditional. Top attractions include the Tokyo Skytree, Senso-ji Temple in Asakusa, the Shibuya Crossing, and Meiji Shrine. If you're visiting between late March and early April, the cherry blossoms are spectacular! What specific aspects of Tokyo are you most interested in exploring?";
      }
    }
    
    // Paris-specific responses
    else if (lowerText.includes('paris') || lowerText.includes('france')) {
      if (lowerText.includes('food') || lowerText.includes('eat') || lowerText.includes('restaurant')) {
        return "Paris is renowned for its cuisine! Beyond the classic French bistros, I recommend trying small patisseries for breakfast, enjoying a leisurely lunch at a sidewalk café, and experiencing dinner at a traditional brasserie. For the best experience, try escargot, coq au vin, and definitely don't miss the pastries! Would you like specific restaurant recommendations by arrondissement?";
      } else if (lowerText.includes('stay') || lowerText.includes('hotel') || lowerText.includes('accommodation')) {
        return "For accommodation in Paris, the Marais offers central charm, Saint-Germain-des-Prés is perfect for a classic Parisian experience, and Montmartre provides bohemian vibes with great views. Consider boutique hotels for authentic character or apartments for a local experience. What's your budget range and preferred neighborhood?";
      } else if (lowerText.includes('transport') || lowerText.includes('getting around')) {
        return "Paris is best explored by a combination of walking and metro. The metro system is extensive with 16 lines covering the entire city. Consider getting a Paris Visite pass for unlimited travel. For a scenic experience, try the Batobus boat service along the Seine. Walking is ideal for central areas to discover hidden gems. Would you like tips on navigating from Charles de Gaulle airport to the city?";
      } else {
        return "Paris offers incredible experiences beyond the famous Eiffel Tower and Louvre! I recommend exploring Montmartre at sunset, taking a Seine river cruise, visiting the hidden Promenade Plantée, and enjoying the Luxembourg Gardens. For a less crowded experience, consider the Musée d'Orsay instead of the Louvre. What aspects of Parisian culture interest you most?";
      }
    }

    // Activity-specific responses
    else if (lowerText.includes('hiking') || lowerText.includes('outdoor') || lowerText.includes('nature')) {
      return "For outstanding hiking and outdoor experiences, I'd recommend New Zealand's Milford Track, Peru's Inca Trail, Norway's fjords, or Japan's Kumano Kodo. The best hiking seasons depend on the location - would you like recommendations for a specific region or climate? I can help you plan the perfect outdoor adventure based on your experience level and preferences.";
    } else if (lowerText.includes('beach') || lowerText.includes('island')) {
      return "For beach destinations, consider the crystal waters of Maldives, the diverse coastlines of Thailand, the cultural blend of Bali, or the pristine beaches of Seychelles. Each offers different experiences from luxury resorts to backpacker-friendly spots. What type of beach experience are you looking for - relaxation, water sports, nightlife, or cultural immersion?";
    } else if (lowerText.includes('family') || lowerText.includes('kids') || lowerText.includes('children')) {
      return "Family-friendly destinations I recommend include Japan for its safety and fascinating culture, Costa Rica for wildlife and adventure, Italy for food and history that kids will enjoy, and Singapore for its cleanliness and attractions like Gardens by the Bay. What ages are the children traveling with you? I can tailor recommendations based on their interests and your family's travel style.";
    }
    
    // Budget-specific responses
    else if (lowerText.includes('budget') || lowerText.includes('cost') || lowerText.includes('expensive') || lowerText.includes('cheap')) {
      return "Travel budgeting varies greatly by destination. Southeast Asia, Central America, and Eastern Europe offer great value. For example, in Thailand, you could budget $30-50/day backpacking or $100-200/day for mid-range travel. Western Europe and Japan are pricier at $100-150/day minimum. What's your comfort level and which regions are you considering? I can provide a detailed budget breakdown for specific destinations.";
    }
    
    // Safety and practical advice
    else if (lowerText.includes('safe') || lowerText.includes('safety') || lowerText.includes('danger')) {
      return "Safety is an important consideration! Generally, Japan, New Zealand, Switzerland, Portugal, and Singapore rank among the safest countries for travelers. Always research your specific destination, secure travel insurance, register with your embassy, and stay aware of your surroundings. For any particular destination you're concerned about, I can provide specific safety information and precautions.";
    } else if (lowerText.includes('pack') || lowerText.includes('packing') || lowerText.includes('luggage')) {
      return "Packing efficiently is crucial for enjoyable travel! Always research weather at your destination, pack versatile clothing layers, bring comfortable walking shoes, and don't forget adapters and essential medications. I recommend packing cubes to stay organized. Are you looking for a packing list for a specific destination or climate? I can customize recommendations based on your trip details.";
    } else if (lowerText.includes('visa') || lowerText.includes('passport')) {
      return "Visa requirements vary based on your citizenship and destination. Always check requirements at least 3 months before travel, ensure your passport is valid for at least 6 months beyond your trip, and keep digital copies of all important documents. Would you like me to provide specific visa information for a particular destination based on your nationality?";
    }
    
    // Greeting responses
    else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey') || lowerText.includes('greetings')) {
      return "Hello there! I'm your personal travel assistant ready to help plan your perfect trip. I can provide destination recommendations, create custom itineraries, offer budget advice, or answer specific travel questions. What type of travel experience are you looking for today?";
    } else if (lowerText.includes('thank')) {
      return "You're very welcome! I'm happy to help make your travel experiences amazing. Is there anything else you'd like to know about your destination or trip planning?";
    }
    
    // Seasonal travel responses
    else if (lowerText.includes('summer') || lowerText.includes('winter') || lowerText.includes('spring') || lowerText.includes('fall') || lowerText.includes('autumn') || (lowerText.includes('best') && lowerText.includes('time'))) {
      if (lowerText.includes('summer')) {
        return "Great summer destinations include the Greek Islands for beautiful beaches, Norway for midnight sun experiences, Canada for outdoor adventures, and New Zealand for skiing in their winter season. What type of summer experience are you looking for - beach relaxation, cultural exploration, or outdoor activities?";
      } else if (lowerText.includes('winter')) {
        return "Winter travel offers unique experiences! Consider Japan for amazing powder skiing, Finland or Norway for the Northern Lights, New Zealand for summer experiences during northern winter, or Southeast Asia for warm tropical escapes. Are you looking for winter sports destinations or trying to escape the cold?";
      } else if (lowerText.includes('spring') || (lowerText.includes('cherry') && lowerText.includes('blossom'))) {
        return "Spring is beautiful in many destinations. Japan's cherry blossoms (late March-early April) are spectacular, Netherlands' tulip season (mid-April) is stunning, and the Mediterranean offers pleasant temperatures for exploring. What spring experiences interest you most?";
      } else if (lowerText.includes('fall') || lowerText.includes('autumn')) {
        return "Fall/autumn travel offers colorful foliage and fewer crowds. Consider New England in the US, Kyoto in Japan, the Scottish Highlands, or Bavaria in Germany for stunning autumn colors. It's also wine harvest season in many regions! What type of fall experience interests you most?";
      } else {
        return "The best time to visit depends on your destination and preferences. Would you like recommendations for a specific location? I can provide details on peak seasons, shoulder seasons (often the best balance of good weather and fewer crowds), and off-seasons with better rates.";
      }
    }

    // Generic but still helpful response if no specific triggers matched
    else {
      return "I'd be happy to help with your travel questions! I can provide personalized recommendations on destinations, accommodations, activities, transportation, local customs, or seasonal advice. To give you the most helpful information, could you share a bit more about what you're looking for? What kind of experience interests you most, and do you have specific destinations in mind?";
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