import type { Membership } from 'types';
import { validateSubDoc } from '.';

export function validateMembership(value: Membership): true {
  const { type, ...subDoc } = value;

  validateSubDoc(subDoc);

  if (!(type === 'Crew' || type === 'Group')) throw new Error('Type property must be "Crew" or "Group" string');

  return true;
}
