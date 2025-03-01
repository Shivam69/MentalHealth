import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressCircle from '../../src/components/ProgressCircle';

describe('ProgressCircle Component', () => {
  it('renders correctly with given props', () => {
    const { getByText } = render(
      <ProgressCircle score={50} total={100} scoreLabel="Mental Wellbeing" scoreChange={5} color="#FF6B6B" />
    );
    expect(getByText('50')).toBeTruthy();
    expect(getByText(/\(\+5\)/)).toBeTruthy();
    expect(getByText('Mental Wellbeing')).toBeTruthy();
  });
});
