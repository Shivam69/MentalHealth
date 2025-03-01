import { jest } from '@jest/globals';
// Mock problematic dependencies
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-gesture-handler/jestSetup');
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  NavigationContainer: ({ children }) => children,
}));

// Add this new mock for bottom-tabs
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ name, component }) => null,
  }),
}));