// src/setupTests.ts
import '@testing-library/jest-dom';

// Extend the global interface
declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserver;
  }
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Assign to window
window.ResizeObserver = ResizeObserver;