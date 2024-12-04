import { Contact } from '../types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    title: 'Chief Technology Officer',
    department: 'Technology',
    company: 'Tech Solutions Inc.',
    industry: 'Software & Technology',
    companySize: '201-500',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      timezone: 'PST'
    },
    preferredContactMethod: 'email',
    phone: {
      primary: '+1 (555) 123-4567'
    },
    email: 'john.smith@techsolutions.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johnsmith'
    },
    status: 'prospect',
    source: 'Website',
    lastContactedAt: new Date('2023-12-10'),
    competitors: [
      {
        name: 'Legacy Systems Inc',
        pros: 'Established brand',
        cons: 'Outdated technology'
      }
    ],
    tags: ['Enterprise', 'High Priority', 'Tech Decision Maker'],
    engagement: {
      status: 'Highly Engaged',
      preferredChannel: 'Email',
      meetingPreference: 'Morning',
      interests: ['Cloud Migration', 'AI Implementation']
    },
    insights: {
      decisionMakingRole: 'Final Decision Maker',
      budget: '$500k+',
      painPoints: ['Legacy System Costs', 'Scalability Issues'],
      competitors: [
        {
          name: 'Legacy Systems Inc',
          pros: 'Established brand',
          cons: 'Outdated technology'
        }
      ],
      notes: ['Interested in Q1 implementation', 'Needs board approval']
    },
    recentActivity: {
      websiteVisits: [
        {
          page: 'Pricing',
          date: '2023-12-09',
          duration: '5 minutes'
        }
      ],
      emailEngagement: {
        openRate: '80%',
        clickRate: '45%',
        lastOpened: '2023-12-10'
      }
    }
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Chen',
    title: 'VP of Marketing',
    department: 'Marketing',
    company: 'Global Innovations',
    industry: 'Marketing Technology',
    companySize: '51-200',
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
      timezone: 'EST'
    },
    preferredContactMethod: 'phone',
    phone: {
      primary: '+1 (555) 234-5678'
    },
    email: 'sarah.chen@globalinnovations.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahchen'
    },
    status: 'lead',
    source: 'Referral',
    lastContactedAt: new Date('2023-12-08'),
    competitors: [
      {
        name: 'MarTech Solutions',
        pros: 'Good analytics',
        cons: 'Limited automation'
      }
    ],
    tags: ['MarTech', 'Mid-Market'],
    engagement: {
      status: 'New Lead',
      preferredChannel: 'Phone',
      meetingPreference: 'Afternoon',
      interests: ['Marketing Automation', 'Analytics']
    },
    insights: {
      decisionMakingRole: 'Influencer',
      budget: '$100k-$250k',
      painPoints: ['Manual Processes', 'Data Silos'],
      competitors: [
        {
          name: 'MarTech Solutions',
          pros: 'Good analytics',
          cons: 'Limited automation'
        }
      ],
      notes: ['Looking for Q2 implementation']
    },
    recentActivity: {
      websiteVisits: [
        {
          page: 'Features',
          date: '2023-12-08',
          duration: '3 minutes'
        }
      ],
      emailEngagement: {
        openRate: '60%',
        clickRate: '30%',
        lastOpened: '2023-12-08'
      }
    }
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    title: 'Director of Operations',
    department: 'Operations',
    company: 'Innovate Manufacturing',
    industry: 'Manufacturing',
    companySize: '501-1000',
    location: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      timezone: 'CST'
    },
    preferredContactMethod: 'email',
    phone: {
      primary: '+1 (555) 345-6789'
    },
    email: 'm.rodriguez@innovatemfg.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mrodriguez'
    },
    status: 'opportunity',
    source: 'Trade Show',
    lastContactedAt: new Date('2023-12-07'),
    competitors: [
      {
        name: 'Industrial Tech Corp',
        pros: 'Industry experience',
        cons: 'High costs'
      }
    ],
    tags: ['Manufacturing', 'Enterprise'],
    engagement: {
      status: 'Engaged',
      preferredChannel: 'Email',
      meetingPreference: 'Morning',
      interests: ['Process Automation', 'Quality Control']
    },
    insights: {
      decisionMakingRole: 'Technical Evaluator',
      budget: '$250k-$500k',
      painPoints: ['Quality Control', 'Process Efficiency'],
      competitors: [
        {
          name: 'Industrial Tech Corp',
          pros: 'Industry experience',
          cons: 'High costs'
        }
      ],
      notes: ['Needs technical evaluation']
    },
    recentActivity: {
      websiteVisits: [
        {
          page: 'Case Studies',
          date: '2023-12-07',
          duration: '8 minutes'
        }
      ],
      emailEngagement: {
        openRate: '75%',
        clickRate: '40%',
        lastOpened: '2023-12-07'
      }
    }
  }
];