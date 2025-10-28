import { Activity, Message, Territory } from './types';

export const USER_CREDENTIALS: Record<string, string> = {
    'PaperSoap': 'P@perS0ap!197',
    'SoapBar187': 'S0ap-B@r#88xQ',
    'TylerEcho': 'TylerR!se_09',
    'BasementGhost': 'B@s3m3ntGhst!7',
    'FightCipher': 'F1ghtC1ph3r$22',
    'KnockTwice': 'Kn0ckTw!c3_#5',
    'UndergroundOne': 'Und3rGr0und!X1',
    'SilentPunch': 'S!lentPuncH_47',
    'EchoClubber': 'Ech0Club#2025',
    'CardboardBoxer': 'C@rdB0ardB0x!9',
    'nikk': 'nikk',
};

export const ACTIVITIES_DATA: Activity[] = [
    {
        id: 'act1',
        title: 'Sparring',
        description: 'The first rule of Fight Club is you do not talk about Fight Club. The second rule is you DO NOT talk about Fight Club. This is where you let go.',
        locations: [
            {
                name: "The Basement of Lou's Tavern",
                address: 'Figueroa St, Downtown Los Angeles',
                description: 'The original. Concrete floors, single light bulb. Where it all began.',
                coords: { x: '59%', y: '86%' }
            },
            {
                name: 'Abandoned Paper Street House',
                address: 'N Gaffey Ave, San Pedro, CA',
                description: 'Our new home. More space, more privacy. Same rules apply.',
                coords: { x: '63%', y: '92%' }
            },
            {
                name: 'Parking Garage, Financial District',
                address: 'W 4th St, Downtown Los Angeles',
                description: 'For when the basement gets too crowded. Watch for security. Fights end when someone goes limp or taps out.',
                coords: { x: '60%', y: '84%' }
            }
        ]
    },
    {
        id: 'act2',
        title: 'The Basement',
        description: "Homework assignments are given. We are the middle children of history. It's time to make our mark.",
        locations: [
            {
                name: '1537 Paper Street',
                address: 'N Gaffey Ave, San Pedro, CA',
                description: 'The command center for all operations. Attendance is mandatory for new assignments.',
                coords: { x: '63.5%', y: '91%' }
            },
            {
                name: 'Public Library Archives',
                address: 'W 5th St, Downtown Los Angeles',
                description: 'Research for upcoming homework. Blend in. Do not draw attention to yourself.',
                coords: { x: '61%', y: '83%' }
            }
        ]
    },
    {
        id: 'act3',
        title: 'Recruitment Grounds',
        description: 'This is where we find our new recruits. We are not our khakis. We are not our jobs. Go and listen. Find the ones who are ready to hit bottom.',
        locations: [
            {
                name: 'Remaining Men Together',
                address: 'Wilshire Blvd, Koreatown, Los Angeles',
                description: 'Listen to their stories. Find the ones who have truly lost hope. They are ready.',
                coords: { x: '57%', y: '82%' }
            },
            {
                name: 'Above and Beyond',
                address: 'Echo Park Ave, Echo Park, Los Angeles',
                description: 'Another source. Remember, you\'re a tourist. Just observe. Identify potential members.',
                coords: { x: '64%', y: '81%' }
            }
        ]
    }
];

export const NETWORK_DATA: Territory[] = [
  {
    id: 'net1',
    name: 'Global Credit Network',
    status: 'vulnerable',
    influence: 78,
  },
  {
    id: 'net2',
    name: 'E-Corp Mainframe',
    status: 'secure',
    influence: 95,
  },
  {
    id: 'net3',
    name: 'Social Media Ad Server',
    status: 'compromised',
    influence: 22,
  },
  {
    id: 'net4',
    name: 'National Power Grid',
    status: 'secure',
    influence: 89,
  }
];


export const INITIAL_CHAT_HISTORY: Record<string, Message[]> = {
    'remaining-men': [
        { sender: 'user', text: 'Another week.' },
        { sender: 'model', text: 'Another week. Anyone feel anything real yet?' },
        { sender: 'user', text: 'Everything feels so plastic.'},
        { sender: 'model', text: 'I was at the library. The things they publish... it\'s all just... consumer reports.' },
        { sender: 'user', text: 'How do you deal with it?'},
        { sender: 'model', text: 'The crying helps. It really does.' },
    ],
    'survivors-group': [
        { sender: 'user', text: 'It\'s hard not to let it define you.' },
        { sender: 'model', text: 'Remember what they told us. We are not our... condition.' },
        { sender: 'user', text: 'I feel like I don\'t belong here.' },
        { sender: 'model', text: 'Some nights I still feel like a tourist here.' },
        { sender: 'user', text: 'So what\'s the point?'},
        { sender: 'model', text: 'They took my balls. Now I am free. Find the freedom.' },
    ],
    'bitch-tits': [
        { sender: 'user', text: 'These treatments are something else.' },
        { sender: 'model', text: 'The testosterone injections are a real trip.' },
        { sender: 'user', text: 'We lost someone.' },
        { sender: 'model', text: 'His name was Robert Paulson.' },
        { sender: 'user', 'text': 'Tell me about Bob.' },
        { sender: 'model', text: 'Bob had bitch tits.' },
    ],
};