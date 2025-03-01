import React from 'react';
import { render } from '@testing-library/react-native';
import WellnessDashboard from '../../src/components/WellnessDashboard';

describe('WellnessDashboard Component', () => {
  it('displays correct scores', () => {
    const scores = {
      mentalWellbeing: { score: 41, change: -9 },
      workLifeBalance: { score: 47, change: 7 },
      selfEfficacy: { score: 50, change: -30 },
    };
    const { getByText } = render(<WellnessDashboard scores={scores} />);
    expect(getByText('41')).toBeTruthy();
    expect(getByText('47')).toBeTruthy();
    expect(getByText('50')).toBeTruthy();
  });
});