import { Models } from 'react-native-appwrite';
import { account, ID } from './appwrite';

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

class AuthService {
  // 🎯 Sign Up with Email/Password
  async createAccount({ email, password, name }: CreateUserParams) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!newAccount) throw new Error('Failed to create account');

      return newAccount;
    } catch (error: any) {
      // Handle duplicate account
      if (error.code === 409 || error.message?.includes('already exists')) {
        throw new Error('ACCOUNT_EXISTS');
      }
      throw new Error(error.message || 'Failed to create account');
    }
  }

  // 🔐 Login with Email/Password
  async login({ email, password }: LoginParams) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login');
    }
  }

  // ✉️ Send OTP to Email (for verification or login)
  async createEmailToken(email: string) {
    try {
      const token = await account.createEmailToken(ID.unique(), email);
      return token;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  }

  // ✅ Verify OTP and Create Session
  async verifyEmailToken(userId: string, secret: string) {
    try {
      const session = await account.createSession(userId, secret);
      return session;
    } catch (error: any) {
      throw new Error(error.message || 'Invalid or expired OTP');
    }
  }

  //  Get Current User
  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      const currentUser = await account.get();
      return currentUser;
    } catch (error) {
      return null;
    }
  }

  // 🚪 Logout (Delete Current Session)
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to logout');
    }
  }

  // 🗑️ Delete All Sessions
  async deleteAllSessions() {
    try {
      await account.deleteSessions();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete sessions');
    }
  }

  // 🗑️ Delete Current Account
  async deleteAccount() {
    try {
      await account.deleteIdentity('current');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete account');
    }
  }

  // 🔑 Update Password
  async updatePassword(oldPassword: string, newPassword: string) {
    try {
      await account.updatePassword(newPassword, oldPassword);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update password');
    }
  }

  // 📧 Send Password Recovery Email
  async resetPassword(email: string) {
    try {
      await account.createRecovery(
        email,
        'https://playo.io/reset-password'
      );
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send recovery email');
    }
  }

  // 🔍 Check if Email is Verified
  async isEmailVerified(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return user?.emailVerification || false;
    } catch (error) {
      return false;
    }
  }

  // 🔄 Handle Duplicate Account (Delete & Recreate)
  async handleDuplicateAccount(email: string) {
    try {
      // Delete all sessions first
      await this.deleteAllSessions();
      // Then delete the account
      await this.deleteAccount();
      return true;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to handle duplicate account');
    }
  }
}

export default new AuthService();
