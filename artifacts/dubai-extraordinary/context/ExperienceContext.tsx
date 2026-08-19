import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Experience = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  rating: string;
  image: number;
  price: string;
  accent: string;
  saved?: boolean;
};

type ExperienceContextValue = {
  savedIds: string[];
  itineraryIds: string[];
  toggleSaved: (id: string) => void;
  addToItinerary: (id: string) => void;
  removeFromItinerary: (id: string) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(['burj', 'desert']);
  const [itineraryIds, setItineraryIds] = useState<string[]>(['burj']);

  useEffect(() => {
    AsyncStorage.multiGet(['dubai-saved', 'dubai-itinerary']).then(([saved, itinerary]) => {
      if (saved[1]) setSavedIds(JSON.parse(saved[1]));
      if (itinerary[1]) setItineraryIds(JSON.parse(itinerary[1]));
    });
  }, []);

  const toggleSaved = (id: string) => {
    Haptics.selectionAsync();
    setSavedIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      AsyncStorage.setItem('dubai-saved', JSON.stringify(next));
      return next;
    });
  };

  const addToItinerary = (id: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setItineraryIds((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      AsyncStorage.setItem('dubai-itinerary', JSON.stringify(next));
      return next;
    });
  };

  const removeFromItinerary = (id: string) => {
    setItineraryIds((current) => {
      const next = current.filter((item) => item !== id);
      AsyncStorage.setItem('dubai-itinerary', JSON.stringify(next));
      return next;
    });
  };

  return (
    <ExperienceContext.Provider value={{ savedIds, itineraryIds, toggleSaved, addToItinerary, removeFromItinerary }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperiences() {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error('useExperiences must be used within ExperienceProvider');
  return value;
}