import { Account, Client, Databases, ID } from 'react-native-appwrite';

const client = new Client();

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '';

try {
  client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setPlatform('io.playo.app');
} catch (error) {
  // Silently handle initialization errors
}

export const account = new Account(client);
export const databases = new Databases(client);

export { ID };
export default client;
