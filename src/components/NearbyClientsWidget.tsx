interface NearbyClient {
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

type NearbyClients = Record<string, NearbyClient>;

// Rest of the file remains unchanged