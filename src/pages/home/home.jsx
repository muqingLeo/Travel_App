import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  Button,
  Row,
  Col,
  Skeleton,
  Space,
  Statistic,
  Divider,
  Avatar
} from 'antd';
import {
  CompassOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useItinerary } from '../../contexts/ItineraryContext';
import { theme } from '../../utils/i18n';

// Import modular components
import HeroSection from '../../components/home/HeroSection';
import TrendingDestinations from '../../components/home/TrendingDestinations';
import AIFeatures from '../../components/home/AIFeatures';
import Testimonials from '../../components/home/Testimonials';

const { Title, Text, Paragraph } = Typography;

// Styled Components with Expedia-inspired styles
const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h2 {
    color: ${theme.colors.primary};
    font-weight: 700;
    margin-bottom: 0;
  }
`;

// Sample destinations for trending
const trendingDestinations = [
  {
    id: 'd1',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'Experience traditional Japanese culture in the heart of ancient temples and gardens.',
    score: 94,
    price: '$156',
    percentOff: 20
  },
  {
    id: 'd2',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    description: 'Breathtaking sunsets and iconic white and blue architecture on this picturesque island.',
    score: 92,
    price: '$205',
    percentOff: 15
  },
  {
    id: 'd3',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    description: 'Tropical paradise with lush rice terraces, vibrant culture, and beautiful beaches.',
    score: 89,
    price: '$127',
    percentOff: 30,
    memberDeal: true
  },
  {
    id: 'd4',
    name: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Gaudi\'s magnificent architecture and vibrant Mediterranean culture and cuisine.',
    score: 87,
    price: '$142',
    percentOff: 10,
    memberDeal: true
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
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Start a trip planning process
  const startTripPlanning = () => {
    navigate('/itinerary');
  };
  
  return (
    <div className="exp-container">
      {/* Hero Section with Search */}
      <HeroSection carouselImages={carouselImages} />
      
      {/* Travel Discounts Section */}
      <div style={{ padding: '30px 0', background: theme.colors.lightGray }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} md={8}>
              <Card 
                style={{ 
                  background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                  color: 'white',
                  borderRadius: 8,
                  border: 'none'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: 'white', margin: '0 0 16px 0' }}>
                    Sign up, get rewards
                  </Title>
                  <Paragraph style={{ color: 'white', fontSize: 16 }}>
                    Create a free account to unlock member pricing of 10% or more on thousands of properties.
                  </Paragraph>
                  <Button 
                    type="primary" 
                    style={{ 
                      background: theme.colors.accent, 
                      border: 'none',
                      height: 40,
                      fontWeight: 600
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Join Now for Free
                  </Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card 
                style={{ 
                  borderRadius: 8,
                  border: 'none',
                  height: '100%'
                }}
              >
                <Space align="center" size={16}>
                  <Avatar
                    size={50}
                    style={{ 
                      backgroundColor: theme.colors.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    icon={<CheckCircleOutlined style={{ fontSize: 24 }} />}
                  />
                  <div>
                    <Title level={4} style={{ margin: '0 0 4px 0' }}>
                      Travel with confidence
                    </Title>
                    <Paragraph style={{ margin: 0 }}>
                      Book with free cancellation on most hotels and get the best price guarantee
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card 
                style={{ 
                  borderRadius: 8,
                  border: 'none',
                  height: '100%'
                }}
              >
                <Space align="center" size={16}>
                  <Avatar
                    size={50}
                    style={{ 
                      backgroundColor: theme.colors.success,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    icon={<GlobalOutlined style={{ fontSize: 24 }} />}
                  />
                  <div>
                    <Title level={4} style={{ margin: '0 0 4px 0' }}>
                      Download our app
                    </Title>
                    <Paragraph style={{ margin: 0 }}>
                      Get 10% off when you book on our app, plus access to member-only deals
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px' }}>
        {/* Trending Destinations */}
        {loading ? (
          <div style={{ marginBottom: 48 }}>
            <SectionTitle>
              <Title level={2}>Featured destinations</Title>
            </SectionTitle>
            <Row gutter={[24, 24]}>
              {Array(4).fill().map((_, index) => (
                <Col xs={24} sm={12} lg={6} key={`skeleton-${index}`}>
                  <Card>
                    <Skeleton active avatar paragraph={{ rows: 3 }} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <TrendingDestinations destinations={trendingDestinations} />
        )}
      
        {/* AI Features Section */}
        <AIFeatures />
        
        {/* User Testimonials */}
        <Testimonials testimonials={testimonials} />
        
        {/* App Download Section */}
        <div style={{ marginBottom: 48 }}>
          <Row gutter={24} align="middle">
            <Col xs={24} md={12}>
              <Title level={2} style={{ color: theme.colors.primary }}>Take Travel Assist Anywhere</Title>
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
                    <Statistic title="Active Users" value="500K+" valueStyle={{ color: theme.colors.primary }} />
                    <Statistic title="Trips Planned" value="1.2M+" valueStyle={{ color: theme.colors.primary }} />
                    <Statistic title="Countries" value="120+" valueStyle={{ color: theme.colors.primary }} />
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
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            borderRadius: 8,
            marginBottom: 48,
            border: 'none'
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
                  background: theme.colors.accent, 
                  borderColor: theme.colors.accent,
                  color: 'white',
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
    </div>
  );
};

export default Home;