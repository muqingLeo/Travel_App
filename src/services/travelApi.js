// Mock destination data for demonstration
const mockDestinations = [
  {
    id: '1',
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    description: 'The capital city of France, known for the Eiffel Tower, art, and culture.',
    location: 'France',
    attractions: [
      { name: 'Eiffel Tower' },
      { name: 'Louvre Museum' },
      { name: 'Notre-Dame Cathedral' }
    ]
  },
  {
    id: '2',
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    description: 'A bustling metropolis blending tradition and technology.',
    location: 'Japan',
    attractions: [
      { name: 'Shibuya Crossing' },
      { name: 'Tokyo Tower' },
      { name: 'Meiji Shrine' }
    ]
  },
  {
    id: '3',
    name: 'Rome',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    description: 'The historic capital of Italy, home to ancient ruins, art, and incredible cuisine.',
    location: 'Italy',
    attractions: [
      { name: 'Colosseum' },
      { name: 'Vatican Museums' },
      { name: 'Trevi Fountain' }
    ]
  },
  {
    id: '4',
    name: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    description: 'Japan\'s cultural capital with numerous temples, traditional gardens, and imperial palaces.',
    location: 'Japan',
    attractions: [
      { name: 'Fushimi Inari Shrine' },
      { name: 'Arashiyama Bamboo Grove' },
      { name: 'Kinkaku-ji (Golden Pavilion)' }
    ]
  },
  {
    id: '5',
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    description: 'The vibrant metropolis known for its iconic skyline, cultural diversity, and world-class attractions.',
    location: 'USA',
    attractions: [
      { name: 'Empire State Building' },
      { name: 'Central Park' },
      { name: 'Statue of Liberty' }
    ]
  },
  // Add more mock destinations as needed
];

// Mock detailed attractions data
const mockAttractions = {
  '1': [ // Paris
    {
      id: 'a1',
      name: 'Eiffel Tower',
      image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e',
      description: 'Iconic iron tower offering breathtaking views of Paris from its observation decks.',
      rating: 4.5,
      price: '€16.60 - €25.90',
      hours: '9:00 AM - 12:45 AM',
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris'
    },
    {
      id: 'a2',
      name: 'Louvre Museum',
      image: 'https://images.unsplash.com/photo-1565060169861-0b0eb9694efd',
      description: 'World-renowned art museum housing masterpieces like the Mona Lisa and Venus de Milo.',
      rating: 4.7,
      price: '€15 - €17',
      hours: '9:00 AM - 6:00 PM, Closed on Tuesdays',
      address: 'Rue de Rivoli, 75001 Paris'
    },
    {
      id: 'a3',
      name: 'Notre-Dame Cathedral',
      image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94',
      description: 'Medieval Catholic cathedral with Gothic architecture, famous for its flying buttresses.',
      rating: 4.4,
      price: 'Free (tower access: €8.50)',
      hours: '8:00 AM - 6:45 PM',
      address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris'
    },
    {
      id: 'a4',
      name: 'Arc de Triomphe',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785',
      description: 'Iconic triumphal arch honoring those who fought and died for France in the French Revolutionary and Napoleonic Wars.',
      rating: 4.6,
      price: '€12',
      hours: '10:00 AM - 10:30 PM',
      address: 'Place Charles de Gaulle, 75008 Paris'
    },
    {
      id: 'a5',
      name: 'Montmartre',
      image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c',
      description: 'Charming historic district famous for the Sacré-Cœur Basilica and its artistic history.',
      rating: 4.5,
      price: 'Free',
      hours: 'Open 24 hours',
      address: 'Montmartre, 75018 Paris'
    }
  ],
  '2': [ // Tokyo
    {
      id: 'a6',
      name: 'Shibuya Crossing',
      image: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d',
      description: 'Famous scramble crossing where pedestrians cross in all directions at once.',
      rating: 4.5,
      price: 'Free',
      hours: 'Open 24 hours',
      address: '2 Chome-2-1 Dogenzaka, Shibuya City, Tokyo 150-0043'
    },
    {
      id: 'a7',
      name: 'Tokyo Tower',
      image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
      description: 'Iconic communications and observation tower inspired by the Eiffel Tower.',
      rating: 4.4,
      price: '¥900 - ¥2,800',
      hours: '9:00 AM - 11:00 PM',
      address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011'
    },
    {
      id: 'a8',
      name: 'Meiji Shrine',
      image: 'https://images.unsplash.com/photo-1624171791767-67f3be3d836a',
      description: 'Shinto shrine dedicated to Emperor Meiji and Empress Shoken, set in a peaceful forest.',
      rating: 4.6,
      price: 'Free',
      hours: 'Sunrise to Sunset',
      address: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557'
    },
    {
      id: 'a9',
      name: 'Senso-ji Temple',
      image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd',
      description: 'Ancient Buddhist temple in Asakusa with a large lantern at the entrance gate.',
      rating: 4.7,
      price: 'Free',
      hours: '6:00 AM - 5:00 PM',
      address: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032'
    },
    {
      id: 'a10',
      name: 'Tokyo Skytree',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      description: 'Tallest tower in Japan offering panoramic views of Tokyo from its observation decks.',
      rating: 4.5,
      price: '¥1,500 - ¥3,000',
      hours: '8:00 AM - 10:00 PM',
      address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045'
    }
  ],
  // Add more destinations as needed
};

