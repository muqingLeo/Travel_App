import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  Button,
  Input,
  Row,
  Col,
  Carousel,
  Tabs,
  Tag,
  List,
  Avatar,
  Space,
  Divider,
  Tooltip,
  Badge,
  Spin,
  DatePicker,
  Select,
  AutoComplete,
  Statistic,
  Skeleton
} from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TeamOutlined,
  RiseOutlined,
  FireOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  HeartOutlined,
  StarOutlined,
  ArrowRightOutlined,
  CompassOutlined,
  BulbOutlined,
  UserOutlined,
  MessageOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useItinerary } from '../../contexts/ItineraryContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Styled Components
const HeroSection = styled.div`
  position: relative;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%);
  color: white;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const CarouselImage = styled.div`
  height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.3s ease;
  will-change: opacity;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const SearchPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
  max-width: 800px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const FeaturedCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
  }
  
  .ant-card-cover img {
    height: 200px;
    object-fit: cover;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const AIFeatureCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  border-top: 3px solid #1890ff;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
  }
`;

const TrendingDestination = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  height: 100%;
  
  .ant-card-cover {
    position: relative;
    height: 180px;
    overflow: hidden;
  }
  
  .ant-card-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }
  
  .destination-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    color: white;
  }
`;

const TestimonialCard = styled(Card)`
  border-radius: 12px;
  margin-bottom: 16px;
  height: 100%;
`;

// Sample destinations for trending
const trendingDestinations = [
  {
    id: 'd1',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'Experience traditional Japanese culture in the heart of ancient temples and gardens.',
    score: 94
  },
  {
    id: 'd2',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    description: 'Breathtaking sunsets and iconic white and blue architecture on this picturesque island.',
    score: 92
  },
  {
    id: 'd3',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    description: 'Tropical paradise with lush rice terraces, vibrant culture, and beautiful beaches.',
    score: 89
  },
  {
    id: 'd4',
    name: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Gaudi\'s magnificent architecture and vibrant Mediterranean culture and cuisine.',
    score: 87
  }
];

// Sample testimonials
const testimonials = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'New York, USA',
    text: 'The AI travel assistant saved me hours of planning! It suggested a perfect itinerary for my trip to Japan, including local spots I would have never found myself.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    location: 'Toronto, Canada',
    text: 'I love how the app automatically adjusted my itinerary when a heavy storm was predicted during my trip. It saved my vacation!',
    rating: 5
  },
  {
    id: 't3',
    name: 'Emma Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    location: 'Barcelona, Spain',
    text: 'The real-time translation feature in the chat made communicating with locals so much easier. I felt confident exploring places off the beaten path.',
    rating: 4
  }
];

// Sample popular experiences
const popularExperiences = [
  {
    id: 'e1',
    title: 'Traditional Tea Ceremony in Kyoto',
    image: 'https://images.unsplash.com/photo-1607273177171-ba8c50c02dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    price: '$45',
    duration: '1.5 hours',
    rating: 4.8,
    reviews: 356
  },
  {
    id: 'e2',
    title: 'Santorini Sunset Sailing Cruise',
    image: 'https://images.unsplash.com/photo-1551918333-e7f8e63d3a6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    price: '$89',
    duration: '5 hours',
    rating: 4.9,
    reviews: 492
  },
  {
    id: 'e3',
    title: 'Balinese Cooking Class with Market Tour',
    image: 'https://images.unsplash.com/photo-1564274846548-a287dbce27c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: '$38',
    duration: '4 hours',
    rating: 4.7,
    reviews: 278
  }
];

// Carousel images
const carouselImages = [
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780&q=80'
];

