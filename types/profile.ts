export interface UserProfile {
  $id: string;
  fullName: string;
  accountStatus: string;
  followerCount: number;
  followingCount: number;
  isVerified: boolean;
  bio?: string;
  sports?: string[];
  skill?: string;
  city?: string;
  completed?: boolean;
  avatarUrl?: string;
  experience?: number;
  gender?: string;
  interests?: string;
  profileImageUrl?: string;
  timezone?: string;
  languagesSpoken?: string;
  membershipLevel?: string;
  loginStreakDays?: number;
  profileCompletionPercentage?: number;
  nickname?: string;
  education?: string;
  ethnicity?: string;
  favoriteQuote?: string;
  premiumMembershipEndDate?: string;
  location?: any;
  birthdate?: string;
  socialLinks?: string;
  preferences?: string;
  lastActive?: string;
  $createdAt?: string;
  $updatedAt?: string;
}


export const SPORTS = [
  { id: 'tennis', name: 'Tennis', emoji: '🎾' },
  { id: 'badminton', name: 'Badminton', emoji: '🏸' },
  { id: 'cricket', name: 'Cricket', emoji: '🏏' },
  { id: 'futsal', name: 'Futsal', emoji: '⚽' },
];

export const SKILL_LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'Just starting out' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Play regularly' },
  { id: 'advanced', label: 'Advanced', desc: 'Competitive player' },
  { id: 'pro', label: 'Pro', desc: 'Professional level' },
];

export const AVATARS = [
  { id: 'avatar1', emoji: '🧑', label: 'Person' },
  { id: 'avatar2', emoji: '👨', label: 'Man' },
  { id: 'avatar3', emoji: '👩', label: 'Woman' },
  { id: 'avatar4', emoji: '🧔', label: 'Bearded' },
  { id: 'avatar5', emoji: '👤', label: 'Profile' },
];

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Gujranwala',
  'Sialkot',
  'Mardan',
];
