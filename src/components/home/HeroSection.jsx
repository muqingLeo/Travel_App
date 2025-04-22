import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Button,
  Input,
  Row,
  Col,
  Carousel,
  Tabs,
  DatePicker,
  Select,
  AutoComplete,
  Checkbox,
  Radio
} from 'antd';
import {
  EnvironmentOutlined,
  HomeOutlined,
  CarOutlined,
  GiftOutlined,
  BulbOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from '../../utils/i18n';

const { Title } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Styled Components
const HeroSectionWrapper = styled.div`
  position: relative;
  height: 500px;
  border-radius: 0;
  overflow: hidden;
  margin-bottom: 0;
  
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
  background: linear-gradient(to right, rgba(0, 53, 95, 0.8) 0%, rgba(0, 53, 95, 0.4) 50%, rgba(0, 0, 0, 0) 100%);
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
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  margin-top: 24px;
  max-width: 900px;
  
  .ant-tabs-nav {
    margin-bottom: 20px;
  }
  
  .ant-tabs-tab {
    padding: 12px 20px;
    margin-right: 4px;
    font-weight: 600;
    
    &.ant-tabs-tab-active {
      background-color: ${theme.colors.secondary};
      border-radius: 8px 8px 0 0;
      
      .ant-tabs-tab-btn {
        color: white !important;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StayTypesWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  
  .ant-radio-button-wrapper {
    height: 36px;
    line-height: 34px;
    border-radius: 18px;
    border-left: 1px solid #d9d9d9 !important;
    overflow: hidden;
  }
  
  .ant-radio-button-wrapper:first-child {
    border-left: 1px solid #d9d9d9 !important;
  }
  
  .ant-radio-button-wrapper-checked {
    background: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary} !important;
    color: white;
    
    &::before {
      background-color: transparent !important;
    }
  }
`;

const HeroSection = ({ carouselImages }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchOptions, setSearchOptions] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('stays');
  const [stayType, setStayType] = React.useState('hotels');
  
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
      
      // Filter based on the input
      options = allDestinations.filter(opt => 
        opt.value.toLowerCase().includes(value.toLowerCase())
      );
    }
    
    setSearchOptions(options);
  };
  
  // Navigate to destination page
  const navigateToDestination = (destination) => {
    if (!destination) {
      return;
    }
    navigate(`/destination/${encodeURIComponent(destination)}`);
  };
  
  // Start a trip planning process
  const startTripPlanning = () => {
    navigate('/itinerary');
  };
  
  return (
    <HeroSectionWrapper className="exp-hero">
      <Carousel autoplay effect="fade">
        {carouselImages.map((image, index) => (
          <div key={index}>
            <CarouselImage style={{ backgroundImage: `url(${image})` }} />
          </div>
        ))}
      </Carousel>
      
      <HeroContent className="exp-hero-content">
        <Title level={1} style={{ color: 'white', marginBottom: 8, fontWeight: 700 }}>
          Where to next?
        </Title>
        <Title level={3} style={{ color: 'white', fontWeight: 400, marginBottom: 32 }}>
          Save 15% or more on thousands of getaways with member deals
        </Title>
        
        <SearchPanel className="exp-search-panel">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="exp-search-tabs"
            type="card"
          >
            <TabPane tab={<span><HomeOutlined /> Stays</span>} key="stays">
              <StayTypesWrap>
                <Radio.Group 
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                  buttonStyle="solid"
                  optionType="button"
                >
                  <Radio.Button value="hotels">Hotels</Radio.Button>
                  <Radio.Button value="homes">Vacation Homes</Radio.Button>
                  <Radio.Button value="boutique">Boutique</Radio.Button>
                  <Radio.Button value="all-inclusive">All Inclusive</Radio.Button>
                </Radio.Group>
              </StayTypesWrap>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} md={10}>
                  <AutoComplete
                    style={{ width: '100%' }}
                    placeholder="Going to"
                    options={searchOptions}
                    onSearch={handleSearch}
                    onChange={setSearchQuery}
                    value={searchQuery}
                  >
                    <Input 
                      size="large" 
                      prefix={<EnvironmentOutlined style={{ color: theme.colors.secondary }} />} 
                      style={{ height: '48px' }}
                    />
                  </AutoComplete>
                </Col>
                <Col xs={24} md={8}>
                  <RangePicker 
                    size="large" 
                    style={{ width: '100%', height: '48px' }} 
                    placeholder={["Check-in", "Check-out"]}
                    format="MMM D, YYYY"
                  />
                </Col>
                <Col xs={24} md={6}>
                  <Select
                    size="large"
                    style={{ width: '100%', height: '48px' }}
                    placeholder="Travelers"
                    defaultValue="2 travelers"
                  >
                    <Option value="1">1 traveler</Option>
                    <Option value="2">2 travelers</Option>
                    <Option value="3">3 travelers</Option>
                    <Option value="4">4 travelers</Option>
                    <Option value="5">5+ travelers</Option>
                  </Select>
                </Col>
                <Col xs={24}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Checkbox>Add a flight</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Add a car</Checkbox>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24}>
                  <Button 
                    type="primary" 
                    size="large" 
                    block
                    style={{ 
                      height: '48px', 
                      fontSize: '16px', 
                      fontWeight: 700,
                      background: theme.colors.secondary,
                      border: 'none'
                    }}
                    onClick={() => navigateToDestination(searchQuery)}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab={<span><CarOutlined /> Cars</span>} key="cars">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={10}>
                  <AutoComplete
                    style={{ width: '100%' }}
                    placeholder="Pick-up location"
                    options={searchOptions}
                    onSearch={handleSearch}
                  >
                    <Input 
                      size="large" 
                      prefix={<EnvironmentOutlined style={{ color: theme.colors.secondary }} />} 
                      style={{ height: '48px' }}
                    />
                  </AutoComplete>
                </Col>
                <Col xs={24} md={8}>
                  <RangePicker 
                    size="large" 
                    style={{ width: '100%', height: '48px' }} 
                    placeholder={["Pick-up", "Drop-off"]}
                    format="MMM D, YYYY"
                  />
                </Col>
                <Col xs={24} md={6}>
                  <Select
                    size="large"
                    style={{ width: '100%', height: '48px' }}
                    placeholder="Car type"
                    defaultValue="economy"
                  >
                    <Option value="economy">Economy</Option>
                    <Option value="compact">Compact</Option>
                    <Option value="midsize">Midsize</Option>
                    <Option value="suv">SUV</Option>
                    <Option value="luxury">Luxury</Option>
                  </Select>
                </Col>
                <Col xs={24}>
                  <Button 
                    type="primary" 
                    size="large" 
                    block
                    style={{ 
                      height: '48px', 
                      fontSize: '16px', 
                      fontWeight: 700,
                      background: theme.colors.secondary,
                      border: 'none'
                    }}
                  >
                    Search Cars
                  </Button>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab={<span><GiftOutlined /> Packages</span>} key="packages">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={24}>
                  <Title level={5} style={{ margin: '0 0 16px 0' }}>Find the perfect vacation package</Title>
                </Col>
                <Col xs={24} md={10}>
                  <AutoComplete
                    style={{ width: '100%' }}
                    placeholder="Going to"
                    options={searchOptions}
                    onSearch={handleSearch}
                  >
                    <Input 
                      size="large" 
                      prefix={<EnvironmentOutlined style={{ color: theme.colors.secondary }} />} 
                      style={{ height: '48px' }}
                    />
                  </AutoComplete>
                </Col>
                <Col xs={24} md={14}>
                  <RangePicker 
                    size="large" 
                    style={{ width: '100%', height: '48px' }} 
                    placeholder={["Depart", "Return"]}
                    format="MMM D, YYYY"
                  />
                </Col>
                <Col xs={24}>
                  <Button 
                    type="primary" 
                    size="large" 
                    block
                    style={{ 
                      height: '48px', 
                      fontSize: '16px', 
                      fontWeight: 700,
                      background: theme.colors.secondary,
                      border: 'none'
                    }}
                    onClick={startTripPlanning}
                  >
                    Search Packages
                  </Button>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab={<span><BulbOutlined /> AI Trip Planner</span>} key="planner">
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Input.TextArea 
                    size="large" 
                    placeholder="Describe your dream trip and let our AI plan it for you" 
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    style={{ marginBottom: 16 }}
                  />
                </Col>
                <Col xs={24}>
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<ThunderboltOutlined />} 
                    style={{ 
                      width: '100%',
                      height: '48px', 
                      fontSize: '16px', 
                      fontWeight: 700,
                      background: theme.colors.secondary,
                      border: 'none'
                    }}
                    onClick={startTripPlanning}
                  >
                    Generate Plan
                  </Button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </SearchPanel>
      </HeroContent>
    </HeroSectionWrapper>
  );
};

export default HeroSection;