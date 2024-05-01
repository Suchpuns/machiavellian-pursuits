export interface Card {
  type: string;
  name: string;
}

export interface Resource extends Card {}

export interface Action extends Card {
  effect: (r: Room, playerId: string, params: unknown[]) => void;
}

export interface Goal {
  points: number;
  completed: false;
}

export interface Player {
  socketId: string;
  id?: string; // No id means the player is a guest
  name: string;
  hand: Card[];
  storage: Card[];
  points: number;
  goals: Goal[];
}

export interface Room {
  id: string; // room id/code
  players: Player[];
  turn: number; // turn is an index in the players array. Indicates which player is playing in the current turn
  start: boolean;
}

export interface Deck {
  cards: Card[];
}

export interface Disconnect {
  userId: string;
  timeOutObj: NodeJS.Timeout;
}

export interface Error {
  errMsg: string;
}
