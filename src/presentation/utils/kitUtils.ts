import axios from 'axios';

export async function getKitAuthToken() {
  try {
    const response = await axios.get(
      'https://api.kit.com/v4/account',
      {
        headers: {
          'Accept': 'application/json',
          'X-Kit-Api-Key': process.env.NEXT_PUBLIC_KIT_API_KEY
        }
      }
    );
    
    // Extract and return the authentication token from the response
    if (response.data && response.data.token) {
      return response.data.token;
    }
    
    throw new Error('No authentication token found in Kit response');
  } catch (error) {
    console.error('Error getting Kit authentication token:', error);
    throw error;
  }
} 