// Mock hotel price comparison data
const mockHotelPriceComparisons = {
  '1': [ // Paris
    {
      id: 'h1',
      name: 'Hôtel Plaza Athénée',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      rating: 4.8,
      description: 'Luxury hotel offering elegant rooms, Michelin-starred restaurants, and Eiffel Tower views.',
      bookingPrice: 850,
      expediaPrice: 875,
      hotelsPrice: 860,
      address: '25 Avenue Montaigne, 75008 Paris'
    },
    {
      id: 'h2',
      name: 'Citadines Tour Eiffel Paris',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
      rating: 4.3,
      description: 'Contemporary apartment-style accommodations near the Eiffel Tower with kitchenettes.',
      bookingPrice: 210,
      expediaPrice: 230,
      hotelsPrice: 215,
      address: '132 Boulevard de Grenelle, 75015 Paris'
    },
    {
      id: 'h3',
      name: 'Hôtel Le Relais Montmartre',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
      rating: 4.2,
      description: 'Charming boutique hotel in the artistic Montmartre district with colorful decor.',
      bookingPrice: 145,
      expediaPrice: 150,
      hotelsPrice: 142,
      address: '6 Rue Constance, 75018 Paris'
    },
    {
      id: 'h4',
      name: 'Novotel Paris Les Halles',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      rating: 4.4,
      description: 'Modern hotel in central Paris, steps from the Louvre and Notre-Dame.',
      bookingPrice: 195,
      expediaPrice: 185,
      hotelsPrice: 190,
      address: '8 Place Marguerite de Navarre, 75001 Paris'
    },
    {
      id: 'h5',
      name: 'Generator Paris',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      rating: 4.0,
      description: 'Trendy hostel with private rooms and dorms, rooftop bar, and social atmosphere.',
      bookingPrice: 80,
      expediaPrice: 85,
      hotelsPrice: null,
      address: '9-11 Place du Colonel Fabien, 75010 Paris'
    }
  ],
  '2': [ // Tokyo
    {
      id: 'h6',
      name: 'Park Hyatt Tokyo',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c',
      rating: 4.7,
      description: 'Luxury hotel featured in "Lost in Translation" with stunning city views and gourmet dining.',
      bookingPrice: 550,
      expediaPrice: 580,
      hotelsPrice: 565,
      address: '3-7-1-2 Nishi Shinjuku, Shinjuku City, Tokyo 163-1055'
    },
    {
      id: 'h7',
      name: 'Tokyu Stay Shinjuku',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
      rating: 4.3,
      description: 'Modern hotel with in-room washer-dryers, perfect for longer stays in the heart of Shinjuku.',
      bookingPrice: 150,
      expediaPrice: 145,
      hotelsPrice: 155,
      address: '1 Chome-19-2 Kabukicho, Shinjuku City, Tokyo 160-0021'
    },
    {
      id: 'h8',
      name: 'HOSHINOYA Tokyo',
      image: 'https://images.unsplash.com/photo-1540304453527-d5f233d864ce',
      rating: 4.8,
      description: 'Luxury ryokan-style hotel with traditional Japanese aesthetics and modern amenities.',
      bookingPrice: 670,
      expediaPrice: 650,
      hotelsPrice: 675,
      address: '1 Chome-9-1 Otemachi, Chiyoda City, Tokyo 100-0004'
    },
    {
      id: 'h9',
      name: 'UNPLAN Kagurazaka',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
      rating: 4.6,
      description: 'Designer hostel in a quiet, upscale neighborhood with stylish common areas.',
      bookingPrice: 45,
      expediaPrice: 42,
      hotelsPrice: null,
      address: '2 Chome-14-12 Kagurazaka, Shinjuku City, Tokyo 162-0825'
    },
    {
      id: 'h10',
      name: 'The Tokyo EDITION, Toranomon',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      rating: 4.7,
      description: 'Sophisticated luxury hotel with contemporary design and excellent city views.',
      bookingPrice: 495,
      expediaPrice: 510,
      hotelsPrice: 490,
      address: '4-1-1 Toranomon, Minato City, Tokyo 105-0001'
    }
  ],
  // Add more destinations as needed
};

// Utilities for external API calls
const fetchFromExternalAPI = async (endpoint, params = {}) => {
  try {
    // This is a simulation of an external API call
    // In a real implementation, you would use fetch() to call a real API
    console.log(`Fetching from external API: ${endpoint}`, params);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return { success: true };
  } catch (error) {
    console.error("Error fetching from external API:", error);
    return { success: false, error };
  }
};

