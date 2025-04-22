import React from 'react';
import { Typography, Row, Col, Card, Avatar, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from '../../utils/i18n';

const { Title, Text, Paragraph } = Typography;

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

const TestimonialCard = styled(Card)`
  border-radius: 8px;
  margin-bottom: 16px;
  height: 100%;
  box-shadow: ${theme.shadows.small};
  border: none;
`;

const Testimonials = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: 48 }}>
      <SectionTitle>
        <Title level={2}>Traveler reviews</Title>
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
                      color: index < testimonial.rating ? theme.colors.accent : theme.colors.mediumGray,
                      marginRight: 4
                    }} 
                  />
                ))}
              </div>
              
              <Paragraph
                style={{ fontSize: 15, minHeight: 120 }}
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
  );
};

export default Testimonials;