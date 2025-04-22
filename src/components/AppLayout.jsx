import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Avatar, Dropdown, Badge, Switch, Spin } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  CalendarOutlined,
  MessageOutlined,
  GlobalOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  TranslationOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
  margin-right: 24px;
  display: flex;
  align-items: center;
  
  img {
    height: 32px;
    margin-right: 8px;
  }
`;

const MobileMenuButton = styled(Button)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopMenu = styled(Menu)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  
  > * {
    margin-left: 16px;
  }
`;

const StyledContent = styled(Content)`
  min-height: calc(100vh - 64px - 64px);
  padding: 24px;
  background: #f5f5f5;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: white;
  padding: 24px;
`;

const AppLayout = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { locale, changeLocale } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Current selected menu item based on path
  const selectedKey = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: t('menu.home'), path: '/' },
    { key: 'itinerary', icon: <CalendarOutlined />, label: t('menu.itinerary'), path: '/itinerary' },
    { key: 'chat', icon: <MessageOutlined />, label: t('menu.chat'), path: '/chat' },
    { key: 'explore', icon: <GlobalOutlined />, label: t('menu.explore'), path: '/explore' }
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('menu.profile'),
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('menu.settings'),
      onClick: () => navigate('/settings')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('menu.logout'),
      onClick: handleLogout
    }
  ];

  // Language options
  const languageOptions = [
    { key: 'en', label: 'English' },
    { key: 'zh', label: '中文' }
  ];

  return (
    <Layout>
      <StyledHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MobileMenuButton
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
          />
          
          <Logo>
            <img src="/logo.svg" alt="Travel Assist" />
            Travel Assist
          </Logo>

          <DesktopMenu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={menuItems.map(item => ({
              ...item,
              label: <Link to={item.path}>{item.label}</Link>
            }))}
          />
        </div>

        <ActionButtons>
          <Dropdown
            menu={{
              items: languageOptions.map(lang => ({
                ...lang,
                onClick: () => changeLocale(lang.key)
              }))
            }}
            placement="bottomRight"
            arrow
          >
            <Button icon={<TranslationOutlined />} shape="circle" />
          </Dropdown>

          <Badge count={3} dot>
            <Button icon={<BellOutlined />} shape="circle" />
          </Badge>

          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Avatar 
                src={user.photoURL}
                icon={!user.photoURL && <UserOutlined />}
                style={{ cursor: 'pointer' }}
              />
            </Dropdown>
          ) : (
            <Button type="primary" onClick={() => navigate('/login')}>
              {t('auth.login')}
            </Button>
          )}
        </ActionButtons>
      </StyledHeader>

      <Drawer
        title={<Logo>Travel Assist</Logo>}
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={250}
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          items={menuItems.map(item => ({
            ...item,
            label: <Link to={item.path}>{item.label}</Link>
          }))}
        />
        
        {user && (
          <>
            <div style={{ margin: '16px 0', borderTop: '1px solid #f0f0f0' }} />
            <Menu
              mode="vertical"
              items={userMenuItems}
            />
          </>
        )}

        <div style={{ position: 'absolute', bottom: 16, left: 24, right: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{t('settings.language')}</span>
            <Dropdown
              menu={{
                items: languageOptions.map(lang => ({
                  ...lang,
                  onClick: () => changeLocale(lang.key)
                }))
              }}
              placement="topRight"
              arrow
            >
              <Button type="text">
                {locale === 'zh' ? '中文' : 'English'} <GlobalOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </Drawer>

      <StyledContent>
        <Spin spinning={loading} tip={t('common.loading')} size="large">
          {children}
        </Spin>
      </StyledContent>

      <StyledFooter>
        <div>Travel Assist ©{new Date().getFullYear()} - {t('footer.rights')}</div>
        <div style={{ marginTop: 8 }}>
          <a href="/terms">{t('footer.terms')}</a> | 
          <a href="/privacy" style={{ marginLeft: 8 }}>{t('footer.privacy')}</a> | 
          <a href="/contact" style={{ marginLeft: 8 }}>{t('footer.contact')}</a>
        </div>
      </StyledFooter>
    </Layout>
  );
};

export default AppLayout;