import axios from 'axios';
import { MetaPixelEventData } from './metaPixel';

const ENABLE_CONVERSION_API = process.env.NEXT_PUBLIC_ENABLE_META_CONVERSION_API === 'true';

export const sendClientEvent = async (eventData: MetaPixelEventData, accessToken: string, pixelId: string) => {
  if (!ENABLE_CONVERSION_API) {
    console.log('Meta Pixel - Conversion API disabled, skipping client-side event');
    return;
  }

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      eventData,
      {
        params: {
          access_token: accessToken
        }
      }
    );
    console.log('Meta Pixel - Event sent successfully:', response.data);
  } catch (error) {
    console.error('Meta Pixel - Error sending event:', error);
  }
}; 