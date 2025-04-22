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

// Cache for real-time images to avoid excessive API calls
const realTimeImagesCache = new Map();

// Function to fetch real-time images for a destination
export async function getRealTimeDestinationImages(destinationName, count = 5) {
  // Check cache first to avoid redundant API calls
  const cacheKey = `${destinationName}-${count}`;
  if (realTimeImagesCache.has(cacheKey)) {
    return realTimeImagesCache.get(cacheKey);
  }
  
  try {
    // In a real implementation, this would call an actual API
    // For example, using Unsplash API, Google Places API, or a news API
    console.log(`Fetching real-time images for: ${destinationName}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a date string for today to simulate real-time nature
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Generate search terms based on destination name
    const searchTerms = [
      `${destinationName} skyline`,
      `${destinationName} landmarks`,
      `${destinationName} attractions`,
      `${destinationName} tourism`,
      `${destinationName} travel`
    ];
    
    // For demo purposes, we'll generate dynamic image URLs
    // In a real app, these would come from an actual API
    const images = [];
    
    // Add some predictable sources first to ensure quality results
    const knownImageSources = {
      'tokyo': [
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
        'https://images.unsplash.com/photo-1513407030348-c983a97b98d8',
        'https://images.unsplash.com/photo-1554797589-7241bb691973',
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
      ],
      'paris': [
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
        'https://images.unsplash.com/photo-1541685874008-18587d691efa',
        'https://images.unsplash.com/photo-1551781066-15814a6965c7',
        'https://images.unsplash.com/photo-1505761671935-60b3a7427bad'
      ],
      'new york': [
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        'https://images.unsplash.com/photo-1593880223042-744ce9a4b58f',
        'https://images.unsplash.com/photo-1522083165195-3424ed129620',
        'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856'
      ],
      'rome': [
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
        'https://images.unsplash.com/photo-1525874684015-58379d421a52',
        'https://images.unsplash.com/photo-1531572753322-ad063cecc140',
        'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b',
        'https://images.unsplash.com/photo-1529154036614-a60975f5c760'
      ],
      'london': [
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        'https://images.unsplash.com/photo-1517394834181-95ed159986c7',
        'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
        'https://images.unsplash.com/photo-1529180184525-78f99adb8e98',
        'https://images.unsplash.com/photo-1486299267070-83823f5448dd'
      ],
      'kyoto': [
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
        'https://images.unsplash.com/photo-1624280433509-0726ed60f9ad',
        'https://images.unsplash.com/photo-1493997181344-712f2f19d87a',
        'https://images.unsplash.com/photo-1558862107-d49ef2a04d72'
      ],
      'barcelona': [
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
        'https://images.unsplash.com/photo-1583422409516-2895a77efded',
        'https://images.unsplash.com/photo-1559058789-672da06263d8',
        'https://images.unsplash.com/photo-1579282240050-352db0a14c21',
        'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4'
      ]
    };
    
    // Check if we have known images for this destination
    const destinationLower = destinationName.toLowerCase();
    if (knownImageSources[destinationLower]) {
      images.push(...knownImageSources[destinationLower]);
    }
    
    // If we still need more images, generate them
    while (images.length < count) {
      const searchTerm = searchTerms[images.length % searchTerms.length];
      // Use Unsplash source with search terms and randomization to simulate real API
      // Add date string to make it feel "real-time" updated
      const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(searchTerm)}&date=${dateString}&rand=${Math.random()}`;
      images.push(imageUrl);
    }
    
    // Add metadata to make it feel more real-time
    const result = {
      images,
      metadata: {
        source: 'Travel API Image Service',
        updated: new Date().toISOString(),
        query: destinationName,
        totalResults: images.length
      }
    };
    
    // Cache the results to avoid redundant API calls
    realTimeImagesCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error fetching real-time destination images:", error);
    // Return empty results on error
    return { images: [], metadata: { error: 'Failed to fetch images' } };
  }
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
