import { atom } from 'recoil';
export const AudioOccupants = atom({
  key: 'AudioOccupants',
  default: [],
  dangerouslyAllowMutability: true,
});
