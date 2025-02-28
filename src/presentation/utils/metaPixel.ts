import axios from 'axios';

const ENABLE_CONVERSION_API = process.env.NEXT_PUBLIC_ENABLE_META_CONVERSION_API === 'true';

// Replace Node's crypto with Web Crypto API
async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface ViewContentData {
  clientIp: string;
  userAgent: string;
}

interface UserData extends ViewContentData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

interface LeadData extends UserData {
  email: string;
}

const hasUserConsent = (isMiddleware = false): boolean => {
  console.log('checking consent... isMiddleware:', isMiddleware);
  
  // Skip consent check for middleware events since they're just collecting basic data
  if (isMiddleware) return true;
  
  // Client-side consent check
  if (typeof window === 'undefined') return false;
  const consent = localStorage.getItem('cookieConsent') === 'true';
  console.log('Meta Pixel - User consent status:', consent);
  return consent;
};

const sendEvent = async (eventData: any, accessToken: string, pixelId: string) => {
  if (!ENABLE_CONVERSION_API) {
    console.log('Meta Pixel - Conversion API disabled, skipping server-side event');
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

export const sendRegistrationEvent = async (userData: UserData) => {
  if (!hasUserConsent()) {
    console.log('Meta Pixel - Registration event skipped: No user consent');
    return;
  }
  
  const accessToken = process.env.META_PIXEL_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;

  if (!accessToken || !pixelId) {
    console.error('Meta Pixel - Missing configuration:', { hasAccessToken: !!accessToken, hasPixelId: !!pixelId });
    return;
  }

  const eventData = {
    data: [{
      event_name: 'CompleteRegistration',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        client_ip_address: userData.clientIp,
        client_user_agent: userData.userAgent,
        em: userData.email ? [await hashData(userData.email)] : [],
        ph: userData.phone ? [await hashData(userData.phone)] : [],
        fn: userData.firstName ? [await hashData(userData.firstName)] : [],
        ln: userData.lastName ? [await hashData(userData.lastName)] : []
      },
      custom_data: {
        currency: 'USD',
        value: '0.00'
      }
    }]
  };

  console.log('Meta Pixel - Sending registration event:', {
    pixelId,
    eventName: 'CompleteRegistration',
    hasUserData: {
      email: !!userData.email,
      phone: !!userData.phone,
      firstName: !!userData.firstName,
      lastName: !!userData.lastName,
      clientIp: !!userData.clientIp,
      userAgent: !!userData.userAgent
    }
  });

  await sendEvent(eventData, accessToken, pixelId);
};

export const sendViewContentEvent = async (viewData: ViewContentData, isMiddleware = false) => {
  if (!hasUserConsent(isMiddleware)) {
    console.log('Meta Pixel - View content event skipped: No user consent');
    return;
  }
  
  const accessToken = process.env.META_PIXEL_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;

  if (!accessToken || !pixelId) {
    console.error('Meta Pixel - Missing configuration:', { hasAccessToken: !!accessToken, hasPixelId: !!pixelId });
    return;
  }

  console.log('Meta Pixel - Sending view content event:', {
    pixelId,
    eventName: 'ViewContent',
    hasUserData: {
      clientIp: !!viewData.clientIp,
      userAgent: !!viewData.userAgent
    }
  });

  const eventData = {
    data: [{
      event_name: 'ViewContent',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        client_ip_address: viewData.clientIp,
        client_user_agent: viewData.userAgent,
      }
    }]
  };

  await sendEvent(eventData, accessToken, pixelId);
};

export const sendInitiateCheckoutEvent = async (viewData: ViewContentData, isMiddleware = false) => {
  if (!hasUserConsent(isMiddleware)) {
    console.log('Meta Pixel - Initiate checkout event skipped: No user consent');
    return;
  }
  
  const accessToken = process.env.META_PIXEL_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;

  if (!accessToken || !pixelId) {
    console.error('Meta Pixel - Missing configuration:', { hasAccessToken: !!accessToken, hasPixelId: !!pixelId });
    return;
  }

  console.log('Meta Pixel - Sending initiate checkout event:', {
    pixelId,
    eventName: 'InitiateCheckout',
    hasUserData: {
      clientIp: !!viewData.clientIp,
      userAgent: !!viewData.userAgent
    }
  });

  const eventData = {
    data: [{
      event_name: 'InitiateCheckout',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        client_ip_address: viewData.clientIp,
        client_user_agent: viewData.userAgent,
      },
      custom_data: {
        currency: 'USD',
        value: '142.52'
      }
    }]
  };

  await sendEvent(eventData, accessToken, pixelId);
};

export const sendLeadEvent = async (leadData: LeadData) => {
  const accessToken = process.env.META_PIXEL_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;

  if (!accessToken || !pixelId) {
    console.error('Missing Meta Pixel configuration');
    return;
  }

  const eventData = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        client_ip_address: leadData.clientIp,
        client_user_agent: leadData.userAgent,
        em: [await hashData(leadData.email)],
        fn: leadData.firstName ? [await hashData(leadData.firstName)] : [],
        ln: leadData.lastName ? [await hashData(leadData.lastName)] : [],
        ph: leadData.phone ? [await hashData(leadData.phone)] : []
      },
      custom_data: {
        currency: 'USD',
        value: '142.52'
      }
    }]
  };

  await sendEvent(eventData, accessToken, pixelId);
}; 