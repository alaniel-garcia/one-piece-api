import type { Document, Model, Schema } from 'mongoose';
import type { Request } from 'express';

// API

export interface ApiModelsHandler {
  characters: CharacterModel;
  races: RaceModel;
  devil_fruits: DevilFruitModel;
  haki_abilities: HakiAbilityModel;
  // groups: GroupModel;
  // crews: CrewModel;
  // members: MemberModel;
  // ships: ShipModel;
  // locations: LocationModel;
}
export type ApiModel =
  | CharacterModel
  | RaceModel
  | DevilFruitModel
  | HakiAbilityModel
  | GroupModel
  | CrewModel
  | MemberModel
  | ShipModel
  | LocationModel;

export type ApiDocument =
  | BaseCharacter
  | BaseRace
  | BaseDevilFruit
  | BaseHakiAbility
  | BaseGroup
  | BaseCrew
  | BaseMember
  | BaseShip
  | BaseLocation;

type HandlerType = 'find' | 'findById';

type EndpointHandler = {
  [key in HandlerType]: Array<(req, res, next) => Promise<void> | Response<any, Record<string, any>>>;
};

// Request and payload

export interface CustomRequest<PayloadType = Payload> extends Request {
  payload: PayloadType;
  params: {
    id: string | Array<string | number>;
  };
}

export interface RawPayload {
  page: number;
  count: number;
  results: Array<ApiDocument>;
}

export interface ProcessedPayload {
  info: {
    count: number;
    page: string | number;
    totalPages: number;
    next: string;
    prev: string;
  };
  results: Array<ApiDocument>;
}

export type GetByIdData = Array<ApiDocument> | ApiDocument;

type Payload = RawPayload | ProcessedPayload | GetByIdData;

// Subdocs and enums

export type Status = 'Alive' | 'Deceased' | 'Unknown';
export type HakiAbilityName = 'Armament' | 'Observation' | 'Conqueror';
export type DevilFruitType = 'Paramecia' | 'Logia' | 'Zoan' | 'Mythical Zoan';

// Character interfaces

export interface BaseCharacter {
  id: number;
  name: string;
  gender: string;
  race: Schema.Types.ObjectId;
  origin: string;
  status: Status;
  birthday?: string | null;
  main_occupations?: Array<string> | null;
  devil_fruit?: Schema.Types.ObjectId | Array<Schema.Types.ObjectId> | null;
  haki_abilities?: Array<Schema.Types.ObjectId> | null;
  bounties?: Array<string> | null;
  height?: string | null;
  debut: Array<string>;
  backstory: string;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface CharacterDocument extends BaseCharacter, Document {}

export interface CharacterModel extends Model<CharacterDocument> {
  structure: (res: CharacterDocument | Array<CharacterDocument>) => BaseCharacter | Array<BaseCharacter>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}

// Race interfaces

export interface BaseRace {
  id: number;
  name: string;
  homeland: string;
  about: string;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface RaceDocument extends BaseRace, Document {}

export interface RaceModel extends Model<RaceDocument> {
  structure: (res: RaceDocument | Array<RaceDocument>) => BaseRace | Array<BaseRace>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}

// Devil Fruit interfaces

export interface BaseDevilFruit {
  id: number;
  name: string;
  alias?: 'Gomu Gomu no Mi' | null;
  type: DevilFruitType;
  meaning: string;
  description: string;
  current_user?: Schema.Types.ObjectId | null;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface DevilFruitDocument extends BaseDevilFruit, Document {}

export interface DevilFruitModel extends Model<DevilFruitDocument> {
  structure: (res: DevilFruitDocument | Array<DevilFruitDocument>) => BaseDevilFruit | Array<BaseDevilFruit>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}

// Haki Ability interfaces

export interface BaseHakiAbility {
  id: number;
  name: HakiAbilityName;
  description: string;
  users: Array<Schema.Types.ObjectId>;
  image: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface HakiAbilityDocument extends BaseHakiAbility, Document {}

export interface HakiAbilityModel extends Model<HakiAbilityDocument> {
  structure: (res: HakiAbilityDocument | Array<HakiAbilityDocument>) => BaseHakiAbility | Array<BaseHakiAbility>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}

// Group interfaces

export interface BaseGroup {
  id: number;
  name: string;
  members: Array<Schema.Types.ObjectId>;
  background: string;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface GroupDocument extends BaseGroup, Document {}

export interface GroupModel extends Model<GroupDocument> {
  structure: (res: GroupDocument | Array<GroupDocument>) => BaseGroup | Array<BaseGroup>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}

// Crew interfaces

export interface BaseCrew {
  id: number;
  name: string;
  captain: Schema.Types.ObjectId;
  flag?: string | null;
  main_ship?: Schema.Types.ObjectId | null;
  members: Array<Schema.Types.ObjectId>;
  background: string;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface CrewDocument extends BaseCrew, Document {}

export interface CrewModel extends Model<CrewDocument> {
  structure: (res: CrewDocument | Array<CrewDocument>) => BaseCrew | Array<BaseCrew>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}

// Member interfaces

export interface BaseMember {
  id: number;
  character: Schema.Types.ObjectId;
  membership_type: 'Crew' | 'Group';
  membership: Schema.Types.ObjectId;
  rol: string;
  status: string;
  details: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface MemberDocument extends BaseMember, Document {}

export interface MemberModel extends Model<MemberDocument> {
  structure: (res: MemberDocument | Array<MemberDocument>) => BaseMember | Array<BaseMember>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}

// Ship interfaces

export interface BaseShip {
  id: number;
  name: string;
  description: string;
  ownership_type: 'Crew' | 'Group';
  ownership: Schema.Types.ObjectId;
  flag?: string | null;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface ShipDocument extends BaseShip, Document {}

export interface ShipModel extends Model<ShipDocument> {
  structure: (res: ShipDocument | Array<ShipDocument>) => BaseShip | Array<BaseShip>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}

// Location interfaces

export interface BaseLocation {
  id: number;
  name: string;
  type: string;
  description: string;
  population?: string | null;
  government?: string | null;
  history: string;
  image: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface LocationDocument extends BaseLocation, Document {}

export interface LocationModel extends Model<LocationDocument> {
  structure: (res: LocationDocument | Array<LocationDocument>) => BaseLocation | Array<BaseLocation>;
  findAndCount: (params: any) => Promise<{ results: any; count: number }>;
}