// Generate a dynamic destination from search query
const generateDestinationFromSearch = (searchQuery) => {
  // Parse the search query (typically "City, Country")
  const parts = searchQuery.split(',').map(part => part.trim());
  const city = parts[0];
  const country = parts.length > 1 ? parts[1] : 'Unknown';
  
  // Create a unique ID for this dynamically generated destination
  const dynamicId = `dynamic-${Date.now()}`;
  
  // Find appropriate image for the destination
  const getDestinationImage = (cityName) => {
    const cityImageMap = {
      'san francisco': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
      'los angeles': 'https://images.unsplash.com/photo-1506190503455-eca9c76513c1',
      'chicago': 'https://images.unsplash.com/photo-1581373449483-37449f962b6c',
      'miami': 'https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3',
      'seattle': 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362',
      'boston': 'https://images.unsplash.com/photo-1501979376754-f1943b3ac516',
      'barcelona': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
      'berlin': 'https://images.unsplash.com/photo-1560969184-10fe8719e047',
      'london': 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
      'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    };
    
    const cityLower = cityName.toLowerCase();
    
    // Return matching image or a default image
    return cityImageMap[cityLower] || 'https://images.unsplash.com/photo-1556760523-0432b2596a56';
  };
  
  return {
    id: dynamicId,
    name: city,
    location: country,
    image: getDestinationImage(city),
    description: `${city} is a popular destination known for its attractions, culture, and unique experiences. Explore the city's landmarks, enjoy local cuisine, and discover the best this destination has to offer.`,
    attractions: [
      { name: `${city} Downtown` },
      { name: 'Local Museums' },
      { name: 'Cultural Landmarks' }
    ]
  };
};

// Generate attractions for a dynamically created destination
const generateAttractionsForDestination = (destination) => {
  const city = destination.name;
  const country = destination.location;
  
  // Check for known specific attractions
  const knownAttractions = {
    'San Francisco': [
      {
        id: `${destination.id}-a1`,
        name: 'Golden Gate Bridge',
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
        description: 'Iconic suspension bridge spanning the Golden Gate strait, connecting San Francisco to Marin County.',
        rating: 4.8,
        price: 'Free (walking or cycling)',
        hours: 'Open 24 hours',
        address: 'Golden Gate Bridge, San Francisco, CA'
      },
      {
        id: `${destination.id}-a2`,
        name: 'Alcatraz Island',
        image: 'https://images.unsplash.com/photo-1580918864405-6cb328548fc8',
        description: 'Former federal prison on an island offering tours of the historic facility and panoramic views of the city.',
        rating: 4.7,
        price: '$41 - $95',
        hours: '8:45 AM - 6:30 PM',
        address: 'Alcatraz Island, San Francisco, CA 94133'
      },
      {
        id: `${destination.id}-a3`,
        name: 'Fisherman\'s Wharf',
        image: 'https://images.unsplash.com/photo-1534321238895-da3ab632df3e',
        description: 'Popular waterfront area with seafood restaurants, souvenir shops, and sea lion viewing at Pier 39.',
        rating: 4.5,
        price: 'Free',
        hours: 'Most businesses open 10:00 AM - 10:00 PM',
        address: 'Beach Street & The Embarcadero, San Francisco, CA'
      },
      {
        id: `${destination.id}-a4`,
        name: 'Lombard Street',
        image: 'https://images.unsplash.com/photo-1551159334-99fd013e176e',
        description: 'Famous street known for its steep, one-block section with eight hairpin turns.',
        rating: 4.4,
        price: 'Free',
        hours: 'Open 24 hours',
        address: 'Lombard Street, San Francisco, CA 94133'
      },
      {
        id: `${destination.id}-a5`,
        name: 'Chinatown',
        image: 'https://images.unsplash.com/photo-1527267207156-3372670819dc',
        description: 'Oldest Chinatown in North America featuring traditional architecture, shops, and authentic cuisine.',
        rating: 4.3,
        price: 'Free',
        hours: 'Most shops open 10:00 AM - 8:00 PM',
        address: 'Grant Avenue & Bush Street, San Francisco, CA'
      }
    ]
  };
  
  // If we have predefined attractions for this city, return them
  if (knownAttractions[city]) {
    return knownAttractions[city];
  }
  
  // Otherwise, generate generic attractions
  return [
    {
      id: `${destination.id}-a1`,
      name: `${city} City Center`,
      image: 'https://images.unsplash.com/photo-1556760523-0432b2596a56',
      description: `Explore the vibrant heart of ${city} with its shops, restaurants, and cultural landmarks.`,
      rating: 4.5,
      price: 'Free',
      hours: 'Open 24 hours',
      address: `Downtown ${city}, ${country}`
    },
    {
      id: `${destination.id}-a2`,
      name: `${city} Museum of Art`,
      image: 'https://images.unsplash.com/photo-1566043898997-1e35a9d97a1a',
      description: `Impressive collection of local and international art showcasing the cultural heritage of ${city}.`,
      rating: 4.3,
      price: '$15 - $25',
      hours: '9:00 AM - 5:00 PM, Closed Mondays',
      address: `Art District, ${city}, ${country}`
    },
    {
      id: `${destination.id}-a3`,
      name: `${city} Historical Park`,
      image: 'https://images.unsplash.com/photo-1569155444161-7f3fd2937971',
      description: `Beautiful green space with historical significance and recreational activities in ${city}.`,
      rating: 4.4,
      price: 'Free',
      hours: '6:00 AM - 10:00 PM',
      address: `Park Avenue, ${city}, ${country}`
    }
  ];
};

// Generate hotel data for a dynamically created destination
const generateHotelsForDestination = (destination) => {
  const city = destination.name;
  const country = destination.location;
  
  // Check for known specific hotels
  const knownHotels = {
    'San Francisco': [
      {
        id: `${destination.id}-h1`,
        name: 'Fairmont San Francisco',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        rating: 4.6,
        description: 'Luxury hotel atop Nob Hill offering stunning city views, elegant rooms, and fine dining.',
        bookingPrice: 429,
        expediaPrice: 449,
        hotelsPrice: 439,
        address: '950 Mason St, San Francisco, CA 94108'
      },
      {
        id: `${destination.id}-h2`,
        name: 'Hotel Zetta San Francisco',
        image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972',
        rating: 4.4,
        description: 'Trendy boutique hotel in SoMa with contemporary design, tech amenities, and playful touches.',
        bookingPrice: 289,
        expediaPrice: 299,
        hotelsPrice: 279,
        address: '55 5th St, San Francisco, CA 94103'
      },
      {
        id: `${destination.id}-h3`,
        name: 'Hotel Kabuki',
        image: 'https://images.unsplash.com/photo-1551632436-cbf726cbfb7b',
        rating: 4.3,
        description: 'Japanese-inspired hotel in Japantown featuring minimalist design, garden views, and cultural experiences.',
        bookingPrice: 249,
        expediaPrice: 239,
        hotelsPrice: 255,
        address: '1625 Post St, San Francisco, CA 94115'
      },
      {
        id: `${destination.id}-h4`,
        name: 'Hyatt Centric Fisherman\'s Wharf',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
        rating: 4.2,
        description: 'Modern hotel near Fisherman\'s Wharf with comfortable rooms, a heated outdoor pool, and on-site dining.',
        bookingPrice: 319,
        expediaPrice: 329,
        hotelsPrice: 309,
        address: '555 North Point St, San Francisco, CA 94133'
      },
      {
        id: `${destination.id}-h5`,
        name: 'HI San Francisco Downtown Hostel',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5',
        rating: 4.0,
        description: 'Affordable hostel in downtown offering private and shared rooms, communal spaces, and organized activities.',
        bookingPrice: 89,
        expediaPrice: 92,
        hotelsPrice: null,
        address: '312 Mason St, San Francisco, CA 94102'
      }
    ]
  };
  
  // If we have predefined hotels for this city, return them
  if (knownHotels[city]) {
    return knownHotels[city];
  }
  
  // Otherwise, generate generic hotels
  return [
    {
      id: `${destination.id}-h1`,
      name: `Grand Hotel ${city}`,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      rating: 4.7,
      description: `Luxury hotel in the heart of ${city} offering elegant accommodations and premium amenities.`,
      bookingPrice: 350,
      expediaPrice: 370,
      hotelsPrice: 360,
      address: `Downtown, ${city}, ${country}`
    },
    {
      id: `${destination.id}-h2`,
      name: `${city} Boutique Hotel`,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
      rating: 4.5,
      description: `Charming boutique hotel with unique design and personalized service in ${city}.`,
      bookingPrice: 220,
      expediaPrice: 230,
      hotelsPrice: 215,
      address: `Cultural District, ${city}, ${country}`
    },
    {
      id: `${destination.id}-h3`,
      name: `${city} Inn & Suites`,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
      rating: 4.2,
      description: `Comfortable mid-range hotel offering great value and convenient location in ${city}.`,
      bookingPrice: 150,
      expediaPrice: 155,
      hotelsPrice: 145,
      address: `Business District, ${city}, ${country}`
    }
  ];
};

// Create a cache to store dynamically generated destinations
const dynamicDestinationsCache = new Map();

// Cache for real-time images
const realTimeImagesCache = new Map();
const realTimeAttractionImagesCache = new Map();

// Cache metadata to track when images were last updated
const realTimeImagesCacheMetadata = {
  lastUpdateDay: null
};

// Function to check if it's time to refresh the cache (every Sunday)
const shouldRefreshImageCache = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // If it's Sunday (day 0) and we haven't updated today yet
  if (currentDay === 0 && realTimeImagesCacheMetadata.lastUpdateDay !== today.toDateString()) {
    realTimeImagesCacheMetadata.lastUpdateDay = today.toDateString();
    return true;
  }
  
  return false;
};

