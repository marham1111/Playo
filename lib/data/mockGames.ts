/**
 * Mock data for games
 * This file contains sample game data for development and testing
 */

export interface Game {
  id: string;
  title: string;
  sport: string;
  host: string;
  location: string;
  date: string;
  time: string;
  slots: {
    filled: number;
    total: number;
  };
  skillLevel: string;
  price?: string;
}

export interface UpcomingGame {
  id: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  players: number;
  maxPlayers: number;
}

/**
 * Mock games for Explore screen
 */
export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Friday Night Futsal',
    sport: '⚽️',
    host: 'Ali Khan',
    location: 'Sports Complex, Gulberg',
    date: 'Jan 24, 2026',
    time: '7:00 PM',
    slots: { filled: 8, total: 12 },
    skillLevel: 'Intermediate',
    price: 'PKR 500/player',
  },
  {
    id: '2',
    title: 'Morning Tennis Match',
    sport: '🎾',
    host: 'Sarah Ahmed',
    location: 'Gymkhana Club',
    date: 'Jan 20, 2026',
    time: '8:00 AM',
    slots: { filled: 2, total: 4 },
    skillLevel: 'Advanced',
  },
  {
    id: '3',
    title: 'Weekend Cricket',
    sport: '🏏',
    host: 'Usman Tariq',
    location: 'DHA Ground',
    date: 'Jan 25, 2026',
    time: '4:00 PM',
    slots: { filled: 15, total: 22 },
    skillLevel: 'All Levels',
    price: 'PKR 300/player',
  },
  {
    id: '4',
    title: 'Badminton Tournament',
    sport: '🏸',
    host: 'Fatima Malik',
    location: 'Nishat Sports Arena',
    date: 'Jan 22, 2026',
    time: '6:00 PM',
    slots: { filled: 12, total: 16 },
    skillLevel: 'Intermediate',
    price: 'PKR 400/player',
  },
  {
    id: '5',
    title: 'Sunday Futsal League',
    sport: '⚽️',
    host: 'Ahmed Raza',
    location: 'MM Alam Sports',
    date: 'Jan 26, 2026',
    time: '5:00 PM',
    slots: { filled: 10, total: 14 },
    skillLevel: 'Beginner',
    price: 'PKR 350/player',
  },
];

/**
 * Mock upcoming games for Home screen
 */
export const mockUpcomingGames: UpcomingGame[] = [
  {
    id: '1',
    sport: 'Futsal',
    location: 'Sports Complex, Gulberg',
    date: 'Jan 24',
    time: '7:00 PM',
    players: 8,
    maxPlayers: 12,
  },
  {
    id: '2',
    sport: 'Tennis',
    location: 'Gymkhana Club',
    date: 'Jan 20',
    time: '8:00 AM',
    players: 2,
    maxPlayers: 4,
  },
];

/**
 * Mock user stats for Home/Profile screens
 */
export const mockUserStats = {
  gamesPlayed: 12,
  wins: 8,
  rating: 4.8,
  reliability: 95,
  sports: 4,
};
