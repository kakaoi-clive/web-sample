import { atom } from 'recoil';
export const LocalVideo = atom({
  key: 'LocalVideo',
  default: '',
  dangerouslyAllowMutability: true,
});
