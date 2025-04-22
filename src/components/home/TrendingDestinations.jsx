import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Badge } from 'antd';
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

const MemberDealTag = styled.div`
  background-color: ${theme.colors.secondary};
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
`;

const SaleTag = styled.div`
  background-color: #ffe0b2;
  color: ${theme.colors.warning};
  border: 1px solid ${theme.colors.warning};
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
  margin-right: 8px;
`;

const TrendingDestinations = ({ destinations, loading }) => {
  const navigate = useNavigate();
  
  // Navigate to destination page
  const navigateToDestination = (destination) => {
    if (!destination) {
      return;
    }
    navigate(`/destination/${encodeURIComponent(destination)}`);
  };
  
  if (!destinations || destinations.length === 0) {
    return null;
  }
  
  return (
    <div style={{ marginBottom: 48 }}>
      <SectionTitle>
        <Title level={2}>Featured destinations</Title>
      </SectionTitle>
      
      <Row gutter={[24, 24]}>
        {destinations.map(destination => (
          <Col xs={24} sm={12} lg={6} key={destination.id}>
            <div className="exp-dest-card">
              <div 
                className="exp-dest-img-container"
                onClick={() => navigateToDestination(destination.name)}
                style={{ cursor: 'pointer' }}
              >
                <img className="exp-dest-img" alt={destination.name} src={destination.image} />
                <div className="exp-dest-label">
                  <Title level={5} style={{ color: 'white', margin: 0 }}>
                    {destination.name}
                  </Title>
                </div>
              </div>
              <div className="exp-dest-content">
                <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12, height: 44 }}>
                  {destination.description}
                </Paragraph>
                
                <div style={{ marginBottom: 10 }}>
                  {destination.memberDeal && (
                    <MemberDealTag>Member Deal</MemberDealTag>
                  )}
                  {destination.percentOff > 0 && (
                    <SaleTag>{destination.percentOff}% off</SaleTag>
                  )}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: theme.colors.primary }}>
                      {destination.price}
                    </div>
                    <Text type="secondary">per night</Text>
                  </div>
                  
                  <Badge 
                    count={destination.score} 
                    style={{ 
                      backgroundColor: theme.colors.success,
                      fontWeight: 'bold'
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TrendingDestinations;