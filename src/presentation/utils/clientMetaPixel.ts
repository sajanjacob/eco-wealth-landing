import axios from 'axios';
import { MetaPixelEventData } from './metaPixel';

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