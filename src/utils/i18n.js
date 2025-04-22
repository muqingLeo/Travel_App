import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enResources = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete'
  },
  menu: {
    home: 'Home',
    itinerary: 'My Trips',
    chat: 'Chat',
    explore: 'Explore',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout'
  },
  auth: {
    login: 'Log In',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    loginSuccess: 'Logged in successfully',
    loginError: 'Login failed',
    signupSuccess: 'Account created successfully',
    signupError: 'Failed to create account',
    logoutSuccess: 'Logged out successfully',
    resetPassword: 'Reset Password'
  },
  home: {
    welcome: 'Welcome to Travel Assist',
    subtitle: 'Your personal AI-powered travel companion',
    popularDestinations: 'Popular Destinations',
    featuredExperiences: 'Featured Experiences',
    trendingNow: 'Trending Now',
    startPlanning: 'Start Planning',
    viewAll: 'View All'
  },
  itinerary: {
    myTrips: 'My Trips',
    upcoming: 'Upcoming',
    past: 'Past',
    draft: 'Drafts',
    newTrip: 'Plan New Trip',
    tripDetails: 'Trip Details',
    noTrips: 'No trips found. Start planning your first adventure!',
    datePlaceholder: 'Select dates',
    destination: 'Destination',
    activities: 'Activities',
    accommodation: 'Accommodation',
    transportation: 'Transportation'
  },
  chat: {
    title: 'Travel Assistant',
    placeholder: 'Ask anything about your trip...',
    send: 'Send',
    connecting: 'Connecting...',
    offlineMessage: 'You are currently offline. Messages will be sent when you reconnect.'
  },
  profile: {
    myProfile: 'My Profile',
    personalInfo: 'Personal Information',
    preferences: 'Travel Preferences',
    payments: 'Payment Methods',
    savedPlaces: 'Saved Places',
    notifications: 'Notification Settings',
    contactUs: 'Contact Us',
    aboutUs: 'About Us'
  },
  destination: {
    overview: 'Overview',
    attractions: 'Attractions',
    restaurants: 'Restaurants',
    hotels: 'Hotels',
    weather: 'Weather',
    reviews: 'Reviews',
    transportation: 'Getting Around',
    tips: 'Local Tips',
    nearbyPlaces: 'Nearby Places',
    bestTimeToVisit: 'Best time to visit',
    language: 'Language',
    currency: 'Currency',
    about: 'About',
    highlights: 'Highlights',
    knownFor: 'is known for its unique blend of culture, cuisine, and attractions. Visitors particularly enjoy the ',
    localSights: 'local sights',
    vibrantAtmosphere: 'and the vibrant atmosphere.',
    upcomingEvents: 'Upcoming Events',
    travelEssentials: 'Travel Essentials',
    bookTours: 'Book Tours & Activities',
    findAccommodation: 'Find Accommodation',
    transportationOptions: 'Transportation Options'
  },
  booking: {
    confirmBooking: 'Confirm Booking',
    paymentDetails: 'Payment Details',
    totalPrice: 'Total Price',
    cardDetails: 'Card Details',
    billingAddress: 'Billing Address',
    bookingSuccess: 'Booking Confirmed!',
    bookingError: 'Booking Failed',
    reviewBooking: 'Review Booking Details'
  },
  footer: {
    rights: 'All Rights Reserved',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    contact: 'Contact Us'
  },
  settings: {
    language: 'Language',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    currency: 'Currency',
    units: 'Measurement Units'
  }
};

// Chinese translations
const zhResources = {
  common: {
    loading: '加载中...',
    error: '发生错误',
    success: '成功！',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    edit: '编辑',
    delete: '删除'
  },
  menu: {
    home: '首页',
    itinerary: '我的行程',
    chat: '聊天',
    explore: '探索',
    profile: '个人资料',
    settings: '设置',
    logout: '退出登录'
  },
  auth: {
    login: '登录',
    signup: '注册',
    email: '电子邮箱',
    password: '密码',
    forgotPassword: '忘记密码？',
    loginSuccess: '登录成功',
    loginError: '登录失败',
    signupSuccess: '账户创建成功',
    signupError: '创建账户失败',
    logoutSuccess: '已退出登录',
    resetPassword: '重置密码'
  },
  home: {
    welcome: '欢迎使用旅行助手',
    subtitle: '您的个人AI旅行伴侣',
    popularDestinations: '热门目的地',
    featuredExperiences: '精选体验',
    trendingNow: '当前热门',
    startPlanning: '开始规划',
    viewAll: '查看全部'
  },
  itinerary: {
    myTrips: '我的行程',
    upcoming: '即将到来',
    past: '过去行程',
    draft: '草稿',
    newTrip: '规划新行程',
    tripDetails: '行程详情',
    noTrips: '未找到行程。开始规划您的第一次冒险吧！',
    datePlaceholder: '选择日期',
    destination: '目的地',
    activities: '活动',
    accommodation: '住宿',
    transportation: '交通'
  },
  chat: {
    title: '旅行助手',
    placeholder: '询问有关您行程的任何事情...',
    send: '发送',
    connecting: '连接中...',
    offlineMessage: '您当前处于离线状态。重新连接后消息将被发送。'
  },
  profile: {
    myProfile: '我的资料',
    personalInfo: '个人信息',
    preferences: '旅行偏好',
    payments: '支付方式',
    savedPlaces: '已保存地点',
    notifications: '通知设置',
    contactUs: '联系我们',
    aboutUs: '关于我们'
  },
  destination: {
    overview: '概览',
    attractions: '景点',
    restaurants: '餐厅',
    hotels: '酒店',
    weather: '天气',
    reviews: '评价',
    transportation: '交通出行',
    tips: '当地提示',
    nearbyPlaces: '附近地点',
    bestTimeToVisit: '最佳访问时间',
    language: '语言',
    currency: '货币',
    about: '关于',
    highlights: '亮点',
    knownFor: '以其独特的文化、美食和景点而闻名。游客特别喜欢',
    localSights: '当地景点',
    vibrantAtmosphere: '和充满活力的氛围。',
    upcomingEvents: '即将举行的活动',
    travelEssentials: '旅行必备',
    bookTours: '预订旅游和活动',
    findAccommodation: '查找住宿',
    transportationOptions: '交通选项'
  },
  booking: {
    confirmBooking: '确认预订',
    paymentDetails: '支付详情',
    totalPrice: '总价',
    cardDetails: '卡片详情',
    billingAddress: '账单地址',
    bookingSuccess: '预订已确认！',
    bookingError: '预订失败',
    reviewBooking: '查看预订详情'
  },
  footer: {
    rights: '版权所有',
    terms: '服务条款',
    privacy: '隐私政策',
    contact: '联系我们'
  },
  settings: {
    language: '语言',
    darkMode: '深色模式',
    notifications: '通知',
    currency: '货币',
    units: '计量单位'
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enResources,
      zh: zhResources
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;