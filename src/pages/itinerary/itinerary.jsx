import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Button,
  Tabs,
  Card,
  Tag,
  Row,
  Col,
  Empty,
  Space,
  List,
  Avatar,
  Skeleton,
  DatePicker,
  Input,
  Form,
  Drawer,
  Select,
  Badge,
  Spin,
  Tooltip,
  Modal
} from 'antd';
import {
  PlusOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  CarOutlined,
  HomeOutlined,
  CloudOutlined,
  TeamOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import { useItinerary } from '../../contexts/ItineraryContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
  }

  .ant-card-cover img {
    height: 200px;
    object-fit: cover;
  }

  .ant-card-meta-title {
    margin-bottom: 8px;
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  background: #f9f9f9;
  border-radius: 12px;
  text-align: center;
`;

const DynamicUpdateBadge = styled(Badge)`
  .ant-badge-status-dot {
    width: 8px;
    height: 8px;
  }
`;

// Get status color based on trip status
const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return 'blue';
    case 'active':
      return 'green';
    case 'past':
      return 'default';
    case 'draft':
      return 'orange';
    default:
      return 'default';
  }
};

// Format date range
const formatDateRange = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  
  if (start.year() === end.year()) {
    if (start.month() === end.month()) {
      return `${start.format('MMM D')} - ${end.format('D, YYYY')}`;
    }
    return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`;
  }
  
  return `${start.format('MMM D, YYYY')} - ${end.format('MMM D, YYYY')}`;
};

// Duration in days
const getDuration = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  return end.diff(start, 'days') + 1;
};

