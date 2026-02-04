/**
 * Mock data for messages and conversations
 * This file contains sample conversation data for development and testing
 */

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
}

/**
 * Mock conversations for Messages screen
 */
export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Ali Khan',
    lastMessage: 'See you at the game tomorrow! 🎾',
    timestamp: '2m ago',
    unread: true,
  },
  {
    id: '2',
    name: 'Sports Complex Group',
    lastMessage: 'Who\'s coming for futsal tonight?',
    timestamp: '1h ago',
  },
  {
    id: '3',
    name: 'Sara Ahmed',
    lastMessage: 'Great match today! Same time next week?',
    timestamp: '3h ago',
  },
  {
    id: '4',
    name: 'Weekend Warriors',
    lastMessage: 'Match postponed to Sunday 5 PM',
    timestamp: 'Yesterday',
  },
];
