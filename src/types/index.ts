export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  company: string;
  industry: string;
  companySize: string;
  location: {
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
  preferredContactMethod: 'email' | 'phone' | 'linkedin' | 'other';
  phone: {
    primary: string;
    secondary?: string;
  };
  email: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    other?: string;
  };
  status: 'lead' | 'prospect' | 'client' | 'opportunity' | 'churned';
  source: string;
  lastContactedAt?: Date;
  competitors: Array<{
    name: string;
    pros: string;
    cons: string;
  }>;
  tags: string[];
  customFields?: Record<string, any>;
  engagement: {
    status: string;
    preferredChannel: string;
    meetingPreference: string;
    interests: string[];
  };
  insights: {
    decisionMakingRole: string;
    budget: string;
    painPoints: string[];
    competitors: Array<{
      name: string;
      pros: string;
      cons: string;
    }>;
    notes: string[];
  };
  recentActivity: {
    websiteVisits: Array<{
      page: string;
      date: string;
      duration: string;
    }>;
    emailEngagement: {
      openRate: string;
      clickRate: string;
      lastOpened: string;
    };
  };
  avatar?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio?: string;
  language?: string;
  timezone?: string;
  settings?: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  stats?: {
    callsMade: number;
    dealsWon: number;
    revenue: number;
  };
  salesRank?: number;
  coachingScore?: number;
  achievements?: Array<{
    title: string;
    date: string;
  }>;
}

export interface CompanyData {
  name: string;
  industry: string;
  revenue: string;
  employees: string;
  founded: string;
  website: string;
  description: string;
  decisionMakers: Array<{
    name: string;
    title: string;
    department: string;
    influenceLevel: string;
    linkedin: string;
  }>;
  opportunities: Array<{
    name: string;
    value: string;
    status: string;
    createdDate: string;
    closedDate: string | null;
  }>;
  news: Array<{
    title: string;
    summary: string;
    source: string;
    date: string;
    url: string;
    image: string;
  }>;
  previousContacts: Array<{
    type: string;
    date: string;
    summary: string;
    by: string;
  }>;
}

export interface NearbyClient {
  distance: string;
  relationship: {
    yearsAsClient: number;
    totalRevenue: string;
    lastInteraction: string;
  };
  keyPeople: Array<{
    name: string;
    role: string;
  }>;
}

export type NearbyClients = Record<string, NearbyClient>;