// Main Itinerary Component
const Itinerary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    itineraries, 
    loading, 
    error, 
    getItinerary, 
    createItinerary, 
    updateItinerary, 
    deleteItinerary 
  } = useItinerary();
  
  const [activeTab, setActiveTab] = useState('upcoming');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [form] = Form.useForm();
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [adaptationModalVisible, setAdaptationModalVisible] = useState(false);
  const [adaptations, setAdaptations] = useState([]);
  
  // Filter itineraries based on active tab
  useEffect(() => {
    if (itineraries && itineraries.length > 0) {
      const filtered = itineraries.filter(itinerary => itinerary.status === activeTab);
      setFilteredItineraries(filtered);
    } else {
      setFilteredItineraries([]);
    }
  }, [itineraries, activeTab]);
  
  // Show adaptation suggestions (demo feature)
  const showAdaptations = (itineraryId) => {
    // In a real app, these would come from backend analysis
    // based on actual weather forecasts, crowd data, etc.
    const mockAdaptations = [
      {
        id: 'a1',
        type: 'weather',
        activity: 'Tokyo Skytree Visit',
        originalDate: '2025-05-16',
        issue: 'Heavy rain forecast',
        recommendation: 'Reschedule to May 17th (clear weather expected)',
        severity: 'high'
      },
      {
        id: 'a2',
        type: 'crowd',
        activity: 'Meiji Shrine',
        originalDate: '2025-05-17',
        issue: 'National holiday - extremely crowded',
        recommendation: 'Visit early morning (before 9 AM) to avoid crowds',
        severity: 'medium'
      },
      {
        id: 'a3',
        type: 'event',
        activity: 'None',
        originalDate: '2025-05-17',
        issue: 'Cultural festival taking place',
        recommendation: 'Add Sanja Matsuri festival in Asakusa to your itinerary',
        severity: 'low'
      }
    ];
    
    setAdaptations(mockAdaptations);
    setAdaptationModalVisible(true);
  };
  
  // Create or update an itinerary
  const handleSaveItinerary = () => {
    form.validateFields().then(values => {
      const { dateRange, ...otherValues } = values;
      
      const itineraryData = {
        ...otherValues,
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
        status: values.status || 'upcoming'
      };
      
      if (editingItinerary) {
        // Update existing itinerary
        updateItinerary(editingItinerary.id, itineraryData);
      } else {
        // Create new itinerary
        createItinerary(itineraryData);
      }
      
      setDrawerVisible(false);
      form.resetFields();
      setEditingItinerary(null);
    });
  };
  
  // Edit an existing itinerary
  const handleEditItinerary = (itinerary) => {
    setEditingItinerary(itinerary);
    
    form.setFieldsValue({
      title: itinerary.title,
      destination: itinerary.destination,
      dateRange: [moment(itinerary.startDate), moment(itinerary.endDate)],
      travelers: itinerary.travelers,
      status: itinerary.status
    });
    
    setDrawerVisible(true);
  };
  
  // Confirm deletion of an itinerary
  const handleDeleteConfirm = (itinerary) => {
    confirm({
      title: 'Are you sure you want to delete this trip?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        deleteItinerary(itinerary.id);
      }
    });
  };
  
  // Open new itinerary form
  const handleCreateNew = () => {
    setEditingItinerary(null);
    form.resetFields();
    setDrawerVisible(true);
  };
  
  // View itinerary details
  const viewItineraryDetails = (itinerary) => {
    navigate(`/itinerary/${itinerary.id}`);
  };
  
  // Map tabs to their labels
  const tabLabels = {
    upcoming: t('itinerary.upcoming'),
    active: 'Active',
    past: t('itinerary.past'),
    draft: t('itinerary.draft')
  };
  
  // Count itineraries by status
  const getTabCounts = () => {
    const counts = { upcoming: 0, active: 0, past: 0, draft: 0 };
    
    itineraries.forEach(itinerary => {
      if (counts[itinerary.status] !== undefined) {
        counts[itinerary.status]++;
      }
    });
    
    return counts;
  };
  
  const tabCounts = getTabCounts();

  return (
    <div>
      <HeaderContainer>
        <Title level={2}>{t('itinerary.myTrips')}</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={handleCreateNew}
        >
          {t('itinerary.newTrip')}
        </Button>
      </HeaderContainer>
      
      <Tabs 
        activeKey={activeTab}
        onChange={setActiveTab}
        size="large"
        type="card"
      >
        {Object.keys(tabLabels).map(tabKey => (
          <TabPane 
            tab={
              <span>
                {tabLabels[tabKey]} 
                {tabCounts[tabKey] > 0 && (
                  <Badge count={tabCounts[tabKey]} style={{ marginLeft: 8 }} />
                )}
              </span>
            } 
            key={tabKey}
          >
            {loading ? (
              <Row gutter={[24, 24]}>
                {[1, 2, 3].map(i => (
                  <Col xs={24} md={12} lg={8} key={`skeleton-${i}`}>
                    <Card>
                      <Skeleton active avatar paragraph={{ rows: 4 }} />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : filteredItineraries.length === 0 ? (
              <NoDataContainer>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={t('itinerary.noTrips')}
                />
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  style={{ marginTop: 16 }}
                  onClick={handleCreateNew}
                >
                  {t('itinerary.newTrip')}
                </Button>
              </NoDataContainer>
            ) : (
              <Row gutter={[24, 24]}>
                {filteredItineraries.map(itinerary => (
                  <Col xs={24} md={12} lg={8} key={itinerary.id}>
                    <StyledCard
                      hoverable
                      cover={<img alt={itinerary.title} src={itinerary.coverImage} />}
                      actions={[
                        <Tooltip title="Edit Trip">
                          <EditOutlined key="edit" onClick={(e) => {
                            e.stopPropagation();
                            handleEditItinerary(itinerary);
                          }} />
                        </Tooltip>,
                        <Tooltip title="Show Adaptive Suggestions">
                          <ThunderboltOutlined key="adapt" onClick={(e) => {
                            e.stopPropagation();
                            showAdaptations(itinerary.id);
                          }} />
                        </Tooltip>,
                        <Tooltip title="Delete Trip">
                          <DeleteOutlined key="delete" onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConfirm(itinerary);
                          }} />
                        </Tooltip>
                      ]}
                      onClick={() => viewItineraryDetails(itinerary)}
                    >
                      <DynamicUpdateBadge 
                        status="processing" 
                        color="#1890ff"
                        offset={[-5, 5]}
                        dot
                      >
                        <Card.Meta
                          title={
                            <div>
                              {itinerary.title}
                              <Tag 
                                color={getStatusColor(itinerary.status)}
                                style={{ marginLeft: 8, fontWeight: 'normal' }}
                              >
                                {itinerary.status}
                              </Tag>
                            </div>
                          }
                          description={
                            <Space direction="vertical" size="small">
                              <div>
                                <EnvironmentOutlined /> {itinerary.destination}
                              </div>
                              <div>
                                <CalendarOutlined /> {formatDateRange(itinerary.startDate, itinerary.endDate)}
                                <span style={{ marginLeft: 8 }}>
                                  ({getDuration(itinerary.startDate, itinerary.endDate)} days)
                                </span>
                              </div>
                              <div>
                                <UserOutlined /> {itinerary.travelers} {itinerary.travelers === 1 ? 'Traveler' : 'Travelers'}
                              </div>
                              
                              {/* Dynamic Update Indicator (for demo) */}
                              {itinerary.status === 'upcoming' && Math.random() > 0.5 && (
                                <div style={{ 
                                  marginTop: 8,
                                  padding: '8px 12px',
                                  background: '#e6f7ff',
                                  borderRadius: 4,
                                  borderLeft: '3px solid #1890ff'
                                }}>
                                  <Text strong>
                                    <ThunderboltOutlined /> Smart Update Available
                                  </Text>
                                  <div style={{ fontSize: '12px' }}>
                                    Weather changes detected for your trip dates
                                  </div>
                                </div>
                              )}
                            </Space>
                          }
                        />
                      </DynamicUpdateBadge>
                    </StyledCard>
                  </Col>
                ))}
              </Row>
            )}
          </TabPane>
        ))}
      </Tabs>
      
      {/* Create/Edit Itinerary Drawer */}
      <Drawer
        title={editingItinerary ? 'Edit Trip' : 'Create New Trip'}
        width={520}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSaveItinerary}>
              Save
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            travelers: 1,
            status: 'upcoming'
          }}
        >
          <Form.Item
            name="title"
            label="Trip Title"
            rules={[{ required: true, message: 'Please enter a trip title' }]}
          >
            <Input placeholder="e.g., Summer in Japan" />
          </Form.Item>
          
          <Form.Item
            name="destination"
            label="Destination"
            rules={[{ required: true, message: 'Please enter a destination' }]}
          >
            <Input placeholder="e.g., Tokyo, Japan" />
          </Form.Item>
          
          <Form.Item
            name="dateRange"
            label="Travel Dates"
            rules={[{ required: true, message: 'Please select your travel dates' }]}
          >
            <RangePicker 
              style={{ width: '100%' }} 
              format="YYYY-MM-DD"
            />
          </Form.Item>
          
          <Form.Item
            name="travelers"
            label="Number of Travelers"
            rules={[{ required: true, message: 'Please enter number of travelers' }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Trip Status"
          >
            <Select>
              <Select.Option value="upcoming">Upcoming</Select.Option>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="past">Past</Select.Option>
              <Select.Option value="draft">Draft</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
      
      {/* Adaptive Suggestions Modal */}
      <Modal
        title={
          <div>
            <ThunderboltOutlined style={{ color: '#1890ff', marginRight: 8 }} />
            Smart Itinerary Adaptations
          </div>
        }
        open={adaptationModalVisible}
        onCancel={() => setAdaptationModalVisible(false)}
        footer={[
          <Button key="ignore" onClick={() => setAdaptationModalVisible(false)}>
            Ignore
          </Button>,
          <Button 
            key="apply" 
            type="primary" 
            onClick={() => {
              setAdaptationModalVisible(false);
              // In a real app, this would apply the changes to the itinerary
              setTimeout(() => {
                Modal.success({
                  title: 'Adaptations Applied',
                  content: 'Your itinerary has been updated with the suggested changes.'
                });
              }, 500);
            }}
          >
            Apply All Changes
          </Button>
        ]}
        width={640}
      >
        <List
          itemLayout="horizontal"
          dataSource={adaptations}
          renderItem={item => (
            <List.Item actions={[
              <Button size="small" type="primary">Apply</Button>,
              <Button size="small">Ignore</Button>
            ]}>
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={
                      item.type === 'weather' ? <CloudOutlined /> : 
                      item.type === 'crowd' ? <TeamOutlined /> : 
                      <CalendarOutlined />
                    } 
                    style={{ 
                      backgroundColor: 
                        item.severity === 'high' ? '#ff4d4f' : 
                        item.severity === 'medium' ? '#faad14' : 
                        '#52c41a' 
                    }} 
                  />
                }
                title={
                  <div>
                    <Text strong>{item.activity}</Text>
                    <Tag 
                      color={
                        item.severity === 'high' ? 'red' : 
                        item.severity === 'medium' ? 'orange' : 
                        'green'
                      }
                      style={{ marginLeft: 8 }}
                    >
                      {item.severity}
                    </Tag>
                  </div>
                }
                description={
                  <>
                    <div><ClockCircleOutlined /> Original: {moment(item.originalDate).format('MMM D, YYYY')}</div>
                    <div><InfoCircleOutlined /> Issue: {item.issue}</div>
                    <div><CheckCircleOutlined /> Recommendation: {item.recommendation}</div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Itinerary;