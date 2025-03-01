import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';

describe('HomeScreen Component', () => {
  it('renders the wellness dashboard and daily activities', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Your areas for growth are:')).toBeTruthy();
    expect(getByText('Try these activities daily to improve mental health & productivity')).toBeTruthy();
  });
});