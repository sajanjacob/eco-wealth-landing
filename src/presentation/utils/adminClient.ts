import axios from 'axios';
import { CreateContactDTO } from '../../types/contact';

const ADMIN_APP_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_ADMIN_APP_PROD_URL 
  : process.env.NEXT_PUBLIC_ADMIN_APP_DEV_URL;

export const createContact = async (contactData: CreateContactDTO) => {
  try {
    const response = await axios.post(
      `${ADMIN_APP_URL}/api/contacts`,
      contactData,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY
        }
    });

    console.log('Admin contact created:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating admin contact:', error.response?.data);
      throw new Error(error.response?.data?.error || 'Failed to create contact');
    }
    throw error;
  }
}; 