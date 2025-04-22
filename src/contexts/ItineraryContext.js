import React, { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { useAuth } from './AuthContext';

// Create context
const ItineraryContext = createContext();

// Mock data for itineraries
const mockItineraries = [
  {
    id: '1',
    title: 'Weekend in Paris',
    destination: 'Paris, France',
    startDate: '2025-05-15',
    endDate: '2025-05-18',
    travelers: 2,
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    activities: [
      { id: 'a1', title: 'Eiffel Tower', date: '2025-05-16', time: '10:00', location: 'Champ de Mars', notes: 'Buy tickets in advance' },
      { id: 'a2', title: 'Louvre Museum', date: '2025-05-16', time: '14:00', location: 'Rue de Rivoli', notes: 'Focus on main exhibits' },
      { id: 'a3', title: 'Seine River Cruise', date: '2025-05-17', time: '18:00', location: 'Pont Neuf', notes: 'Sunset cruise recommended' }
    ],
    accommodations: [
      { id: 'h1', name: 'Hotel des Arts', checkIn: '2025-05-15', checkOut: '2025-05-18', confirmationCode: 'HDA123456', address: '12 Rue des Beaux-Arts' }
    ],
    transportation: [
      { id: 't1', type: 'Flight', from: 'New York (JFK)', to: 'Paris (CDG)', departureDate: '2025-05-15', departureTime: '18:30', returnDate: '2025-05-18', returnTime: '14:45', confirmationCode: 'AF7890' }
    ],
    notes: 'Remember to bring adapter for European outlets'
  },
  {
    id: '2',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2025-09-10',
    endDate: '2025-09-20',
    travelers: 1,
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    activities: [
      { id: 'a4', title: 'Shibuya Crossing', date: '2025-09-11', time: '13:00', location: 'Shibuya', notes: 'Best viewed from Starbucks' },
      { id: 'a5', title: 'TeamLab Borderless', date: '2025-09-12', time: '16:00', location: 'Odaiba', notes: 'Book tickets online' },
      { id: 'a6', title: 'Mt. Fuji Day Trip', date: '2025-09-15', time: '08:00', location: 'Fuji', notes: 'Weather dependent' }
    ],
    accommodations: [
      { id: 'h2', name: 'Park Hyatt Tokyo', checkIn: '2025-09-10', checkOut: '2025-09-20', confirmationCode: 'PHT789012', address: '3-7-1-2 Nishi Shinjuku' }
    ],
    transportation: [
      { id: 't2', type: 'Flight', from: 'New York (JFK)', to: 'Tokyo (HND)', departureDate: '2025-09-09', departureTime: '10:45', returnDate: '2025-09-20', returnTime: '13:15', confirmationCode: 'JL5678' }
    ],
    notes: 'Get a Suica card for public transportation'
  },
  {
    id: '3',
    title: 'Italian Vacation',
    destination: 'Rome, Italy',
    startDate: '2024-07-12',
    endDate: '2024-07-20',
    travelers: 4,
    status: 'past',
    coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    activities: [
      { id: 'a7', title: 'Colosseum Tour', date: '2024-07-13', time: '09:00', location: 'Colosseum', notes: 'Skip the line tickets' },
      { id: 'a8', title: 'Vatican Museums', date: '2024-07-14', time: '10:00', location: 'Vatican City', notes: 'Modest dress required' },
      { id: 'a9', title: 'Trevi Fountain', date: '2024-07-15', time: '20:00', location: 'Trevi', notes: 'Less crowded at night' }
    ],
    accommodations: [
      { id: 'h3', name: 'Hotel Artemide', checkIn: '2024-07-12', checkOut: '2024-07-20', confirmationCode: 'ART345678', address: 'Via Nazionale, 22' }
    ],
    transportation: [
      { id: 't3', type: 'Flight', from: 'New York (JFK)', to: 'Rome (FCO)', departureDate: '2024-07-11', departureTime: '21:30', returnDate: '2024-07-20', returnTime: '11:20', confirmationCode: 'AZ1234' }
    ],
    notes: 'Bring comfortable walking shoes'
  }
];

// Itinerary Provider component
export const ItineraryProvider = ({ children }) => {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load itineraries when user changes
  useEffect(() => {
    const loadItineraries = async () => {
      setLoading(true);
      try {
        if (user) {
          // In a real app, you would fetch the user's itineraries from your API
          // For now, we'll use mock data
          const savedItineraries = localStorage.getItem(`itineraries_${user.id}`);
          if (savedItineraries) {
            setItineraries(JSON.parse(savedItineraries));
          } else {
            setItineraries(mockItineraries);
            localStorage.setItem(`itineraries_${user.id}`, JSON.stringify(mockItineraries));
          }
        } else {
          setItineraries([]);
        }
      } catch (err) {
        console.error('Failed to load itineraries:', err);
        setError('Failed to load your trips');
      } finally {
        setLoading(false);
      }
    };

    loadItineraries();
  }, [user]);

  // Save itineraries to localStorage when they change
  useEffect(() => {
    if (user && itineraries.length > 0) {
      localStorage.setItem(`itineraries_${user.id}`, JSON.stringify(itineraries));
    }
  }, [itineraries, user]);

  // Get a single itinerary by ID
  const getItinerary = (id) => {
    return itineraries.find(itinerary => itinerary.id === id) || null;
  };

  // Create a new itinerary
  const createItinerary = (newItinerary) => {
    try {
      // Generate a unique ID
      const id = `${Date.now()}`;
      const itineraryWithId = {
        ...newItinerary,
        id,
        status: 'upcoming',
        activities: [],
        accommodations: [],
        transportation: [],
        notes: ''
      };
      
      setItineraries([...itineraries, itineraryWithId]);
      message.success('Trip created successfully');
      return itineraryWithId;
    } catch (err) {
      setError(err.message);
      message.error('Failed to create trip');
      throw err;
    }
  };

  // Update an existing itinerary
  const updateItinerary = (id, updates) => {
    try {
      const updatedItineraries = itineraries.map(itinerary => 
        itinerary.id === id ? { ...itinerary, ...updates } : itinerary
      );
      
      setItineraries(updatedItineraries);
      message.success('Trip updated successfully');
      return getItinerary(id);
    } catch (err) {
      setError(err.message);
      message.error('Failed to update trip');
      throw err;
    }
  };

  // Delete an itinerary
  const deleteItinerary = (id) => {
    try {
      const updatedItineraries = itineraries.filter(itinerary => itinerary.id !== id);
      setItineraries(updatedItineraries);
      message.success('Trip deleted successfully');
    } catch (err) {
      setError(err.message);
      message.error('Failed to delete trip');
      throw err;
    }
  };

  // Add an activity to an itinerary
  const addActivity = (itineraryId, activity) => {
    try {
      const activityWithId = {
        ...activity,
        id: `a${Date.now()}`
      };
      
      const updatedItineraries = itineraries.map(itinerary => {
        if (itinerary.id === itineraryId) {
          return {
            ...itinerary,
            activities: [...itinerary.activities, activityWithId]
          };
        }
        return itinerary;
      });
      
      setItineraries(updatedItineraries);
      message.success('Activity added');
      return activityWithId;
    } catch (err) {
      setError(err.message);
      message.error('Failed to add activity');
      throw err;
    }
  };

  // Add accommodation to an itinerary
  const addAccommodation = (itineraryId, accommodation) => {
    try {
      const accommodationWithId = {
        ...accommodation,
        id: `h${Date.now()}`
      };
      
      const updatedItineraries = itineraries.map(itinerary => {
        if (itinerary.id === itineraryId) {
          return {
            ...itinerary,
            accommodations: [...itinerary.accommodations, accommodationWithId]
          };
        }
        return itinerary;
      });
      
      setItineraries(updatedItineraries);
      message.success('Accommodation added');
      return accommodationWithId;
    } catch (err) {
      setError(err.message);
      message.error('Failed to add accommodation');
      throw err;
    }
  };

  // Add transportation to an itinerary
  const addTransportation = (itineraryId, transportation) => {
    try {
      const transportationWithId = {
        ...transportation,
        id: `t${Date.now()}`
      };
      
      const updatedItineraries = itineraries.map(itinerary => {
        if (itinerary.id === itineraryId) {
          return {
            ...itinerary,
            transportation: [...itinerary.transportation, transportationWithId]
          };
        }
        return itinerary;
      });
      
      setItineraries(updatedItineraries);
      message.success('Transportation added');
      return transportationWithId;
    } catch (err) {
      setError(err.message);
      message.error('Failed to add transportation');
      throw err;
    }
  };

  // Clear any errors
  const clearError = () => {
    setError(null);
  };

  const contextValue = {
    itineraries,
    loading,
    error,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    addActivity,
    addAccommodation,
    addTransportation,
    clearError
  };

  return (
    <ItineraryContext.Provider value={contextValue}>
      {children}
    </ItineraryContext.Provider>
  );
};

// Custom hook to use the itinerary context
export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};