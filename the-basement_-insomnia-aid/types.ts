// FIX: Removed self-import of 'Activity' which caused a name conflict.
export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: string;
  status: 'active' | 'completed' | 'failed';
}

export interface Territory {
  id: string;
  name: string;
  status: 'secure' | 'vulnerable' | 'compromised';
  influence: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  locations: ActivityLocation[];
}

export interface ActivityLocation {
  name: string;
  address: string;
  description: string;
  coords: { x: string; y: string };
}

export interface Message {
  sender: 'user' | 'model';
  text: string;
}
