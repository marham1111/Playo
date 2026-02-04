import { ProfilesService } from '@/lib/api/profiles';
import { account } from '@/lib/appwrite';
import authService from '@/lib/auth';
import { UserProfile } from '@/types/profile';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  profileCompleted: boolean;
  profileData: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<{ userId: string; email: string }>;
  logout: () => Promise<void>;
  sendOTP: (email: string) => Promise<{ userId: string; email: string }>;
  verifyOTP: (userId: string, secret: string) => Promise<void>;
  resendOTP: (email: string) => Promise<{ userId: string; email: string }>;
  resetPassword: (email: string) => Promise<void>;
  verifyOTPAndResetPassword: (userId: string, secret: string, newPassword: string) => Promise<void>;
  handleDuplicateAccount: (email: string) => Promise<void>;
  fetchUserProfile: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser.$id);
      }
    } catch (error) {
      setUser(null);
      setProfileData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const profile = await ProfilesService.getProfile(userId);
      setProfileData(profile);
    } catch (error) {
      // Profile might not exist yet (new user)
      setProfileData(null);
    }
  };


  // 🔐 Login with Email/Password
  const login = async (email: string, password: string) => {
    try {
      await authService.login({ email, password });
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser.$id);
      }
    } catch (error) {
      throw error;
    }
  };

  // 🎯 Sign Up (returns userId and email for OTP verification)
  const signup = async (email: string, password: string, name: string) => {
    try {
      const newAccount = await authService.createAccount({ email, password, name });
      
      // Send OTP for email verification
      const token = await authService.createEmailToken(email);
      
      return {
        userId: token.userId,
        email: email,
      };
    } catch (error: any) {
      if (error.message === 'ACCOUNT_EXISTS') {
        throw new Error('An account with this email already exists. Please login or use "Login with OTP".');
      }
      throw error;
    }
  };

  // ✉️ Send OTP to Email (for passwordless login)
  const sendOTP = async (email: string) => {
    try {
      const token = await authService.createEmailToken(email);
      return {
        userId: token.userId,
        email: email,
      };
    } catch (error) {
      throw error;
    }
  };

  // ✅ Verify OTP and Create Session
  const verifyOTP = async (userId: string, secret: string) => {
    try {
      await authService.verifyEmailToken(userId, secret);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser.$id);
      }
    } catch (error) {
      throw error;
    }
  };

  // 🔄 Resend OTP
  const resendOTP = async (email: string) => {
    try {
      const token = await authService.createEmailToken(email);
      return {
        userId: token.userId,
        email: email,
      };
    } catch (error) {
      throw error;
    }
  };

  // � Reset Password
  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };
  // 🔑 Verify OTP and Reset Password
  const verifyOTPAndResetPassword = async (userId: string, secret: string, newPassword: string) => {
    try {
      // Create session with OTP
      await authService.verifyEmailToken(userId, secret);
      
      // If newPassword is empty, just verify OTP and return (for two-step flow)
      if (!newPassword) {
        return;
      }
      
      // Get current user
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Failed to authenticate');
      }
      
      // Update password using the account method (no old password needed after OTP verification)
      try {
        await account.updatePassword(newPassword);
      } catch (error: any) {
        // If updatePassword doesn't work without old password, logout and require login
        throw new Error('Password reset requires re-authentication. Please login with OTP again.');
      }
      
      // Logout after password reset
      await authService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };
  // �🗑️ Handle Duplicate Account
  const handleDuplicateAccount = async (email: string) => {
    try {
      await authService.handleDuplicateAccount(email);
    } catch (error) {
      throw error;
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setProfileData(null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    // Check for actual schema fields: sports[], profileImageUrl, and preferences (where city is stored)
    profileCompleted: !!(
      profileData?.sports && 
      profileData.sports.length > 0 && 
      profileData?.profileImageUrl && 
      profileData?.preferences // City is stored in preferences as "city:CityName"
    ),
    profileData,
    login,
    signup,
    logout,
    sendOTP,
    verifyOTP,
    resendOTP,
    resetPassword,
    verifyOTPAndResetPassword,
    handleDuplicateAccount,
    fetchUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
