/**
 * Image Upload Utilities
 * Handles profile picture and image uploads to Appwrite Storage
 * 
 * TODO: Install expo-image-picker package
 * Run: npx expo install expo-image-picker
 * Then uncomment the ImagePicker import and related code
 */

// import * as ImagePicker from 'expo-image-picker';

const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID || 'default';

export interface UploadResult {
  success: boolean;
  fileId?: string;
  url?: string;
  error?: string;
}

/**
 * Request camera and media library permissions
 * TODO: Uncomment when expo-image-picker is installed
 */
export const requestMediaPermissions = async (): Promise<boolean> => {
  // const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  // const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  // return cameraPermission.status === 'granted' && mediaPermission.status === 'granted';
  
  console.warn('expo-image-picker not installed. Install with: npx expo install expo-image-picker');
  return false;
};

/**
 * Pick an image from the device library
 * TODO: Uncomment when expo-image-picker is installed
 */
export const pickImage = async (): Promise<string | null> => {
  try {
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 0.8,
    // });
    // if (!result.canceled && result.assets[0]) {
    //   return result.assets[0].uri;
    // }
    
    console.warn('expo-image-picker not installed');
    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    return null;
  }
};

/**
 * Take a photo with the camera
 * TODO: Uncomment when expo-image-picker is installed
 */
export const takePhoto = async (): Promise<string | null> => {
  try {
    // const result = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 0.8,
    // });
    // if (!result.canceled && result.assets[0]) {
    //   return result.assets[0].uri;
    // }
    
    console.warn('expo-image-picker not installed');
    return null;
  } catch (error) {
    console.error('Error taking photo:', error);
    return null;
  }
};

/**
 * Upload image to Appwrite Storage
 * TODO: Implement when Appwrite Storage SDK is configured
 */
export const uploadImage = async (
  imageUri: string,
  userId: string
): Promise<UploadResult> => {
  try {
    // TODO: Implement Appwrite Storage upload
    // Currently Appwrite Storage SDK is not fully configured
    
    // const file = {
    //   name: `profile_${userId}_${Date.now()}.jpg`,
    //   type: 'image/jpeg',
    //   uri: imageUri,
    // };
    
    // const response = await storage.createFile(
    //   BUCKET_ID,
    //   ID.unique(),
    //   file
    // );
    
    // const fileUrl = storage.getFileView(BUCKET_ID, response.$id);
    
    // return {
    //   success: true,
    //   fileId: response.$id,
    //   url: fileUrl,
    // };

    // Mock response for now
    return {
      success: true,
      fileId: `mock_${Date.now()}`,
      url: imageUri,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image',
    };
  }
};

/**
 * Delete an image from Appwrite Storage
 */
export const deleteImage = async (fileId: string): Promise<boolean> => {
  try {
    // TODO: Implement when Appwrite Storage SDK is configured
    // await storage.deleteFile(BUCKET_ID, fileId);
    
    // Mock response for now
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

/**
 * Get image URL from Appwrite Storage
 */
export const getImageUrl = (fileId: string): string => {
  // TODO: Implement when Appwrite Storage SDK is configured
  // return storage.getFileView(BUCKET_ID, fileId).toString();
  
  // Return placeholder for now
    return `https://via.placeholder.com/150?text=${fileId}`;
};

/**
 * Compress image before upload
 */
export const compressImage = async (imageUri: string): Promise<string> => {
  try {
    // TODO: Implement image compression using expo-image-manipulator
    // const manipResult = await manipulateAsync(
    //   imageUri,
    //   [{ resize: { width: 500 } }],
    //   { compress: 0.7, format: SaveFormat.JPEG }
    // );
    // return manipResult.uri;
    
    return imageUri;
  } catch (error) {
    console.error('Error compressing image:', error);
    return imageUri;
  }
};