// Main Home Component
const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { itineraries } = useItinerary();
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [activeTab, setActiveTab] = useState('destinations');
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate search options
  const handleSearch = (value) => {
    let options = [];
    
    if (value) {
      // Comprehensive list of destinations for search
      const allDestinations = [
        { value: 'Tokyo, Japan', label: 'Tokyo, Japan' },
        { value: 'Paris, France', label: 'Paris, France' },
        { value: 'New York, USA', label: 'New York, USA' },
        { value: 'Rome, Italy', label: 'Rome, Italy' },
        { value: 'Sydney, Australia', label: 'Sydney, Australia' },
        { value: 'London, UK', label: 'London, UK' },
        { value: 'Barcelona, Spain', label: 'Barcelona, Spain' },
        { value: 'Singapore', label: 'Singapore' },
        { value: 'Seoul, South Korea', label: 'Seoul, South Korea' },
        { value: 'San Francisco, USA', label: 'San Francisco, USA' },
        { value: 'Stockholm, Sweden', label: 'Stockholm, Sweden' },
        { value: 'Shanghai, China', label: 'Shanghai, China' }
      ];
      
      // Filter based on the first letter(s) of either the city or country
      options = allDestinations.filter(opt => 
        opt.value.toLowerCase().includes(value.toLowerCase())
      );
    }
    
    setSearchOptions(options);
  };
  
  // Navigate to destination page (would be implemented in a real app)
  const navigateToDestination = (destination) => {
    if (!destination) {
      return;
    }
    // Navigate to the destination page with the destination as a parameter
    navigate(`/destination/${encodeURIComponent(destination)}`);
  };
  
  // Start a trip planning process
  const startTripPlanning = () => {
    navigate('/itinerary');
  };
  
  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <Carousel autoplay effect="fade">
          {carouselImages.map((image, index) => (
            <div key={index}>
              <CarouselImage style={{ backgroundImage: `url(${image})` }} />
            </div>
          ))}
        </Carousel>
        
        <HeroContent>
          <Title level={1} style={{ color: 'white', marginBottom: 8 }}>
            Your Perfect Trip Awaits
          </Title>
          <Title level={3} style={{ color: 'white', fontWeight: 'normal', marginBottom: 32 }}>
            Discover amazing destinations with personalized travel plans
          </Title>
          
          <SearchPanel>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab={<span><EnvironmentOutlined /> Destinations</span>} key="destinations">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <AutoComplete
                      style={{ width: '100%' }}
                      placeholder="Where would you like to go?"
                      options={searchOptions}
                      onSearch={handleSearch}
                      onChange={setSearchQuery}
                      value={searchQuery}
                    >
                      <Input size="large" prefix={<SearchOutlined />} />
                    </AutoComplete>
                  </Col>
                  <Col xs={24} md={8}>
                    <RangePicker 
                      size="large" 
                      style={{ width: '100%' }} 
                      placeholder={["Start Date", "End Date"]}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<CompassOutlined />} 
                      style={{ width: '100%' }}
                      onClick={() => navigateToDestination(searchQuery)}
                    >
                      Explore
                    </Button>
                  </Col>
                </Row>
              </TabPane>
              
              <TabPane tab={<span><BulbOutlined /> AI Trip Planner</span>} key="planner">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={16}>
                    <Input.TextArea 
                      size="large" 
                      placeholder="Describe your dream trip and let our AI plan it for you" 
                      autoSize={{ minRows: 2, maxRows: 3 }}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<ThunderboltOutlined />} 
                      style={{ width: '100%' }}
                      onClick={startTripPlanning}
                    >
                      Generate Plan
                    </Button>
                  </Col>
                  
                  <Col span={24}>
                    <Text type="secondary">
                      <BulbOutlined /> Example: "Plan a 7-day trip to Japan in April for a family of 4 with interests in culture and food"
                    </Text>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </SearchPanel>
        </HeroContent>
      </HeroSection>
      
      {/* AI Features Section */}
      <div style={{ marginBottom: 48 }}>
        <SectionTitle>
          <Title level={2}>Smart Travel Features</Title>
        </SectionTitle>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <AIFeatureCard>
              <Space align="start" size={16}>
                <Avatar 
                  size={64} 
                  style={{ backgroundColor: '#f9f0ff', color: '#722ed1' }}
                  icon={<GlobalOutlined style={{ fontSize: 32 }} />}
                />
                <div>
                  <Title level={4} style={{ marginTop: 0 }}>Real-time Translation</Title>
                  <Paragraph>
                    Break through language barriers with instant translation in over 50 languages to communicate easily with locals.
                  </Paragraph>
                </div>
              </Space>
              <Button 
                type="link" 
                style={{ paddingLeft: 0 }}
                onClick={() => navigate('/chat')}
              >
                Try Now <ArrowRightOutlined />
              </Button>
            </AIFeatureCard>
          </Col>
          
          <Col xs={24} md={8}>
            <AIFeatureCard>
              <Space align="start" size={16}>
                <Avatar 
                  size={64} 
                  style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}
                  icon={<ThunderboltOutlined style={{ fontSize: 32 }} />}
                />
                <div>
                  <Title level={4} style={{ marginTop: 0 }}>Dynamic Trip Adaptation</Title>
                  <Paragraph>
                    Stay one step ahead with real-time itinerary adjustments for weather changes, local events, and travel disruptions.
                  </Paragraph>
                </div>
              </Space>
              <Button 
                type="link" 
                style={{ paddingLeft: 0 }}
                onClick={() => navigate('/itinerary')}
              >
                Try Now <ArrowRightOutlined />
              </Button>
            </AIFeatureCard>
          </Col>
          
          <Col xs={24} md={8}>
            <AIFeatureCard>
              <Space align="start" size={16}>
                <Avatar 
                  size={64} 
                  style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}
                  icon={<BulbOutlined style={{ fontSize: 32 }} />}
                />
                <div>
                  <Title level={4} style={{ marginTop: 0 }}>Smart Recommendations</Title>
                  <Paragraph>
                    Get personalized suggestions based on your preferences and travel style for a customized experience.
                  </Paragraph>
                </div>
              </Space>
              <Button 
                type="link" 
                style={{ paddingLeft: 0 }}
                onClick={() => navigate('/profile')}
              >
                Try Now <ArrowRightOutlined />
              </Button>
            </AIFeatureCard>
          </Col>
        </Row>
      </div>
      
      {/* Trending Destinations */}
      <div style={{ marginBottom: 48 }}>
        <SectionTitle>
          <Title level={2}>Trending Destinations</Title>
          <Button type="link" icon={<ArrowRightOutlined />}>
            View All
          </Button>
        </SectionTitle>
        
        <Row gutter={[24, 24]}>
          {loading ? (
            Array(4).fill().map((_, index) => (
              <Col xs={24} sm={12} lg={6} key={`skeleton-${index}`}>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </Card>
              </Col>
            ))
          ) : (
            trendingDestinations.map(destination => (
              <Col xs={24} sm={12} lg={6} key={destination.id}>
                <TrendingDestination
                  hoverable
                  cover={
                    <div>
                      <img alt={destination.name} src={destination.image} />
                      <div className="destination-label">
                        <Title level={5} style={{ color: 'white', margin: 0 }}>
                          {destination.name}
                        </Title>
                      </div>
                    </div>
                  }
                  onClick={() => navigateToDestination(destination.name)}
                >
                  <div style={{ height: 80 }}>
                    <Paragraph ellipsis={{ rows: 2 }}>
                      {destination.description}
                    </Paragraph>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                      <FireOutlined style={{ color: '#ff4d4f' }} />
                      <Text>Trending</Text>
                    </Space>
                    <Badge 
                      count={destination.score} 
                      style={{ 
                        backgroundColor: '#52c41a',
                        fontWeight: 'bold'
                      }}
                    />
                  </div>
                </TrendingDestination>
              </Col>
            ))
          )}
        </Row>
      </div>
      
      {/* User Testimonials */}
      <div style={{ marginBottom: 48 }}>
        <SectionTitle>
          <Title level={2}>Traveler Stories</Title>
        </SectionTitle>
        
        <Row gutter={[24, 24]}>
          {testimonials.map(testimonial => (
            <Col xs={24} md={8} key={testimonial.id}>
              <TestimonialCard>
                <div style={{ marginBottom: 16 }}>
                  {Array(5).fill().map((_, index) => (
                    <StarOutlined 
                      key={index} 
                      style={{ 
                        color: index < testimonial.rating ? '#faad14' : '#d9d9d9',
                        marginRight: 4
                      }} 
                    />
                  ))}
                </div>
                
                <Paragraph
                  style={{ fontSize: 16, minHeight: 120 }}
                >
                  "{testimonial.text}"
                </Paragraph>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={testimonial.avatar} size="large" />
                  <div style={{ marginLeft: 12 }}>
                    <Text strong>{testimonial.name}</Text>
                    <div>
                      <Text type="secondary">{testimonial.location}</Text>
                    </div>
                  </div>
                </div>
              </TestimonialCard>
            </Col>
          ))}
        </Row>
      </div>
      
      {/* Popular Experiences */}
      <div style={{ marginBottom: 48 }}>
        <SectionTitle>
          <Title level={2}>Unforgettable Experiences</Title>
          <Button type="link" icon={<ArrowRightOutlined />}>
            View All
          </Button>
        </SectionTitle>
        
        <Row gutter={[24, 24]}>
          {popularExperiences.map(experience => (
            <Col xs={24} md={8} key={experience.id}>
              <FeaturedCard
                hoverable
                cover={<img alt={experience.title} src={experience.image} />}
                actions={[
                  <Tooltip title="Save">
                    <Button type="text" icon={<HeartOutlined />} />
                  </Tooltip>,
                  <Button type="primary" shape="round">
                    Book Now
                  </Button>
                ]}
              >
                <Card.Meta
                  title={experience.title}
                  description={
                    <>
                      <div style={{ marginBottom: 8 }}>
                        <Text strong style={{ fontSize: 18 }}>{experience.price}</Text>
                        <Text type="secondary"> / person</Text>
                      </div>
                      
                      <Space split={<Divider type="vertical" />}>
                        <Text>
                          <ClockCircleOutlined /> {experience.duration}
                        </Text>
                        <Text>
                          <StarOutlined style={{ color: '#faad14' }} /> {experience.rating}
                        </Text>
                        <Text>
                          <MessageOutlined /> {experience.reviews}
                        </Text>
                      </Space>
                    </>
                  }
                />
              </FeaturedCard>
            </Col>
          ))}
        </Row>
      </div>
      
      {/* App Download Section */}
      <div style={{ marginBottom: 48 }}>
        <Row gutter={24} align="middle">
          <Col xs={24} md={12}>
            <Title level={2}>Take Travel Assist Anywhere</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Download our mobile app to access all travel features on the go. Get real-time updates, offline maps, and emergency assistance anywhere in the world.
            </Paragraph>
            
            <Row gutter={16} style={{ marginTop: 24 }}>
              <Col>
                <Button size="large">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="App Store" 
                    style={{ height: 24 }} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/images/app-store-badge.png";
                    }}
                  />
                </Button>
              </Col>
              <Col>
                <Button size="large">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Google Play" 
                    style={{ height: 24 }} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/images/play-store-badge.png";
                    }}
                  />
                </Button>
              </Col>
            </Row>
            
            <Row style={{ marginTop: 24 }}>
              <Col>
                <Space size="large">
                  <Statistic title="Active Users" value="500K+" />
                  <Statistic title="Trips Planned" value="1.2M+" />
                  <Statistic title="Countries" value="120+" />
                </Space>
              </Col>
            </Row>
          </Col>
          
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'center' }}>
              <img 
                src="https://i.imgur.com/Jvh1OQm.png" 
                alt="Mobile App" 
                style={{ maxWidth: '100%', height: 'auto' }} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/phone-mockup.png";
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
      
      {/* Call to Action */}
      <Card
        style={{ 
          background: 'linear-gradient(to right, #1890ff, #69c0ff)',
          borderRadius: 12,
          marginBottom: 48
        }}
      >
        <Row gutter={24} justify="space-between" align="middle">
          <Col xs={24} md={16}>
            <Title level={2} style={{ color: 'white', marginBottom: 8 }}>
              Start Planning Your Adventure Today
            </Title>
            <Paragraph style={{ color: 'white', fontSize: 16 }}>
              Let our AI-powered assistant create a personalized itinerary for your next dream vacation.
            </Paragraph>
          </Col>
          
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Button
              type="primary" 
              size="large"
              icon={<CompassOutlined />}
              style={{ 
                background: 'white', 
                borderColor: 'white',
                color: '#1890ff',
                fontWeight: 'bold',
                height: 48,
                paddingLeft: 24,
                paddingRight: 24
              }}
              onClick={startTripPlanning}
            >
              Plan Your Trip
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Home;