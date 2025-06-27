import '@testing-library/jest-dom';
// jest.setup.ts
import { TextEncoder, TextDecoder } from 'util';

// jest.setup.ts ou no topo do Dashboard.test.tsx
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

