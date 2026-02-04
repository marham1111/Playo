import { databases } from '@/lib/appwrite';
import { UserProfile } from '@/types/profile';
import { Permission, Role } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '12';
const PROFILES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID || 'profiles';

export class ProfilesService {
  /**
   * Filter out undefined values and convert empty strings to null
   * Appwrite doesn't accept undefined values, and some fields may not accept empty strings
   */
  private static cleanProfileData(data: Record<string, any>): Record<string, any> {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      // Skip undefined values (Appwrite doesn't accept them)
      if (value !== undefined) {
        // Convert empty strings to null for optional fields (Appwrite may prefer null over empty strings)
        if (value === '' && key !== 'fullName' && key !== 'accountStatus') {
          // Keep empty strings for required fields, convert to null for optional ones
          cleaned[key] = null;
        } else {
          cleaned[key] = value;
        }
      }
    }
    return cleaned;
  }

  private static buildProfileData(
    fullName: string,
    selectedSports: string[],
    selectedSkill: string,
    selectedAvatar: string,
    selectedCity: string,
    bio: string
  ) {
    // Build profile data with ONLY the onboarding fields we're collecting
    // Store only: sports, skill, avatar (profileImageUrl), city (preferences), bio
    const data: Record<string, any> = {
      // Required fields for Appwrite
      fullName,
      accountStatus: 'active',
      followerCount: 0,
      followingCount: 0,
      isVerified: false,
      
      // Onboarding fields - ONLY what we collect from the form
      sports: selectedSports.length > 0 ? selectedSports : undefined, // sports[] enum array
      skill: selectedSkill || undefined, // Skill level: beginner, intermediate, advanced, pro
      profileImageUrl: selectedAvatar || undefined, // Avatar emoji stored as profileImageUrl
      preferences: selectedCity ? `city:${selectedCity}` : undefined, // City stored in preferences
      bio: bio || undefined, // User's bio
      
      // Minimal required fields
      nickname: fullName || undefined,
      lastActive: new Date().toISOString(),
    };
    
    // Note: We're ONLY storing the onboarding fields:
    // - sports (from Step 1)
    // - skill (from Step 1) 
    // - profileImageUrl/avatar (from Step 1)
    // - preferences/city (from Step 2)
    // - bio (from Step 2)
    // 
    // We're NOT storing: interests, education, ethnicity, favoriteQuote, etc.
    
    // Clean out undefined values
    return this.cleanProfileData(data);
  }

  /**
   * Ensure profile exists for user. Creates one if missing.
   */
  static async ensureProfile(
    userId: string,
    fullName: string,
    selectedSports: string[],
    selectedSkill: string,
    selectedAvatar: string,
    selectedCity: string,
    bio: string
  ): Promise<UserProfile> {
    const profileData = this.buildProfileData(
      fullName,
      selectedSports,
      selectedSkill,
      selectedAvatar,
      selectedCity,
      bio
    );
    try {
      // Try to update existing profile with the latest onboarding answers
      await this.getProfile(userId);
      return await this.updateProfile(userId, profileData);
    } catch (error) {
      // Profile doesn't exist, create new one
      return await this.createProfile(userId, profileData);
    }
  }

  /**
   * Create a new profile for user with all valid fields from Appwrite schema
   * The profileData should already be cleaned and mapped by buildProfileData()
   */
  static async createProfile(
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<UserProfile> {
    try {
      console.log('🔄 Creating profile for user:', userId);

      // profileData is already cleaned and mapped by buildProfileData()
      // Just ensure required fields are present
      const safeProfileData: Record<string, any> = {
        fullName: profileData.fullName || '',
        accountStatus: profileData.accountStatus || 'active',
        followerCount: profileData.followerCount ?? 0,
        followingCount: profileData.followingCount ?? 0,
        isVerified: profileData.isVerified ?? false,
      };

      // Copy only valid fields from profileData, explicitly excluding problematic ones
      // This prevents membershipLevel and other unwanted fields from being included
      const fieldsToExclude = ['completed', 'city', 'avatarUrl', 'membershipLevel'];
      for (const [key, value] of Object.entries(profileData)) {
        // Skip fields that don't exist in schema or cause issues
        // NOTE: skill is included - you need to add it to your Appwrite schema!
        if (!fieldsToExclude.includes(key) && value !== undefined) {
          safeProfileData[key] = value;
        }
      }

      // Explicitly remove unwanted fields as a safety check
      delete safeProfileData.membershipLevel;
      delete safeProfileData.completed;
      delete safeProfileData.city;
      delete safeProfileData.avatarUrl;
      
      // Log to verify membershipLevel is not present
      if ('membershipLevel' in safeProfileData) {
        console.warn('⚠️ WARNING: membershipLevel was found in safeProfileData and will be removed!');
        delete safeProfileData.membershipLevel;
      }

      // Clean out any undefined values and convert empty strings to null
      const cleanedData = this.cleanProfileData(safeProfileData);

      console.log('📋 Profile data (cleaned):', JSON.stringify(cleanedData, null, 2));

      // Create with explicit permissions
      const permissions = [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ];

      console.log('✅ Permissions:', permissions);

      const response = await databases.createDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId,
        cleanedData,
        permissions
      );

      console.log('✅ Profile created successfully:', response.$id);
      return response as unknown as UserProfile;
    } catch (error: any) {
      console.error('❌ Profile creation error:', error);
      console.error('Error details:', {
        message: error.message,
        type: error.type,
        code: error.code,
        status: error.status,
      });
      
      // Extract error details from message
      const unknownAttrMatch = error.message?.match(/Unknown attribute:\s*"([^"]+)"/);
      const enumFormatMatch = error.message?.match(/Attribute\s+"([^"]+)"\s+has invalid format[^.]*Value must be one of\s+\(([^)]+)\)/);
      const invalidFormatMatch = error.message?.match(/Attribute\s+"([^"]+)"\s+has invalid format/);
      
      if (enumFormatMatch) {
        const attrName = enumFormatMatch[1];
        const validValues = enumFormatMatch[2];
        console.error(`⚠️ Enum format error for "${attrName}"`);
        console.error(`   Valid values are: ${validValues}`);
        console.error(`   Current value in code may be invalid.`);
      } else if (invalidFormatMatch) {
        const attrName = invalidFormatMatch[1];
        console.error(`⚠️ Invalid format for attribute: "${attrName}"`);
        console.error(`   Check the data type and format requirements.`);
      } else if (unknownAttrMatch) {
        const unknownAttr = unknownAttrMatch[1];
        console.error(`⚠️ Unknown attribute detected: "${unknownAttr}" - This field doesn't exist in your Appwrite schema.`);
        console.error(`💡 Please check your Appwrite Console and either:`);
        console.error(`   1. Add "${unknownAttr}" attribute to the profiles collection, OR`);
        console.error(`   2. Remove "${unknownAttr}" from the profile data being sent.`);
      }
      
      throw new Error(`Failed to create profile: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Get user's profile
   */
  static async getProfile(userId: string): Promise<UserProfile> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId
      );
      return response as unknown as UserProfile;
    } catch (error: any) {
      throw new Error(`Failed to get profile: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Update user's profile (called during onboarding steps and profile edits)
   */
  static async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      // Clean the data to remove undefined values
      const cleanedData = this.cleanProfileData(data as Record<string, any>);
      
      // Only remove fields that truly don't exist in schema
      // Keep all valid fields: sports, skill, bio, profileImageUrl, nickname, lastActive, etc.
      delete cleanedData.completed; // Doesn't exist
      delete cleanedData.city; // Doesn't exist in schema (using preferences instead)
      delete cleanedData.avatarUrl; // Doesn't exist in schema (using profileImageUrl instead)
      delete cleanedData.membershipLevel; // Removed - not using this attribute
      // NOTE: skill is kept - make sure it exists in your Appwrite schema!
      
      // All other fields (sports, bio, profileImageUrl, nickname, lastActive, etc.) are valid
      // and should be kept for update
      
      console.log('📝 Updating profile:', userId, 'with data:', cleanedData);
      
      const response = await databases.updateDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId,
        cleanedData
      );
      
      console.log('✅ Profile updated successfully');
      return response as unknown as UserProfile;
    } catch (error: any) {
      const unknownAttrMatch = error.message?.match(/Unknown attribute:\s*"([^"]+)"/);
      if (unknownAttrMatch) {
        const unknownAttr = unknownAttrMatch[1];
        console.error(`⚠️ Unknown attribute: "${unknownAttr}" - Remove this field from updates.`);
      }
      throw new Error(`Failed to update profile: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Mark profile as completed (called after final onboarding step)
   * Note: Profile completion is determined by presence of required fields, not a boolean flag
   */
  static async completeProfile(userId: string): Promise<UserProfile> {
    try {
      // Profile is considered complete when all required fields are present
      // No need to update a 'completed' field as it doesn't exist in schema
      const profile = await this.getProfile(userId);
      return profile;
    } catch (error: any) {
      throw new Error(`Failed to complete profile: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Update profile with onboarding answers
   * Maps form data to correct schema attributes
   */
  static async updateOnboardingAnswers(
    userId: string,
    answers: {
      sports: string[];
      skill: string;
      avatarUrl: string;
      city: string;
      bio?: string;
    }
  ): Promise<UserProfile> {
    try {
      // Map form data to actual schema fields
      const updateData: Record<string, any> = {
        sports: answers.sports, // sports[] enum array
        profileImageUrl: answers.avatarUrl, // Map avatarUrl to profileImageUrl
        preferences: answers.city ? `city:${answers.city}` : undefined, // Store city in preferences
      };
      
      if (answers.bio !== undefined) {
        updateData.bio = answers.bio || '';
      }
      
      // Note: skill field doesn't exist in schema, so we skip it
      // If you need to store skill level, add it to Appwrite schema or use another field

      const cleanedData = this.cleanProfileData(updateData);
      console.log('📝 Updating profile:', userId, 'with data:', cleanedData);

      const response = await databases.updateDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId,
        cleanedData
      );

      console.log('✅ Profile updated successfully');
      return response as unknown as UserProfile;
    } catch (error: any) {
      console.error('❌ Update onboarding error:', error);
      
      // Extract the unknown attribute name from error message if possible
      const unknownAttrMatch = error.message?.match(/Unknown attribute:\s*"([^"]+)"/);
      if (unknownAttrMatch) {
        const unknownAttr = unknownAttrMatch[1];
        console.error(`⚠️ Unknown attribute detected: "${unknownAttr}"`);
      }
      
      throw new Error(`Failed to update onboarding answers: ${error?.message || 'Unknown error'}`);
    }
  }
}

export default ProfilesService;