// Function to fetch real-time images for a destination
export async function getRealTimeDestinationImages(destinationName, count = 5) {
  // Check if it's Sunday and time to refresh the cache
  if (shouldRefreshImageCache()) {
    console.log('It\'s Sunday! Clearing image cache for weekly refresh');
    realTimeImagesCache.clear();
    realTimeAttractionImagesCache.clear();
  }
  
  // Check cache first to avoid redundant API calls
  const cacheKey = `${destinationName}-${count}`;
  if (realTimeImagesCache.has(cacheKey)) {
    return realTimeImagesCache.get(cacheKey);
  }
  
  try {
    // In a real implementation, this would call an actual API
    console.log(`Fetching real-time images for: ${destinationName}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a date string for today to simulate real-time nature
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // For demo purposes, we'll use a mixture of reliable travel site images
    // This would be replaced with actual API calls in a production environment
    const images = [];
    
    // Comprehensive list of reliable destination images from multiple travel sites
    const reliableDestinationImages = {
      'tokyo': [
        // Booking.com and Expedia style images
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
        'https://images.unsplash.com/photo-1513407030348-c983a97b98d8',
        'https://www.planetware.com/photos-large/JPN/japan-mt-fuji-and-cherry-blossoms.jpg',
        'https://www.gotokyo.org/en/plan/tokyo-outline/images/main.jpg'
      ],
      'paris': [
        // Booking.com and TripAdvisor style images
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/34/00/45/paris.jpg',
        'https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg',
        'https://media.cntraveler.com/photos/5cf8a1b05400d96e753f13b5/16:9/w_2560%2Cc_limit/Paris_GettyImages-1005348968.jpg'
      ],
      'new york': [
        // Booking.com and Expedia style images
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        'https://images.unsplash.com/photo-1593880223042-744ce9a4b58f',
        'https://media.architecturaldigest.com/photos/5da74823d599ec0008227ea8/16:9/w_2560%2Cc_limit/GettyImages-946087016.jpg',
        'https://www.planetware.com/photos-large/USNY/new-york-city-central-park-lake.jpg',
        'https://content.r9cdn.net/rimg/dimg/db/02/06b291e8-city-14080-16561f53c0c.jpg'
      ],
      'rome': [
        // TripAdvisor and Hotels.com style images
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
        'https://images.unsplash.com/photo-1525874684015-58379d421a52',
        'https://media.cntraveler.com/photos/5b914e80d5806340ca438db1/16:9/w_2560%2Cc_limit/Rome_GettyImages-1038117600.jpg',
        'https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg',
        'https://lp-cms-production.imgix.net/2021-05/shutterstock_304788282.jpg'
      ],
      'london': [
        // Booking.com and Expedia style images
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        'https://images.unsplash.com/photo-1517394834181-95ed159986c7',
        'https://media.cntraveler.com/photos/63fca7908e7ec42682c6dbeb/16:9/w_2560%2Cc_limit/London_GettyImages-1386022245.jpg',
        'https://www.visitbritain.com/sites/default/files/consumer_components_enhanced/header_image/vb34141681_2.jpg',
        'https://www.planetware.com/photos-large/ENG/england-london-tower-bridge.jpg'
      ],
      'kyoto': [
        // Japan Tourism and Booking.com style images
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
        'https://www.japan-guide.com/g18/3900_01.jpg',
        'https://media.cntraveler.com/photos/63482b255e7943ad4006df0b/16:9/w_2560%2Cc_limit/Kyoto%20Japan_GettyImages-11751047.jpg',
        'https://a.cdn-hotels.com/gdcs/production40/d811/5e89e62b-ba7a-4127-8276-972d4a99b2bc.jpg'
      ],
      'barcelona': [
        // TripAdvisor and Expedia style images
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
        'https://images.unsplash.com/photo-1583422409516-2895a77efded',
        'https://www.fodors.com/wp-content/uploads/2022/03/HERO_Barcelona_Hero_shutterstock_1161851206.jpg',
        'https://media.cntraveler.com/photos/5a0ac559c23d8e08d959882a/16:9/w_2560%2Cc_limit/Exterior_ParkGuell_GettyImages-160749940.jpg',
        'https://content.r9cdn.net/rimg/dimg/b7/15/91fd5882-city-18177-169ae67e82d.jpg'
      ],
      'san francisco': [
        // TripAdvisor and Hotels.com style images
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
        'https://images.unsplash.com/photo-1506190503455-eca9c76513c1',
        'https://media.cntraveler.com/photos/63fcd6da0675de577c5149a6/16:9/w_2560%2Cc_limit/San%20Francisco_GettyImages-1347431770.jpg',
        'https://cdn.britannica.com/13/77413-050-95217C0B/Golden-Gate-Bridge-San-Francisco.jpg',
        'https://www.travelandleisure.com/thmb/Ps0E8r5iSftcRmDEC9IJ7oCUAZU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-gate-bridge-san-francisco-SANFRAN0819-e94a234ec8284f96abc4312a37e2a0bc.jpg'
      ],
      'amsterdam': [
        // Booking.com and TripAdvisor style images
        'https://images.unsplash.com/photo-1534351590666-13e3e96b5017',
        'https://images.unsplash.com/photo-1576924542622-772cb2560890',
        'https://media.cntraveler.com/photos/5a029bf49674f96701fe5271/16:9/w_2560%2Cc_limit/Amsterdam_GettyImages-489337898.jpg',
        'https://a.cdn-hotels.com/gdcs/production157/d1898/abc9d800-c31d-11e8-87bb-0242ac110006.jpg',
        'https://content.r9cdn.net/rimg/dimg/63/7c/46f5ab3a-city-23598-16972726993.jpg'
      ],
      'dubai': [
        // Booking.com and Expedia style images
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090',
        'https://www.planetware.com/photos-large/UAE/uae-dubai-burj-khalifa.jpg',
        'https://media.cntraveler.com/photos/63c96d9fc1c02a63ee05584d/16:9/w_2560%2Cc_limit/Dubai_GettyImages-1149100079.jpg',
        'https://content.r9cdn.net/rimg/dimg/45/5b/6b106ff6-city-34086-162d77ff8db.jpg'
      ]
    };
    
    // Add fallback reliable images for any destination
    const fallbackImages = [
      'https://cdn.britannica.com/30/94430-050-D0FC51CD/Niagara-Falls.jpg',
      'https://cdn.britannica.com/85/84985-050-BD97A936/Great-Wall-of-China-Mu-Tian-Yu.jpg',
      'https://cdn.britannica.com/25/153525-050-fc2034ce/Colosseum-Rome-Italy.jpg',
      'https://cdn.britannica.com/56/94456-050-4C0AB93F/Great-Sphinx-Giza-Egypt.jpg',
      'https://cdn.britannica.com/54/150754-050-5B93A950/interior-Hagia-Sophia-Istanbul.jpg'
    ];
    
    // Check if we have known images for this destination
    const destinationLower = destinationName.toLowerCase();
    const destinationParts = destinationLower.split(',').map(part => part.trim());
    const primaryLocation = destinationParts[0]; // City name is typically first
    
    // Try to match with our reliable sources first
    if (reliableDestinationImages[primaryLocation]) {
      images.push(...reliableDestinationImages[primaryLocation]);
    } else {
      // Check for partial matches if no exact match
      const partialMatches = Object.keys(reliableDestinationImages).filter(
        key => primaryLocation.includes(key) || key.includes(primaryLocation)
      );
      
      if (partialMatches.length > 0) {
        // Use the first partial match
        images.push(...reliableDestinationImages[partialMatches[0]]);
      } else {
        // If no match found, use the destination search term with the Unsplash API
        for (let i = 0; i < Math.min(3, count); i++) {
          const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(destinationName)}&tourism&travel&date=${dateString}&rand=${Math.random()}`;
          images.push(imageUrl);
        }
        
        // Add generic travel images as fallbacks
        images.push(...fallbackImages.slice(0, count - images.length));
      }
    }
    
    // Ensure we have the requested number of images by adding fallbacks if needed
    while (images.length < count) {
      images.push(fallbackImages[images.length % fallbackImages.length]);
    }
    
    // Add metadata to make it feel more real-time
    const result = {
      images: images.slice(0, count), // Limit to requested count
      metadata: {
        source: 'Travel API Image Service',
        updated: new Date().toISOString(),
        query: destinationName,
        totalResults: images.length,
        nextRefresh: getNextSundayDate()
      }
    };
    
    // Cache the results to avoid redundant API calls
    realTimeImagesCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error fetching real-time destination images:", error);
    // Return generic fallback images on error
    const fallbackImages = [
      'https://cdn.britannica.com/30/94430-050-D0FC51CD/Niagara-Falls.jpg',
      'https://cdn.britannica.com/85/84985-050-BD97A936/Great-Wall-of-China-Mu-Tian-Yu.jpg',
      'https://cdn.britannica.com/25/153525-050-fc2034ce/Colosseum-Rome-Italy.jpg',
      'https://cdn.britannica.com/56/94456-050-4C0AB93F/Great-Sphinx-Giza-Egypt.jpg',
      'https://cdn.britannica.com/54/150754-050-5B93A950/interior-Hagia-Sophia-Istanbul.jpg'
    ];
    
    return { 
      images: fallbackImages.slice(0, count),
      metadata: { 
        error: 'Failed to fetch images',
        nextRefresh: getNextSundayDate()
      } 
    };
  }
}

