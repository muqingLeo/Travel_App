import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

// Pages
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Itinerary from './pages/itinerary/itinerary';
import Chat from './pages/chat/chat';
import Destination from './pages/destination/destination';
import Booking from './pages/booking/booking';
import NotFound from './pages/notFound/notFound';

// Components
import AppLayout from './components/AppLayout';
import AuthGuard from './components/AuthGuard';
import { AuthProvider } from './contexts/AuthContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { ItineraryProvider } from './contexts/ItineraryContext';

// Styles
import './styles/app.css';

const App = () => {
  useEffect(() => {
    // Initialize any app-level services here
    const initializeApp = async () => {
      // Example: check for user session, initialize analytics, etc.
    };
    
    initializeApp();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
          },
        }}
      >
        <AntApp>
          <AuthProvider>
            <LocaleProvider>
              <ItineraryProvider>
                <Router>
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile" element={
                        <AuthGuard>
                          <Profile />
                        </AuthGuard>
                      } />
                      <Route path="/itinerary" element={
                        <AuthGuard>
                          <Itinerary />
                        </AuthGuard>
                      } />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/destination/:id" element={<Destination />} />
                      <Route path="/booking/:type/:id" element={
                        <AuthGuard>
                          <Booking />
                        </AuthGuard>
                      } />
                      <Route path="/404" element={<NotFound />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                  </AppLayout>
                </Router>
              </ItineraryProvider>
            </LocaleProvider>
          </AuthProvider>
        </AntApp>
      </ConfigProvider>
    </I18nextProvider>
  );
};

export default App;