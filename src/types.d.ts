import type { Document } from 'mongoose';
// mongoose schemas

export interface SubDocument {
  id: number;
  name: string;
}

export interface Membership extends SubDocument {
  type: 'Crew' | 'Group';
}

export interface Ownership {
  id?: number;
  type: string;
  name?: string;
}

export interface LuffyDevilFruitSubDoc extends SubDocument {
  id: 1;
  name: 'Hito Hito no Mi, Model: Nika';
  alias: 'Gomu Gomu no Mi';
}

export type Status = 'Alive' | 'Deceased' | 'Unknown';
export type Race = SubDocument;
export type HakiAbility = SubDocument & { name: HakiAbilityName };
export type HakiAbilityName = 'Armament' | 'Observation' | 'Conqueror';
export type DevilFruitType = 'Paramecia' | 'Logia' | 'Zoan' | 'Mythical Zoan';

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
  average_lifespan?: string;
  homeland: string;
  history: string;
  image?: string;
}

export interface DevilFruitDocument extends Document {
  _id: number;
  name: string;
  type: DevilFruitType;
  meaning: string;
  description: string;
  current_user: SubDocument;
  image?: string;
}

export interface HakiAbilityDocument extends Document {
  _id: number;
  name: string;
  description: string;
  users: Array<SubDocument>;
  image: string;
}

export interface GroupDocument extends Document {
  _id: number;
  name: string;
  members: Array<SubDocument>;
  background: string;
  image?: string;
}

export interface CrewDocument extends Document {
  _id: number;
  name: string;
  captain: SubDocument;
  flag?: string;
  main_ship?: SubDocument;
  members: Array<SubDocument>;
  background: string;
  image?: string;
}

export interface MemberDocument extends Document {
  _id: number;
  character: SubDocument;
  membership: Membership;
  rol: string;
  status: string;
  details: string;
}

export interface ShipDocument extends Document {
  _id: number;
  name: string;
  description: string;
  ownership: Ownership;
  flag?: string;
  image?: string;
}
