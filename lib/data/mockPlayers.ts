/**
 * Mock data for players
 * This file contains sample player data for development and testing
 */

export interface Player {
  id: string;
  name: string;
  sport: string;
  skillLevel: string;
  distance: string;
  avatar?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
}

/**
 * Mock nearby players for Find Players screen
 */
export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Ali Khan',
    sport: '⚽️ Futsal',
    skillLevel: 'Intermediate',
    distance: '1.2 km away',
  },
  {
    id: '2',
    name: 'Sara Ahmed',
    sport: '🎾 Tennis',
    skillLevel: 'Advanced',
    distance: '2.5 km away',
  },
  {
    id: '3',
    name: 'Usman Tariq',
    sport: '🏏 Cricket',
    skillLevel: 'Pro',
    distance: '3.8 km away',
  },
  {
    id: '4',
    name: 'Fatima Malik',
    sport: '🏸 Badminton',
    skillLevel: 'Intermediate',
    distance: '0.8 km away',
  },
];

/**
 * Mock friends list for Find Players screen
 */
export const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Hamza Ali',
  },
  {
    id: '2',
    name: 'Ayesha Khan',
  },
];
