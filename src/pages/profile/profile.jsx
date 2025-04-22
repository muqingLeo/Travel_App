import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Form,
  Input,
  Select,
  Space,
  Divider,
  Tabs,
  List,
  Tag,
  Switch,
  Spin,
  Upload,
  message,
  Radio,
  Tooltip
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  GlobalOutlined,
  TranslationOutlined,
  CreditCardOutlined,
  BellOutlined,
  HeartOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  QuestionCircleOutlined,
  LockOutlined,
  PlusOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useLocale } from '../../contexts/LocaleContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Styled Components
const ProfileHeader = styled.div`
  background: linear-gradient(to right, #1890ff, #69c0ff);
  color: white;
  padding: 48px 24px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    z-index: 0;
  }
`;

const ProfileHeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

const ProfileAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
  
  .ant-avatar-string {
    font-size: 48px;
    line-height: 120px;
  }
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const ProfileCard = styled(Card)`
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const PreferenceTag = styled(Tag)`
  padding: 6px 10px;
  margin-bottom: 8px;
  
  &.active {
    background-color: #e6f7ff;
    border-color: #91d5ff;
  }
`;

const PaymentCard = styled.div`
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-bottom: 16px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Main Profile Component
const Profile = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const { locale, changeLocale } = useLocale();
  
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // Set form values from user data
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        language: locale
      });
    }
  }, [user, form, locale]);
  
  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await updateProfile(values);
      
      // Update locale if language preference changed
      if (values.language !== locale) {
        changeLocale(values.language);
      }
      
      setEditing(false);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle the selected travel preference
  const togglePreference = (preference) => {
    const currentPreferences = user.preferences?.travelPreferences || [];
    let newPreferences;
    
    if (currentPreferences.includes(preference)) {
      newPreferences = currentPreferences.filter(p => p !== preference);
    } else {
      newPreferences = [...currentPreferences, preference];
    }
    
    updateProfile({
      preferences: {
        ...user.preferences,
        travelPreferences: newPreferences
      }
    });
  };
  
  // Sample travel preferences
  const travelPreferences = [
    'Nature', 'Cities', 'Beaches', 'Food', 'Culture', 'History', 
    'Adventure', 'Relaxation', 'Photography', 'Shopping', 'Wildlife'
  ];
  
  // Sample saved places
  const savedPlaces = [
    { id: 'p1', name: 'Kyoto Bamboo Forest', type: 'attraction', country: 'Japan' },
    { id: 'p2', name: 'Restaurant Le Meurice', type: 'restaurant', country: 'France' },
    { id: 'p3', name: 'Anse Source d\'Argent', type: 'beach', country: 'Seychelles' },
    { id: 'p4', name: 'Riad Yasmine', type: 'hotel', country: 'Morocco' }
  ];
  
  // Sample payment methods
  const paymentMethods = [
    { id: 'card1', type: 'Visa', last4: '4242', expiry: '05/26' },
    { id: 'card2', type: 'Mastercard', last4: '8210', expiry: '11/27' }
  ];
  
  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      <ProfileHeader>
        <ProfileHeaderContent>
          <Row gutter={24} align="middle">
            <Col xs={24} md={6} style={{ textAlign: 'center' }}>
              <ProfileAvatar 
                src={user.photoURL} 
                icon={!user.photoURL && <UserOutlined />}
              />
              {!editing && (
                <Upload 
                  showUploadList={false}
                  beforeUpload={(file) => {
                    // In a real app, you'd upload the file to your server
                    message.info('This feature would upload your profile photo');
                    return false;
                  }}
                >
                  <Button icon={<CloudUploadOutlined />}>Change Photo</Button>
                </Upload>
              )}
            </Col>
            
            <Col xs={24} md={18}>
              {editing ? (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  initialValues={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone || '',
                    address: user.address || '',
                    language: locale
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label={<Text style={{ color: 'white' }}>Full Name</Text>}
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input prefix={<UserOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label={<Text style={{ color: 'white' }}>Email</Text>}
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                      >
                        <Input prefix={<MailOutlined />} readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label={<Text style={{ color: 'white' }}>Phone Number</Text>}
                      >
                        <Input prefix={<PhoneOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="language"
                        label={<Text style={{ color: 'white' }}>Preferred Language</Text>}
                      >
                        <Select prefix={<GlobalOutlined />}>
                          <Option value="en">English</Option>
                          <Option value="zh">Chinese</Option>
                          <Option value="es">Spanish</Option>
                          <Option value="fr">French</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Space>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      icon={<SaveOutlined />}
                      loading={loading}
                    >
                      Save Changes
                    </Button>
                    <Button 
                      onClick={() => setEditing(false)} 
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Space>
                </Form>
              ) : (
                <>
                  <Title level={2} style={{ color: 'white', marginBottom: 8 }}>{user.name}</Title>
                  <div style={{ marginBottom: 16 }}>
                    <Space size={16} wrap>
                      <Text style={{ color: 'white' }}><MailOutlined /> {user.email}</Text>
                      {user.phone && <Text style={{ color: 'white' }}><PhoneOutlined /> {user.phone}</Text>}
                    </Space>
                  </div>
                  
                  <Space wrap>
                    <Tag icon={<GlobalOutlined />} color="blue">
                      {locale === 'en' ? 'English' : locale === 'zh' ? '中文' : locale}
                    </Tag>
                    <Tag icon={<TranslationOutlined />} color="purple">
                      Speaks {user.languages?.join(', ') || 'English'}
                    </Tag>
                    <Tag icon={<EnvironmentOutlined />} color="green">
                      {user.country || 'United States'}
                    </Tag>
                  </Space>
                </>
              )}
            </Col>
          </Row>
          
          {!editing && (
            <EditButton 
              type="primary" 
              shape="circle" 
              icon={<EditOutlined />} 
              onClick={() => setEditing(true)}
              ghost
            />
          )}
        </ProfileHeaderContent>
      </ProfileHeader>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><UserOutlined /> {t('profile.personalInfo')}</span>} 
          key="personal"
        >
          <Row gutter={24}>
            <Col xs={24} md={16}>
              <ProfileCard
                title={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Personal Details</span>
                    <Button 
                      type="link" 
                      icon={<EditOutlined />} 
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </Button>
                  </div>
                }
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { label: 'Full Name', value: user.name, icon: <UserOutlined /> },
                    { label: 'Email', value: user.email, icon: <MailOutlined /> },
                    { label: 'Phone', value: user.phone || 'Not provided', icon: <PhoneOutlined /> },
                    { label: 'Address', value: user.address || 'Not provided', icon: <HomeOutlined /> },
                    { label: 'Language', value: locale === 'en' ? 'English' : locale === 'zh' ? 'Chinese' : locale, icon: <GlobalOutlined /> }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={item.icon}
                        title={item.label}
                        description={item.value}
                      />
                    </List.Item>
                  )}
                />
              </ProfileCard>
              
              <ProfileCard
                title="Security & Privacy"
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { 
                      label: 'Change Password', 
                      action: 
                        <Button 
                          type="primary" 
                          onClick={() => message.info('Password change functionality would be implemented here')}
                        >
                          Change
                        </Button>,
                      icon: <LockOutlined />
                    },
                    { 
                      label: 'Two-Factor Authentication', 
                      action: 
                        <Switch 
                          defaultChecked={user.twoFactorEnabled} 
                          onChange={(checked) => message.info(`Two-factor authentication ${checked ? 'enabled' : 'disabled'}`)}
                        />,
                      icon: <SettingOutlined />
                    },
                    { 
                      label: 'Privacy Settings', 
                      action: 
                        <Button 
                          onClick={() => message.info('Privacy settings would be shown here')}
                        >
                          Manage
                        </Button>,
                      icon: <SettingOutlined />
                    }
                  ]}
                  renderItem={item => (
                    <List.Item actions={[item.action]}>
                      <List.Item.Meta
                        avatar={item.icon}
                        title={item.label}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </ProfileCard>
            </Col>
            
            <Col xs={24} md={8}>
              <ProfileCard
                title="Account Summary"
              >
                <div style={{ marginBottom: 16 }}>
                  <Title level={4} style={{ margin: 0 }}>Member Since</Title>
                  <Text>April 2023</Text>
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <Title level={4} style={{ margin: 0 }}>Status</Title>
                  <Tag color="green">Premium Member</Tag>
                </div>
                
                <div>
                  <Title level={4} style={{ margin: 0 }}>Activity</Title>
                  <Text>3 Upcoming Trips</Text>
                </div>
              </ProfileCard>
              
              <ProfileCard
                title="Connected Accounts"
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { name: 'Google', connected: true, icon: <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" style={{ width: 16, height: 16 }} alt="Google" /> },
                    { name: 'Facebook', connected: false, icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" style={{ width: 16, height: 16 }} alt="Facebook" /> },
                    { name: 'Apple', connected: false, icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" style={{ width: 16, height: 16 }} alt="Apple" /> }
                  ]}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button type={item.connected ? 'text' : 'link'}>
                          {item.connected ? 'Disconnect' : 'Connect'}
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={item.icon}
                        title={item.name}
                        description={item.connected ? 'Connected' : 'Not connected'}
                      />
                    </List.Item>
                  )}
                />
              </ProfileCard>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={<span><HeartOutlined /> {t('profile.preferences')}</span>} 
          key="preferences"
        >
          <Row gutter={24}>
            <Col xs={24} md={16}>
              <ProfileCard
                title="Travel Preferences"
                extra={<Tooltip title="These help us personalize recommendations"><QuestionCircleOutlined /></Tooltip>}
              >
                <Title level={5}>I'm interested in:</Title>
                <div>
                  {travelPreferences.map(preference => (
                    <PreferenceTag
                      key={preference}
                      className={
                        user.preferences?.travelPreferences?.includes(preference) 
                          ? 'active' 
                          : ''
                      }
                      onClick={() => togglePreference(preference)}
                      style={{ cursor: 'pointer' }}
                    >
                      {preference}
                    </PreferenceTag>
                  ))}
                </div>
                
                <Divider />
                
                <Title level={5}>General Preferences</Title>
                
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Currency">
                        <Select 
                          defaultValue={user.preferences?.currency || 'USD'}
                          onChange={(value) => {
                            updateProfile({
                              preferences: {
                                ...user.preferences,
                                currency: value
                              }
                            });
                          }}
                        >
                          <Option value="USD">USD - US Dollar</Option>
                          <Option value="EUR">EUR - Euro</Option>
                          <Option value="GBP">GBP - British Pound</Option>
                          <Option value="JPY">JPY - Japanese Yen</Option>
                          <Option value="CNY">CNY - Chinese Yuan</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    
                    <Col span={12}>
                      <Form.Item label="Distance Units">
                        <Radio.Group 
                          defaultValue={user.preferences?.units || 'metric'}
                          onChange={(e) => {
                            updateProfile({
                              preferences: {
                                ...user.preferences,
                                units: e.target.value
                              }
                            });
                          }}
                        >
                          <Radio value="metric">Metric (km)</Radio>
                          <Radio value="imperial">Imperial (mi)</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                      <Form.Item label="Accommodation Preferences">
                        <Select 
                          mode="multiple"
                          placeholder="Select your preferred accommodation types"
                          defaultValue={user.preferences?.accommodationType || []}
                          onChange={(value) => {
                            updateProfile({
                              preferences: {
                                ...user.preferences,
                                accommodationType: value
                              }
                            });
                          }}
                        >
                          <Option value="hotel">Hotels</Option>
                          <Option value="hostel">Hostels</Option>
                          <Option value="apartment">Apartments</Option>
                          <Option value="resort">Resorts</Option>
                          <Option value="guesthouse">Guesthouses</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                      <Form.Item label="Transportation Preferences">
                        <Select 
                          mode="multiple"
                          placeholder="Select your preferred transportation types"
                          defaultValue={user.preferences?.transportationType || []}
                          onChange={(value) => {
                            updateProfile({
                              preferences: {
                                ...user.preferences,
                                transportationType: value
                              }
                            });
                          }}
                        >
                          <Option value="flight">Flights</Option>
                          <Option value="train">Trains</Option>
                          <Option value="bus">Buses</Option>
                          <Option value="car">Rental Cars</Option>
                          <Option value="ferry">Ferries</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </ProfileCard>
              
              <ProfileCard
                title="Personalization Settings"
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { 
                      title: 'Allow personalized recommendations', 
                      description: 'Enable AI-powered suggestions based on your interests and past trips',
                      action: 
                        <Switch 
                          defaultChecked={user.preferences?.allowPersonalization !== false} 
                          onChange={(checked) => {
                            updateProfile({
                              preferences: {
                                ...user.preferences,
                                allowPersonalization: checked
                              }
                            });
                            message.success(`Personalization ${checked ? 'enabled' : 'disabled'}`);
                          }}
                        />
                    },
                    { 
                      title: 'Share anonymous travel statistics', 
                      description: 'Help improve recommendations by sharing anonymized travel data',
                      action: 
                        <Switch 
                          defaultChecked={user.preferences?.shareAnonymousData === true} 
                          onChange={(checked) => {
                            updateProfile({
                              preferences: {
                                ...user.preferences,
                                shareAnonymousData: checked
                              }
                            });
                            message.success(`Data sharing ${checked ? 'enabled' : 'disabled'}`);
                          }}
                        />
                    }
                  ]}
                  renderItem={item => (
                    <List.Item actions={[item.action]}>
                      <List.Item.Meta
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </ProfileCard>
            </Col>
            
            <Col xs={24} md={8}>
              <ProfileCard
                title="Your Travel Style"
              >
                <div style={{ marginBottom: 16 }}>
                  <Title level={5}>Pace</Title>
                  <Radio.Group 
                    defaultValue={user.preferences?.pace || 'balanced'}
                    onChange={(e) => {
                      updateProfile({
                        preferences: {
                          ...user.preferences,
                          pace: e.target.value
                        }
                      });
                    }}
                    style={{ width: '100%' }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Radio value="relaxed">Relaxed - I prefer taking my time</Radio>
                      <Radio value="balanced">Balanced - Mix of activities and downtime</Radio>
                      <Radio value="intense">Intense - Pack in as much as possible</Radio>
                    </Space>
                  </Radio.Group>
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <Title level={5}>Budget</Title>
                  <Radio.Group 
                    defaultValue={user.preferences?.budget || 'medium'}
                    onChange={(e) => {
                      updateProfile({
                        preferences: {
                          ...user.preferences,
                          budget: e.target.value
                        }
                      });
                    }}
                    style={{ width: '100%' }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Radio value="budget">Budget - I prefer saving money</Radio>
                      <Radio value="medium">Medium - Willing to spend for quality</Radio>
                      <Radio value="luxury">Luxury - I want the best experience</Radio>
                    </Space>
                  </Radio.Group>
                </div>
                
                <div>
                  <Title level={5}>Planning Style</Title>
                  <Radio.Group 
                    defaultValue={user.preferences?.planningStyle || 'balanced'}
                    onChange={(e) => {
                      updateProfile({
                        preferences: {
                          ...user.preferences,
                          planningStyle: e.target.value
                        }
                      });
                    }}
                    style={{ width: '100%' }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Radio value="planner">Planner - I like detailed itineraries</Radio>
                      <Radio value="balanced">Balanced - Some structure with flexibility</Radio>
                      <Radio value="spontaneous">Spontaneous - I prefer to decide as I go</Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </ProfileCard>
              
              <ProfileCard
                title="AI Learning"
              >
                <Paragraph>
                  Our AI learns from your preferences and past trips to provide better recommendations.
                </Paragraph>
                
                <Button type="primary" block style={{ marginBottom: 12 }}>
                  Reset AI Suggestions
                </Button>
                
                <Button block>
                  Export Travel Preferences
                </Button>
              </ProfileCard>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={<span><CreditCardOutlined /> {t('profile.payments')}</span>} 
          key="payments"
        >
          <Row gutter={24}>
            <Col xs={24} md={16}>
              <ProfileCard
                title="Payment Methods"
                extra={
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add New
                  </Button>
                }
              >
                {paymentMethods.length === 0 ? (
                  <Empty description="No payment methods added yet" />
                ) : (
                  paymentMethods.map(method => (
                    <PaymentCard key={method.id}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: 16 }}>
                          {method.type === 'Visa' ? (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" style={{ width: 40 }} />
                          ) : (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" style={{ width: 40 }} />
                          )}
                        </div>
                        
                        <div>
                          <div>
                            <Text strong>{method.type}</Text>
                            <Text> •••• {method.last4}</Text>
                          </div>
                          <Text type="secondary">Expires {method.expiry}</Text>
                        </div>
                      </div>
                      
                      <Space>
                        <Button size="small">Edit</Button>
                        <Button size="small" danger>Remove</Button>
                      </Space>
                    </PaymentCard>
                  ))
                )}
              </ProfileCard>
              
              <ProfileCard
                title="Billing Information"
              >
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Billing Address">
                        <Input placeholder="Enter your billing address" />
                      </Form.Item>
                    </Col>
                    
                    <Col span={12}>
                      <Form.Item label="City">
                        <Input placeholder="City" />
                      </Form.Item>
                    </Col>
                    
                    <Col span={12}>
                      <Form.Item label="Postal Code">
                        <Input placeholder="Postal code" />
                      </Form.Item>
                    </Col>
                    
                    <Col span={12}>
                      <Form.Item label="Country">
                        <Select placeholder="Select country">
                          <Option value="us">United States</Option>
                          <Option value="ca">Canada</Option>
                          <Option value="uk">United Kingdom</Option>
                          <Option value="au">Australia</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Button type="primary">Save Billing Information</Button>
                </Form>
              </ProfileCard>
            </Col>
            
            <Col xs={24} md={8}>
              <ProfileCard
                title="Payment History"
              >
                <Empty description="No payment history yet" />
              </ProfileCard>
              
              <ProfileCard
                title="Saved Traveler Information"
              >
                <div style={{ marginBottom: 16 }}>
                  <Title level={5}>Primary Traveler</Title>
                  <List
                    size="small"
                    dataSource={[
                      { label: 'Name', value: user.name },
                      { label: 'Passport', value: 'Not provided' },
                      { label: 'Nationality', value: 'Not provided' }
                    ]}
                    renderItem={item => (
                      <List.Item>
                        <Text>{item.label}:</Text>
                        <Text strong>{item.value}</Text>
                      </List.Item>
                    )}
                  />
                </div>
                
                <Button type="primary" block style={{ marginBottom: 8 }}>
                  Edit Primary Traveler
                </Button>
                
                <Button block icon={<PlusOutlined />}>
                  Add Additional Traveler
                </Button>
              </ProfileCard>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={<span><EnvironmentOutlined /> {t('profile.savedPlaces')}</span>} 
          key="saved"
        >
          <Row gutter={24}>
            {savedPlaces.length === 0 ? (
              <Col span={24}>
                <Empty description="No saved places yet" />
              </Col>
            ) : (
              savedPlaces.map(place => (
                <Col xs={24} sm={12} md={6} key={place.id}>
                  <Card
                    hoverable
                    cover={
                      <img 
                        alt={place.name} 
                        src={`https://source.unsplash.com/300x200/?${place.name}`} 
                        style={{ height: 200, objectFit: 'cover' }}
                      />
                    }
                    actions={[
                      <Tooltip title="View Details">
                        <Button type="text" icon={<EnvironmentOutlined />} />
                      </Tooltip>,
                      <Tooltip title="Remove from Saved">
                        <Button type="text" icon={<DeleteOutlined />} />
                      </Tooltip>
                    ]}
                  >
                    <Card.Meta
                      title={place.name}
                      description={
                        <>
                          <Tag>{place.type}</Tag>
                          <div>{place.country}</div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </TabPane>
        
        <TabPane 
          tab={<span><BellOutlined /> {t('profile.notifications')}</span>} 
          key="notifications"
        >
          <ProfileCard title="Notification Settings">
            <List
              itemLayout="horizontal"
              dataSource={[
                { 
                  title: 'Email Notifications', 
                  description: 'Updates about your bookings, trips, and account',
                  action: 
                    <Switch 
                      defaultChecked={user.preferences?.emailNotifications !== false} 
                      onChange={(checked) => {
                        updateProfile({
                          preferences: {
                            ...user.preferences,
                            emailNotifications: checked
                          }
                        });
                      }}
                    />
                },
                { 
                  title: 'SMS Notifications', 
                  description: 'Receive text messages for urgent updates',
                  action: 
                    <Switch 
                      defaultChecked={user.preferences?.smsNotifications === true} 
                      onChange={(checked) => {
                        updateProfile({
                          preferences: {
                            ...user.preferences,
                            smsNotifications: checked
                          }
                        });
                      }}
                    />
                },
                { 
                  title: 'Push Notifications', 
                  description: 'Alerts on your device for real-time updates',
                  action: 
                    <Switch 
                      defaultChecked={user.preferences?.pushNotifications !== false} 
                      onChange={(checked) => {
                        updateProfile({
                          preferences: {
                            ...user.preferences,
                            pushNotifications: checked
                          }
                        });
                      }}
                    />
                },
                { 
                  title: 'Weather Alerts', 
                  description: 'Get notified about weather changes that may affect your trip',
                  action: 
                    <Switch 
                      defaultChecked={user.preferences?.weatherAlerts !== false} 
                      onChange={(checked) => {
                        updateProfile({
                          preferences: {
                            ...user.preferences,
                            weatherAlerts: checked
                          }
                        });
                      }}
                    />
                },
                { 
                  title: 'Price Drop Alerts', 
                  description: 'Be notified when prices drop for saved destinations',
                  action: 
                    <Switch 
                      defaultChecked={user.preferences?.priceAlerts !== false} 
                      onChange={(checked) => {
                        updateProfile({
                          preferences: {
                            ...user.preferences,
                            priceAlerts: checked
                          }
                        });
                      }}
                    />
                },
                { 
                  title: 'Travel Tips & News', 
                  description: 'Occasional newsletters with travel inspiration',
                  action: 
                    <Switch 
                      defaultChecked={user.preferences?.newsletterSubscription === true} 
                      onChange={(checked) => {
                        updateProfile({
                          preferences: {
                            ...user.preferences,
                            newsletterSubscription: checked
                          }
                        });
                      }}
                    />
                }
              ]}
              renderItem={item => (
                <List.Item actions={[item.action]}>
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </ProfileCard>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;