// Helper function to get the date of the next Sunday
function getNextSundayDate() {
  const today = new Date();
  const daysUntilNextSunday = (7 - today.getDay()) % 7;
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilNextSunday);
  return nextSunday.toISOString().split('T')[0]; // YYYY-MM-DD
}

export async function getDestinationById(id) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // If no ID is provided, return all destinations (useful for search)
  if (!id) {
    return [...mockDestinations, ...Array.from(dynamicDestinationsCache.values())];
  }
  
  // Check if the ID is for a cached dynamic destination
  if (id.startsWith('dynamic-') && dynamicDestinationsCache.has(id)) {
    return dynamicDestinationsCache.get(id);
  }
  
  // Check if it's a destination name or location instead of an ID
  if (typeof id === 'string' && id.length > 2) {
    // First check mock destinations
    const mockResult = mockDestinations.find(
      dest => dest.id === id || 
              dest.name.toLowerCase() === id.toLowerCase() ||
              dest.name.toLowerCase().includes(id.toLowerCase()) ||
              dest.location.toLowerCase().includes(id.toLowerCase())
    );
    
    if (mockResult) {
      return mockResult;
    }
    
    // Check dynamic destinations cache
    for (const destination of dynamicDestinationsCache.values()) {
      if (destination.name.toLowerCase() === id.toLowerCase() || 
          destination.name.toLowerCase().includes(id.toLowerCase()) ||
          destination.location.toLowerCase().includes(id.toLowerCase())) {
        return destination;
      }
    }
    
    // If still not found, create a new dynamic destination
    // Simulate getting data from an external API
    await fetchFromExternalAPI('destinations/search', { query: id });
    
    const dynamicDestination = generateDestinationFromSearch(id);
    
    // Cache the dynamically generated destination
    dynamicDestinationsCache.set(dynamicDestination.id, dynamicDestination);
    
    return dynamicDestination;
  }
  
  // Default to finding by exact ID in mock data
  return mockDestinations.find(dest => dest.id === id) || null;
}

