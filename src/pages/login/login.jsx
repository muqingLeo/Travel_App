import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Typography, 
  Form, 
  Input, 
  Button, 
  Card, 
  Divider, 
  message, 
  Checkbox,
  Tabs,
  Row,
  Col,
  Alert,
  Space
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  GoogleOutlined,
  FacebookOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Create X (formerly Twitter) icon
const XIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 24px;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const SocialButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, user, loading, error, clearError } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [form] = Form.useForm();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  // Clear auth errors when switching tabs
  useEffect(() => {
    clearError();
    form.resetFields();
  }, [activeTab, clearError, form]);

  // Handle login form submission
  const handleLogin = async (values) => {
    try {
      await login(values.email, values.password);
      message.success('Login successful!');
      // Navigation will happen automatically due to the useEffect
    } catch (err) {
      // Error is already handled in the AuthContext
      console.error('Login failed:', err);
    }
  };

  // Handle signup form submission
  const handleSignup = async (values) => {
    try {
      await signup(values.email, values.password, values.name);
      message.success('Account created successfully!');
      // Navigation will happen automatically due to the useEffect
    } catch (err) {
      // Error is already handled in the AuthContext
      console.error('Signup failed:', err);
    }
  };

  return (
    <LoginContainer>
      <StyledCard>
        <LogoContainer>
          <img 
            src="/assets/images/logo.png" 
            alt="Travel Assist" 
            height={60}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/jTDYoha.png";
            }}
          />
          <Title level={3} style={{ marginTop: 12 }}>Travel Assist</Title>
        </LogoContainer>

        {error && (
          <Alert
            message="Authentication Error"
            description={error}
            type="error"
            showIcon
            closable
            style={{ marginBottom: 16 }}
            onClose={() => clearError()}
          />
        )}

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          centered
        >
          <TabPane tab="Login" key="login">
            <Form
              form={form}
              name="login"
              layout="vertical"
              onFinish={handleLogin}
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please enter your email' }]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Email" 
                  size="large"
                  autoComplete="email" 
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Password" 
                  size="large"
                  autoComplete="current-password" 
                />
              </Form.Item>
              
              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  
                  <Link to="/forgot-password">
                    Forgot password?
                  </Link>
                </div>
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large"
                  block
                  loading={loading}
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
            
            <Divider plain>or continue with</Divider>
            
            <Row gutter={16}>
              <Col span={8}>
                <Button
                  icon={<GoogleOutlined />}
                  size="large"
                  block
                  onClick={() => message.info('Social login is not implemented yet')}
                  disabled
                />
              </Col>
              <Col span={8}>
                <Button
                  icon={<FacebookOutlined />}
                  size="large"
                  block
                  onClick={() => message.info('Social login is not implemented yet')}
                  disabled
                />
              </Col>
              <Col span={8}>
                <Button
                  icon={<XIcon />}
                  size="large"
                  block
                  onClick={() => message.info('Social login is not implemented yet')}
                  disabled
                />
              </Col>
            </Row>
            
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 8 }}>
              Note: Social login features are not yet implemented
            </Text>
          </TabPane>
          
          <TabPane tab="Sign Up" key="signup">
            <Form
              form={form}
              name="signup"
              layout="vertical"
              onFinish={handleSignup}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Full Name" 
                  size="large" 
                />
              </Form.Item>
              
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Email" 
                  size="large" 
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter a password' },
                  { min: 6, message: 'Password must be at least 6 characters' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Password" 
                  size="large" 
                />
              </Form.Item>
              
              <Form.Item
                name="confirm"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Confirm Password" 
                  size="large" 
                />
              </Form.Item>
              
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  { 
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms and conditions')),
                  },
                ]}
              >
                <Checkbox>
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                </Checkbox>
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  block
                  loading={loading}
                >
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </StyledCard>
    </LoginContainer>
  );
};

export default Login;