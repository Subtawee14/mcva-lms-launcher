import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

export const userListState = atom({
  key: 'userListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const currentUserState = atom({
  key: 'currentUserState',
  default: undefined,
});
