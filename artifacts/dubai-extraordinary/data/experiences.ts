import type { Experience } from '@/context/ExperienceContext';

export const experiences: Experience[] = [
  {
    id: 'burj',
    title: 'Burj Khalifa',
    subtitle: 'At the Top · sunset access',
    location: 'Downtown Dubai',
    category: 'Iconic',
    rating: '4.9',
    image: require('@/assets/images/hero-dubai.jpg'),
    price: 'From AED 179',
    accent: '#D9B77A',
  },
  {
    id: 'desert',
    title: 'Desert afterglow',
    subtitle: 'Private dunes · dinner under stars',
    location: 'Al Marmoom',
    category: 'Adventure',
    rating: '4.8',
    image: require('@/assets/images/desert-experience.jpg'),
    price: 'From AED 285',
    accent: '#E7A96D',
  },
  {
    id: 'marina',
    title: 'Marina by moonlight',
    subtitle: 'Yacht evening · skyline views',
    location: 'Dubai Marina',
    category: 'Luxury',
    rating: '4.9',
    image: require('@/assets/images/marina-experience.jpg'),
    price: 'From AED 420',
    accent: '#8EC5D6',
  },
  {
    id: 'future',
    title: 'Museum of the Future',
    subtitle: 'Tomorrow, beautifully imagined',
    location: 'Emirates Towers',
    category: 'Culture',
    rating: '4.7',
    image: require('@/assets/images/hero-dubai.jpg'),
    price: 'From AED 149',
    accent: '#C8A3DF',
  },
];

export const categories = [
  { label: 'Stay', icon: 'bed-outline' as const },
  { label: 'Eat', icon: 'restaurant-outline' as const },
  { label: 'Shop', icon: 'bag-handle-outline' as const },
  { label: 'Explore', icon: 'compass-outline' as const },
  { label: 'Events', icon: 'calendar-outline' as const },
];