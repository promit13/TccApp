import {SMTPClient} from 'emailjs';

export const client = new SMTPClient({
  user: 'user',
  password: 'password',
  host: 'smtp.your-email.com',
  ssl: true,
});

export const emailJsUserId = 'user_HHPxNX4ygYItCyvtDhy2e';
export const emailJsServiceId = 'service_6e2mt2y';
export const emailJsTemplateId = 'campaign_assets';
