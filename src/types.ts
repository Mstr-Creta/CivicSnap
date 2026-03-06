export type IssueStatus = 'open' | 'in-progress' | 'resolved';
export type IssueCategory = 'Pothole' | 'Garbage Dump' | 'Streetlight' | 'Water Logging' | 'Other';

export interface Issue {
  id: string;
  category: IssueCategory;
  description: string;
  location: [number, number];
  status: IssueStatus;
  photoUrl?: string;
  votes: number;
  reportedAt: string;
  distance?: string;
}

export type AppView = 'map' | 'feed' | 'profile' | 'report' | 'spaces' | 'notifications';