export async function getHotelPriceComparisons(destinationId) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700));
  
  // Check if it's a dynamic destination ID
  if (destinationId && destinationId.startsWith('dynamic-') && dynamicDestinationsCache.has(destinationId)) {
    const destination = dynamicDestinationsCache.get(destinationId);
    
    // Simulate getting hotel data from an external API
    await fetchFromExternalAPI('hotels/search', { destination: destination.name });
    
    return generateHotelsForDestination(destination);
  }
  
  // Handle string destination names and IDs from mock data
  if (typeof destinationId === 'string' && destinationId.length > 2 && !mockHotelPriceComparisons[destinationId]) {
    // First check mock destinations
    const mockDestination = mockDestinations.find(
      dest => dest.name.toLowerCase().includes(destinationId.toLowerCase()) || 
              dest.location.toLowerCase().includes(destinationId.toLowerCase())
    );
    
    if (mockDestination) {
      return mockHotelPriceComparisons[mockDestination.id] || [];
    }
    
    // If not found in mock data, check dynamic cache or create new
    let dynamicDestination;
    
    // Check dynamic destinations cache
    for (const destination of dynamicDestinationsCache.values()) {
      if (destination.name.toLowerCase() === destinationId.toLowerCase() || 
          destination.name.toLowerCase().includes(destinationId.toLowerCase()) ||
          destination.location.toLowerCase().includes(destinationId.toLowerCase())) {
        dynamicDestination = destination;
        break;
      }
    }
    
    // If not in cache, create a new dynamic destination
    if (!dynamicDestination) {
      // Simulate getting data from an external API
      await fetchFromExternalAPI('destinations/search', { query: destinationId });
      
      dynamicDestination = generateDestinationFromSearch(destinationId);
      
      // Cache the dynamically generated destination
      dynamicDestinationsCache.set(dynamicDestination.id, dynamicDestination);
    }
    
    // Simulate getting hotel data from an external API
    await fetchFromExternalAPI('hotels/search', { destination: dynamicDestination.name });
    
    return generateHotelsForDestination(dynamicDestination);
  }
  
  // Default to mock data
  return mockHotelPriceComparisons[destinationId] || [];
}

