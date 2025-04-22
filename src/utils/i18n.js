import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Theme configuration
export const theme = {
  colors: {
    primary: '#1668e3',     // Expedia blue
    secondary: '#00778b',   // Teal accent
    accent: '#ff6b6b',      // Coral accent
    success: '#2ecc40',     // Green
    warning: '#f39c12',     // Orange/amber
    error: '#e74c3c',       // Red
    lightGray: '#f5f5f5',   // Light background
    mediumGray: '#d9d9d9',  // Border color
    darkGray: '#757575',    // Secondary text
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  fonts: {
    primary: "'Open Sans', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  }
};

// Languages configuration
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        trips: 'My Trips',
        assistant: 'Travel Assistant',
        signIn: 'Sign In',
        logout: 'Log Out',
        account: 'My Account',
      },
      hero: {
        heading: 'Where to next?',
        subheading: 'Save 15% or more on thousands of getaways with member deals',
        search: 'Search',
        destinations: 'Destinations',
        checkIn: 'Check-in',
        checkOut: 'Check-out',
        travelers: 'Travelers',
      },
      destinations: {
        featured: 'Featured destinations',
        trending: 'Trending now',
        recommended: 'Recommended for you',
        viewAll: 'View all',
      },
      features: {
        ai: {
          title: 'Smart Travel Features',
          translation: 'Real-time Translation',
          translationDesc: 'Break through language barriers with instant translation in over 50 languages to communicate easily with locals.',
          adaptation: 'Dynamic Trip Adaptation',
          adaptationDesc: 'Stay one step ahead with real-time itinerary adjustments for weather changes, local events, and travel disruptions.',
          recommendations: 'Smart Recommendations',
          recommendationsDesc: 'Get personalized suggestions based on your preferences and travel style for a customized experience.',
        },
      },
      booking: {
        price: 'Price',
        perNight: 'per night',
        total: 'Total',
        book: 'Book now',
        deals: 'Member deals',
        rating: 'Rating',
      },
      auth: {
        login: 'Log in',
        signup: 'Sign up',
        email: 'Email',
        password: 'Password',
        name: 'Name',
        forgotPassword: 'Forgot password?',
        noAccount: 'Don\'t have an account?',
        haveAccount: 'Already have an account?',
      },
      footer: {
        company: 'Company',
        about: 'About us',
        careers: 'Careers',
        news: 'News',
        contact: 'Contact',
        support: 'Support',
        help: 'Help center',
        safety: 'Safety',
        legal: 'Legal',
        terms: 'Terms of use',
        privacy: 'Privacy policy',
        accessibility: 'Accessibility',
        copyright: '© 2025 Travel Assist. All rights reserved.'
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        trips: 'Mis Viajes',
        assistant: 'Asistente de Viaje',
        signIn: 'Iniciar Sesión',
        logout: 'Cerrar Sesión',
        account: 'Mi Cuenta',
      },
      hero: {
        heading: '¿A dónde quieres ir?',
        subheading: 'Ahorra 15% o más en miles de escapadas con ofertas para miembros',
        search: 'Buscar',
        destinations: 'Destinos',
        checkIn: 'Llegada',
        checkOut: 'Salida',
        travelers: 'Viajeros',
      },
      destinations: {
        featured: 'Destinos destacados',
        trending: 'Tendencias actuales',
        recommended: 'Recomendado para ti',
        viewAll: 'Ver todo',
      },
      features: {
        ai: {
          title: 'Funciones de Viaje Inteligente',
          translation: 'Traducción en Tiempo Real',
          translationDesc: 'Supera las barreras del idioma con traducción instantánea en más de 50 idiomas para comunicarte fácilmente con la gente local.',
          adaptation: 'Adaptación Dinámica del Viaje',
          adaptationDesc: 'Mantente un paso adelante con ajustes de itinerario en tiempo real para cambios climáticos, eventos locales e interrupciones de viaje.',
          recommendations: 'Recomendaciones Inteligentes',
          recommendationsDesc: 'Obtén sugerencias personalizadas basadas en tus preferencias y estilo de viaje para una experiencia personalizada.',
        },
      },
      booking: {
        price: 'Precio',
        perNight: 'por noche',
        total: 'Total',
        book: 'Reservar ahora',
        deals: 'Ofertas para miembros',
        rating: 'Calificación',
      },
      auth: {
        login: 'Iniciar sesión',
        signup: 'Registrarse',
        email: 'Correo electrónico',
        password: 'Contraseña',
        name: 'Nombre',
        forgotPassword: '¿Olvidaste tu contraseña?',
        noAccount: '¿No tienes una cuenta?',
        haveAccount: '¿Ya tienes una cuenta?',
      },
      footer: {
        company: 'Compañía',
        about: 'Sobre nosotros',
        careers: 'Carreras',
        news: 'Noticias',
        contact: 'Contacto',
        support: 'Soporte',
        help: 'Centro de ayuda',
        safety: 'Seguridad',
        legal: 'Legal',
        terms: 'Términos de uso',
        privacy: 'Política de privacidad',
        accessibility: 'Accesibilidad',
        copyright: '© 2025 Travel Assist. Todos los derechos reservados.'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        trips: 'Mes Voyages',
        assistant: 'Assistant de Voyage',
        signIn: 'Connexion',
        logout: 'Déconnexion',
        account: 'Mon Compte',
      },
      hero: {
        heading: 'Où aller ensuite?',
        subheading: 'Économisez 15% ou plus sur des milliers de séjours avec les offres membres',
        search: 'Rechercher',
        destinations: 'Destinations',
        checkIn: 'Arrivée',
        checkOut: 'Départ',
        travelers: 'Voyageurs',
      },
      destinations: {
        featured: 'Destinations en vedette',
        trending: 'Tendances actuelles',
        recommended: 'Recommandé pour vous',
        viewAll: 'Voir tout',
      },
      features: {
        ai: {
          title: 'Fonctionnalités de Voyage Intelligentes',
          translation: 'Traduction en Temps Réel',
          translationDesc: 'Surmontez les barrières linguistiques avec une traduction instantanée dans plus de 50 langues pour communiquer facilement avec les locaux.',
          adaptation: 'Adaptation Dynamique de Voyage',
          adaptationDesc: 'Gardez une longueur d\'avance avec des ajustements d\'itinéraire en temps réel pour les changements météorologiques, les événements locaux et les perturbations de voyage.',
          recommendations: 'Recommandations Intelligentes',
          recommendationsDesc: 'Obtenez des suggestions personnalisées basées sur vos préférences et votre style de voyage pour une expérience personnalisée.',
        },
      },
      booking: {
        price: 'Prix',
        perNight: 'par nuit',
        total: 'Total',
        book: 'Réserver maintenant',
        deals: 'Offres membres',
        rating: 'Évaluation',
      },
      auth: {
        login: 'Se connecter',
        signup: 'S\'inscrire',
        email: 'E-mail',
        password: 'Mot de passe',
        name: 'Nom',
        forgotPassword: 'Mot de passe oublié?',
        noAccount: 'Vous n\'avez pas de compte?',
        haveAccount: 'Vous avez déjà un compte?',
      },
      footer: {
        company: 'Entreprise',
        about: 'À propos de nous',
        careers: 'Carrières',
        news: 'Actualités',
        contact: 'Contact',
        support: 'Support',
        help: 'Centre d\'aide',
        safety: 'Sécurité',
        legal: 'Légal',
        terms: 'Conditions d\'utilisation',
        privacy: 'Politique de confidentialité',
        accessibility: 'Accessibilité',
        copyright: '© 2025 Travel Assist. Tous droits réservés.'
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        trips: '我的旅行',
        assistant: '旅行助手',
        signIn: '登录',
        logout: '登出',
        account: '我的账户',
      },
      hero: {
        heading: '下一站去哪里？',
        subheading: '会员专享优惠，数千种度假方式省15%或更多',
        search: '搜索',
        destinations: '目的地',
        checkIn: '入住',
        checkOut: '退房',
        travelers: '旅行者',
      },
      destinations: {
        featured: '特色目的地',
        trending: '热门趋势',
        recommended: '为您推荐',
        viewAll: '查看全部',
      },
      features: {
        ai: {
          title: '智能旅行功能',
          translation: '实时翻译',
          translationDesc: '通过50多种语言的即时翻译，轻松突破语言障碍，与当地人沟通无碍。',
          adaptation: '动态行程调整',
          adaptationDesc: '随时掌握最新情况，根据天气变化、当地活动和旅行中断实时调整行程。',
          recommendations: '智能推荐',
          recommendationsDesc: '根据您的喜好和旅行风格获取个性化建议，打造定制化体验。',
        },
      },
      booking: {
        price: '价格',
        perNight: '每晚',
        total: '总计',
        book: '立即预订',
        deals: '会员优惠',
        rating: '评分',
      },
      auth: {
        login: '登录',
        signup: '注册',
        email: '电子邮箱',
        password: '密码',
        name: '姓名',
        forgotPassword: '忘记密码？',
        noAccount: '没有账户？',
        haveAccount: '已有账户？',
      },
      footer: {
        company: '公司',
        about: '关于我们',
        careers: '招聘',
        news: '新闻',
        contact: '联系我们',
        support: '支持',
        help: '帮助中心',
        safety: '安全',
        legal: '法律',
        terms: '使用条款',
        privacy: '隐私政策',
        accessibility: '无障碍',
        copyright: '© 2025 Travel Assist. 保留所有权利。'
      }
    }
  }
};

// Language options
export const languages = [
  {
    key: 'en',
    label: 'English',
    emoji: '🇺🇸'
  },
  {
    key: 'es',
    label: 'Español',
    emoji: '🇪🇸'
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
  }
];

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;