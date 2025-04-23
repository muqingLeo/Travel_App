import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Card, 
  Tabs, 
  Spin, 
  Alert, 
  Row, 
  Col, 
  Divider, 
  Tag, 
  List, 
  Space, 
  Button, 
  Statistic, 
  Rate, 
  Table,
  Modal,
  message,
  Carousel,
  Tooltip
} from 'antd';
import { 
  EnvironmentOutlined, 
  InfoCircleOutlined, 
  DollarOutlined, 
  StarOutlined,
  HomeOutlined,
  CompassOutlined,
  CalendarOutlined,
  ThunderboltOutlined,
  GiftOutlined,
  LoadingOutlined,
  LeftOutlined,
  RightOutlined,
  SyncOutlined,
  CameraOutlined,
  GlobalOutlined,
  TranslationOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getDestinationById, getHotelPriceComparisons, getAttractions, getRealTimeDestinationImages, getRealTimeAttractionImages } from '../../services/travelApi';
import { useLocale } from '../../contexts/LocaleContext';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Styled Components
const StyledCard = styled(Card)`
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
`;

const HighlightBox = styled.div`
  background: #f0f7ff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid #1890ff;
`;

const PriceComparisonCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const WeatherCard = styled(Card)`
  text-align: center;
  background: linear-gradient(to right, #e0f7fa, #b2ebf2);
`;

const DestinationHeader = styled.div`
  position: relative;
  height: 400px;
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
`;

const StyledCarousel = styled(Carousel)`
  height: 400px;
  
  .slick-dots {
    z-index: 10;
    bottom: 20px;
    
    li button {
      background: white;
      opacity: 0.7;
    }
    
    li.slick-active button {
      background: white;
      opacity: 1;
    }
  }
  
  .slick-prev, .slick-next {
    z-index: 10;
    width: 40px;
    height: 40px;
  }
  
  .image-container {
    position: relative;
    height: 400px;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
      z-index: 1;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    color: white;
    z-index: 2;
  }
`;

const RefreshButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const Destination = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale, changeLocale } = useLocale();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceComparisons, setPriceComparisons] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(0);
  const [redirectInfo, setRedirectInfo] = useState(null);
  const [realTimeImages, setRealTimeImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [nextRefreshDate, setNextRefreshDate] = useState(null);
  const [attractionImages, setAttractionImages] = useState({});
  const [attractionImagesLoading, setAttractionImagesLoading] = useState(false);

  // Redirect countdown effect
  useEffect(() => {
    let timer;
    if (redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
    } else if (redirectCountdown === 0 && redirectInfo) {
      // Perform the actual redirection
      setModalVisible(false);
      
      // Redirect to actual booking websites based on provider
      if (redirectInfo.provider === 'booking') {
        window.open(`https://www.booking.com/search.html?ss=${encodeURIComponent(destination.name)}`, '_blank');
      } else if (redirectInfo.provider === 'expedia') {
        window.open(`https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(destination.name)}`, '_blank');
      } else if (redirectInfo.provider === 'hotels') {
        window.open(`https://www.hotels.com/search.do?destination-id=${encodeURIComponent(destination.name)}`, '_blank');
      } else if (redirectInfo.provider === 'tickets') {
        window.open(`https://www.viator.com/search/${encodeURIComponent(destination.name)}`, '_blank');
      }
      
      // Reset redirect info
      setRedirectInfo(null);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [redirectCountdown, redirectInfo, destination]);

  // Simulate current weather data
  const weather = {
    current: {
      temp: 22,
      condition: 'Sunny',
      icon: '☀️',
      humidity: 65,
      wind: 12
    },
    forecast: [
      { day: 'Mon', temp: 22, icon: '☀️' },
      { day: 'Tue', temp: 24, icon: '🌤️' },
      { day: 'Wed', temp: 20, icon: '⛅' },
      { day: 'Thu', temp: 19, icon: '🌧️' },
      { day: 'Fri', temp: 21, icon: '🌤️' }
    ]
  };

  useEffect(() => {
    const fetchDestinationData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Decode URL parameter if it's encoded
        const decodedId = decodeURIComponent(id);
        
        // First try to fetch by ID
        let destinationData = await getDestinationById(decodedId);
        
        // If not found directly by ID, try to search by name
        if (!destinationData) {
          // The ID might actually be the name of the destination from search
          const allDestinations = await getDestinationById();
          if (Array.isArray(allDestinations)) {
            destinationData = allDestinations.find(
              dest => dest.name.toLowerCase() === decodedId.toLowerCase() || 
                      dest.location.toLowerCase().includes(decodedId.toLowerCase())
            );
          }
        }
        
        if (destinationData) {
          setDestination(destinationData);
          
          // Fetch price comparisons and attractions data
          const hotelPrices = await getHotelPriceComparisons(destinationData.id || destinationData.name);
          setPriceComparisons(hotelPrices);
          
          const attractionsData = await getAttractions(destinationData.id || destinationData.name);
          setAttractions(attractionsData);
          
          // Fetch real-time images for this destination
          fetchRealTimeImages(destinationData.name);
          
          // Fetch real-time images for attractions
          fetchAttractionImages(attractionsData);
        } else {
          setError(`Destination "${decodedId}" not found.`);
        }
      } catch (err) {
        console.error("Failed to fetch destination:", err);
        setError('Failed to load destination details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDestinationData();
    } else {
      setError("No destination specified.");
      setLoading(false);
    }
  }, [id]);
  
  // Function to fetch real-time images
  const fetchRealTimeImages = async (destinationName) => {
    setImagesLoading(true);
    try {
      const result = await getRealTimeDestinationImages(destinationName);
      if (result && result.images && result.images.length > 0) {
        setRealTimeImages(result.images);
        
        // Set the next refresh date from metadata
        if (result.metadata && result.metadata.nextRefresh) {
          setNextRefreshDate(result.metadata.nextRefresh);
        }
      } else {
        // Set a default image if no images are returned
        if (destination && destination.image) {
          setRealTimeImages([destination.image]);
        }
        message.warning("Could not load real-time images. Using default images instead.");
      }
    } catch (err) {
      console.error("Error loading real-time images:", err);
      // Set default image on error
      if (destination && destination.image) {
        setRealTimeImages([destination.image]);
      }
      message.error("Could not load the latest images. Please try again later.");
    } finally {
      setImagesLoading(false);
    }
  };
  
  // Function to fetch real-time attraction images
  const fetchAttractionImages = async (attractionsData) => {
    if (!attractionsData || attractionsData.length === 0) return;
    
    setAttractionImagesLoading(true);
    const imagesMap = {};
    
    try {
      // Process attractions in parallel for faster loading
      const imagePromises = attractionsData.map(async (attraction) => {
        try {
          const result = await getRealTimeAttractionImages(attraction.name, 1);
          if (result && result.images && result.images.length > 0) {
            const imageUrl = result.images[0];
            
            // Pre-load the image to check if it's valid
            const img = new Image();
            img.src = imageUrl;
            
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              // Set a timeout in case the image takes too long to load
              setTimeout(reject, 5000);
            });
            
            // Only add to map if image loaded successfully
            imagesMap[attraction.id] = imageUrl;
          }
        } catch (error) {
          console.error(`Error fetching/loading image for ${attraction.name}:`, error);
          // Use the default attraction image as fallback
          if (attraction.image) {
            imagesMap[attraction.id] = attraction.image;
          }
        }
      });
      
      try {
        await Promise.all(imagePromises);
      } catch (err) {
        console.error("Some images failed to load:", err);
      }
      
      setAttractionImages(imagesMap);
      
      // If we didn't get any images, show a warning
      if (Object.keys(imagesMap).length === 0) {
        message.warning("Could not load attraction images. Using default images instead.");
      }
    } catch (err) {
      console.error("Error loading attraction images:", err);
      message.error("Could not load all attraction images. Some default images will be used.");
      
      // Set default images for all attractions as fallback
      const defaultMap = {};
      attractionsData.forEach(attraction => {
        if (attraction.image) {
          defaultMap[attraction.id] = attraction.image;
        }
      });
      setAttractionImages(defaultMap);
    } finally {
      setAttractionImagesLoading(false);
    }
  };

  // Format the next refresh date
  const formatRefreshDate = (dateString) => {
    if (!dateString) return '';
    
    const refreshDate = new Date(dateString);
    return refreshDate.toLocaleDateString(undefined, { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  // Handle booking buttons
  const handleBookNow = (item, type) => {
    // Set content for modal based on item type
    let content;
    if (type === 'hotel') {
      const minPrice = Math.min(...[item.bookingPrice, item.expediaPrice, item.hotelsPrice].filter(Boolean));
      const bestProvider = item.bookingPrice === minPrice ? 'booking' :
                          item.expediaPrice === minPrice ? 'expedia' : 'hotels';
                          
      content = (
        <div>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
          />
          <Title level={4}>{item.name}</Title>
          <Paragraph>{item.description || 'Enjoy a comfortable stay at this highly-rated hotel.'}</Paragraph>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Price per night" value={`$${minPrice}`} />
            </Col>
            <Col span={12}>
              <Statistic title="Rating" value={item.rating} suffix="/5" />
            </Col>
          </Row>
          <Divider />
          <Text type="secondary">You'll be redirected to our booking partner's website to complete your reservation.</Text>
          {redirectCountdown > 0 && (
            <>
              <Divider />
              <Alert
                message={`Redirecting to ${bestProvider}.com in ${redirectCountdown} seconds...`}
                type="info"
                showIcon
              />
            </>
          )}
        </div>
      );
      
      // Set the redirect info
      setRedirectInfo({ 
        id: item.id, 
        type: 'hotel', 
        provider: bestProvider 
      });
    } else if (type === 'attraction') {
      content = (
        <div>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
          />
          <Title level={4}>{item.name}</Title>
          <Paragraph>{item.description || 'Experience this amazing attraction during your visit.'}</Paragraph>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Ticket Price" value={item.price || '$25'} />
            </Col>
            <Col span={12}>
              <Statistic title="Rating" value={item.rating} suffix="/5" />
            </Col>
          </Row>
          <Paragraph style={{ marginTop: 16 }}>
            <Text strong>Opening Hours:</Text> {item.hours || '9:00 AM - 5:00 PM daily'}
          </Paragraph>
          <Paragraph>
            <Text strong>Address:</Text> {item.address || 'Central location in ' + (destination ? destination.name : 'the city')}
          </Paragraph>
          <Divider />
          <Text type="secondary">You'll be redirected to our booking partner's website to complete your reservation.</Text>
          {redirectCountdown > 0 && (
            <>
              <Divider />
              <Alert
                message={`Redirecting to tickets.com in ${redirectCountdown} seconds...`}
                type="info"
                showIcon
              />
            </>
          )}
        </div>
      );
      
      // Set the redirect info
      setRedirectInfo({ 
        id: item.id, 
        type: 'attraction', 
        provider: 'tickets' 
      });
    }
    
    // Set the modal content and make it visible
    setModalContent(content);
    setModalVisible(true);
    
    // Start the countdown
    setRedirectCountdown(5);
  };
  
  // Handle "See More" button clicks
  const handleSeeMore = (type) => {
    if (type === 'hotels') {
      // In a real app, we would navigate to a hotels page or expand the view
      setActiveTab('hotels');
      message.info('Showing all available hotels for ' + destination.name);
    } else if (type === 'events') {
      // In a real app, we would navigate to an events page
      message.info('Loading all events for ' + destination.name);
      // Simulate loading more events
      setTimeout(() => {
        message.success('Found 12 upcoming events in ' + destination.name);
      }, 1000);
    } else if (type === 'attractions') {
      setActiveTab('attractions');
      message.info('Showing all attractions in ' + destination.name);
    }
  };
  
  // Handle "View Details" button clicks
  const handleViewDetails = (item, type) => {
    let content;
    
    if (type === 'hotel') {
      content = (
        <div>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
            onError={(e) => {
              console.log("Hotel image failed to load, using fallback");
              e.target.src = 'https://cdn.britannica.com/38/189838-050-6351B307/Iolani-Palace-Oahu-Honolulu-Hawaiian-Islands.jpg';
            }}
          />
          <Title level={3}>{item.name}</Title>
          <Rate disabled defaultValue={item.rating} style={{ marginBottom: 16 }} />
          <Paragraph>{item.description}</Paragraph>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card size="small" title="Booking.com">
                ${item.bookingPrice}
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="Expedia">
                ${item.expediaPrice}
              </Card>
            </Col>
            {item.hotelsPrice && (
              <Col span={12}>
                <Card size="small" title="Hotels.com">
                  ${item.hotelsPrice}
                </Card>
              </Col>
            )}
            <Col span={24}>
              <Card size="small" title="Location">
                {item.address}
              </Card>
            </Col>
          </Row>
          <Divider />
          <Text type="secondary">You'll be redirected to the booking site with the best price for your selection.</Text>
          {redirectCountdown > 0 && (
            <>
              <Divider />
              <Alert
                message={`Redirecting to booking.com in ${redirectCountdown} seconds...`}
                type="info"
                showIcon
              />
            </>
          )}
        </div>
      );
      
      // Set the redirect info
      setRedirectInfo({ 
        id: item.id, 
        type: 'hotel', 
        provider: 'booking' 
      });
    } else if (type === 'attraction') {
      // Get the real-time image for this attraction if available
      const attractionImage = attractionImages[item.id] || item.image;
      
      // Prepare a backup image in case the primary one fails
      const backupImage = `https://source.unsplash.com/featured/?${encodeURIComponent(item.name)}&landmark&modal=true&date=${Date.now()}`;
      
      content = (
        <div>
          <div style={{ position: 'relative', height: 300, marginBottom: 16 }}>
            <img 
              src={attractionImage} 
              alt={item.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: 8 
              }}
              onError={(e) => {
                console.log("Attraction modal image failed to load, trying fallback:", e.target.src);
                // Try to load a fallback from a different source
                if (!e.target.src.includes('fallback') && !e.target.src.includes('modal=true')) {
                  e.target.src = backupImage;
                } else if (!e.target.src.includes('britannica.com')) {
                  // Try another fallback if the first one fails
                  e.target.src = 'https://cdn.britannica.com/69/94469-050-5ACEAD0F/Emperor-Hadrian-villa-Tivoli-Italy.jpg';
                } else {
                  // Final fallback to a static image
                  e.target.src = 'https://cdn.britannica.com/38/189838-050-6351B307/Iolani-Palace-Oahu-Honolulu-Hawaiian-Islands.jpg';
                }
              }}
            />
            {/* Add a "Live" badge if using a real-time image */}
            {attractionImages[item.id] && (
              <div style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(24, 144, 255, 0.8)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                <SyncOutlined style={{ marginRight: 6 }} /> Live Image
              </div>
            )}
          </div>
          <Title level={3}>{item.name}</Title>
          <Rate disabled defaultValue={item.rating} style={{ marginBottom: 16 }} />
          <Paragraph>{item.description || 'Experience this amazing attraction during your visit.'}</Paragraph>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card size="small" title="Price">
                {item.price || '$25'}
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="Hours">
                {item.hours || '9:00 AM - 5:00 PM daily'}
              </Card>
            </Col>
            <Col span={24}>
              <Card size="small" title="Location">
                {item.address || 'Central location in ' + (destination ? destination.name : 'the city')}
              </Card>
            </Col>
          </Row>
          <Divider />
          <Space>
            <Text type="secondary">Image updates: </Text>
            <Tag icon={<SyncOutlined spin={attractionImagesLoading} />} color="blue">
              Next refresh: {nextRefreshDate ? formatRefreshDate(nextRefreshDate) : 'Sunday'}
            </Tag>
            {/* Add refresh button for this specific attraction */}
            <Button 
              size="small"
              icon={<SyncOutlined />}
              loading={attractionImagesLoading}
              onClick={async () => {
                try {
                  setAttractionImagesLoading(true);
                  const result = await getRealTimeAttractionImages(item.name, 1);
                  if (result && result.images && result.images.length > 0) {
                    const newImagesMap = {...attractionImages};
                    newImagesMap[item.id] = result.images[0];
                    setAttractionImages(newImagesMap);
                    message.success(`Updated image for ${item.name}`);
                  } else {
                    message.warning("Could not find a new image. Try again later.");
                  }
                } catch (err) {
                  console.error("Error refreshing attraction image:", err);
                  message.error("Failed to refresh image. Try again later.");
                } finally {
                  setAttractionImagesLoading(false);
                }
              }}
            >
              Refresh Image
            </Button>
          </Space>
          <Divider />
          <Text type="secondary">You'll be redirected to our booking partner's website to complete your reservation.</Text>
          {redirectCountdown > 0 && (
            <>
              <Divider />
              <Alert
                message={`Redirecting to tickets.com in ${redirectCountdown} seconds...`}
                type="info"
                showIcon
              />
            </>
          )}
        </div>
      );
      
      // Set the redirect info
      setRedirectInfo({ 
        id: item.id, 
        type: 'attraction', 
        provider: 'tickets' 
      });
    }
    
    // Set the modal content and make it visible
    setModalContent(content);
    setModalVisible(true);
    
    // Start the countdown
    setRedirectCountdown(5);
  };
  
  // Handle the Travel Essentials buttons
  const handleTravelEssentials = (type) => {
    switch(type) {
      case 'tours':
        message.info('Redirecting to tours and activities for ' + destination.name);
        setTimeout(() => {
          window.open(`https://www.viator.com/search/${encodeURIComponent(destination.name)}`, '_blank');
        }, 1000);
        break;
      case 'accommodation':
        setActiveTab('hotels');
        message.info('Showing accommodation options for ' + destination.name);
        break;
      case 'transportation':
        message.info('Loading transportation options for ' + destination.name);
        // In a real app, this would navigate to a transportation page
        setTimeout(() => {
          message.success('Found transportation options for ' + destination.name);
          // Show a simulated modal with transportation options
          const transportContent = (
            <div>
              <Title level={3}>Transportation Options in {destination.name}</Title>
              <List
                itemLayout="horizontal"
                dataSource={[
                  { type: 'Airport Transfer', price: '$25 - $60', description: 'Convenient door-to-door service from airport' },
                  { type: 'Public Transit Pass', price: '$10 - $30 per day', description: 'Unlimited access to buses, trains, and subway' },
                  { type: 'Car Rental', price: '$40 - $100 per day', description: 'Various vehicle options available' },
                  { type: 'Guided Tours', price: 'Varies by tour', description: 'Transportation included with guided excursions' }
                ]}
                renderItem={item => (
                  <List.Item actions={[
                    <Button type="primary" onClick={() => {
                      if (item.type === 'Car Rental') {
                        window.open(`https://www.rentalcars.com/search?loc=${encodeURIComponent(destination.name)}`, '_blank');
                      } else if (item.type === 'Airport Transfer') {
                        window.open(`https://www.gettransfer.com/search/${encodeURIComponent(destination.name)}`, '_blank');
                      } else if (item.type === 'Guided Tours') {
                        window.open(`https://www.viator.com/search/${encodeURIComponent(destination.name)}`, '_blank');
                      } else {
                        message.info(`Redirecting to book ${item.type} for ${destination.name}`);
                      }
                    }}>Book Now</Button>
                  ]}>
                    <List.Item.Meta
                      title={item.type}
                      description={
                        <>
                          <div>{item.price}</div>
                          <div>{item.description}</div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          );
          setModalContent(transportContent);
          setModalVisible(true);
        }, 1000);
        break;
      default:
        break;
    }
  };

  // Add a function to refresh all attraction images
  const refreshAllAttractionImages = async () => {
    if (!attractions || attractions.length === 0) return;
    
    // Show loading message
    message.loading('Refreshing attraction images...', 1);
    
    // Refresh all attraction images
    await fetchAttractionImages(attractions);
    
    // Show success message
    message.success('Attraction images updated!');
  };

  // Update the attractions tab to include a refresh button
  const renderAttractionsTab = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Space>
          <Text type="secondary">Images update weekly. </Text>
          <Tag icon={<SyncOutlined />} color="blue">
            Next refresh: {nextRefreshDate ? formatRefreshDate(nextRefreshDate) : 'Sunday'}
          </Tag>
        </Space>
        <Button 
          type="primary" 
          icon={attractionImagesLoading ? <LoadingOutlined /> : <SyncOutlined />} 
          onClick={refreshAllAttractionImages}
          loading={attractionImagesLoading}
          disabled={attractionImagesLoading}
        >
          Refresh Images
        </Button>
      </div>
      <Row gutter={[24, 24]}>
        {attractions.map(attraction => {
          // Use the real-time image if available, otherwise fall back to the default image
          const attractionImage = attractionImages[attraction.id] || attraction.image;
          
          return (
            <Col xs={24} sm={12} lg={8} key={attraction.id}>
              <StyledCard
                hoverable
                cover={
                  <div style={{ position: 'relative', height: 200 }}>
                    {attractionImagesLoading ? (
                      <div style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5'
                      }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                      </div>
                    ) : (
                      <>
                        <img
                          alt={attraction.name}
                          src={attractionImage}
                          style={{ 
                            height: 200, 
                            width: '100%', 
                            objectFit: 'cover',
                            display: 'block'
                          }}
                          onError={(e) => {
                            console.log("Attraction image failed to load, trying fallback:", e.target.src);
                            // Try to load a fallback from a different source
                            if (!e.target.src.includes('fallback')) {
                              e.target.src = `https://source.unsplash.com/featured/?${encodeURIComponent(attraction.name)}&landmark&fallback=${Date.now()}`;
                            } else {
                              // Final fallback to attraction's default image
                              e.target.src = attraction.image || 'https://cdn.britannica.com/38/189838-050-6351B307/Iolani-Palace-Oahu-Honolulu-Hawaiian-Islands.jpg';
                              e.target.dataset.fallback = 'used';
                            }
                          }}
                        />
                        {/* Add an overlay to indicate this is a real-time image */}
                        {attractionImages[attraction.id] && (
                          <div style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: 'rgba(24, 144, 255, 0.8)',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            <SyncOutlined style={{ marginRight: 4 }} /> Live
                          </div>
                        )}
                      </>
                    )}
                  </div>
                }
              >
                <Card.Meta
                  title={attraction.name}
                  description={
                    <>
                      <Rate disabled defaultValue={attraction.rating} style={{ fontSize: '12px' }} />
                      <div style={{ marginTop: 10, maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {attraction.description || `Experience the beauty and history of ${attraction.name}.`}
                      </div>
                      <Space style={{ marginTop: 16 }}>
                        <Button size="small" onClick={() => handleBookNow(attraction, 'attraction')}>Book Tickets</Button>
                        <Button size="small" onClick={() => handleViewDetails(attraction, 'attraction')}>View Details</Button>
                      </Space>
                    </>
                  }
                />
              </StyledCard>
            </Col>
          );
        })}
      </Row>
    </>
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <Spin size="large" tip="Loading destination information..." />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  if (!destination) {
    return <Alert message="Info" description="Destination not found." type="info" showIcon />;
  }

  // Price comparison table columns
  const priceColumns = [
    {
      title: 'Hotel',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Text strong>{text}</Text>
          <Rate disabled defaultValue={record.rating} style={{ fontSize: '12px' }} />
        </Space>
      ),
    },
    {
      title: 'Booking.com',
      dataIndex: 'bookingPrice',
      key: 'bookingPrice',
      render: (price) => (
        <Text strong>{price ? `$${price}` : 'N/A'}</Text>
      ),
    },
    {
      title: 'Expedia',
      dataIndex: 'expediaPrice',
      key: 'expediaPrice',
      render: (price) => (
        <Text strong>{price ? `$${price}` : 'N/A'}</Text>
      ),
    },
    {
      title: 'Hotels.com',
      dataIndex: 'hotelsPrice',
      key: 'hotelsPrice',
      render: (price) => (
        <Text strong>{price ? `$${price}` : 'N/A'}</Text>
      ),
    },
    {
      title: 'Best Deal',
      key: 'bestDeal',
      render: (_, record) => {
        const prices = [
          record.bookingPrice,
          record.expediaPrice,
          record.hotelsPrice
        ].filter(Boolean);
        
        if (prices.length === 0) return <Text>No pricing available</Text>;
        
        const minPrice = Math.min(...prices);
        const provider = record.bookingPrice === minPrice ? 'Booking.com' :
                         record.expediaPrice === minPrice ? 'Expedia' :
                         'Hotels.com';
                         
        return (
          <Space>
            <Tag color="green">${minPrice}</Tag>
            <Text type="secondary">{provider}</Text>
          </Space>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" size="small" onClick={() => handleBookNow(record, 'hotel')}>
          Book Now
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Destination Header/Hero */}
      <DestinationHeader>
        {realTimeImages.length > 0 ? (
          <>
            <StyledCarousel autoplay>
              {realTimeImages.map((image, index) => (
                <div key={index} className="image-container">
                  <img 
                    src={image} 
                    alt={`${destination.name} - ${index + 1}`} 
                    onError={(e) => {
                      console.log("Image failed to load, using fallback:", e.target.src);
                      // Try to load a fallback from a different source
                      if (!e.target.src.includes('britannica.com') && !e.target.src.includes('fallback')) {
                        e.target.src = `https://source.unsplash.com/featured/?${encodeURIComponent(destination.name)}&tourism&fallback=${Date.now()}`;
                      } else if (!e.target.src.includes('fallback2')){
                        // Final fallback
                        e.target.src = 'https://cdn.britannica.com/30/94430-050-D0FC51CD/Niagara-Falls.jpg';
                        e.target.dataset.fallback = 'used';
                      }
                    }}
                    style={{ 
                      objectFit: 'cover', 
                      height: '100%', 
                      width: '100%',
                      opacity: imagesLoading ? 0.7 : 1,
                      transition: 'opacity 0.3s ease'
                    }}
                  />
                  <div className="caption">
                    <Title level={1} style={{ color: 'white', margin: 0 }}>{destination.name}</Title>
                    <Space size="small">
                      <EnvironmentOutlined />
                      <Text style={{ color: 'white' }}>{destination.location}</Text>
                    </Space>
                  </div>
                  {imagesLoading && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5
                    }}>
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />} />
                    </div>
                  )}
                </div>
              ))}
            </StyledCarousel>
            <RefreshButton 
              type="primary" 
              shape="circle" 
              icon={imagesLoading ? <LoadingOutlined /> : <SyncOutlined />} 
              onClick={() => fetchRealTimeImages(destination.name)}
              title="Refresh with latest images"
              disabled={imagesLoading}
            />
            <Space 
              direction="vertical"
              style={{ 
                position: 'absolute', 
                top: 20, 
                left: 20, 
                zIndex: 5
              }}
            >
              <Tag 
                color="blue" 
                style={{ 
                  opacity: 0.9,
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
              >
                <CameraOutlined /> Real-time Images
              </Tag>
              
              {nextRefreshDate && (
                <Tooltip title={`Images are refreshed every Sunday. Next refresh will be on ${formatRefreshDate(nextRefreshDate)}`}>
                  <Tag
                    color="green"
                    style={{
                      opacity: 0.9,
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    <ClockCircleOutlined /> Updates on {formatRefreshDate(nextRefreshDate)}
                  </Tag>
                </Tooltip>
              )}
            </Space>
            
            {/* Translation Button */}
            <Button
              type="primary"
              icon={<TranslationOutlined />}
              shape="round"
              style={{
                position: 'absolute',
                top: 20,
                right: 70,
                zIndex: 10,
                opacity: 0.9,
              }}
              onClick={() => changeLocale(locale === 'en' ? 'zh' : 'en')}
            >
              {locale === 'en' ? '中文' : 'English'}
            </Button>
          </>
        ) : (
          <div className="image-container">
            <img 
              src={destination.image} 
              alt={destination.name} 
              onError={(e) => {
                console.log("Default image failed to load, using fallback");
                e.target.src = 'https://cdn.britannica.com/85/84985-050-BD97A936/Great-Wall-of-China-Mu-Tian-Yu.jpg';
              }}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
            <div className="caption">
              <Title level={1} style={{ color: 'white', margin: 0 }}>{destination.name}</Title>
              <Space size="small">
                <EnvironmentOutlined />
                <Text style={{ color: 'white' }}>{destination.location}</Text>
              </Space>
            </div>
            {imagesLoading ? (
              <Spin 
                indicator={<LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />} 
                style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ) : (
              <RefreshButton 
                type="primary" 
                shape="circle" 
                icon={<SyncOutlined />} 
                onClick={() => fetchRealTimeImages(destination.name)}
                title="Get real-time images"
              />
            )}
          </div>
        )}
      </DestinationHeader>

      {/* Tabs for different sections */}
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        type="card"
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        {/* Overview Tab */}
        <TabPane 
          tab={<span><InfoCircleOutlined />{t('destination.overview')}</span>} 
          key="overview"
        >
          <Row gutter={24}>
            <Col xs={24} md={16}>
              <StyledCard>
                <Title level={4}>{t('destination.about')} {destination.name}</Title>
                <Paragraph>{destination.description}</Paragraph>
                
                <Divider />
                
                <Title level={4}>{t('destination.highlights')}</Title>
                <HighlightBox>
                  <Paragraph>
                    <strong>{destination.name}</strong> {t('destination.knownFor')}
                    {destination.attractions && destination.attractions.length > 0 ? 
                      destination.attractions[0].name : t('destination.localSights')} {t('destination.vibrantAtmosphere')}
                  </Paragraph>
                </HighlightBox>
                
                <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                  <Col span={8}>
                    <Statistic title={t('destination.bestTimeToVisit')} value="Apr-Oct" prefix={<CalendarOutlined />} />
                  </Col>
                  <Col span={8}>
                    <Statistic title={t('destination.language')} value={destination.location === 'France' ? 'French' : 
                                                      destination.location === 'Japan' ? 'Japanese' : 'Local'} 
                                prefix={<CompassOutlined />} />
                  </Col>
                  <Col span={8}>
                    <Statistic title={t('destination.currency')} value={destination.location === 'France' ? 'EUR' : 
                                                      destination.location === 'Japan' ? 'JPY' : 'Local'} 
                                prefix={<DollarOutlined />} />
                  </Col>
                </Row>
                
                <Divider />
                
                <Title level={4}>Travel Tips</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    'Research local customs and etiquette before your trip',
                    'Learn a few basic phrases in the local language',
                    'Check if you need a visa or special permits',
                    'Consider purchasing travel insurance',
                    'Keep copies of important documents'
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<ThunderboltOutlined style={{ color: '#1890ff' }} />}
                        description={item}
                      />
                    </List.Item>
                  )}
                />
              </StyledCard>
            </Col>
            
            <Col xs={24} md={8}>
              {/* Weather Widget */}
              <WeatherCard title={t('destination.weather')}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>{weather.current.icon}</div>
                <Title level={2} style={{ margin: 0 }}>{weather.current.temp}°C</Title>
                <Text>{weather.current.condition}</Text>
                
                <Row style={{ marginTop: '20px' }}>
                  {weather.forecast.map((day, index) => (
                    <Col span={24/weather.forecast.length} key={index}>
                      <Text>{day.day}</Text>
                      <div style={{ fontSize: '24px' }}>{day.icon}</div>
                      <Text>{day.temp}°</Text>
                    </Col>
                  ))}
                </Row>
              </WeatherCard>
              
              {/* Local Events */}
              <StyledCard 
                title={t('destination.upcomingEvents')} 
                extra={<Button type="link" onClick={() => handleSeeMore('events')}>{t('home.viewAll')}</Button>}
                style={{ marginTop: '20px' }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: destination.location === 'France' ? 'Paris Fashion Week' : 
                             destination.location === 'Japan' ? 'Cherry Blossom Festival' : 'Local Festival',
                      date: 'May 15-22, 2025'
                    },
                    {
                      title: destination.location === 'France' ? 'Wine & Food Festival' : 
                             destination.location === 'Japan' ? 'Sumo Tournament' : 'Cultural Event',
                      date: 'June 5-8, 2025'
                    }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.title}
                        description={item.date}
                      />
                    </List.Item>
                  )}
                />
              </StyledCard>
              
              {/* Travel Essentials */}
              <StyledCard title={t('destination.travelEssentials')} style={{ marginTop: '20px' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button block icon={<GiftOutlined />} onClick={() => handleTravelEssentials('tours')}>{t('destination.bookTours')}</Button>
                  <Button block icon={<HomeOutlined />} onClick={() => handleTravelEssentials('accommodation')}>{t('destination.findAccommodation')}</Button>
                  <Button block icon={<CompassOutlined />} onClick={() => handleTravelEssentials('transportation')}>{t('destination.transportationOptions')}</Button>
                </Space>
              </StyledCard>
            </Col>
          </Row>
        </TabPane>
        
        {/* Attractions Tab */}
        <TabPane 
          tab={<span><CompassOutlined />{t('destination.attractions')}</span>} 
          key="attractions"
        >
          <Divider>{t('destination.topAttractions')}</Divider>
          {renderAttractionsTab()}
        </TabPane>
        
        {/* Hotels Tab */}
        <TabPane 
          tab={<span><HomeOutlined />{t('destination.hotels')}</span>} 
          key="hotels"
        >
          <StyledCard title="Hotel Price Comparison" extra={<Button type="link" onClick={() => handleSeeMore('hotels')}>See More</Button>}>
            <Table 
              dataSource={priceComparisons} 
              columns={priceColumns} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
            <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
              * Prices shown are per night for a standard room, taxes and fees not included. 
              Prices may vary based on dates and availability.
            </Text>
          </StyledCard>
          
          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            <Col span={24}>
              <Title level={4}>Featured Accommodations</Title>
            </Col>
            {priceComparisons.slice(0, 3).map(hotel => (
              <Col xs={24} sm={12} lg={8} key={hotel.id}>
                <PriceComparisonCard
                  hoverable
                  cover={<img alt={hotel.name} src={hotel.image} style={{ height: 200, objectFit: 'cover' }} />}
                >
                  <Card.Meta
                    title={hotel.name}
                    description={
                      <>
                        <Rate disabled defaultValue={hotel.rating} style={{ fontSize: '12px' }} />
                        <div style={{ marginTop: 10 }}>{hotel.description}</div>
                        <Divider style={{ margin: '12px 0' }} />
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Space>
                            <Text strong>Best Price:</Text>
                            <Tag color="green">${Math.min(...[hotel.bookingPrice, hotel.expediaPrice, hotel.hotelsPrice].filter(Boolean))}</Tag>
                          </Space>
                          <Button type="primary" block onClick={() => handleBookNow(hotel, 'hotel')}>View Deals</Button>
                        </Space>
                      </>
                    }
                  />
                </PriceComparisonCard>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>

      <Modal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setRedirectCountdown(0);
          setRedirectInfo(null);
        }}
        footer={[
          <Button key="back" onClick={() => {
            setModalVisible(false);
            setRedirectCountdown(0);
            setRedirectInfo(null);
          }}>
            Cancel
          </Button>,
          redirectCountdown > 0 ? (
            <Button key="submit" type="primary" loading>
              Redirecting in {redirectCountdown}s...
            </Button>
          ) : (
            <Button 
              key="submit" 
              type="primary" 
              onClick={() => {
                if (redirectInfo) {
                  // Start the redirect countdown
                  setRedirectCountdown(5);
                } else {
                  setModalVisible(false);
                }
              }}
            >
              Book Now
            </Button>
          )
        ]}
        width={800}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default Destination;