export async function getAttractions(destinationId) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  // Check if it's a dynamic destination ID
  if (destinationId && destinationId.startsWith('dynamic-') && dynamicDestinationsCache.has(destinationId)) {
    const destination = dynamicDestinationsCache.get(destinationId);
    
    // Simulate getting attractions data from an external API
    await fetchFromExternalAPI('attractions/search', { destination: destination.name });
    
    return generateAttractionsForDestination(destination);
  }
  
  // Handle string destination names and IDs from mock data
  if (typeof destinationId === 'string' && destinationId.length > 2 && !mockAttractions[destinationId]) {
    // First check mock destinations
    const mockDestination = mockDestinations.find(
      dest => dest.name.toLowerCase().includes(destinationId.toLowerCase()) || 
              dest.location.toLowerCase().includes(destinationId.toLowerCase())
    );
    
    if (mockDestination) {
      return mockAttractions[mockDestination.id] || [];
    }
    
    // If not found in mock data, check dynamic cache or create new
    let dynamicDestination;
    
    // Check dynamic destinations cache
    for (const destination of dynamicDestinationsCache.values()) {
      if (destination.name.toLowerCase() === destinationId.toLowerCase() || 
          destination.name.toLowerCase().includes(destinationId.toLowerCase()) ||
          destination.location.toLowerCase().includes(destinationId.toLowerCase())) {
        dynamicDestination = destination;
        break;
      }
    }
    
    // If not in cache, create a new dynamic destination
    if (!dynamicDestination) {
      // Simulate getting data from an external API
      await fetchFromExternalAPI('destinations/search', { query: destinationId });
      
      dynamicDestination = generateDestinationFromSearch(destinationId);
      
      // Cache the dynamically generated destination
      dynamicDestinationsCache.set(dynamicDestination.id, dynamicDestination);
    }
    
    // Simulate getting attractions data from an external API
    await fetchFromExternalAPI('attractions/search', { destination: dynamicDestination.name });
    
    return generateAttractionsForDestination(dynamicDestination);
  }
  
  // Default to mock data
  return mockAttractions[destinationId] || [];
}

