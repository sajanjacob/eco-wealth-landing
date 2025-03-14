export interface CreateContactDTO {
  name: string;
  email: string;
  number?: string;
  platform_source?: string;
  campaign_source?: string;
} 