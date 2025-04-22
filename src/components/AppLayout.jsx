import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Layout, 
  Menu, 
  Button, 
  Dropdown, 
  Space, 
  Avatar, 
  Divider, 
  Spin,
  Badge,
  Row,
  Col,
  Typography
} from 'antd';
import { 
  HomeOutlined, 
  CalendarOutlined, 
  MessageOutlined, 
  GlobalOutlined,
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  TranslationOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;

// Styled components
const StyledHeader = styled(Header)`
  background-color: white;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(90deg, #00355f 0%, #1668e3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

const StyledContent = styled(Content)`
  padding: 24px;
  min-height: calc(100vh - 64px - 80px);
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StyledFooter = styled(Footer)`
  background-color: #00355f;
  padding: 24px;
  color: white;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMenu = styled(Menu)`
  border: none;
  flex: 1;
  justify-content: center;
  
  &.ant-menu-horizontal > .ant-menu-item::after,
  &.ant-menu-horizontal > .ant-menu-submenu::after {
    border-bottom: none !important;
  }
  
  .ant-menu-item-selected {
    font-weight: 600;
    color: #1668e3 !important;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 24px;
`;

const AppLayout = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { locale, changeLocale } = useLocale();
  const [loading, setLoading] = useState(false);
  
  // Handle navigation
  const onMenuClick = (e) => {
    navigate(e.key);
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Home', path: '/' },
    { key: '/itinerary', icon: <CalendarOutlined />, label: 'My Trips', path: '/itinerary' },
    { key: '/chat', icon: <MessageOutlined />, label: 'Travel Assistant', path: '/chat' },
    { key: '/explore', icon: <GlobalOutlined />, label: 'Explore', path: '/explore' }
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout
    }
  ];

  // Language options
  const languages = [
    {
      key: 'en',
      label: 'English',
      emoji: '🇺🇸'
    },
    {
      key: 'fr',
      label: 'Français',
      emoji: '🇫🇷'
    },
    {
      key: 'zh',
      label: '中文',
      emoji: '🇨🇳'
    },
    {
      key: 'ja',
      label: '日本語',
      emoji: '🇯🇵'
    }
  ];

  return (
    <Layout className="exp-container">
      <StyledHeader className="exp-nav">
        <Logo>
          <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            Travel Assist
          </h1>
        </Logo>
        
        <StyledMenu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={onMenuClick}
          items={menuItems.map(item => ({
            key: item.path,
            icon: item.icon,
            label: t(`nav.${item.label.toLowerCase().replace(' ', '')}`) || item.label,
            className: location.pathname === item.path ? 'exp-nav-link active' : 'exp-nav-link'
          }))}
        />
        
        <UserSection>
          <Space>
            <Dropdown
              menu={{
                items: languages.map(lang => ({
                  key: lang.key,
                  label: (
                    <Space>
                      <span>{lang.emoji}</span>
                      <span>{lang.label}</span>
                    </Space>
                  ),
                  onClick: () => changeLocale(lang.key)
                }))
              }}
              placement="bottomRight"
              arrow
            >
              <Button 
                icon={<TranslationOutlined />} 
                type="text"
              >
                {languages.find(l => l.key === locale)?.emoji}
              </Button>
            </Dropdown>
            
            {user ? (
              <Dropdown
                menu={{ 
                  items: userMenuItems
                }}
                placement="bottomRight"
                arrow
              >
                <Button 
                  type="text" 
                  icon={
                    loading ? 
                    <LoadingOutlined /> : 
                    <Avatar 
                      size="small" 
                      src={user.avatar}
                      icon={!user.avatar && <UserOutlined />}
                    />
                  }
                >
                  <span style={{ marginLeft: 8 }}>{user.name?.split(' ')[0]}</span>
                </Button>
              </Dropdown>
            ) : (
              <Button 
                type="primary" 
                onClick={() => navigate('/login')}
                className="exp-btn-primary"
              >
                {t('nav.signIn')}
              </Button>
            )}
          </Space>
        </UserSection>
      </StyledHeader>
      
      <StyledContent>
        {children}
      </StyledContent>
      
      <StyledFooter className="exp-footer">
        <Row gutter={[24, 32]}>
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <Title level={4} className="exp-footer-title">{t('footer.company')}</Title>
              <a className="exp-footer-link" href="#">{t('footer.about')}</a>
              <a className="exp-footer-link" href="#">{t('footer.careers')}</a>
              <a className="exp-footer-link" href="#">{t('footer.news')}</a>
              <a className="exp-footer-link" href="#">{t('footer.contact')}</a>
            </FooterSection>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <Title level={4} className="exp-footer-title">{t('footer.support')}</Title>
              <a className="exp-footer-link" href="#">{t('footer.help')}</a>
              <a className="exp-footer-link" href="#">{t('footer.safety')}</a>
              <a className="exp-footer-link" href="#">{t('footer.cancellation')}</a>
              <a className="exp-footer-link" href="#">{t('footer.covidInfo')}</a>
            </FooterSection>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <Title level={4} className="exp-footer-title">{t('footer.discover')}</Title>
              <a className="exp-footer-link" href="#">{t('footer.destinations')}</a>
              <a className="exp-footer-link" href="#">{t('footer.seasons')}</a>
              <a className="exp-footer-link" href="#">{t('footer.travelTypes')}</a>
              <a className="exp-footer-link" href="#">{t('footer.appDownload')}</a>
            </FooterSection>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <Title level={4} className="exp-footer-title">{t('footer.legal')}</Title>
              <a className="exp-footer-link" href="#">{t('footer.terms')}</a>
              <a className="exp-footer-link" href="#">{t('footer.privacy')}</a>
              <a className="exp-footer-link" href="#">{t('footer.cookiePolicy')}</a>
              <a className="exp-footer-link" href="#">{t('footer.accessibility')}</a>
            </FooterSection>
          </Col>
        </Row>
        
        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Row justify="space-between" align="middle">
          <Col>
            <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              © {new Date().getFullYear()} Travel Assist. {t('footer.allRightsReserved')}
            </Text>
          </Col>
          <Col>
            <Space size="large">
              <a style={{ color: 'rgba(255, 255, 255, 0.7)' }} href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a style={{ color: 'rgba(255, 255, 255, 0.7)' }} href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a style={{ color: 'rgba(255, 255, 255, 0.7)' }} href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </Space>
          </Col>
        </Row>
      </StyledFooter>
    </Layout>
  );
};

export default AppLayout;