// Function to fetch real-time images for attractions
export async function getRealTimeAttractionImages(attractionName, count = 1) {
  // Check if it's Sunday and time to refresh the cache
  if (shouldRefreshImageCache()) {
    console.log('It\'s Sunday! Clearing image cache for weekly refresh');
    realTimeImagesCache.clear();
    realTimeAttractionImagesCache.clear();
  }
  
  // Check cache first to avoid redundant API calls
  const cacheKey = `${attractionName}-${count}`;
  if (realTimeAttractionImagesCache.has(cacheKey)) {
    return realTimeAttractionImagesCache.get(cacheKey);
  }
  
  try {
    // In a real implementation, this would call an actual API
    console.log(`Fetching real-time images for attraction: ${attractionName}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create a date string for today to simulate real-time nature
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // For demo purposes, we'll use a mixture of reliable travel site images
    const images = [];
    
    // Comprehensive list of reliable attraction images from multiple travel sites
    const reliableAttractionImages = {
      'eiffel tower': [
        // TripAdvisor and Viator style images
        'https://images.unsplash.com/photo-1543349689-9a4d426bee8e',
        'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
        'https://cdn.getyourguide.com/img/tour/5d4c91bdb9f9a.jpeg/98.jpg',
        'https://www.planetware.com/photos-large/F/france-paris-eiffel-tower.jpg'
      ],
      'louvre museum': [
        // TripAdvisor and GetYourGuide style images
        'https://images.unsplash.com/photo-1565060169861-0b0eb9694efd',
        'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/2c/9d.jpg',
        'https://cdn.getyourguide.com/img/location/5ffeb0e873d70.jpeg/88.jpg',
        'https://cdn.britannica.com/36/162636-050-932C5D49/Louvre-Museum-Paris-France.jpg'
      ],
      'golden gate bridge': [
        // TripAdvisor and GetYourGuide style images
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
        'https://images.unsplash.com/photo-1534050359320-02900022671e',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/93/21/f1.jpg',
        'https://cdn.britannica.com/30/94430-050-D0FC51CD/Niagara-Falls.jpg',
        'https://cdn.britannica.com/89/179589-138-3EE27C94/Overview-Golden-Gate-Bridge-San-Francisco.jpg'
      ],
      'statue of liberty': [
        // TripAdvisor and Viator style images
        'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a',
        'https://images.unsplash.com/photo-1443181844940-9042ec79924b',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/1e/ae.jpg',
        'https://cdn.getyourguide.com/img/location/5ffeb496ccb7b.jpeg/88.jpg',
        'https://cdn.britannica.com/82/183382-050-D832EC3A/Detail-head-crown-Statue-of-Liberty-New.jpg'
      ],
      'colosseum': [
        // TripAdvisor and GetYourGuide style images
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
        'https://images.unsplash.com/photo-1615445167544-298eed4ab252',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/36/43.jpg',
        'https://cdn.getyourguide.com/img/location/5ffeb496c6a04.jpeg/88.jpg',
        'https://www.planetware.com/photos-large/I/italy-rome-colosseum.jpg'
      ],
      'tokyo tower': [
        // TripAdvisor and GetYourGuide style images
        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
        'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/92/54/6b.jpg',
        'https://cdn.getyourguide.com/img/location/5ffeb75ed5fac.jpeg/88.jpg',
        'https://cdn.britannica.com/41/75841-050-EE77B20D/Tokyo-Tower-Japan.jpg'
      ],
      'great wall of china': [
        // TripAdvisor and Viator style images
        'https://images.unsplash.com/photo-1508804185872-d7badad00f7d',
        'https://images.unsplash.com/photo-1549893072-4bc678117f45',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/38/d3/83.jpg',
        'https://cdn.getyourguide.com/img/location/5ffeb40fb9d5a.jpeg/88.jpg',
        'https://cdn.britannica.com/89/179589-138-3EE27C94/Overview-Golden-Gate-Bridge-San-Francisco.jpg'
      ],
      'taj mahal': [
        // TripAdvisor and Viator style images
        'https://images.unsplash.com/photo-1585135497273-1a07a7d3942d',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/31/85/51.jpg',
        'https://cdn.getyourguide.com/img/location/5c9e0b7bce3d6.jpeg/88.jpg',
        'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg'
      ],
      'sydney opera house': [
        // TripAdvisor and GetYourGuide style images
        'https://images.unsplash.com/photo-1530587609993-41fae2caebbd',
        'https://images.unsplash.com/photo-1524293581917-878a6d017c71',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/be/6b/a0.jpg',
        'https://cdn.getyourguide.com/img/tour/60e6fde75a9b6.jpeg/98.jpg',
        'https://cdn.britannica.com/96/100196-050-C92064E0/Sydney-Opera-House-Port-Jackson.jpg'
      ]
    };
    
    // Add generic fallback attractions in case we can't find a match
    const fallbackAttractionImages = [
      'https://images.unsplash.com/photo-1558370781-d6196949e317', // Generic attraction
      'https://images.unsplash.com/photo-1603199032603-d704e943f5cf', // Landmark
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/92/54/6b.jpg', // Popular site
      'https://cdn.britannica.com/38/189838-050-6351B307/Iolani-Palace-Oahu-Honolulu-Hawaiian-Islands.jpg', // Historic building
      'https://cdn.britannica.com/69/94469-050-5ACEAD0F/Emperor-Hadrian-villa-Tivoli-Italy.jpg' // Ancient ruins
    ];
    
    // Process attraction name for better matching
    const attractionLower = attractionName.toLowerCase();
    
    // Try to match with our reliable sources first
    if (reliableAttractionImages[attractionLower]) {
      images.push(...reliableAttractionImages[attractionLower]);
    } else {
      // Check for partial matches
      const partialMatches = Object.keys(reliableAttractionImages).filter(
        key => attractionLower.includes(key) || key.includes(attractionLower)
      );
      
      if (partialMatches.length > 0) {
        // Use the first partial match
        images.push(...reliableAttractionImages[partialMatches[0]]);
      } else {
        // If no match found, use the attraction search term with the Unsplash API
        for (let i = 0; i < Math.min(2, count); i++) {
          const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(attractionName)}&landmark&travel&date=${dateString}&rand=${Math.random()}`;
          images.push(imageUrl);
        }
        
        // Add fallback travel images
        images.push(...fallbackAttractionImages.slice(0, count - images.length));
      }
    }
    
    // Ensure we have the requested number of images by adding fallbacks if needed
    while (images.length < count) {
      images.push(fallbackAttractionImages[images.length % fallbackAttractionImages.length]);
    }
    
    // Add metadata to make it feel more real-time
    const result = {
      images: images.slice(0, count), // Limit to requested count
      metadata: {
        source: 'Travel API Attraction Image Service',
        updated: new Date().toISOString(),
        query: attractionName,
        totalResults: images.length,
        nextRefresh: getNextSundayDate()
      }
    };
    
    // Cache the results to avoid redundant API calls
    realTimeAttractionImagesCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error fetching real-time attraction images:", error);
    // Return generic fallback image on error
    const fallbackImages = [
      'https://images.unsplash.com/photo-1558370781-d6196949e317', // Generic attraction
      'https://cdn.britannica.com/38/189838-050-6351B307/Iolani-Palace-Oahu-Honolulu-Hawaiian-Islands.jpg' // Historic building
    ];
    
    return { 
      images: fallbackImages.slice(0, count),
      metadata: { 
        error: 'Failed to fetch images',
        nextRefresh: getNextSundayDate()
      } 
    };
  }
}
