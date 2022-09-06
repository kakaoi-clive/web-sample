import { atom } from 'recoil';

const sessionStorageEffect = (key) => {
  return ({ setSelf, onSet }) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };
};

export const ServiceInfo = atom({
  key: 'ServiceInfo',
  default: {
    type: 'internal',
    internal: {
      serviceId: 'ICLEXMPLPUBL',
      serviceSecret: 'ICLEXMPLPUBL0KEY:YOUR0SRVC0SECRET',
      endpoint: '',
    },
    external: {
      serviceId: '',
      token: '',
      endpoint: '',
    },
  },
  effects: [sessionStorageEffect('ServiceInfo')],
});
