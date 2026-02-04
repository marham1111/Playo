/**
 * Form validation utilities
 * Provides validation functions for email, password, and other inputs
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};

/**
 * Validate name (full name or username)
 */
export const validateName = (name: string): ValidationResult => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (trimmedName.length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  
  return { isValid: true };
};

/**
 * Validate OTP code
 */
export const validateOTP = (otp: string): ValidationResult => {
  if (!otp) {
    return { isValid: false, error: 'OTP is required' };
  }
  
  if (otp.length !== 6) {
    return { isValid: false, error: 'OTP must be 6 digits' };
  }
  
  if (!/^\d{6}$/.test(otp)) {
    return { isValid: false, error: 'OTP must contain only numbers' };
  }
  
  return { isValid: true };
};

/**
 * Validate phone number (Pakistani format)
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
  const trimmedPhone = phone.trim();
  
  if (!trimmedPhone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Pakistani phone format: 03XX-XXXXXXX or +92-3XX-XXXXXXX
  const phoneRegex = /^(\+92|0)?3\d{2}-?\d{7}$/;
  
  if (!phoneRegex.test(trimmedPhone)) {
    return { isValid: false, error: 'Please enter a valid Pakistani phone number' };
  }
  
  return { isValid: true };
};

/**
 * Validate bio text
 */
export const validateBio = (bio: string): ValidationResult => {
  if (bio.length > 200) {
    return { isValid: false, error: 'Bio must be less than 200 characters' };
  }
  
  return { isValid: true };
};

/**
 * Parse city from preferences string
 * Preferences format: "city:CityName"
 */
export const parseCityFromPreferences = (preferences?: string): string | undefined => {
  if (!preferences) return undefined;
  
  const cityMatch = preferences.match(/city:([^;]+)/);
  return cityMatch ? cityMatch[1].trim() : undefined;
};

/**
 * Format sport name for display
 * Converts sport IDs like "badminton" to proper case "Badminton"
 */
export const formatSportName = (sportId: string): string => {
  return sportId.charAt(0).toUpperCase() + sportId.slice(1);
};

/**
 * Format skill level for display
 * Converts "beginner" to "Beginner"
 */
export const formatSkillLevel = (skill?: string): string => {
  if (!skill) return 'Not specified';
  return skill.charAt(0).toUpperCase() + skill.slice(1);
};
