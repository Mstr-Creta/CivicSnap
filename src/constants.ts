import { Issue } from './types';

export const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    category: 'Pothole',
    description: 'Large pothole near Master Canteen Square.',
    location: [20.2961, 85.8245],
    status: 'open',
    photoUrl: 'https://picsum.photos/seed/pothole1/400/300',
    votes: 12,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    distance: '0.5 km'
  },
  {
    id: '2',
    category: 'Garbage Dump',
    description: 'Overflowing dustbin near Unit 9 market.',
    location: [20.2880, 85.8350],
    status: 'open',
    photoUrl: 'https://picsum.photos/seed/garbage1/400/300',
    votes: 8,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    distance: '1.2 km'
  },
  {
    id: '3',
    category: 'Streetlight',
    description: 'Streetlight not working for 3 days.',
    location: [20.3050, 85.8150],
    status: 'resolved',
    photoUrl: 'https://picsum.photos/seed/light1/400/300',
    votes: 5,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    distance: '2.1 km'
  }
];

export const BHUBANESWAR_CENTER: [number, number] = [20.2961, 85.8245];
export const BHUBANESWAR_BOUNDS: [[number, number], [number, number]] = [
  [20.15, 85.65], // Southwest
  [20.45, 86.00]  // Northeast
];
