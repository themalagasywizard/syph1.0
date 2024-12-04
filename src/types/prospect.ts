export interface Prospect {
  id: string;
  first_name: string;
  last_name: string;
  job_title?: string;
  department?: string;
  company_name: string;
  industry?: string;
  company_size?: string;
  
  primary_phone?: string;
  secondary_phone?: string;
  email: string;
  linkedin_profile?: string;
  
  location?: string;
  city?: string;
  state_province?: string;
  country?: string;
  timezone?: string;
  
  lead_status?: string;
  lead_source?: string;
  
  competitors?: {
    name: string;
    pros?: string;
    cons?: string;
  }[];
  
  tags?: string;
  
  created_at?: string;
  updated_at?: string;
}