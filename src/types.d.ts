import type { Document } from 'mongoose';
// mongoose schemas

export interface SubDocument {
  id: number;
  name: string;
  url: string;
}

export interface LuffyDevilFruitSubDoc extends SubDocument {
  id: 1;
  name: 'Hito Hito no Mi, Model: Nika';
  alias: 'Gomu Gomu no Mi';
}

export type Status = 'Alive' | 'Deceased' | 'Unknown';
export type Race = SubDocument;
export type HakiAbility = SubDocument & { name: 'Armament' | 'Observation' | 'Conqueror' };

export interface CharacterDocument extends Document {
  _id: number;
  name: string;
  gender: string;
  race: Race;
  status: Status;
  birthday?: string;
  main_occupations?: Array<string>;
  devil_fruit?: LuffyDevilFruitSubDoc | SubDocument | Array<SubDocument>;
  haki_abilities?: Array<HakiAbilities>;
  bounties?: Array<string>;
  height?: string;
  first_appearance: Array<string>;
  backstory: string;
  image?: string;
}

export interface RaceDocument extends Document {
  _id: number;
  name: string;
  description: string;
  average_lifespan: string;
  homeland: string;
  history: string;
  image?: string;
}
