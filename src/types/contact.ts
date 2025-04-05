export interface CreateContactDTO {
  name: string;
  email: string;
  phone?: string;
  platform_source?: string;
  campaign_source?: string;
}
