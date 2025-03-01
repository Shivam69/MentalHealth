import React from 'react';
import { render } from '@testing-library/react-native';
import DailyActivities from '../../src/components/DailyActivities';

describe('DailyActivities Component', () => {
  it('renders activities correctly', () => {
    const activities = {
      morning: [{ title: 'Morning Meditation', type: 'meditation', description: 'A relaxing meditation' }],
      afternoon: [{ title: 'Afternoon Walk', type: 'exercise', description: 'A refreshing walk' }],
      evening: [{ title: 'Evening Reflection', type: 'journal', description: 'Daily journaling' }],
    };
    const { getByText } = render(<DailyActivities activities={activities} />);
    expect(getByText('Morning Meditation')).toBeTruthy();
    expect(getByText('Afternoon Walk')).toBeTruthy();
    expect(getByText('Evening Reflection')).toBeTruthy();
  });
});