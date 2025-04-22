import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Card, Avatar, Space, Button } from 'antd';
import { 
  GlobalOutlined, 
  ThunderboltOutlined, 
  BulbOutlined, 
  ArrowRightOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from '../../utils/i18n';

const { Title, Paragraph } = Typography;

// Styled Components
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

const AIFeatureCard = styled(Card)`
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 3px solid ${theme.colors.secondary};
  border-right: none;
  border-left: none;
  border-bottom: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const AIFeatures = () => {
  const navigate = useNavigate();

  return (
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
                style={{ backgroundColor: '#f9f0ff', color: theme.colors.secondary }}
                icon={<GlobalOutlined style={{ fontSize: 32 }} />}
              />
              <div>
                <Title level={4} style={{ marginTop: 0, color: theme.colors.primary }}>Real-time Translation</Title>
                <Paragraph>
                  Break through language barriers with instant translation in over 50 languages to communicate easily with locals.
                </Paragraph>
              </div>
            </Space>
            <Button 
              type="link" 
              style={{ 
                paddingLeft: 0,
                color: theme.colors.secondary,
                fontWeight: 600
              }}
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
                style={{ backgroundColor: '#e6f7ff', color: theme.colors.secondary }}
                icon={<ThunderboltOutlined style={{ fontSize: 32 }} />}
              />
              <div>
                <Title level={4} style={{ marginTop: 0, color: theme.colors.primary }}>Dynamic Trip Adaptation</Title>
                <Paragraph>
                  Stay one step ahead with real-time itinerary adjustments for weather changes, local events, and travel disruptions.
                </Paragraph>
              </div>
            </Space>
            <Button 
              type="link" 
              style={{ 
                paddingLeft: 0,
                color: theme.colors.secondary,
                fontWeight: 600
              }}
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
                style={{ backgroundColor: '#f6ffed', color: theme.colors.success }}
                icon={<BulbOutlined style={{ fontSize: 32 }} />}
              />
              <div>
                <Title level={4} style={{ marginTop: 0, color: theme.colors.primary }}>Smart Recommendations</Title>
                <Paragraph>
                  Get personalized suggestions based on your preferences and travel style for a customized experience.
                </Paragraph>
              </div>
            </Space>
            <Button 
              type="link" 
              style={{ 
                paddingLeft: 0,
                color: theme.colors.secondary,
                fontWeight: 600
              }}
              onClick={() => navigate('/profile')}
            >
              Try Now <ArrowRightOutlined />
            </Button>
          </AIFeatureCard>
        </Col>
      </Row>
    </div>
  );
};

export default AIFeatures;